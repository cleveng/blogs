use crate::services;
use clap::builder::Str;

pub mod graphql_handler;
pub mod api_handler;

pub struct Handler {
    pub logger: Str,
    pub srv: services::Service,
}