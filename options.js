module.exports = {
  settings: {
    interval: "10000",
    retry: "3",
    retryTimeout: "1000",
    email: {
      login: "you@somewhere.com",
      password: "password",
      to: "you@somewhere.com",
      from : "you@somewhere.com",
      fromName : "Airasoul"
    },
    server: { port : 3000 }
  }
, resources: 
  [{
    name: "api for airasoul.net",
    type: "api",
    host: "http://airasoul.net",
    enabled : true
  },
  {
    name: "api for blog.airasoul.net",
    type: "api",
    host: "http://blog.airasoul.net",
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
    host: "localhost",
    port: 6379,
    enabled : true
  },
  {
    name: "local rabbitmq",
    type: "basicauth", 
    host: "http://127.0.0.1:15672/api/aliveness-test/%2F",
    username: "guest",
    password: "guest",
    enabled : true
  }]
}