use crate::{AppState, ErrorResponse, SuccessResponse};
use actix_web::web::Data;
use actix_web::HttpResponse;
use signatory_kit::Signatory;

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
