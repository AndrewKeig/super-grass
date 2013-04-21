module.exports = {
  settings: {
    name: "testing my application",
    interval: "5000",
    retry: "3",
    retryTimeout: "1000"
  }
, resources: 
  [{
    type: "api",
    host: "http://airasoul.net",
    enabled : true
  },
  {
    type: "api",
    host: "http://127.0.0.1:2000",
    enabled : true
  },
  { host: "localhost"
    , port: 5672
    , login: "guest"
    , password: "guest"
    , vhost: '/'
    , enabled : true
    , type: "rabbit"
  }]
}
