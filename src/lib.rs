/// lib.rs
use actix_web::{
    guard,
    web::{self, Data},
    App, HttpServer,
};
use deadpool_postgres::Pool as PgPool;
use deadpool_redis::Pool as RedisPool;
use log::warn;
use serde::Serialize;

mod configs;
mod handler;
mod middleware;
mod model;
mod repository;
mod schemas;

use crate::configs::config::init_config;
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

pub async fn run() -> std::io::Result<()> {
    let conf = init_config("src/configs/config.toml").unwrap();
    let address = conf.get_server_url();

    // 创建数据库连接池
    let db_pool = match db::get_db_pool(&conf.database).await {
        Ok(pool) => pool,
        Err(e) => {
            panic!("Failed to create database pool: {:?}", e);
        }
    };

    // 创建Redis连接池
    let rdb_pool = match rdb::get_rdb_pool(&conf.redis).await {
        Ok(pool) => pool,
        Err(e) => {
            panic!("Failed to create redis pool: {:?}", e);
        }
    };

    let state: AppState = AppState {
        db_pool: db_pool.clone(),
        rdb_pool: rdb_pool.clone(),
    };

    HttpServer::new(move || {
        // root route
        let home = web::resource("/")
            .app_data(Data::new(state.clone()))
            .route(web::get().to(root));

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
            .wrap(actix_web::middleware::Logger::default())
            .service(home)
            .service(graphiql)
            .default_service(web::route().to(not_found))
    })
    .bind(address)?
    .run()
    .await
}
