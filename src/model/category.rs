use crate::model::base::BaseModel;
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct CategoryModel {
    pub base: BaseModel,
    pub title: String,
    pub keywords: String,
    pub description: String,
    pub thumb: Option<String>,
    pub parent_id: Option<i64>,
    pub is_visible: bool,
    pub sort_idx: i64,
}
