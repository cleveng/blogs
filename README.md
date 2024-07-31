#### run command

```bash
RUST_LOG=trace cargo run
```

#[macro_use] 导入了 log crate 中的所有宏

```
curl -i -X POST \
     -H "Content-Type: application/json" \
     -d '{"query": "{ hello }"}' \
     http://127.0.0.1:8090/graphql

```

### install protobuf
cargo install protobuf-codegen

protoc-gen-rust --version

protoc --rust_out=./ person.proto
