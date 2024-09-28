use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct ArticleTagModel {
    pub article_id: i64,
    pub tag_id: i64,
}
