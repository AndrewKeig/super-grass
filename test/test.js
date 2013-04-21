var should = require("should")
, SuperGrass = require('../lib/supergrass');


// monitoring api
describe("Monitor Api", function() {

   describe("When we do not provide options", function() {
    var superGrass, error;

    try { 
      superGrass = new SuperGrass();
    } catch (err) {
      error = err;
    }

    it("should throw error", function() {
        error.toString().should.include("Error: Please provide options");
    });
  });

  describe("When we do not provide options for retry", function() {

    var options = {
      settings: {
        interval: "5000",
        retry: null,
        retryTimeout: "1000"
      }
    , resources: 
      []
    };

    var superGrass, error;

    try { 
      superGrass = new SuperGrass(options);
    } catch (err) {
      error = err;
    }

    it("should throw error", function() {
        error.toString().should.include("Error: Please provide a number of retries");
    });
  });

  describe("When we do not provide option for retryTimeout", function() {
     var options = {
      settings: {
        interval: "5000",
        retry: 3,
        retryTimeout: null
      }
    , resources: 
      []
    };

    var superGrass, error;

    try { 
      superGrass = new SuperGrass(options);
    } catch (err) {
      error = err;
    }

    it("should throw error", function() {
        error.toString().should.include("Error: Please provide a timeout value in minutes between retries");
    });
  });

  describe("When we do not provide option for interval", function() {
    var options = {
      settings: {
        interval: null,
        retry: 3,
        retryTimeout: 1000
      }
    , resources: 
      []
    };


    var superGrass, error;

    try { 
      superGrass = new SuperGrass(options);
    } catch (err) {
      error = err;
    }

    it("should throw error", function() {
        error.toString().should.include("Error: Please provide a interval in minutes between notification value");
    });
  });

  describe("When we provide options", function() {
    var options = {
      settings: {
        interval: 1000,
        retry: 3,
        retryTimeout: 5000
      }
    , resources: 
      []
    };

    var superGrass = new SuperGrass(options);

    it("should contain correct retry value", function() {
        superGrass.retry.should.equal(3);
    });

    it("should contain correct timeout value", function() {
        superGrass.retryTimeout.should.equal(5000);
    });

    it("should contain correct minutes between notification value", function() {
        superGrass.interval.should.equal(1000);
    });
  });


  describe("When single invalid api resources", function() {
    it("should snitch with single invalid resource in report", function(done) {

      var resource = {
        type: "api",
        host: "http://127.0.0.1:2000",
        enabled : true
      };

      var options = {
        settings: {
          interval: 100,
          retry: 3,
          retryTimeout: 1
        }
      , resources: 
        []
      };
      options.resources.push(resource);

      var superGrass = new SuperGrass(options);
      superGrass.watch();

      superGrass.on('snitch', function(report) {
        report.length.should.equal(options.settings.retry);
        report[0].should.have.keys(['url', 'fails']);
        report[0].should.have.property('url').equal('http://127.0.0.1:2000');
        report[0].should.have.property('fails').equal(1);

        report[1].should.have.keys(['url', 'fails']);
        report[1].should.have.property('url').equal('http://127.0.0.1:2000');
        report[1].should.have.property('fails').equal(1);

        report[2].should.have.keys(['url', 'fails']);
        report[2].should.have.property('url').equal('http://127.0.0.1:2000');
        report[2].should.have.property('fails').equal(1);
        done();
      });
    });
  });

  describe("When multiple invalid api resources", function() {
    it("should snitch with multiple invalid esources in report", function(done) {

      var resource1 = {
        type: "api",
        host: "http://127.0.0.1:2000",
        enabled : true
      };

      var resource2 = {
        type: "api",
        host: "http://127.0.0.1:3000",
        enabled : true
      };

      var options = {
        settings: {
          interval: 100,
          retry: 3,
          retryTimeout: 1
        }
      , resources: 
        []
      };
      options.resources.push(resource1);
      options.resources.push(resource2);

      var superGrass = new SuperGrass(options);
      superGrass.watch();

      superGrass.on('snitch', function(report) {
        report.length.should.equal(options.settings.retry*options.resources.length);
        report[0].should.have.keys(['url', 'fails']);
        report[0].should.have.property('url').equal('http://127.0.0.1:2000');
        report[0].should.have.property('fails').equal(1);

        report[1].should.have.keys(['url', 'fails']);
        report[1].should.have.property('url').equal('http://127.0.0.1:2000');
        report[1].should.have.property('fails').equal(1);

        report[2].should.have.keys(['url', 'fails']);
        report[2].should.have.property('url').equal('http://127.0.0.1:2000');
        report[2].should.have.property('fails').equal(1);

        report[3].should.have.keys(['url', 'fails']);
        report[3].should.have.property('url').equal('http://127.0.0.1:3000');
        report[3].should.have.property('fails').equal(1);

        report[4].should.have.keys(['url', 'fails']);
        report[4].should.have.property('url').equal('http://127.0.0.1:3000');
        report[4].should.have.property('fails').equal(1);

        report[5].should.have.keys(['url', 'fails']);
        report[5].should.have.property('url').equal('http://127.0.0.1:3000');
        report[5].should.have.property('fails').equal(1);
        done();
      });
    });
  });

  describe("When single invalid api resource but multiple resources", function() {
    it("should snitch with single invalid resource in report", function(done) {

      var resource1 = {
        type: "api",
        host: "http://127.0.0.1:2000",
        enabled : true
      };

      var resource2 = {
        type: "api",
        host: "http://blog.airasoul.net",
        enabled : true
      };

     var options = {
        settings: {
          interval: 1,
          retry: 1,
          retryTimeout: 1
        }
      , resources: 
        []
      };
      options.resources.push(resource1);
      options.resources.push(resource2);

      var superGrass = new SuperGrass(options);
      superGrass.watch();

      superGrass.on('snitch', function(report) {
        report.length.should.equal(options.settings.retry*options.resources.length);
        report[0].should.have.keys(['url', 'fails']);
        report[0].should.have.property('url').equal('http://127.0.0.1:2000');
        report[0].should.have.property('fails').equal(1);

        report[1].should.have.keys(['url', 'fails']);
        report[1].should.have.property('url').equal('http://blog.airasoul.net');
        report[1].should.have.property('fails').equal(0);
        done();
      });
    });
  });

  describe("When single valid rabbit resources", function() {
    it("should snitch with single valid resource in report", function(done) {

      var resource = { host: "localhost"
        , port: 5672
        , login: "guest"
        , password: "guest"
        , vhost: '/'
        , enabled : true
        , type: "rabbit"
      };


      var options = {
        settings: {
          interval: 100,
          retry: 3,
          retryTimeout: 1
        }
      , resources: 
        []
      };
      options.resources.push(resource);

      var superGrass = new SuperGrass(options);
      superGrass.watch();

      superGrass.on('snitch', function(report) {
        report.length.should.equal(options.settings.retry);
        report[0].should.have.keys(['url', 'fails']);
        report[0].should.have.property('url').equal('localhost');
        report[0].should.have.property('fails').equal(0);

        report[1].should.have.keys(['url', 'fails']);
        report[1].should.have.property('url').equal('localhost');
        report[1].should.have.property('fails').equal(0);

        report[2].should.have.keys(['url', 'fails']);
        report[2].should.have.property('url').equal('localhost');
        report[2].should.have.property('fails').equal(0);
        done();
      });
    });
  });

  describe("When single invalid rabbit resources", function() {
    it("should snitch with single resource in report", function(done) {

      var resource = { host: "localhost1"
        , port: 5672
        , login: "guest"
        , password: "guest"
        , vhost: '/'
        , enabled : true
        , type: "rabbit"
      };

       var options = {
        settings: {
          interval: 100,
          retry: 3,
          retryTimeout: 1
        }
      , resources: 
        []
      };
      options.resources.push(resource);

      var superGrass = new SuperGrass(options);
      superGrass.watch();

      superGrass.on('snitch', function(report) {
        report.length.should.equal(options.settings.retry);
        report[0].should.have.keys(['url', 'fails']);
        report[0].should.have.property('url').equal('localhost1');
        report[0].should.have.property('fails').equal(1);

        report[1].should.have.keys(['url', 'fails']);
        report[1].should.have.property('url').equal('localhost1');
        report[1].should.have.property('fails').equal(1);

        report[2].should.have.keys(['url', 'fails']);
        report[2].should.have.property('url').equal('localhost1');
        report[2].should.have.property('fails').equal(1);
        done();
      });
    });
  });
 });
