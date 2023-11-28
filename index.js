const grpc = require("@grpc/grpc-js");
const PROTO_PATH = "./logs_service.proto";
var protoLoader = require("@grpc/proto-loader");

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};
var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const newsProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();


server.addService(newsProto.opentelemetry.proto.collector.logs.v1.LogsService.service, {
  Export: (call, callback) => {
    let ret = {};
    callback(null, ret);
  },
});

server.bindAsync(
  "127.0.0.1:4317",
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    console.log("Server running at http://127.0.0.1:4317");
    server.start();
  }
);