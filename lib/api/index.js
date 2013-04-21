var request = require('request');

var Api = function() {
};

Api.prototype.ok = function(resource, callback) {
  request(resource.host, function (error, response, body) {
    if (error || response.statusCode !== 200) {
      callback(false);
    } else {
      callback(true);
    }
  });
};

module.exports = Api;