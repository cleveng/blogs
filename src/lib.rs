/// lib.rs
use actix_web::{web, App, HttpResponse, HttpServer, Responder};
use env_logger;
use log::info;

async fn root() -> impl Responder {
    HttpResponse::Ok().body("Hello, Actix-web!")
}

pub async fn run() -> std::io::Result<()> {
    // 初始化日志记录
    std::env::set_var("RUST_LOG", "info");
    env_logger::init();

    let address = "127.0.0.1:8080";
    info!("Starting server at {}", address);

    HttpServer::new(|| {
        App::new().route("/", web::get().to(root)) // 定义根路径的 GET 请求处理
    })
    .bind(address)?
    .run()
    .await
}
