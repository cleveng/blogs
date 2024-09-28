use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct TagModel {
    pub id: i64,
    pub name: String,
    pub slug: String,
}
