extern crate log;
extern crate pretty_env_logger;

use axum::Router;
use log::info;
use std::fs;
use std::path::Path;

mod conf;
mod handlers;
mod models;
mod repository;
mod routes;
mod services;
mod utils;

use crate::conf::conf::Bootstrap;

impl Bootstrap {}

fn init() -> Bootstrap {
    let path = Path::new("src/configs/config.toml");
    let content = fs::read_to_string(path).unwrap();
    toml::from_str(&content).unwrap()
}

pub async fn run() {
    pretty_env_logger::init();

    // 解析服务器ip和端口号
    let config: Bootstrap = init();
    let addr = config.get_server_url();

    let app = Router::new();
    let app = app.clone().merge(routes::api_route::api_route());
    let app = app.clone().merge(routes::graphql_route::graphql_route());

    let listener = tokio::net::TcpListener::bind(&addr).await.unwrap();

    info!("the server is running,  url: https://{} ", addr);
    axum::serve(listener, app).await.unwrap();
}
