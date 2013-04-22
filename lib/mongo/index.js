var mongoose = require('mongoose');

var Mongo = function() {};

Mongo.prototype.ok = function(resource, callback) {

  var options = { 
      server: { 
        auto_reconnect: false
      , poolSize: 10 
      }
    };
  
  mongoose.connection.open(resource.host, resource.database, resource.port, options, function (err, res) {
    if (err) { 
      mongoose.disconnect();
      callback(false);

    } else {
      mongoose.disconnect();
      callback(true);
    }
  });
};

module.exports = Mongo;