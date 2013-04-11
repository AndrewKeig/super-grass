var should = require("should");
var Api = require('../lib/api');


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

  describe("When single invalid url", function() {
    it("should snitch once", function(done) {

      var actualurl = "http://www.airasoul.net/missing/1";

      var options = {
          retries:2,
          timeout:1,
          minutes_between_notification:1
      }

      var api = new Api(options);
      api.monitor(actualurl);

      api.on('snitch', function(url) {
        url.should.equal(actualurl);
        done();
      });
    });
  });

  describe("When multiple urls; one invalid", function() {
    it("should snitch once", function(done) {
      var actualurl = "http://www.airasoul.net/missing/3";
      var goodurl = "http://www.airasoul.net";

      var options = {
          retries:2,
          timeout:1,
          minutes_between_notification:1
      }

      var api = new Api(options);
      api.monitor(actualurl);
      api.monitor(goodurl);

      api.on('snitch', function(url) {
        url.should.equal(actualurl);
        done();
      });
    });
  });
});