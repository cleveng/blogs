use chrono::Utc;

use jsonwebtoken::{encode, Algorithm, EncodingKey, Header};
use serde::{Deserialize, Serialize};
use std::fmt::Error;

/// graphql
use async_graphql::{Context, Object, Schema};
use async_graphql_axum::{GraphQLRequest, GraphQLResponse};
use axum::Extension;

pub async fn graphql_handler(
    schema: Extension<Schema<Query, Mutation, async_graphql::EmptySubscription>>,
    req: GraphQLRequest,
) -> GraphQLResponse {
    schema.execute(req.into_inner()).await.into()
}

pub fn schema() -> Schema<Query, Mutation, async_graphql::EmptySubscription> {
    Schema::build(Query, Mutation, async_graphql::EmptySubscription)
        .data("good".to_string())
        .finish()
}

pub struct Query;

#[Object]
impl Query {
    async fn hello(&self, ctx: &Context<'_>) -> Result<String, Error> {
        let value = ctx.data::<String>().unwrap();
        Result::Ok(value.to_string())
    }
}

pub struct Mutation;

#[Object]
impl Mutation {
    async fn signup(&self, username: String, password: String) -> Result<bool, Error> {
        println!("{}, {}", username, password);
        Result::Ok(true)
    }

    async fn login(&self, username: String, password: String) -> Result<String, Error> {
        let mut header = Header::new(Algorithm::HS512);
        header.kid = Some("blabla".to_owned());

        let now = Utc::now();

        let my_claims = Claims {
            user_id: username,
            exp: now.timestamp() as usize,
            nbf: 123456789,
            iat: 123456789,
        };

        let token = encode(
            &header,
            &my_claims,
            &EncodingKey::from_secret(password.as_ref()),
        )
        .unwrap();

        Result::Ok(token)
    }
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Claims {
    #[serde(rename = "UserId")]
    user_id: String,
    exp: usize,
    nbf: usize,
    iat: usize,
}
