var Api = require('../lib/api');

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