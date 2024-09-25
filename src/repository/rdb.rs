use crate::configs::config::Redis;
use std::error::Error;

use deadpool_redis::{Config, Pool, Runtime};

pub async fn get_rdb_pool(config: &Redis) -> Result<Pool, Box<dyn Error>> {
    let cfg = Config::from_url(config.get_url().as_str());
    let pool = cfg.create_pool(Some(Runtime::Tokio1)).unwrap();

    Ok(pool)
}
