use crate::service::google::Google;
use crate::{AppState, SuccessResponse};
use actix_web::web::Data;
use actix_web::{web, HttpResponse, Responder};

use crate::service::account::get_account_by_app;
use log::warn;
use std::collections::HashMap;

pub async fn root(_state: Data<AppState>) -> HttpResponse {
    let resp = SuccessResponse::new("ok");
    HttpResponse::Ok().json(resp)
}

pub async fn not_found() -> HttpResponse {
    HttpResponse::NotFound().finish()
}

pub async fn login(
    state: Data<AppState>,
    query: web::Query<HashMap<String, String>>,
) -> impl Responder {
    let app: String = if let Some(app) = query.get("app") {
        app.to_string()
    } else {
        String::from("gg")
    };

    let client = match get_account_by_app(&state, app).await {
        Ok(account) => {
            // support other app of platform, eg: WeChat, weibo, qq, GitHub
            let callback_url: String = state.google.callback_url.clone();
            Google::new(account.appid, account.app_secret.unwrap(), callback_url)
        }
        Err(err) => {
            warn!("Failed to get account, {err}");
            return HttpResponse::InternalServerError().body("The current service is unavailable");
        }
    };

    HttpResponse::Found()
        .append_header(("Location", client.get_redirect_url()))
        .finish()
}
