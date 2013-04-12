var Rabbit = require('../lib/rabbit');

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