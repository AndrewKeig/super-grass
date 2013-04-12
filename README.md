#super-grass
===========

A monitoring solution for Apis, RabbitMQ, MongoDb and Redis


## TODO
===========
* Support for RabbitMQ, MongoDb and Redis

* Administration tool which lists the running processes for each supported type




## api
===========

The below demonstrates monitoring a website; we simply create a new ```Api``` passing an ```options``` object.

This options contains 3 values:

* ```retries``` - number of retries before firing the ```snitch``` event
* ```timeout``` - a timeout value between retries
* ```minutes_between_notification``` - a value; which can be used to avoid repeatedly firing the same event; by delaying notification

We can monitor a website with the following line of code:

```
this.api.monitor("http://www.airasoul.net");
```
We can also monitor multiple websites by simply calling monitor multiple times like so:

```
this.api.monitor("http://www.airasoul.net");
this.api.monitor("http://blog.airasoul.net");
```

The ```snitch``` event is fired due to a site not responding based on the above options.
At this point you can send a notification (sms or email etc) or log an entry in a database or logger. 

```
this.api.on('snitch', function(url) {
  //notify
}
```

The following is a complete example:

```
var Api = require("super-grass").api;

var App = function() {
  var options = {
    retries:3,
    timeout:10,
    minutes_between_notification:30
  }

  this.api = new Api(options);
};

App.prototype.start = function() {
  this.api.monitor("http://www.airasoul.net");

  this.api.on('snitch', function(url) {
    var notification = "The following resource is not responding "  + url ;
    console.log(notification);
  });
};

module.exports = App;

var app = new App();
app.start();
```

## rabbitmq
===========

The below demonstrates monitoring a rabbitmq instance; we simply create a new ```Rabbit``` passing an ```options``` object.

This options contains 3 values:

* ```retries``` - number of retries before firing the ```snitch``` event
* ```timeout``` - a timeout value between retries
* ```minutes_between_notification``` - a value; which can be used to avoid repeatedly firing the same event; by delaying notification

We can monitor a website with the following line of code:

```
var options = { 
    host: 'localhost'
    , port: 5672
    , login: 'guest'
    , password: 'guest'
    , vhost: '/'
  };
  
  this.rabbit.monitor(options);
  
```

The ```snitch``` event is fired due to a site not responding based on the above options.
At this point you can send a notification (sms or email etc) or log an entry in a database or logger. 

```
this.rabbit.on('snitch', function(host	) {
  //notify
}
```

The following is a complete example:

```
var Rabbit = require("super-grass").rabbit;

var App = function() {
  var options = {
    retries:3,
    timeout:1000,
    minutes_between_notification:1
  }

  this.rabbit = new Rabbit(options);
};

App.prototype.start = function() {
  var options = { 
    host: 'localhost'
    , port: 5672
    , login: 'guest'
    , password: 'guest'
    , vhost: '/'
  };
  
  this.rabbit.monitor(options);

  this.rabbit.on('snitch', function(host) {
    var notification = "The following rabbit is not responding "  + host ;
    console.log(notification);
  });
};

module.exports = App;

var app = new App();
app.start();
```