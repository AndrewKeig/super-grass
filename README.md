#super-grass
===========

A node.js monitoring tool supporting apis, mongodb and rabbitmq.

This tool allows you to define various resources to be monitored for heatbeats; at a configurable interval.  A report is generated at these intervals and an event is fired; which you can hook into allowing you to analyse and then perform your preferd form of notificaion and/or logging.


## TODO
===========

* Support Redis, REST POST/PUT/DELETE requests
* An administration tool which lists the running processes for each supported type



## options
===========


In order to use super-grass; simply create an options object with the following properties.

```
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
    port: 27017
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

```

This options settings contains:

* ```interval``` - the interval between notifications
* ```retry``` - the number of retries for a resource
* ```retryTimeout``` - a timeout value between retries
* ```resources``` - a list of resources to be monitored

 
## supported types
===========

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

A rabbitmq server (send message to queue; and consume it)


```
{ 
  name: "local rabbitmq",
  host: "localhost",
  port: 5672,
  login: "guest",
  password: "guest",
  vhost: '/',
  enabled : true,
  type: "rabbit"
}
```

A mongodb database; (opens a connection against the db )

```
{ 
  name: "local mongo",
  type: "mongo",
  host: "localhost",
  database: "staging",
  port: 27017
}
```

  
## example
===========

The code is simple; you create a ```super-grass``` object; start watching and wait for a response; the ```snitch``` event to fire.

```
var SuperGrass = require('supergrass')
    , options = require('./options');

var superGrass = new SuperGrass(options);
superGrass.watch();

superGrass.on('snitch', function(report) {
  console.log("RESULTS", report);
});
```

The report returned contains an array of activity; each resource is returned with a failure identifier; each line in the report represents a single retry.

```
{ name: 'api for airasoul.net', fails: 0 },
{ name: 'api for airasoul.net', fails: 0 },
{ name: 'api for 127', fails: 1 },
{ name: 'api for 127', fails: 1 },
{ name: 'api for 127', fails: 1 },
{ name: 'local mongo', fails: 0 },
{ name: 'local mongo', fails: 0 },
{ name: 'local mongo', fails: 0 },
{ name: 'local rabbitmq', fails: 0 },
{ name: 'local rabbitmq', fails: 0 },
{ name: 'local rabbitmq', fails: 0 } 

```
At this point you could log this information; send an email or sms; its in your hands.. 

