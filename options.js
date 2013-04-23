module.exports = {
  settings: {
    interval: "10000",
    retry: "3",
    retryTimeout: "500"
  }
, resources: 
  [{
    name: "api for airasoul.net",
    type: "api",
    host: "http://airasoul.net",
    enabled : true
  },
  {
    name: "api for 127",
    type: "api",
    host: "http://127.0.0.1:2000",
    enabled : true
  },
  { 
    name: "local mongo",
    type: "mongo",
    host: "localhost",
    database: "staging",
    port: 27017,
    enabled : true
  },
  {
    name: "redis local",
    type: "redis",
    host: "http://127.0.0.1",
    port: 6379,
    enabled : true
  },
  {
    name: "local rabbitmq",
    host: "http://127.0.0.1:15672/api/overview",
    username: "guest",
    password: "guest",
    enabled : true,
    type: "rabbit"
  }]
}
