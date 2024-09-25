/// lib.rs
use deadpool_postgres::{Config, ManagerConfig, Pool, RecyclingMethod, Runtime};
use std::error::Error;
use tokio_postgres::NoTls;

/// 创建数据库连接池
pub async fn get_db_pool() -> Result<Pool, Box<dyn Error>> {
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
