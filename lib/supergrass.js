var eventEmitter = require('events').EventEmitter
, util = require('util')
, Api = require("../lib/api")
, Rabbit = require("../lib/rabbit")
, Mongo = require("../lib/mongo")
, Redis = require("../lib/redis")
, async = require("async")
, _ = require("underscore")
;

var SuperGrass = function(options) {
   if (!this instanceof SuperGrass) return new SuperGrass();
   if (!options) throw new Error("Please provide options");
   if (!options.settings.retry) throw new Error("Please provide a number of retries");
   if (!options.settings.retryTimeout) throw new Error("Please provide a timeout value in minutes between retries");
   if (!options.settings.interval) throw new Error("Please provide a interval in minutes between notification value");
   this.resources = options.resources;
   this.retry = options.settings.retry;
   this.retryTimeout = options.settings.retryTimeout;
   this.interval = options.settings.interval;
   this.funcs = [];
   var me = this;
  
   async.each(me.resources, function(resource){
      var item;
      if (resource.type === "api") item = async.apply(myapi, resource, me.retryTimeout, new Api());
      if (resource.type === "rabbit") item = async.apply(myapi, resource, me.retryTimeout, new Rabbit());
      if (resource.type === "mongo") item = async.apply(myapi, resource, me.retryTimeout, new Mongo());
      if (resource.type === "redis") item = async.apply(myapi, resource, me.retryTimeout, new Redis());

      _(me.retry).times(function(){
        me.funcs.push(item);
      });
    });

    setTimeout(function(){}, 5000);

    function myapi(resource, retryTimeout, obj, callback){
      _.delay(function(){
        var failed = false; 
        obj.ok(resource, function(isValid){
          if(!isValid) failed = true;
          callback(null, {name: resource.name, failed: failed});
        });
      }, retryTimeout);
    };
};

util.inherits(SuperGrass, eventEmitter);


SuperGrass.prototype.watch = function() {
  var me = this;

  async.whilst(
    function () { return true },
    function(callback){
      async.series(me.funcs, function(err, results) {
        me.emit('snitch', results);
      });

      setTimeout(callback, me.interval);
    },
    function (err) { }
  );
};

module.exports = SuperGrass;