use std::error::Error;

use deadpool_redis::{Config, Pool, Runtime};

pub async fn get_rdb_pool(addr: String) -> Result<Pool, Box<dyn Error>> {
    let cfg = Config::from_url(addr);
    let pool = cfg.create_pool(Some(Runtime::Tokio1)).unwrap();

    Ok(pool)
}
