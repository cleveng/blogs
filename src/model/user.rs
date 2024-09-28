use crate::model::base::BaseModel;
use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct UserModel {
    pub base: BaseModel,
    pub email: String,
    pub name: String,
    pub profile_url: Option<String>,
    pub status: bool,
    pub email_verified_at: Option<DateTime<Utc>>,
    pub is_admin: bool,
}
