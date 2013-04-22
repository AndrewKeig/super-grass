module.exports = {
  settings: {
    interval: "5000",
    retry: "3",
    retryTimeout: "1000"
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
    host: "localhost",
    port: 5672,
    login: "guest",
    password: "guest",
    vhost: '/',
    enabled : true,
    type: "rabbit"
  }]
}
