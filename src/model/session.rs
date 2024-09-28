use crate::model::base::BaseModel;
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct SessionModel {
    pub base: BaseModel,
    pub user_id: i64,
    pub account_id: i64,
    pub open_id: String,
    pub union_id: Option<String>,
    pub active: bool,
    pub subscribed: bool,
}
