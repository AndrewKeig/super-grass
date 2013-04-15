var request = require('request') 
, async = require('async') 
, eventEmitter = require('events').EventEmitter
, util = require('util')
, Monitor = require('../lib/db')
;

var Base = function() {
  if (!this instanceof Base) return new Base();
  this.monitor = new Monitor();
};

util.inherits(Base, eventEmitter);

Base.prototype.monitor = function()
{
  throw new Error("You must implement the monitor method in the sub-class.");
}

Base.prototype.execute = function(url, work){
  var me = this;
  var retries = 0;

  //SaveState(url, 0, false);

  //whilst enabled
  async.forever(
      function (callback) {
          work();
          me.on('alert', function(badurl) {
            retries++;
            if (me.retries === retries) {
              //var notify = shouldWeNotify(badurl, this.minutes_between_notification);
              //if (notify) me.emit("snitch", badurl);
              retries = 0;
            }
          });
          setTimeout(callback, me.timeout);
      },
      function (err) {}
  );
};

function shouldWeNotify(url, minutes_between_notification)
{
  var notify = false;

  GetData(url, function(monitor) {
    var date = monitor.LogDate.setTime(date.getTime() + (minutes_between_notification));

    if(date < Date.now()){
      SaveState(url, 0, false);
      notify = true;
    }
  });

  return isSaved;
}

function GetData(key, callback) {
  monitor.get(key, function(err, m) {
    callback(m);
  });
}

function SaveState(url, minutes, isFail) {
  var date = new Date(Date.now());

  var data = {
    name : url,
    logTime: date.setTime(date.getTime() + minutes),
    isEnabled: true,
    isFail: isFail
  };

  monitor.save(url, data, function(){});
}

module.exports = Base;
