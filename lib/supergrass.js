var eventEmitter = require('events').EventEmitter
, util = require('util')
, Api = require("../lib/api")
, BasicAuth = require("../lib/basicauth")
, Mongo = require("../lib/mongo")
, Redis = require("../lib/redis")
, async = require("async")
, Informer = require("./informer")
, Server = require("./server")
, Formatter = require("./formatter")
, EventVat = require('eventvat')
, _ = require("underscore")
;

var SuperGrass = function(options) {
   if (!this instanceof SuperGrass) return new SuperGrass();
   if (!options) throw new Error("Please provide options");
   if (!options.settings.retry) throw new Error("Please provide a number of retries");
   if (!options.settings.retryTimeout) throw new Error("Please provide a timeout value in minutes between retries");
   if (!options.settings.interval) throw new Error("Please provide a interval in minutes between notification value");
   if (options.resources.length != _.uniq(_.pluck(options.resources, 'name')).length) throw new Error("invalid configuration; name is not unique");

   this.funcs = [];
   this.resources = options.resources;
   this.retry = options.settings.retry;
   this.retryTimeout = options.settings.retryTimeout;
   this.interval = options.settings.interval;
   this.vat = EventVat();
   this.informer = new Informer(options.settings.email);
   this.formatter = new Formatter();
   this.server = new Server(options.settings.server, this.vat);
   this.vat.set('send_emails', true)
   var me = this;

   async.each(me.resources, function(resource){
      var item;
      if (resource.type === "api") item = async.apply(handler, resource, me.retryTimeout, new Api());
      if (resource.type === "basicauth") item = async.apply(handler, resource, me.retryTimeout, new BasicAuth());
      if (resource.type === "mongo") item = async.apply(handler, resource, me.retryTimeout, new Mongo());
      if (resource.type === "redis") item = async.apply(handler, resource, me.retryTimeout, new Redis());

      _(me.retry).times(function(){
        me.funcs.push(item);
      });
    });

    setTimeout(function(){}, 100);

    function handler(resource, retryTimeout, obj, callback){
      _.delay(function(){
        var failed = false;
        obj.ok(resource, function(isValid){
          if(!isValid) failed = true;
              console.log("-----", failed);
          callback(null, {name: resource.name, status: (failed) ? "Down" : "Ok"   });
        });
      }, retryTimeout);
    };
};

util.inherits(SuperGrass, eventEmitter);

SuperGrass.prototype.email = function(report) {
  var me = this;



  var isFailing = false;

  async.each(this.resources, function(resource){
    //console.log("sending for ", resource.name);
    var items = _.where(report, {name: resource.name});

    //console.log("items for " + resource.name, items);

    var count = _.countBy(items, function(item) {
      return item.status === "Down";
    });

    console.log("count", count);
    console.log("count", count.true);

    if (count.true === me.retry) isFailing = true;
  });

  if (this.vat.get('send_emails') && isFailing) this.informer.email(report);
};

SuperGrass.prototype.print = function(report) {
  console.log(this.formatter.text(report));
};

SuperGrass.prototype.watch = function() {
  var me = this;

  async.forever(
    function (callback) {
      async.series(me.funcs, function(err, results) {
        console.log("snitching");
        me.emit('snitch', results);
        me.vat.set('status', results);
        setTimeout(callback, me.interval);
      });
    },
    function (err) {
    }
  );
};

module.exports = SuperGrass;