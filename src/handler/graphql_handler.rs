use crate::model::account::{AccountInput, AccountObject};
use crate::AppState;
use actix_web::{http::header::HeaderMap, web::Data, HttpRequest, HttpResponse};

use crate::model::session::SessionModel;
use crate::model::user::UserModel;
use crate::service::account::get_account_by_app;
use crate::service::google;
use crate::service::session::get_user_by_open_id;
use crate::service::user::{generate_token, insert_user_and_session};
use async_graphql::http::{playground_source, GraphQLPlaygroundConfig};
use async_graphql::{Context, EmptySubscription, Error, Object, Schema};
use async_graphql_actix_web::GraphQLRequest;
use log::warn;
use signatory_kit::Signatory;

pub struct Appid(pub String);

pub struct Query;

#[Object(extends)]
impl Query {
    async fn hello(&self, _ctx: &Context<'_>, payload: String) -> Result<String, Error> {
        Ok(format!("request payload {}", payload))
    }

    async fn get_account(&self, ctx: &Context<'_>, input: String) -> Result<AccountObject, Error> {
        let state = match ctx.data::<AppState>() {
            Ok(state) => state,
            Err(_) => return Err(Error::new("app state not found")),
        };

        let account = match get_account_by_app(&state, input).await {
            Ok(account) => account,
            Err(err) => {
                warn!("Failed to retrieve account: {err}");
                return Err(Error::new("Failed to retrieve account"));
            }
        };

        let account = AccountObject {
            name: account.name,
            app: account.app,
            appid: account.appid,
            app_secret: Some(account.app_secret.unwrap()),
        };

        Ok(account)
    }
}

pub struct Mutation;

#[Object]
impl Mutation {
    async fn signup(&self, _ctx: &Context<'_>, payload: String) -> Result<String, Error> {
        Ok(payload)
    }

    async fn login(&self, ctx: &Context<'_>, payload: String) -> Result<String, Error> {
        let appid = ctx.data::<Appid>()?;
        let signer = Signatory::new(appid.0.to_string());
        let params = signer
            .decrypt_base64_str(payload)
            .map_err(|_| Error::new("Failed to decrypt payload"))?;

        let sign = params
            .get("sign")
            .and_then(|s| s.as_str())
            .ok_or_else(|| Error::new("Signature not found in params"))?;

        let is_ok = signer.check_signature(params.clone(), sign.to_string());
        if !is_ok {
            return Err(Error::new("Invalid signature"));
        }

        let code = params
            .get("code")
            .and_then(|s| s.as_str())
            .ok_or_else(|| Error::new("Code not found in params"))?;

        let app: String = params
            .get("app")
            .and_then(|e| e.as_str())
            .unwrap_or("gg")
            .to_string();

        let app_state = ctx.data::<AppState>()?;
        let account = get_account_by_app(app_state, app.clone()).await.unwrap();
        let callback_url: String = app_state.google.callback_url.clone();
        let client = google::Google::new(account.appid, account.app_secret.unwrap(), callback_url);

        let profile = client.get_profile(code.to_string()).await;
        if let Err(err) = profile {
            warn!("get_google_user_info error: {err}");
            return Err(Error::new("get google user info error"));
        }

        let profile = profile.unwrap();
        let user_id = match get_user_by_open_id(app_state, profile.sub.clone()).await {
            Ok(user) => user.id,
            Err(_) => {
                let user = UserModel {
                    created_at: None,
                    updated_at: None,
                    deleted_at: None,
                    email: profile.email,
                    name: profile.name,
                    profile_url: Some(profile.picture.clone()),
                    status: true,
                    email_verified_at: None,
                    is_admin: false,
                    id: 0,
                };
                let session = SessionModel {
                    created_at: None,
                    updated_at: None,
                    deleted_at: None,
                    user_id: 0,
                    account_id: account.id,
                    open_id: profile.sub,
                    union_id: None,
                    active: true,
                    subscribed: false,
                    id: 0,
                };

                match insert_user_and_session(app_state, user, session).await {
                    Ok(id) => id,
                    Err(err) => {
                        warn!("insert_user_and_session error: {err}");
                        return Err(Error::new("insert user and session error"));
                    }
                }
            }
        };

        let token = match generate_token(app_state, user_id).await {
            Ok(token) => token,
            Err(err) => {
                warn!("generate_token error: {err}");
                return Err(Error::new("generate token error"));
            }
        };

        Ok(token)
    }

    // 开发环境下可用
    #[cfg(debug_assertions)]
    async fn create_account(
        &self,
        ctx: &Context<'_>,
        input: AccountInput,
    ) -> Result<String, Error> {
        // 获取全局状态 `AppState`
        let state = match ctx.data::<AppState>() {
            Ok(state) => state,
            Err(_) => return Err(Error::new("app state not found")),
        };

        // db client
        let db = match state.db_pool.get().await {
            Ok(client) => client,
            Err(_) => return Err(Error::new("Failed to get DB client")),
        };

        if let Err(err) = db
            .execute(
                "INSERT INTO accounts (name, app, appid, app_secret) VALUES ($1, $2, $3, $4)",
                &[&input.name, &input.app, &input.appid, &input.app_secret],
            )
            .await
        {
            warn!("Failed to create account: {err}");
            return Err(Error::new("Failed to create account"));
        }

        Ok("Account created successfully".to_string())
    }
}

pub type ProjectSchema = Schema<Query, Mutation, EmptySubscription>;

pub fn schema(state: AppState) -> Schema<Query, Mutation, EmptySubscription> {
    Schema::build(Query, Mutation, EmptySubscription)
        .data(state.clone())
        .finish()
}

/// Extract `appid` from `headers`
pub fn get_appid_from_headers(headers: &HeaderMap) -> Option<Appid> {
    headers
        .get("Appid")
        .and_then(|value| value.to_str().map(|s| Appid(s.to_string())).ok())
}

pub async fn graphql_entry(
    schema: Data<ProjectSchema>,
    req: HttpRequest,
    gql_request: GraphQLRequest,
) -> HttpResponse {
    let mut request = gql_request.into_inner();

    if let Some(appid) = get_appid_from_headers(req.headers()) {
        request = request.data(appid);
    }

    let response = schema.execute(request).await;

    if response.is_ok() {
        return HttpResponse::Ok().json(response);
    }

    // 处理错误
    if response
        .errors
        .iter()
        .any(|e| e.message.contains("Unauthorized"))
    {
        return HttpResponse::Unauthorized().json(response);
    }

    HttpResponse::BadRequest().json(response)
}

pub async fn graphql_playground() -> HttpResponse {
    HttpResponse::Ok()
        .content_type("text/html; charset=utf-8")
        .body(playground_source(GraphQLPlaygroundConfig::new("/")))
}
