use crate::model::account::AccountModel;
use crate::AppState;
use std::error::Error;

pub async fn get_account_by_app(
    state: &AppState,
    app: String,
) -> Result<AccountModel, Box<dyn Error>> {
    let db = state.db_pool.get().await?;

    let sql =
        "SELECT accounts.* FROM accounts WHERE accounts.app = $1 AND accounts.deleted_at IS NULL";
    let row = match db.query_one(sql, &[&app]).await {
        Ok(row) => row,
        Err(err) => {
            return Err(Box::new(err));
        }
    };

    let account = AccountModel {
        created_at: None,
        updated_at: None,
        deleted_at: None,
        name: row.get("name"),
        app,
        appid: row.get("appid"),
        id: row.get("id"),
        app_secret: Some(row.get("app_secret")),
    };

    Ok(account)
}
