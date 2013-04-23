var request = require('request') ;

var Rabbit = function(options) {
};

Rabbit.prototype.ok = function(amqp_options, callback) {
 request({
    'method': 'GET',
    'uri': amqp_options.host,
    'auth': {
      'user': amqp_options.username,
      'pass': amqp_options.password
    }
  }, function(error, response, body) {
      if (error || response.statusCode !== 200) {
      callback(false);
    } else {
      callback(true);
    }
  });
};

module.exports = Rabbit;