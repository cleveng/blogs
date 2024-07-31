use axum::{
    http::{
        header::{HeaderName, HeaderValue},
        StatusCode,
    },
    response::{IntoResponse, Response},
    routing::{get, post},
    Extension, Json, Router,
};

extern crate pretty_env_logger;
#[macro_use]
extern crate log;

mod config;
use config::{init_config, Config};

mod graphql;
use chrono::prelude::*;
use graphql::{create_schema, graphql_handler};
use redis::{Commands, RedisResult};
use serde_json::json;

mod repository {
    pub mod redis;
}

use repository::redis::init_redis;

#[tokio::main]
async fn main() {
    pretty_env_logger::init();

    // 解析服务器ip和端口号
    let config: Config = init_config();
    let addr = config.get_server_addr();

    // schema
    let schema = create_schema();

    let app = Router::new().route("/", get(root));

    let app = app.route("/redis", get(redis));

    let app = app
        .route("/graphql", post(graphql_handler))
        .layer(Extension(schema));

    let app = app.fallback(not_found);

    let listener = tokio::net::TcpListener::bind(&addr).await.unwrap();

    info!("the server is running,  url: http://{} ", addr);

    axum::serve(listener, app).await.unwrap();
}

async fn redis() -> impl IntoResponse {
    let mut client = init_redis();
    let now = Utc::now();

    let _: RedisResult<()> = client.set("my_key", now.timestamp());
    let value: RedisResult<i64> = client.get("my_key");

    if let Ok(v) = value {
        (
            StatusCode::OK,
            format!("get value from redis by key {}: {}", "my_key", v),
        )
    } else {
        (
            StatusCode::BAD_REQUEST,
            format!("not found value from redis by key {}", "my_key"),
        )
    }
}

async fn root() -> &'static str {
    "Hello, World!"
}

/// NOT FOUND
async fn not_found() -> impl IntoResponse {
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
