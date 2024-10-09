use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct ArticleModel {
    pub id: i32,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
    pub deleted_at: Option<DateTime<Utc>>,
    pub title: String,
    pub keywords: String,
    pub description: String,
    pub content: String,
    pub user_id: i32,
    pub category_id: i32,
    pub is_visible: bool,
    pub slug: String,
}
