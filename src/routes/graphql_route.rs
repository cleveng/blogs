use axum::{routing::post, Extension};

use crate::handlers::graphql_handler::{create_schema, graphql_handler};

pub fn graphql_route() -> axum::Router {
    axum::Router::new()
        .route("/graphql", post(graphql_handler))
        .layer(Extension(create_schema()))
}
