var redis = require("redis");

var Redis = function(options) {
};

Redis.prototype.ok = function(resource, callback) {

  client = redis.createClient(resource.port, resource.hostname);
  
  client.on('ready', function(){
    callback(true)
  });

  client.on('error', function(){
    callback(false)
  });
};

module.exports = Redis;