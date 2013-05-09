var redis = require("redis");

var Redis = function(options) {
};

Redis.prototype.ok = function(resource, callback) {
  client = redis.createClient(resource.port, resource.host);

  if (resource.password) client.auth(resource.password);

  client.on('ready', function(){
    callback(true)
  });

  client.on('error', function(err){
    callback(false)
  });
};

module.exports = Redis;