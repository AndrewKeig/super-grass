
```
  ___ _   _ _ __   ___ _ __    __ _ _ __ __ _ ___ ___ 
 / __| | | | '_ \ / _ \ '__|  / _` | '__/ _` / __/ __|
 \__ \ |_| | |_) |  __/ |    | (_| | | | (_| \__ \__ \
 |___/\__,_| .__/ \___|_|     \__, |_|  \__,_|___/___/
           | |                 __/ |                  
           |_|                |___/                   
```

super grass is a node.js monitoring tool supporting:

* ```http get```
* ```http get (basic auth)```
* ```redis```
* ```mongodb```
* ```rabbitmq```

This tool allows you to define various resources to be monitored for a ```heatbeat```; at a ```configurable interval```.

A ```report``` is generated at these intervals and an event is fired; which you can hook into allowing you to analyse and then perform your preferred form of notification and/or logging.

Super grass includes with a ```management ui``` which allows you to check the status of your resources.

It also includes an option to lists the resource status to a table and ```log to console``` and/or ```send in email``` 




## example

The code is simple; you create a ```super-grass``` object; start watching and wait for a response; the ```snitch``` event to fire.

```
var SuperGrass = require('super-grass')
    , options = require('./options');

var superGrass = new SuperGrass(options);
superGrass.watch();

superGrass.on('snitch', function(report) {
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

## options

super-grass; requires an options object with the following properties; the resources section contains a list of the resources you would like to monitor.

```
module.exports = {
  settings: {
    interval: "0",
    retry: "3",
    retryTimeout: "0",
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
    host: "http://127.0.0.1",
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
```

The settings section contains:

* ```interval``` - the interval between notifications
* ```retry``` - the number of retries for a resource
* ```retryTimeout``` - a timeout value between retries
* ```email``` - email details for sending an email
* ```server``` - details for http server
* ```resources``` - a list of resources to be monitored


## print to console


Simply call ```superGrass.print(report)```

```
var SuperGrass = require('./lib/supergrass')
, options = require('./options')
, superGrass = new SuperGrass(options);

superGrass.watch();
superGrass.on('snitch', function(report) {
  superGrass.print(report);
});
```

## send email

Simply call ```superGrass.email(report)```

```
var SuperGrass = require('./lib/supergrass')
, options = require('./options')
, superGrass = new SuperGrass(options);

superGrass.watch();
superGrass.on('snitch', function(report) {
  superGrass.email(report);
});
```

## management ui

Our management ui allows us todo two things:

* monitor the status of the resources in configuration.
* start/stop sending emails
	

The management ui has three endpoints:

* View status - /status
* Start sending emails - /start
* Stop sending emails - /stop


## todo
* Support REST POST/PUT/DELETE requests

.