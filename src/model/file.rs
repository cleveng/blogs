use crate::model::base::BaseModel;
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct FileModel {
    pub base: BaseModel,
    pub file_url: Option<String>,
    pub use_id: i64,
}
