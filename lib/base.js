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
  var set_date = date.setTime(date.getTime() - (this.minutes_between_notification+1));

  SaveState(this.db, key, this.retries, set_date, true, function(){
    //whilst enabled
    async.forever(
        function (callback) {
            work();
            me.on('alert', function(badKey) {
              retries++;
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
  GetData(db, key, function(monitor) {

    //date needs to equal the date of the last notification 'snitch'; not alert,
    //the last notification date is a find where query == (key,isFail=true,retry=maxretries) 

    //monitor.attempts[0].date  - we need the last one; could return more than one
    var monitor_date = new Date(monitor[key].date);
    var date = monitor_date.setTime(monitor_date.getTime() + minutes_between_notification);

    console.log("monitor_date"+monitor_date);

    console.log("minutes_between_notification"+minutes_between_notification);
    console.log("date"+date);
    console.log("now"+Date.now());

    if(date < Date.now()){
      SaveState(db, key, retries, Date.now(), false, function(){
        callback(true);
      });
    }
    else{
      SaveState(db, key, retries, Date.now(), true, function(){
         callback(false);
      });
    }
  });
}

function GetData(db, key, callback) {
  // db.get(key, function(err, m) {
  //   callback(m);
  // });

  db.find({name: key, isFail:true, retry:2}, function(err, results) {
    console.log("key -" + key);
    console.log("results ---> " + util.inspect(results));
    callback(results);
  });
}

function SaveState(db, key, retry, date, isFail, callback) {

  var data = {
    name : key,
    isEnabled: true,
    retry: retry, 
    date: date, 
    isFail: isFail
  };

  db.save(key, data, function(){
    callback();
  });
}

module.exports = Base;
