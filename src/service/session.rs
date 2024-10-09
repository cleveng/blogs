use crate::model::user::UserModel;
use crate::AppState;
use deadpool_postgres::GenericClient;
use std::error::Error;
use tokio_postgres::Row;

pub async fn get_user_by_open_id(
    state: &AppState,
    open_id: String,
) -> Result<UserModel, Box<dyn Error + Send + Sync>> {
    let db = state.db_pool.get().await?;

    let sql = "SELECT users.* FROM sessions JOIN users ON sessions.user_id = users.id WHERE sessions.open_id = $1 AND sessions.active = true AND sessions.deleted_at IS NULL";
    let row: Row = match db.query_one(sql, &[&open_id]).await {
        Ok(row) => row,
        Err(err) => {
            return Err(Box::new(err));
        }
    };

    let user = UserModel {
        created_at: None,
        updated_at: None,
        deleted_at: None,
        email: row.get("email"),
        name: row.get("name"),
        profile_url: Some(row.get("profile_url")),
        status: row.get("status"),
        email_verified_at: None,
        is_admin: false,
        id: row.get("id"),
    };

    Ok(user)
}
