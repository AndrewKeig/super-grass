var util = require('util');
var nStore = require('nstore');
nStore = nStore.extend(require('nstore/query')());

var Monitor = function() {
}

Monitor.prototype.get = function (id, callback) {
    var supergrass = nStore.new('super-grass.db', function () {
      supergrass.get(id, function (err, monitor, key) {
        if (err) throw err;
        callback(null, monitor);
      });
    });
};

Monitor.prototype.save = function (key, data, callback) {
    var supergrass = nStore.new('super-grass.db', function () {
        supergrass.save(key, data, function (err) {
          if (err) throw err;
          callback();
      });
    });
};

// Monitor.prototype.clear = function (callback) {
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

// Monitor.prototype.find = function (query, callback) {
//     var supergrass = nStore.new('super-grass.db', function () {
//       supergrass.find(query, function (err, monitors) {
//         if (err) throw err;
//         callback(null, monitors);
//       });
//     });
// };


module.exports = Monitor;