use crate::model::base::BaseModel;
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct ArticleModel {
    pub base: BaseModel,
    pub title: String,
    pub keywords: String,
    pub description: String,
    pub content: String,
    pub user_id: i64,
    pub category_id: i64,
    pub is_visible: bool,
    pub slug: String,
}
