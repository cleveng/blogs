use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct SessionModel {
    pub id: i32,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
    pub deleted_at: Option<DateTime<Utc>>,
    pub user_id: i32,
    pub account_id: i32,
    pub open_id: String,
    pub union_id: Option<String>,
    pub active: bool,
    pub subscribed: bool,
}
