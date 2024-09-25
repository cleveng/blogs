use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct AccountModel {
    pub user_id: i64,
    pub role_id: i64,
}
