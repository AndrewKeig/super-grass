var request = require('request') ;

var BasicAuth = function(options) {
};


//1. add other properties to the request; tokens etc
//2. add a secure option

BasicAuth.prototype.ok = function(options, callback) {
  //validate input
 request({
    'method': 'GET',
    'uri': options.host,
    'auth': {
      'user': options.username,
      'pass': options.password
    }
  }, function(error, response, body) {
      if (error || response.statusCode !== 200) {
      callback(false);
    } else {
      callback(true);
    }
  });
};

module.exports = BasicAuth;