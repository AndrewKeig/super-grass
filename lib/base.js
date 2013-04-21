var request = require('request') 
, async = require('async') 
, eventEmitter = require('events').EventEmitter
, util = require('util')
, Db = require('../lib/db')
;

var Base = function() {
  if (!this instanceof Base) return new Base();
  this.db = new Db();
};

util.inherits(Base, eventEmitter);

Base.prototype.monitor = function()
{
  throw new Error("You must implement the monitor method in the sub-class.");
}

Base.prototype.execute = function(key, work){
  var me = this;
  var retries = 0;

  var date = new Date(Date.now()); 
  var set_date = date.setTime(date.getTime() - (this.minutes_between_notification));

  SaveState('state.db', this.db, key, this.retries, set_date, true, function(){
    //whilst enabled
    async.forever(
        function (callback) {
            work();
            me.on('alert', function(badKey) {
              retries++;
              console.log("alerting: " + retries);
              if (me.retries === retries) {
                shouldWeNotify(me.db, badKey, retries, me.minutes_between_notification, function(notify) {
                if (notify) me.emit("snitch", badKey);
                retries = 0;
              });
              }
            });
            setTimeout(callback, me.timeout);
        },
        function (err) {}
    );
  });
};

function shouldWeNotify(db, key, retries, minutes_between_notification, callback)
{
  GetData('state.db', db, key, function(monitor) {
    var monitor_date = new Date(monitor[key].date);
    var date = monitor_date.setTime(monitor_date.getTime() + (minutes_between_notification * 60000));

    console.log("date db ------>" + monitor_date);
    console.log("date notify -->" + date);
    console.log("date now ----->" + Date.now());

    if(Date.now() > date){
      SaveState('state.db', db, key, retries, Date.now(), true, function(){
         callback(true);
      });
    }
    else{
      //we could store this in another db
      SaveState('log.db', db, key, retries, Date.now(), true, function(){
        callback(false);
      });
    }
  });
}

function GetData(dbName, db, key, callback) {
  db.find(dbName, {name: key, isFail:true, retry:3}, function(err, results) {
    console.log("key ---> " + key);
    console.log("results ---> " + util.inspect(results));
    callback(results);
  });
}

function SaveState(dbName, db, key, retry, date, isFail, callback) {

  var data = {
    name : key,
    isEnabled: true,
    retry: retry, 
    date: date, 
    isFail: isFail
  };

  db.save(dbName, key, data, function(){
    callback();
  });
}

module.exports = Base;
