use std::error::Error;

use deadpool_redis::{Config, Pool, Runtime};

pub async fn get_rdb_pool() -> Result<Pool, Box<dyn Error>> {
    let cfg = Config::from_url("redis://0.0.0.0/");
    let pool = cfg.create_pool(Some(Runtime::Tokio1)).unwrap();

    Ok(pool)
}
