use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct ArticleTagModel {
    pub article_id: i32,
    pub tag_id: i32,
}
