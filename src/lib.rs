/// lib.rs
use actix_web::{middleware, web, App, HttpResponse, HttpServer};
use deadpool_postgres::{Config, ManagerConfig, Pool, RecyclingMethod, Runtime};
use serde::{Deserialize, Serialize};
use std::error::Error;
use tokio_postgres::NoTls;

#[derive(Clone)]
struct AppState {
    pool: Pool,
}

/// 创建数据库连接池
async fn get_db_pool() -> Result<Pool, Box<dyn Error>> {
    let mut cfg = Config::new();
    cfg.user = Some("homestead".to_string());
    cfg.password = Some("secret".to_string());
    cfg.host = Some("127.0.0.1".to_string());
    cfg.port = Some(5432);
    cfg.dbname = Some("oa".to_string());
    cfg.manager = Some(ManagerConfig {
        recycling_method: RecyclingMethod::Fast,
    });
    let pool = cfg.create_pool(Some(Runtime::Tokio1), NoTls).unwrap();
    Ok(pool)
}

#[derive(Debug, Serialize, Deserialize)]
struct Account {
    user_id: i64,
    role_id: i64,
}

async fn root(state: web::Data<AppState>) -> HttpResponse {
    let client = state.pool.get().await.unwrap();
    let row = client
        .query_one("SELECT * from role_user", &[])
        .await
        .unwrap();

    let account = Account {
        user_id: row.get(0),
        role_id: row.get(1),
    };

    HttpResponse::Ok().json(account)
}

pub async fn run() -> std::io::Result<()> {
    let address = "127.0.0.1:8080";

    // 创建数据库连接池
    let pool = get_db_pool().await;
    if pool.is_err() {
        panic!("Failed to create pool: {:?}", pool.unwrap_err());
    }

    let pool = pool.unwrap();
    let state: AppState = AppState { pool: pool.clone() };

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
