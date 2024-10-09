use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct CategoryModel {
    pub id: i32,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
    pub deleted_at: Option<DateTime<Utc>>,
    pub title: String,
    pub keywords: String,
    pub description: String,
    pub thumb: Option<String>,
    pub parent_id: Option<i64>,
    pub is_visible: bool,
    pub sort_idx: i32,
}
