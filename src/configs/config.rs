use dotenvy::{EnvLoader, EnvSequence};
use log::warn;
use serde::Deserialize;

#[derive(Deserialize)]
pub struct Bootstrap {
    pub server: Server,
    pub database: Database,
    pub redis: Redis,
    pub google: Google,
}

#[derive(Deserialize)]
pub struct Server {
    pub addr: String,
}

impl Bootstrap {
    pub fn new(value: &Vec<String>) -> Result<Bootstrap, String> {
        if value.len() != 2 {
            return Err("Must pass 1 arguments, eg: cargo run -- .env".to_string());
        }

        let loader = EnvLoader::with_path(value[1].clone())
            .sequence(EnvSequence::InputOnly)
            .load();

        if loader.is_err() {
            return Err("Failed to load .env".to_string());
        }

        let env_vars = loader.unwrap();
        Ok(Bootstrap {
            server: Server {
                addr: env_vars.get("SERVER_ADDR").unwrap().to_string(),
            },
            database: Database {
                host: env_vars.get("DB_HOST").unwrap().to_string(),
                port: env_vars.get("DB_PORT").unwrap().parse::<u16>().unwrap(),
                db: env_vars.get("DB_NAME").unwrap().to_string(),
                username: env_vars.get("DB_USER").unwrap().to_string(),
                password: env_vars.get("DB_PASSWORD").unwrap().to_string(),
            },
            redis: Redis {
                addr: env_vars.get("REDIS_URL").unwrap().to_string(),
            },
            google: Google {
                client_id: env_vars.get("GOOGLE_CLIENT_ID").unwrap().to_string(),
                client_secret: env_vars.get("GOOGLE_CLIENT_SECRET").unwrap().to_string(),
                callback_url: env_vars.get("GOOGLE_CALLBACK_URL").unwrap().to_string(),
            },
        })
    }
    pub fn get_server_url(&self) -> String {
        self.server.addr.clone()
    }
    pub fn get_redis_url(&self) -> String {
        self.redis.addr.clone()
    }
    pub fn get_database(&self) -> &Database {
        &self.database
    }
    pub fn get_google(&self) -> &Google {
        &self.google
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
    pub addr: String,
}

#[derive(Deserialize)]
pub struct Jwt {
    #[warn(dead_code)]
    pub secret: String,
}

#[derive(Deserialize, Clone)]
pub struct Google {
    pub client_id: String,
    pub client_secret: String,
    pub callback_url: String,
}

impl Jwt {
    #[warn(dead_code)]
    pub fn get_secret(&self) -> String {
        self.secret.clone()
    }
}

impl Google {
    pub fn get_client_id(&self) -> String {
        self.client_id.clone()
    }

    pub fn get_client_secret(&self) -> String {
        self.client_secret.clone()
    }
}
