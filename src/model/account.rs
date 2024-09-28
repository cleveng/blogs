use crate::model::base::BaseModel;
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct AccountModel {
    pub base: BaseModel,
    pub name: String,
    pub app: String,
    pub app_id: String,
    pub app_secret: Option<String>,
}
