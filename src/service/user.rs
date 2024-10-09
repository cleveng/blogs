use std::error::Error;

use crate::model::{session::SessionModel, user::UserModel};
use crate::AppState;
use deadpool_postgres::Transaction;
use jsonwebtoken::{decode, encode, DecodingKey, EncodingKey, Header, Validation};
use serde::{Deserialize, Serialize};

pub async fn insert_user_and_session(
    state: &AppState,
    user: UserModel,
    session: SessionModel,
) -> Result<i32, Box<dyn Error + Send + Sync>> {
    let mut db = state.db_pool.get().await?;

    // 开启事务
    let tx: Transaction = db.transaction().await?;

    // 插入用户
    let user_sql = "INSERT INTO users (email, name, profile_url, status, email_verified_at, is_admin) VALUES ($1, $2, $3,$4, $5, $6) RETURNING id";
    let row: tokio_postgres::Row = tx
        .query_one(
            user_sql,
            &[
                &user.email,
                &user.name,
                &user.profile_url,
                &user.status,
                &user.email_verified_at.map(|date| date.naive_utc()),
                &user.is_admin,
            ],
        )
        .await?;

    let session_user_id: i32 = row.get("id");

    println!("session_user_id: {session_user_id}");

    let session_sql = "INSERT INTO sessions (user_id, account_id, open_id, union_id, active, subscribed) VALUES ($1, $2, $3, $4, $5, $6)";
    let session_new = tx
        .execute(
            session_sql,
            &[
                &session_user_id,
                &session.account_id,
                &session.open_id,
                &session.union_id,
                &session.active,
                &session.subscribed,
            ],
        )
        .await;

    if let Err(err) = session_new {
        tx.rollback().await?;
        return Err(err.into());
    }

    tx.commit().await?;

    Ok(session_user_id)
}

#[derive(Debug, Serialize, Deserialize)]
struct Claims {
    sub: String,
    company: String,
    exp: usize,
}
pub async fn generate_token(
    state: &AppState,
    user_id: i32,
) -> Result<String, Box<dyn Error + Send + Sync>> {
    let secret = state.jwt.get_secret();
    let claims = Claims {
        sub: user_id.to_string(),
        company: "unknown".to_string(),
        exp: 3600 * 24 * 7,
    };

    let token = encode(
        &Header::default(),
        &claims,
        &EncodingKey::from_secret(secret.as_ref()),
    )?;

    Ok(token)
}

#[warn(dead_code)]
pub async fn parse_token(state: &AppState, token: String) -> Result<i32, Box<dyn Error>> {
    let secret = state.jwt.get_secret();
    let token = decode::<Claims>(
        &token,
        &DecodingKey::from_secret(secret.as_ref()),
        &Validation::default(),
    )?;

    let sub = token.claims.sub.parse::<i32>()?;

    Ok(sub)
}
