var amqp = require('amqp') 
, util = require('util')
;

var Rabbit = function(options) {
};


Rabbit.prototype.ok = function(amqp_options, callback) {
  var that = this;

    try {
      var options = { 
        host: amqp_options.host
      , port: amqp_options.port
      , login: amqp_options.login
      , password: amqp_options.password
      , vhost: amqp_options.vhost
      }

     //console.log(amqp_options);

      amqp_options.hearbeat = 2;
      var connection = require('amqp').createConnection(options);
      //console.log("connecting");
      connection.on('ready', function() {
      //  console.log("ready------");
        producer(that, connection, function(){
          consumer(that, connection);
          callback(true);
        });
      });
      connection.on("error", function(error) {
          this.end();
         //console.log("shit not working 1");
           //that.emit("alert", amqp_options.host);
           callback(false);
      });
      connection.on("heartbeat", function() {
        this.end();
      });
    }
    catch(err)
    {
      if (connection) connection.end();
    //  console.log("shit not working 2");
     callback(false);
    }
  
};

function producer(that, connection, callback){
  var ex_options = { durable: true, autoDelete: false, confirm: true, type: "direct" };
  var ex = connection.exchange("monitor", ex_options);
  ex.on("exchangeDeclareOk", function(args) {
    var q = connection.queue('monitor');
    q.on('queueDeclareOk', function(args) {
        q.bind("monitor","monitor");
        q.on('queueBindOk', function() {
          ex.publish('monitor', { monitor: "beat" }, {});
           //q.close();
           //ex.close();
          //connection.end();
           callback();
        });
    });
  });
}

function consumer(that, connection){
  var ex_options = { durable: true, autoDelete: false, confirm: true, type: "direct" };
  var ex = connection.exchange("monitor", ex_options);
  ex.on("exchangeDeclareOk", function(args) {
    var q = connection.queue('monitor');
    q.on('queueDeclareOk', function(args) {
        q.bind("monitor","monitor");
        q.on('queueBindOk', function() {
            q.subscribe(function(message) {
            //    connection.end();
            });
        });
    });
  });
}

module.exports = Rabbit;