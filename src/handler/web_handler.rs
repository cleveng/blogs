use crate::configs::config::Google;
use crate::service::google;
use crate::{AppState, ErrorResponse, SuccessResponse};
use actix_web::web::Data;
use actix_web::{web, HttpResponse, Responder};

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

pub async fn login(
    state: Data<AppState>,
    query: web::Query<HashMap<String, String>>,
) -> impl Responder {
    let Google {
        client_id,
        client_secret,
        callback_url,
    } = state.google.clone();
    let client = google::Google::new(client_id, client_secret, callback_url);

    let code = if let Some(code) = query.get("code") {
        code
    } else {
        return HttpResponse::Found()
            .append_header(("Location", client.get_redirect_url()))
            .finish();
    };

    let profile = client.get_profile(code.to_string()).await;
    match profile {
        Ok(profile) => HttpResponse::Ok().json(profile),
        Err(err) => {
            HttpResponse::InternalServerError().body(format!("get_google_user_info error: {}", err))
        }
    }
}
