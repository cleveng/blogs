/// lib.rs
use actix_web::{middleware, web, App, HttpResponse, HttpServer};
use deadpool_postgres::Pool as PgPool;
use deadpool_redis::Pool as RedisPool;
use log::warn;
use serde::Serialize;
use std::error::Error;
use std::fs;
use std::path::Path;

mod configs;
mod model;
mod repository;

use crate::configs::config::Bootstrap;
use crate::model::account::AccountModel;
use crate::repository::{db, rdb};

#[derive(Clone)]
struct AppState {
    #[warn(dead_code)]
    db_pool: PgPool,
    #[warn(dead_code)]
    rdb_pool: RedisPool,
}

#[derive(Serialize)]
struct ErrorResponse {
    error: String,
}

fn init_config() -> Result<Bootstrap, Box<dyn Error>> {
    let path = Path::new("src/configs/config.toml");
    if !path.exists() {
        warn!("Config file not found");
        return Err("Config file not found".into());
    }

    let content = match fs::read_to_string(path) {
        Ok(content) => content,
        Err(_) => {
            return Err("Failed to read config file".into());
        }
    };

    let result = toml::from_str(&content).expect("Failed to parse config file");
    Ok(result)
}

async fn root(state: web::Data<AppState>) -> HttpResponse {
    let db = match state.db_pool.get().await {
        Ok(pool) => pool,
        Err(_) => {
            return HttpResponse::BadRequest().json(ErrorResponse {
                error: "Failed to query the database".to_string(),
            });
        }
    };

    let row = match db.query_one("SELECT * from role_user", &[]).await {
        Ok(row) => row,
        Err(_) => {
            return HttpResponse::BadRequest().json(ErrorResponse {
                error: "Failed to query the database".to_string(),
            })
        }
    };

    let account = AccountModel {
        user_id: row.get(0),
        role_id: row.get(1),
    };

    HttpResponse::Ok().json(account)
}

pub async fn run() -> std::io::Result<()> {
    let conf = match init_config() {
        Ok(conf) => conf,
        Err(e) => {
            panic!("Failed to load config: {:?}", e);
        }
    };

    let address = conf.get_server_url();

    // 创建数据库连接池
    let db_pool = db::get_db_pool(&conf.database).await;
    if db_pool.is_err() {
        panic!("Failed to create pool: {:?}", db_pool.unwrap_err());
    }

    let rdb_pool = rdb::get_rdb_pool(&conf.redis).await;
    if rdb_pool.is_err() {
        panic!("Failed to create pool: {:?}", rdb_pool.unwrap_err());
    }

    let state: AppState = AppState {
        db_pool: db_pool.unwrap().clone(),
        rdb_pool: rdb_pool.unwrap().clone(),
    };

    HttpServer::new(move || {
        App::new()
            .wrap(middleware::Logger::default())
            .app_data(web::Data::new(state.clone()))
            .route("/", web::get().to(root))
    })
    .bind(address)?
    .run()
    .await
}
