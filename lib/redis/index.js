var redis = require("redis");

var Redis = function() {};

Redis.prototype.ok = function(resource, callback) {
  client = redis.createClient(resource.port, resource.host, {max_attempts:1});

  if (resource.password) client.auth(resource.password);

  client.on('ready', function(){
    callback(true)
  });

  client.on('error', function(err){
    callback(false)
  });
};

module.exports = Redis;