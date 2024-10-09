/// lib.rs
use actix_cors::Cors;
use actix_web::{
    guard,
    web::{self, Data},
    App, HttpServer,
};
use deadpool_postgres::Pool as PgPool;
use deadpool_redis::Pool as RedisPool;
use log::warn;
use serde::Serialize;
use std::env;
use std::process;

mod configs;
mod handler;
mod middleware;
mod model;
mod repository;
mod schemas;
mod service;

use crate::configs::config::{Bootstrap, Google, Jwt};
use crate::handler::web_handler::not_found;
use crate::repository::{db, rdb};
use handler::graphql_handler::{graphql_entry, graphql_playground, schema};
use handler::web_handler::root;
use middleware::appid::Appid;

#[derive(Clone)]
pub struct AppState {
    #[warn(dead_code)]
    db_pool: PgPool,
    #[warn(dead_code)]
    rdb_pool: RedisPool,
    #[warn(dead_code)]
    google: Google,
    #[warn(dead_code)]
    jwt: Jwt,
}

#[derive(Serialize)]
struct ErrorResponse {
    error: String,
}

#[derive(Serialize)]
struct SuccessResponse<T> {
    error: String,
    data: T,
    code: i64,
}

impl<T> SuccessResponse<T> {
    pub fn new(data: T) -> Self {
        SuccessResponse {
            error: "".to_string(),
            data,
            code: 200,
        }
    }
}

pub async fn run() -> std::io::Result<()> {
    let args: Vec<String> = env::args().collect();
    let cfg = Bootstrap::new(&args).unwrap_or_else(|err| {
        warn!("Failed to load .env, error: {err}");
        process::exit(1);
    });

    let address = cfg.get_server_url();

    // 创建数据库连接池
    let db_pool = match db::get_db_pool(cfg.get_database()).await {
        Ok(pool) => pool,
        Err(e) => {
            panic!("Failed to create database pool: {:?}", e);
        }
    };

    // 创建Redis连接池
    let rdb_pool = match rdb::get_rdb_pool(cfg.get_redis_url()).await {
        Ok(pool) => pool,
        Err(e) => {
            panic!("Failed to create redis pool: {:?}", e);
        }
    };

    let state: AppState = AppState {
        db_pool: db_pool.clone(),
        rdb_pool: rdb_pool.clone(),
        google: cfg.get_google().clone(),
        jwt: cfg.get_jwt().clone(),
    };

    HttpServer::new(move || {
        // 允许跨域
        let cors = Cors::default()
            .allow_any_origin()
            .allow_any_method()
            .allow_any_header()
            .max_age(3600);

        // root route
        let home = web::resource("/")
            .app_data(Data::new(state.clone()))
            .route(web::get().to(root));

        let auth = web::resource("/auth/login")
            .app_data(Data::new(state.clone()))
            .route(web::get().to(handler::web_handler::login));

        // graphql route
        let graphiql = web::resource("/graphql")
            .wrap(Appid)
            .app_data(Data::new(schema(state.clone())))
            .route(if cfg!(debug_assertions) {
                web::get().to(graphql_playground)
            } else {
                web::get().to(not_found)
            })
            .route(
                web::post()
                    .guard(guard::Header("content-type", "application/json"))
                    .to(graphql_entry),
            );

        App::new()
            .wrap(cors)
            .wrap(actix_web::middleware::Logger::default())
            .service(home)
            .service(graphiql)
            .service(auth)
            .default_service(web::route().to(not_found))
    })
    .bind(address)?
    .run()
    .await
}
