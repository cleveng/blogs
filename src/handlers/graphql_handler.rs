/// graphql
use async_graphql::{Context, EmptyMutation, Object, Schema};
use async_graphql_axum::{GraphQLRequest, GraphQLResponse};
use axum::Extension;
use tokio_postgres::NoTls;


pub async fn graphql_handler(
    schema: Extension<Schema<Query, EmptyMutation, async_graphql::EmptySubscription>>,
    req: GraphQLRequest,
) -> GraphQLResponse {
    schema.execute(req.into_inner()).await.into()
}

pub fn create_schema() -> Schema<Query, EmptyMutation, async_graphql::EmptySubscription> {
    Schema::build(Query, EmptyMutation, async_graphql::EmptySubscription).finish()
}

pub struct Query;

#[Object]
impl Query {
    async fn hello(&self, _ctx: &Context<'_>) -> &str {
        let mut cfg = deadpool_postgres::Config::new();
        cfg.host = Some("0.0.0.0".to_string());
        cfg.dbname = Some("oa".to_string());
        cfg.user = Some("homestead".to_string());
        cfg.password = Some("secret".to_string());

        cfg.manager = Some(deadpool_postgres::ManagerConfig {
            recycling_method: deadpool_postgres::RecyclingMethod::Fast,
        });

        let pool = cfg
            .create_pool(Some(deadpool_postgres::Runtime::Tokio1), NoTls)?;

        let client = pool.get().await.expect("get client failed");

        let row = client
            .query_one("SELECT id, name, app FROM accounts limit 1", &[])
            .await
            .expect("query failed");

        let name: String = row.get(1);
        println!("name: {}", name);

        "hello world"
    }
}
