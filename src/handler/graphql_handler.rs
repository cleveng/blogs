use crate::AppState;
use actix_web::{http::header::HeaderMap, web::Data, HttpRequest, HttpResponse};

use async_graphql::http::{playground_source, GraphQLPlaygroundConfig};
use async_graphql::{Context, EmptySubscription, Error, Object, Schema};
use async_graphql_actix_web::GraphQLRequest;
use signatory_kit::Signatory;
pub struct Appid(pub String);

pub struct Query;

#[Object(extends)]
impl Query {
    async fn hello(&self, _ctx: &Context<'_>, payload: String) -> Result<String, Error> {
        Ok(format!("request payload {}", payload))
    }
}

pub struct Mutation;

#[Object]
impl Mutation {
    async fn signup(&self, ctx: &Context<'_>, payload: String) -> Result<String, Error> {
        let appid = ctx.data::<Appid>().unwrap();
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

        let email = params
            .get("email")
            .and_then(|e| e.as_str())
            .ok_or_else(|| Error::new("Email not found in params"))?;

        let state = ctx
            .data::<AppState>()
            .map_err(|_| Error::new("AppState not found"))?;

        let db_client = state
            .db_pool
            .get()
            .await
            .map_err(|_| Error::new("Failed to get DB client"))?;

        let result = db_client
            .query_one("select * from users where email = $1", &[&email])
            .await
            .map_err(|_| Error::new("User not found"))?;

        let id: i64 = result.get("id");
        println!("User ID: {:?}", id);

        Ok("Signup successful".to_string())
    }

    async fn login(&self, _ctx: &Context<'_>, payload: String) -> Result<String, Error> {
        Ok(payload.to_string())
    }
}

pub type ProjectSchema = async_graphql::Schema<Query, Mutation, EmptySubscription>;

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

    let gql_response = schema.execute(request).await;

    if gql_response.is_ok() {
        HttpResponse::Ok().json(gql_response)
    } else {
        if gql_response
            .errors
            .iter()
            .any(|e| e.message.contains("Unauthorized"))
        {
            HttpResponse::Unauthorized().json(gql_response)
        } else {
            HttpResponse::BadRequest().json(gql_response)
        }
    }
}

pub async fn graphql_playground() -> HttpResponse {
    HttpResponse::Ok()
        .content_type("text/html; charset=utf-8")
        .body(playground_source(GraphQLPlaygroundConfig::new("/")))
}
