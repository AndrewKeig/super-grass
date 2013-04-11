var request = require('request') 
, Base = require('../base')
, util = require('util')
;

var Api = function(options) {
  if (!options.retries) options.retries = 3;
  if (!options.timeout) options.timeout = 3000;
  if (!options.minutes_between_notification) options.minutes_between_notification = 1; 

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
      console.log("moni");
      if (error || response.statusCode !== 200) {
        console.log("alerting");
        that.emit("alert", url);
      }
    });
  });
};

module.exports = Api;