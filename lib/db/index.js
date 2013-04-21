var util = require('util');
var nStore = require('nstore');
nStore = nStore.extend(require('nstore/query')());

var Db = function(dbname) {
}

Db.prototype.get = function (dbName, id, callback) {
    var supergrass = nStore.new(dbName, function () {
      supergrass.get(id, function (err, monitor, key) {
        if (err) throw err;
        callback(null, monitor);
      });
    });
};

Db.prototype.save = function (dbName, key, data, callback) {
    var supergrass = nStore.new(dbName, function () {
        supergrass.save(key, data, function (err) {
          if (err) throw err;
          callback();
      });
    });
};

Db.prototype.find = function (dbName, query, callback) {
    var supergrass = nStore.new(dbName, function () {
      supergrass.find(query, function (err, monitors) {
        if (err) throw err;
        callback(null, monitors);
      });
    });
};

Db.prototype.all = function (dbName, callback) {
    var supergrass = nStore.new(dbName, function () {
      supergrass.all(function (err, monitors) {
        if (err) throw err;
        callback(null, monitors);
      });
    });
};



// Db.prototype.clear = function (callback) {
//     var supergrass = nStore.new('super-grass.db', function () {
//         supergrass.clear(function (err) {
//           if (err) throw err;
//           callback();
//       });
//     });
// };

// Monitor.prototype.remove = function (key, callback) {
//     var supergrass = nStore.new('super-grass.db', function () {
//       supergrass.remove(key, function (err) {
//         if (err) throw err;
//         callback();
//       });
//     });
// };



module.exports = Db;