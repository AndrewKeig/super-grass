var SuperGrass = require('./lib/supergrass');
var options = require('./options');

var superGrass = new SuperGrass(options);
superGrass.watch();

superGrass.on('snitch', function(report) {
  console.log("RESULTS", report);
});