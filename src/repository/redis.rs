/// redis

pub fn init_redis() -> redis::Connection {
    let client = redis::Client::open("redis://127.0.0.1/").expect("Failed to create Redis client");

    match client.get_connection() {
        Ok(conn) => conn,
        Err(err) => {
            eprintln!("Failed to connect to Redis: {}", err);
            std::process::exit(1);
        }
    }
}
