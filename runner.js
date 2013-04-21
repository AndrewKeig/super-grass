var SuperGrass = require('./lib/processor');
var logger = require('winston');
var options = require('./options');

logger.add(logger.transports.File, { filename: 'error.log' });
//logger.remove(logger.transports.Console);


var superGrass = new SuperGrass(options);
superGrass.watch();
//console.log("watching");

superGrass.on('snitch', function(report) {
  console.log("snitching on");
  console.log("RESULTS", report);
  //report.foreach(name, type, host);

  //we need this also if the thing fails we can pull the last date from here
  //logger.error(report, report, {date: Date.now()});
});