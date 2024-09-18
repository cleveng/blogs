use axum::{routing::get, Router};

use crate::handlers::api_handler::{not_found, root};

pub fn api_route() -> axum::Router {
    let app = Router::new().route("/", get(root));
    let app = app.fallback(not_found);
    app
}
