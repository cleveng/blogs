use serde::Deserialize;

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
