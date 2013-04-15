var should = require("should");
var Api = require('../lib/api');
var Rabbit = require('../lib/rabbit');
var Monitor = require('../lib/db');

// describe("Save Monitor", function() {
//   describe.only("When we save a monitor", function() {
//     var monitor = new Monitor();

//     it("should save monitor", function(done) {

//       var key = "localhost";
//       var data = {
//         name : key,
//         failTime: Date.now(),
//         failureNumber: 1
//       };

//       monitor.save(key, data, function(){
//         monitor.get(key, function(err, m) {
//           m.name.should.equal(key);
//           done();
//         });
//       });
//     });
//   });
// });

describe("Monitor Api", function() {
   describe("When we do not provide options to api", function() {
    var api, error;

    try { 
      api = new Api();
    } catch (err) {
      error = err
    }

    it("should contain correct retry value", function() {
        error.toString().should.include("Error: Please provide options");
    });
  });

  describe("When we do not provide option to api for retry", function() {
    var options = {
        timeout:1,
        minutes_between_notification:1
    }

    var api, error;

    try { 
      api = new Api(options);
    } catch (err) {
      error = err
    }

    it("should throw error", function() {
        error.toString().should.include("Error: Please provide a retry value");
    });
  });

  describe("When we provide options to api", function() {
    var options = {
        retries:2,
        timeout:1,
        minutes_between_notification:1
    }

    var api = new Api(options);

    it("should contain correct retry value", function() {
        api.retries.should.equal(2);
    });

    it("should contain correct timeout value", function() {
        api.timeout.should.equal(1);
    });

    it("should contain correct minutes between notification value", function() {
        api.timeout.should.equal(1);
    });
  });

  describe("When we do not provide a url to api", function() {
      var actualurl = "";

      var options = {
          retries:2,
          timeout:1,
          minutes_between_notification:1
      }

      var api, error;

      api = new Api(options);

      try {
        api.monitor(actualurl);
      } catch (err) {
        error = err
      }

      it("should throw error", function() {
        console.log(error);
          error.toString().should.include("You must provide a url");
      });
    });
  });
//   describe("When single invalid url", function() {
//     it("should snitch once", function(done) {

//       var actualurl = "http://www.airasoul.net/missing/1";

//       var options = {
//           retries:2,
//           timeout:1,
//           minutes_between_notification:1
//       }

//       var api = new Api(options);
//       api.monitor(actualurl);

//       api.on('snitch', function(url) {
//         url.should.equal(actualurl);
//         done();
//       });
//     });
//   });

//   describe("When multiple urls; one invalid", function() {
//     it("should snitch once", function(done) {
//       var actualurl = "http://www.airasoul.net/missing/3";
//       var goodurl = "http://www.airasoul.net";

//       var options = {
//           retries:2,
//           timeout:1,
//           minutes_between_notification:1
//       }

//       var api = new Api(options);
//       api.monitor(actualurl);
//       api.monitor(goodurl);

//       api.on('snitch', function(url) {
//         url.should.equal(actualurl);
//         done();
//       });
//     });
//   });
// });

// describe("Monitor Rabbit", function() {
//   describe("When we do not provide options to rabbit", function() {
//     var rabbit, error;

//     try { 
//       api = new Rabbit();
//     } catch (err) {
//       error = err
//     }

//     it("should contain correct retry value", function() {
//         error.toString().should.include("Error: Please provide options");
//     });
//   });

//   describe("When we do not provide option to rabbit for retry", function() {
//     var options = {
//         timeout:1,
//         minutes_between_notification:1
//     }

//     var rabbit, error;

//     try { 
//       api = new Rabbit(options);
//     } catch (err) {
//       error = err
//     }

//     it("should throw error", function() {
//         error.toString().should.include("Error: Please provide a retry value");
//     });
//   });

//   describe("When we provide options to rabbit", function() {
//     var options = {
//         retries:2,
//         timeout:1,
//         minutes_between_notification:1
//     }

//     var rabbit = new Rabbit(options);

//     it("should contain correct retry value", function() {
//         rabbit.retries.should.equal(2);
//     });

//     it("should contain correct timeout value", function() {
//         rabbit.timeout.should.equal(1);
//     });

//     it("should contain correct minutes between notification value", function() {
//         rabbit.timeout.should.equal(1);
//     });
//   });

//   describe("When we do not provide connection option to rabbit", function() {
//       var options = {
//           retries:2,
//           timeout:1,
//           minutes_between_notification:1
//       }

//       var rabbit, error;

//       rabbit = new Rabbit(options);

//       try {
//         rabbit.monitor();
//       } catch (err) {
//         error = err
//       }

//       it("should throw error", function() {
//           error.toString().should.include("You must provide connection options");
//       });
//     });

//   describe("When unable to connect to rabbitMq", function() {

//     it("should snitch once", function(done) {
//       var options = {
//           retries:2,
//           timeout:1,
//           minutes_between_notification:1
//       }

//       var conOptions = { 
//         host: 'localhost'
//         , port: 5672
//         , login: 'guest'
//         , password: 'guest'
//         , vhost: '/'
//       };

//       var rabbit = new Rabbit(options);
//       rabbit.monitor(conOptions);

//       rabbit.on('snitch', function(options) {
//         options.should.equal(conOptions);
//         done();
//       });
//     });
//   });
// });
