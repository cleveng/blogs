use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct UserModel {
    pub id: i32,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
    pub deleted_at: Option<DateTime<Utc>>,
    pub email: String,
    pub name: String,
    pub profile_url: Option<String>,
    pub status: bool,
    pub email_verified_at: Option<DateTime<Utc>>,
    pub is_admin: bool,
}
