use api::person::Person;
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

use jsonwebtoken::{decode, Algorithm, DecodingKey, Validation};
use mlua::prelude::*;
use serde::{Deserialize, Serialize};
use tokio_postgres::NoTls;

mod api {
    pub mod person;
}

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

    let app = app.route("/token", get(decode_token));

    let app = app.route("/postgres", get(postgres));

    let app = app.route("/lua", get(use_lua));

    let app = app.route("/protobuf", get(protobuf));

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

async fn protobuf() -> impl IntoResponse {
    let mut human = Person::new();
    human.id = 10086;
    human.name = "中国移动".to_string();
    human.email = "10086@139.com".to_string();

    (StatusCode::OK, human.to_string()).into_response()
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

#[derive(Debug, Serialize, Deserialize)]
pub struct Claims {
    #[serde(rename = "UserId")]
    user_id: String,
    exp: usize,
    nbf: usize,
    iat: usize,
}

async fn decode_token() -> String {
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiIweDMwMDAwMCIsImV4cCI6MTcyMjQyMDA3MywibmJmIjoxNzIxODE1MjczLCJpYXQiOjE3MjE4MTUyNzN9.hjp_n5Lix6_DdD4RwkSATxe1WpY0BsPnKa5mHhu3nk4";
    let data = decode::<Claims>(
        &token,
        &DecodingKey::from_secret("secret".as_ref()),
        &Validation::new(Algorithm::HS256),
    )
    .unwrap();

    println!("{:?}", data);

    data.claims.user_id
}

async fn use_lua() -> String {
    let lua = Lua::new();

    let map_table = lua.create_table().expect("create table failed");
    map_table.set(1, "one").expect("set table failed");
    map_table.set("two", 2).expect("set table failed");

    lua.globals()
        .set("map_table", map_table)
        .expect("set global failed");

    lua.load("for k,v in pairs(map_table) do print(k,v) end")
        .exec()
        .expect("load failed");

    String::from("OK")
}

async fn postgres() -> String {
    let (client, connection) = tokio_postgres::connect(
        "host=0.0.0.0 port=5432 user=homestead password=secret dbname=homestead",
        NoTls,
    )
    .await
    .expect("connect failed");

    tokio::spawn(async move {
        if let Err(e) = connection.await {
            eprintln!("connection error: {}", e);
        }
    });

    let rows = client
        .query("SELECT id, name, app FROM accounts", &[])
        .await
        .expect("query failed");

    let value: &str = rows[0].get(2);

    String::from(value)
}
