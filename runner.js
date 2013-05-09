var SuperGrass = require('./lib/supergrass')
, options = require('./options')
, superGrass = new SuperGrass(options);

superGrass.watch();
superGrass.on('snitch', function(report) {
  superGrass.print(report);
  superGrass.email(report);
});