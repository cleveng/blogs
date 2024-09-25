/// lib.rs
use actix_web::{middleware, web, App, HttpResponse, HttpServer};
use deadpool_postgres::Pool as PgPool;
use deadpool_redis::Pool as RedisPool;
use serde::{Deserialize, Serialize};

mod repository;
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

#[derive(Debug, Serialize, Deserialize)]
struct Account {
    user_id: i64,
    role_id: i64,
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

    let account = Account {
        user_id: row.get(0),
        role_id: row.get(1),
    };

    HttpResponse::Ok().json(account)
}

pub async fn run() -> std::io::Result<()> {
    let address = "127.0.0.1:8080";

    // 创建数据库连接池
    let db_pool = db::get_db_pool().await;
    if db_pool.is_err() {
        panic!("Failed to create pool: {:?}", db_pool.unwrap_err());
    }

    let rdb_pool = rdb::get_rdb_pool().await;
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
