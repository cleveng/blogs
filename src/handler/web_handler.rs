use crate::{AppState, ErrorResponse, SuccessResponse};
use actix_web::web::Data;
use actix_web::HttpResponse;

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
    HttpResponse::NotFound().finish()
}