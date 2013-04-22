var mongoose = require('mongoose');

var Mongo = function() {};

Mongo.prototype.ok = function(resource, callback) {




  var config = { 
      host: "localhost"
    , database: "staging"
    , port: 27017 
    }
  , options = { 
      server: { 
        auto_reconnect: false
      , poolSize: 10 
      }
    };
  
  mongoose.connection.open(config.host, config.database, config.port, options, function (err, res) {
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