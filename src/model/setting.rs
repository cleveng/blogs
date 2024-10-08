use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct SettingModel {
    pub id: i32,
    pub name: String,
    pub keywords: String,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}
