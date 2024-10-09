use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct TagModel {
    pub id: i32,
    pub name: String,
    pub slug: String,
}
