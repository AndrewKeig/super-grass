var should = require("should");
var Api = require('../lib/api');


describe("Monitor Api", function() {

  describe.only("When invalid url", function() {

    before(function(done) {
      var actualurl = "http://www.airasoul.net/missing/";

      var options = {
        retries:2,
        timeout:1,
        minutes_between_notification:1
      }

      var api = new Api(options);
    });

    it("should validate", function(done) {
      this.timeout(0);
      api.monitor(actualurl);
      api.on('snitch', function(url) {
        console.log("snitch");
        url.should.equal(actualurl);
        this =null;
        done();
      });
    });
  });

  describe("When invalid url and empty options", function() {

    before(function(done) {
      var actualurl = "http://www.airasoul.net/missing/";
      var api = new Api();
    });

    it("should validate", function(done) {
      this.timeout(0);
      api.monitor(actualurl);
      //api.on('snitch', function(url) {
        console.log("snitch");
        url.should.equal(actualurl);
      //  this =null;
      //  done();
      //});
    });
  });

  describe("When multiple urls and one is invalid", function() {

    before(function(done) {
      var urlOne = "http://www.airasoul.net/missing/";
      var urlTwo = "http://www.airasoul.net";

      var options = {
        retries:3,
        timeout:1,
        minutes_between_notification:1
      }

      var api = new Api(options);
    });

    it("should validate", function(done) {
      api.monitor(urlOne);
      api.monitor(urlTwo);
      api.on('snitch', function(url) {
        url.should.equal();
        done();
      });
    });
  });

   describe("When empty url", function() {

    before(function(done) {
      var urlOne = "";

      var api = new Api();
    });

    it("should validate", function() {
      api.monitor(urlOne);
      should.throw.error;
    });
  });

   describe("When invalid url", function() {

    before(function(done) {
      var urlOne = "";

      var api = new Api();
    });

    it("should validate", function() {
      api.monitor(urlOne);
      should.throw.error;
    });
  });
});