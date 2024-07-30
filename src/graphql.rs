use async_graphql::{Context, EmptyMutation, Object, Schema};
use async_graphql_axum::{GraphQLRequest, GraphQLResponse};
use axum::Extension;

pub fn create_schema() -> Schema<Query, EmptyMutation, async_graphql::EmptySubscription> {
    Schema::build(Query, EmptyMutation, async_graphql::EmptySubscription).finish()
}

pub async fn graphql_handler(
    schema: Extension<Schema<Query, EmptyMutation, async_graphql::EmptySubscription>>,
    req: GraphQLRequest,
) -> GraphQLResponse {
    schema.execute(req.into_inner()).await.into()
}

pub struct Query;

#[Object]
impl Query {
    async fn hello(&self, _ctx: &Context<'_>) -> &str {
        "Hello, World!"
    }
}
