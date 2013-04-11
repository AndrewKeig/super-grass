var request = require('request') 
, Base = require('../base')
, util = require('util')
;

var Api = function(options) {
  if (!options) throw new Error("Please provide options");
  if (!options.retries) throw new Error("Please provide a retry value");
  if (!options.timeout) throw new Error("Please provide a timeout value");
  if (!options.minutes_between_notification) throw new Error("Please provide a minutes between notification value");

  this.retries = options.retries;
  this.timeout = options.timeout;
  this.minutes_between_notification = options.minutes_between_notification;
  Base.apply(this, arguments);
};

util.inherits(Api, Base);

Api.prototype.monitor = function(url) {
  if (!url) throw new Error("You must provide a url");
  var that = this;
  this.execute(url, function(){
    request(url, function (error, response, body) {
      if (error || response.statusCode !== 200) {
        that.emit("alert", url);
      }
    });
  });
};

module.exports = Api;