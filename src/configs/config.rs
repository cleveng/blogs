use log::warn;
use serde::Deserialize;
use std::error::Error;
use std::fs;
use std::path::Path;

#[derive(Deserialize)]
pub struct Bootstrap {
    pub server: Server,
    pub database: Database,
    pub redis: Redis,
}

#[derive(Deserialize)]
pub struct Server {
    pub host: String,
    pub port: u16,
}

impl Bootstrap {
    pub fn get_server_url(&self) -> String {
        format!("{}:{}", self.server.host, self.server.port)
    }
}

#[derive(Deserialize)]
pub struct Database {
    pub host: String,
    pub port: u16,
    pub username: String,
    pub password: String,
    pub db: String,
}

#[derive(Deserialize)]
pub struct Redis {
    pub host: String,
    pub port: u16,
    pub password: String,
    pub db: u16,
}

#[derive(Deserialize)]
pub struct Jwt {
    #[warn(dead_code)]
    pub secret: String,
}

impl Redis {
    pub fn get_url(&self) -> String {
        format!(
            "redis://:{}@{}:{}/{}",
            self.password, self.host, self.port, self.db
        )
    }
}

impl Jwt {
    #[warn(dead_code)]
    pub fn get_secret(&self) -> String {
        self.secret.clone()
    }
}

pub fn init_config(path: &str) -> Result<Bootstrap, Box<dyn Error>> {
    let path = Path::new(path);
    if !path.exists() {
        warn!("Config file not found");
        return Err("Config file not found".into());
    }

    let content = match fs::read_to_string(path) {
        Ok(content) => content,
        Err(_) => {
            warn!("Failed to read config file");
            return Err("Failed to read config file".into());
        }
    };

    let result = toml::from_str(&content).expect("Failed to parse config file");
    Ok(result)
}