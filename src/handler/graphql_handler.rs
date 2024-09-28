use crate::AppState;
use actix_web::{web::Data, HttpRequest, HttpResponse};
use async_graphql::http::{playground_source, GraphQLPlaygroundConfig};
use async_graphql::{Context, EmptySubscription, Error, Object, Schema};
use async_graphql_actix_web::{GraphQLRequest, GraphQLResponse};

pub struct Query;

#[Object(extends)]
impl Query {
    async fn hello(&self, _ctx: &Context<'_>, payload: String) -> Result<String, Error> {
        Ok(payload.to_string())
    }
}

pub struct Mutation;

#[Object]
impl Mutation {
    async fn signup(&self, _ctx: &Context<'_>, payload: String) -> Result<String, Error> {
        Ok(payload.to_string())
    }

    async fn login(&self, _ctx: &Context<'_>, payload: String) -> Result<String, Error> {
        Ok(payload.to_string())
    }
}

pub type ProjectSchema = async_graphql::Schema<Query, Mutation, EmptySubscription>;

pub fn schema(state: AppState) -> Schema<Query, Mutation, EmptySubscription> {
    Schema::build(Query, Mutation, EmptySubscription)
        .data(state.clone())
        .finish()
}

pub async fn graphql_entry(
    schema: Data<ProjectSchema>,
    req: HttpRequest,
    gql_request: GraphQLRequest,
) -> GraphQLResponse {
    // Extract the `appid` header
    let request = gql_request.into_inner();

    if let Some(appid) = req.headers().get("appid") {
        println!("{}", appid.to_str().unwrap().to_string());
    }

    schema.execute(request).await.into()
}

pub async fn graphql_playground() -> HttpResponse {
    HttpResponse::Ok()
        .content_type("text/html; charset=utf-8")
        .body(playground_source(GraphQLPlaygroundConfig::new("/")))
}
