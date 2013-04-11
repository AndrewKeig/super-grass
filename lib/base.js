var request = require('request') 
, async = require('async') 
, eventEmitter = require('events').EventEmitter
, util = require('util')
;

var Base = function() {
  if (!this instanceof Base) return new Base();
  initialiseNotificationState();
};

util.inherits(Base, eventEmitter);

Base.prototype.monitor = function()
{
  throw new Error("You must implement the monitor method in the sub-class.");
}

Base.prototype.execute = function(url, work){
  var me = this;
  var count = 0;

  updateDate(url, 0);

  async.forever(
      function (callback) {
          work();
          me.on('alert', function(badurl) {
            count++;
            if (me.retries === count) {
              var notify = updateNotificationDate(badurl, this.minutes_between_notification);
              if (notify) me.emit("snitch", badurl);
               count = 0;
            }
          });
          setTimeout(callback, me.timeout);
      },
      function (err) {
      }
  );
};

function updateNotificationDate(url, minutes_between_notification)
{
  if( nextNotification(url) < Date.now()){
    updateLastDateOfNotification(url, minutes_between_notification);
    return true;
  }

  return false;
}

function nextNotification(url){
  var data = JSON.parse(process.env["data"]);
  return data.api[url];
}

function updateLastDateOfNotification(url, minutes_between_notification){
  updateDate(url, minutes_between_notification*60000);
}

function initialiseNotificationState(){
  this.data = {};
  this.data.api = {}
  process.env["data"] =JSON.stringify(this.data);
}

function updateDate(url, minutes){
  var data = JSON.parse(process.env["data"]);

  var date = new Date(data.api[url]);

  if (data.api[url] == null)
    date = new Date(Date.now());

  data.api[url] = date.setTime(date.getTime() + (minutes));
  process.env["data"] =JSON.stringify(data);
}

module.exports = Base;
