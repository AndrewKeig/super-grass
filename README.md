.


```
  ___ _   _ _ __   ___ _ __    __ _ _ __ __ _ ___ ___ 
 / __| | | | '_ \ / _ \ '__|  / _` | '__/ _` / __/ __|
 \__ \ |_| | |_) |  __/ |    | (_| | | | (_| \__ \__ \
 |___/\__,_| .__/ \___|_|     \__, |_|  \__,_|___/___/
           | |                 __/ |                  
           |_|                |___/                   

```

super grass is a node.js monitoring tool supporting web apis, redis, mongodb and rabbitmq.

This tool allows you to define various resources to be monitored for a heatbeat; at a configurable interval.  

A report is generated at these intervals and an event is fired; which you can hook into allowing you to 
analyse and then perform your preferd form of notificaion and/or logging.


## options


In order to use super-grass; simply create an options object with the following properties.

```
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
    host: "http://127.0.0.1",
    port: 6379,
    enabled : true
  },
  {
    name: "local rabbitmq",
    type: "rabbit",
    host: "http://127.0.0.1:15672/api/overview",
    username: "guest",
    password: "guest",
    enabled : true
  }]
}


```

This options settings contains:

* ```interval``` - the interval between notifications
* ```retry``` - the number of retries for a resource
* ```retryTimeout``` - a timeout value between retries
* ```resources``` - a list of resources to be monitored

 
## supported types

We currently support the ability to monitor:

A http get request

```
{
  name: "api for airasoul.net",
  type: "api",
  host: "http://airasoul.net",
  enabled : true
 }
```

A rabbitmq server 


```
{ 
  name: "local rabbitmq",
  host: "http://127.0.0.1:15672/api/overview",
  username: "guest",
  password: "guest",
  enabled : true,
  type: "rabbit"
}
```

A mongodb database

```
{ 
  name: "local mongo",
  type: "mongo",
  host: "localhost",
  database: "staging",
  port: 27017
}
```

A redis store

```
{
  name: "redis local",
  type: "redis",
  host: "http://127.0.0.1",
  port: 6379,
  enabled : true
}
```

  
## example

The code is simple; you create a ```super-grass``` object; start watching and wait for a response; the ```snitch``` event to fire.

```
var SuperGrass = require('super-grass')
    , options = require('./options');

var superGrass = new SuperGrass(options);
superGrass.watch();

superGrass.on('snitch', function(report) {
  console.log("RESULTS", report);
  //mail here
  //log here
});
```

The report returned contains an array of activity; each resource is returned with a failure identifier; each line in the report represents a single retry.

```
{ name: 'api for airasoul.net', failed: false },
{ name: 'api for airasoul.net', failed: false },
{ name: 'api for airasoul.net', failed: false },
{ name: 'api for 127', failed: true },
{ name: 'api for 127', failed: true },
{ name: 'api for 127', failed: true },
{ name: 'local mongo', failed: true },
{ name: 'local mongo', failed: true },
{ name: 'local mongo', failed: true },
{ name: 'redis local', failed: false },
{ name: 'redis local', failed: false },
{ name: 'redis local', failed: false },
{ name: 'local rabbitmq', failed: false },
{ name: 'local rabbitmq', failed: false },
{ name: 'local rabbitmq', failed: false }
```

At this point you could log this information; send an email or sms; its in your hands.. 


## todo


* Support REST POST/PUT/DELETE requests
* An administration tool which lists the reported activity


.