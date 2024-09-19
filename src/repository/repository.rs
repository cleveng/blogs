use slog::{o, Drain, Logger};
use slog_async;
use slog_term;
use tokio_postgres::NoTls;

use crate::conf::conf::{Bootstrap, Database, Redis};
use std::error::Error;

#[derive(Debug)]
pub struct Repository {
    pub pool: deadpool_postgres::Pool,
    pub rdb: redis::Client,
    pub logger: Logger,
}

pub fn init_repository(config: Bootstrap) -> Result<Repository, Box<dyn Error>> {
    let pool = init_db(config.database);
    let rdb = init_redis(config.redis);

    let decorator = slog_term::TermDecorator::new().build();
    let drain = slog_term::FullFormat::new(decorator).build().fuse();
    let drain = slog_async::Async::new(drain).build().fuse();

    // 创建 Logger
    let logger = Logger::root(drain, o!("version" => "0.1"));

    Ok(Repository { pool, rdb, logger })
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
