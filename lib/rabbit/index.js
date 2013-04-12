var amqp = require('amqp') 
, Base = require('../base')
, util = require('util')
;

var Rabbit = function(options) {
  if (!options) throw new Error("Please provide options");
  if (!options.retries) throw new Error("Please provide a retry value");
  if (!options.timeout) throw new Error("Please provide a timeout value");
  if (!options.minutes_between_notification) throw new Error("Please provide a minutes between notification value");

  this.retries = options.retries;
  this.timeout = options.timeout;
  this.minutes_between_notification = options.minutes_between_notification;
  Base.apply(this, arguments);
};

util.inherits(Rabbit, Base);

Rabbit.prototype.monitor = function(amqp_options) {
  if (!amqp_options) throw new Error("You must provide connection options");
  var that = this;

  process.setMaxListeners(0);

  this.execute(amqp_options, function(){

   // console.log("executing------");
    try {
      amqp_options.hearbeat = 2;
      var connection = require('amqp').createConnection(amqp_options);
   //   console.log("connecting");
      connection.on('ready', function() {
      //  console.log("ready------");
        producer(that, connection, function(){
          consumer(that, connection);
        });
      });
      connection.on("error", function(error) {
          this.end();
      //    console.log("shit not working 1");
          that.emit("alert", { amqp_options: amqp_options, error: error });
      });
      connection.on("heartbeat", function() {
        this.end();
      });
    }
    catch(err)
    {
      connection.end();
      //console.log("shit not working 2");
      that.emit("alert", amqp_options.host);
    }
  });
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