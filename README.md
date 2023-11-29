# Simple OTLP Node Server
This is a simple gRPC based Node server that will allow debugging of OTLP Messages

By default, it runs on port 5000, but can be overridden by setting the environment variable `PORT`

It will Stringify and print to console each call made to it for metrics, traces, and logs.  It will only print the `request` portion of the call.  If you want to see more, please run this as debug.

You can add this to your OTEL config by using the following config:

```
  otlp/local:
    endpoint: localhost:5000 # or host.docker.internal:5000 if running in docker
    tls:
      insecure: true
```

Credit:
https://grpc.io/docs/languages/node/basics/