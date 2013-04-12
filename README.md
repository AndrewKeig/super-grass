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