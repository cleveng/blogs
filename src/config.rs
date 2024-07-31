use serde::Deserialize;
use std::fs;

#[derive(Deserialize)]
pub struct Config {
    pub server: ServerConfig,
    pub redis: RedisConfig,
}

#[derive(Deserialize)]
pub struct ServerConfig {
    pub host: String,
    pub port: u16,
}

#[derive(Deserialize)]
pub struct RedisConfig {
    pub host: String,
    pub port: u16,
    pub password: String,
    pub database: u16,
}

/**
 * 读取配置文件
 */
pub fn init_config() -> Config {
    let content = fs::read_to_string("configs/config.toml").expect("Failed to read config file");
    let config: Config = toml::from_str(&content).expect("Failed to parse config file");
    config
}

impl Config {
    pub fn get_server_addr(&self) -> String {
        format!("{}:{}", self.server.host, self.server.port)
    }

    pub fn get_redis_client(&self) -> Result<redis::Connection, redis::RedisError> {
        let params = format!(
            "redis://:{}@{}:{}/{}",
            self.redis.password, self.redis.host, self.redis.port, self.redis.database
        );
        let client = redis::Client::open(params)?;
        client.get_connection()
    }
}
