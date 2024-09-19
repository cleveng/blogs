use axum::{routing::post, Extension};

use crate::handlers::graphql_handler::{graphql_handler, schema};

pub fn graphql_route() -> axum::Router {
    axum::Router::new()
        .route("/graphql", post(graphql_handler))
        .layer(Extension(schema()))
}
