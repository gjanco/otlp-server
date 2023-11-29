const grpc = require("@grpc/grpc-js");
const LOGS_PROTO_PATH = "./logs_service.proto";
const METRICS_PROTO_PATH = "./metrics_service.proto";
const TRACES_PROTO_PATH = "./trace_service.proto";
const port = process.env.PORT || 4317;
var protoLoader = require("@grpc/proto-loader");

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};
var logsPackageDef = protoLoader.loadSync(LOGS_PROTO_PATH, options);
const logsProto = grpc.loadPackageDefinition(logsPackageDef);

var metricsPackageDef = protoLoader.loadSync(METRICS_PROTO_PATH, options);
const metricsProto = grpc.loadPackageDefinition(metricsPackageDef);

var tracesPackageDef = protoLoader.loadSync(TRACES_PROTO_PATH, options);
const tracesProto = grpc.loadPackageDefinition(tracesPackageDef);

const server = new grpc.Server();


server.addService(logsProto.opentelemetry.proto.collector.logs.v1.LogsService.service, {
  Export: (call, callback) => {
    let ret = {};
    console.log(JSON.stringify(call.request));
    callback(null, ret);
  },
});
server.addService(metricsProto.opentelemetry.proto.collector.metrics.v1.MetricsService.service, {
  Export: (call, callback) => {
    let ret = {};
    console.log(JSON.stringify(call.request));
    callback(null, ret);
  },
});
server.addService(tracesProto.opentelemetry.proto.collector.trace.v1.TraceService.service, {
  Export: (call, callback) => {
    let ret = {};
    console.log(JSON.stringify(call.request));
    callback(null, ret);
  },
});

server.bindAsync(
  `127.0.0.1:${port}`,
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    console.log(`Server running at http://127.0.0.1:${port}`);
    server.start();
  }
);