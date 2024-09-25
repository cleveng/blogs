use crate::configs::config::Database;

use deadpool_postgres::{Config, ManagerConfig, Pool, RecyclingMethod, Runtime};
use std::error::Error;
use tokio_postgres::NoTls;

pub async fn get_db_pool(config: &Database) -> Result<Pool, Box<dyn Error>> {
    let mut cfg = Config::new();
    cfg.user = Some(config.username.clone());
    cfg.password = Some(config.password.clone());
    cfg.host = Some(config.host.clone());
    cfg.port = Some(config.port);
    cfg.dbname = Some(config.db.clone());
    cfg.manager = Some(ManagerConfig {
        recycling_method: RecyclingMethod::Fast,
    });
    let pool = cfg.create_pool(Some(Runtime::Tokio1), NoTls).unwrap();
    Ok(pool)
}
