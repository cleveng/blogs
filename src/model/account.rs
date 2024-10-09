use async_graphql::{InputObject, SimpleObject};
use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct AccountModel {
    pub id: i32,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
    pub deleted_at: Option<DateTime<Utc>>,
    pub name: String,
    pub app: String,
    pub appid: String,
    pub app_secret: Option<String>,
}

#[derive(Debug, InputObject)]
pub struct AccountInput {
    pub name: String,
    pub app: String,
    pub appid: String,
    pub app_secret: Option<String>,
}

#[derive(Debug, SimpleObject)]
pub struct AccountObject {
    pub name: String,
    pub app: String,
    pub appid: String,
    pub app_secret: Option<String>,
}
