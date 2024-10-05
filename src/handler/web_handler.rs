use crate::configs::config::Google;
use crate::{AppState, ErrorResponse, SuccessResponse};
use actix_web::web::Data;
use actix_web::{web, HttpResponse, Responder};
use oauth2::basic::BasicClient;
use oauth2::reqwest::async_http_client;
use oauth2::{AuthUrl, AuthorizationCode, ClientId, ClientSecret, CsrfToken, RedirectUrl, Scope, TokenResponse, TokenUrl};
use reqwest::Client;
use serde::{Deserialize, Serialize};
use signatory_kit::Signatory;
use std::collections::HashMap;

pub async fn root(state: Data<AppState>) -> HttpResponse {
    let db = match state.db_pool.get().await {
        Ok(pool) => pool,
        Err(e) => {
            dbg!(e);
            return HttpResponse::BadRequest().json(ErrorResponse {
                error: "Failed to query the database".to_string(),
            });
        }
    };

    let row = match db.query_one("SELECT * from accounts", &[]).await {
        Ok(row) => row,
        Err(_) => {
            return HttpResponse::BadRequest().json(ErrorResponse {
                error: "Failed to query the database".to_string(),
            })
        }
    };

    let id: i64 = row.get(0);
    let resp = SuccessResponse::<i64> {
        data: id,
        code: 200,
        error: "ok".to_string(),
    };

    HttpResponse::Ok().json(resp)
}

pub async fn not_found() -> HttpResponse {
    let payload: String = "eyJzaWduIjoiNEQ0OUZGRkRFMERBNDUzNzE2MENGQzI1ODM1NjI3N0IiLCJjbGllbnRfaWQiOiIxNjMyNzEyOCIsIm1ldGhvZCI6ImFuZHJvaWQuc2h1dGRvd24iLCJ0aW1lc3RhbXAiOiIxNzI3NDk0NjQ1In0=".to_string();

    let signer = Signatory::new("ds069ed4223ac1660f".to_string());

    let params = signer.decrypt_base64_str(payload).unwrap();

    let sign = params.get("sign").unwrap().as_str().unwrap();
    let is_ok = signer.check_signature(params.clone(), sign.to_string());
    if is_ok {
        return HttpResponse::Ok().finish();
    }

    HttpResponse::NotFound().finish()
}

pub async fn login(state: Data<AppState>, query: web::Query<HashMap<String, String>>) -> impl Responder {
    let client = get_google_oauth_client(state.google.clone());
    let code = query.get("code");
    if code.is_none() {
        let (auth_url, _csrf_token) = client
            .authorize_url(CsrfToken::new_random)
            .add_scope(Scope::new("openid".to_string()))
            .add_scope(Scope::new("email".to_string()))
            .add_scope(Scope::new("profile".to_string()))
            .url();

        return HttpResponse::Found()
            .append_header(("Location", auth_url.to_string()))
            .finish();
    }

    let result = client.exchange_code(AuthorizationCode::new(code.unwrap().to_string()))
        .request_async(async_http_client).await;

    match result {
        Ok(token) => {
            let user_info = get_google_user_info(&token.access_token().secret()).await;
            match user_info {
                Ok(user_info) => {
                    HttpResponse::Ok().json(user_info)
                }
                Err(err) => {
                    HttpResponse::InternalServerError().body(format!("get_google_user_info error: {}", err))
                }
            }
        }
        Err(err) => HttpResponse::InternalServerError().body(format!("access_token error: {}", err)),
    }
}

fn get_google_oauth_client(google: Google) -> BasicClient {
    let client_id = ClientId::new(google.get_client_id());
    let client_secret = ClientSecret::new(google.get_client_secret());

    let auth_url = AuthUrl::new("https://accounts.google.com/o/oauth2/auth".to_string()).unwrap();
    let token_url = TokenUrl::new("https://accounts.google.com/o/oauth2/token".to_string()).unwrap();

    BasicClient::new(client_id, Some(client_secret), auth_url, Some(token_url))
        .set_redirect_uri(RedirectUrl::new("http://localhost:8090/auth/login".to_string()).unwrap())
}

async fn get_google_user_info(access_token: &str) -> Result<GoogleUserInfo, reqwest::Error> {
    let client = Client::new();
    let response = client
        .get("https://www.googleapis.com/oauth2/v3/userinfo")
        .bearer_auth(access_token)
        .send()
        .await?;

    if !response.status().is_success() {
        let status = response.status();
        eprintln!("Request failed: {}", status);
    }

    // 此时我们可以安全地消费 response，解析为 JSON
    let user_info: GoogleUserInfo = response.json().await?;

    Ok(user_info)
}

#[derive(Deserialize, Serialize, Debug)]
struct GoogleUserInfo {
    sub: String,
    name: String,
    given_name: Option<String>,
    family_name: Option<String>,
    picture: String,
    email: String,
    email_verified: bool,
    locale: Option<String>,
}