use axum::http::{HeaderName, HeaderValue, StatusCode};
use axum::response::{IntoResponse, Response};
use axum::Json;
use serde_json::json;

pub async fn root() -> &'static str {
    "hello world!!!"
}

pub async fn not_found() -> impl IntoResponse {
    let result = Json(json!({
        "data": null,
        "message": "Not Found",
        "code": 404,
    }));

    // (StatusCode::NOT_FOUND, result)
    // 自定义头部
    let mut response = Response::new(result.into_response().into_body());
    *response.status_mut() = StatusCode::NOT_FOUND;

    // 添加自定义头
    response.headers_mut().insert(
        HeaderName::from_static("appid"),
        HeaderValue::from_static("custom_value"),
    );

    response
}
