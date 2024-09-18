use crate::utils::faker::new_faker;
use axum::http::{HeaderName, HeaderValue, StatusCode};
use axum::response::{IntoResponse, Response};
use axum::Json;
use serde_json::json;

pub async fn root() -> &'static str {
    let faker = new_faker();

    // 生成带前缀的 ID
    let generated_id_with_prefix = faker.gen_id(12345, Some(true));
    println!("Generated ID with prefix: {}", generated_id_with_prefix);

    // 恢复 ID
    let recovered_id = faker.recover_id(&generated_id_with_prefix);
    println!("Recovered ID: {}", recovered_id);

    // 生成不带前缀的 ID
    let generated_id_without_prefix = faker.gen_id(12345, Some(false));
    println!(
        "Generated ID without prefix: {}",
        generated_id_without_prefix
    );

    // 恢复不带前缀的 ID
    let recovered_id_without_prefix = faker.recover_id(&generated_id_without_prefix);
    println!(
        "Recovered ID without prefix: {}",
        recovered_id_without_prefix
    );

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
