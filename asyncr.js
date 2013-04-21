var async = require("async")

//var url = "ksksks";
//for each item in resources add func to array
//var funcs[api,api,rabbit];



var api1 = async.apply(function(url, callback){ 
  console.log("url", url); 
  var fails = 1; 
  callback(null, fails); 
}, 'testurl')

var api2 = function(callback){ var fails = 2; callback(null, fails); };
var api3 = function(callback){ var fails = 3; callback(null, fails); };

console.log("funcs defined");

//var funcs = [function(callback){ var fails = 3; callback(null, fails); }, function(callback){ var fails = 3; callback(null, fails); }]



var funcs = [];
funcs.push(api1);
funcs.push(api2);
funcs.push(api3);
//funcs.push(function(callback){ var fails = 1; callback(null, fails); });
//funcs.push(function(callback){ var fails = 2; callback(null, fails); });
//funcs.push(function(callback){ var fails = 3; callback(null, fails); });

console.log("funcs into array");

async.series(funcs
, function(err, results){
    console.log("RESULTS");
    console.log(results);
});
