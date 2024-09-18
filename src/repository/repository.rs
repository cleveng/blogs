use tokio_postgres::NoTls;

use crate::conf::conf::{Bootstrap, Database, Redis};
use std::error::Error;
use std::string::String as Str;

pub struct Repository {
    pub pool: deadpool_postgres::Pool,
    pub rdb: redis::Client,
    pub logger: Str,
}

pub fn init_repository(config: Bootstrap) -> Result<Repository, Box<dyn Error>> {
    let pool = init_db(config.database);
    let rdb = init_redis(config.redis);

    Ok(Repository {
        pool,
        rdb,
        logger: String::from("test"),
    })
}

fn init_db(config: Database) -> deadpool_postgres::Pool {
    let mut cfg = deadpool_postgres::Config::new();
    cfg.host = Some(config.host.to_string());
    cfg.dbname = Some(config.db.to_string());
    cfg.user = Some(config.username.to_string());
    cfg.password = Some(config.password.to_string());
    cfg.port = Some(config.port);

    cfg.manager = Some(deadpool_postgres::ManagerConfig {
        recycling_method: deadpool_postgres::RecyclingMethod::Fast,
    });

    cfg.create_pool(Some(deadpool_postgres::Runtime::Tokio1), NoTls)
        .unwrap()
}

fn init_redis(config: Redis) -> redis::Client {
    redis::Client::open(format!("redis://{}/", config.host)).unwrap()
}

impl Repository {
    pub async fn get_db(&self) -> Result<deadpool_postgres::Client, Box<dyn Error>> {
        self.pool.get().await.map_err(|e| e.into())
    }

    pub fn get_rdb(&self) -> redis::Connection {
        self.rdb.get_connection().unwrap()
    }
}
