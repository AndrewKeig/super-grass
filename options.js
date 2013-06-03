module.exports = {
  settings: {
    interval: "10000",
    retry: "5",
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
  }]
}