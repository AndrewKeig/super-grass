var winston = require('winston');

  winston.loggers.add('errors', {
    console: {
      level: 'error',
      colorize: 'true',
      label: 'errors'
    },
    file: {
      filename: 'errors.log'
    }
  });

  winston.loggers.add('info', {
    console: {
      level: 'info',
      colorize: 'true',
      label: 'info'
    },
    file: {
      filename: 'info.log'
    }
  });

var errors = winston.loggers.get('errors');
errors.error('error', 'Hello distributed log files!', {date: Date.now()});

var info = winston.loggers.get('info');
info.info('.info', 'Hello distributed log files!', {date: Date.now()});


 var options = {
    from: new Date - 100000,
    until: new Date,
    level: 'warn'
  };

  // //
  // // Find items logged between today and yesterday.
  // //
  // winston.query(options, function (err, results) {
  //   if (err) {
  //     throw err;
  //   }

  //   console.log(results);
  // });




  // var EventVat = require("eventvat");
// var vat = EventVat();

// vat.on('get', function(key, value) {
//   console.log('`' + key + '` has the value: `' + value + '`');
// });

// vat.set('xoo', 'hello, world');
// vat.set('coo', 'hello, world');
// vat.set('qoo', 'hello, world');
// vat.set('aoo', 'hello, world');
// vat.set('goo', 'hello, world');

// //vat.get('foo');
// //vat.expire('foo', 5);
// //vat.sort();
// //vat.die('coo');

// //setTimeout(function(){ vat.get('aoo'); }, 4000);

// var dump = vat.dump();

// var jf = require('jsonfile')

// var file = '/tmp/data.json';

// jf.writeFile(file, dump, function(err) {
//   console.log(err);
// })

// js.readFile(file, function(err, obj) {
//   console.log(util.inspect(obj));
// });


