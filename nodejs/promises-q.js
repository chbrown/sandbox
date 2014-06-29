/*jslint node: true */
var Q = require('q');

// with Bluebird (doesn't work like I want)
// var p = new Promise(function(resolve, reject) {
//   console.log('creating promise');
//   setTimeout(function() {
//     console.log('resolving:patience');
//     resolve('patience');
//   }, 2000);

//   process.on('SIGINT', function() {
//     console.log('resolving:sigint');
//     reject('SIGINT');
//   });
// });

function wait() {
  var deferred = Q.defer();
  console.log('creating deferred');
  // var p = (function(resolve, reject) {
  var timeout = setTimeout(function() {
    console.log('resolving:patience');
    deferred.resolve('patience');
  }, 2000);

  process.on('SIGINT', function() {
    console.log('resolving:sigint');
    deferred.reject('SIGINT');
    // clearTimeout(timeout);
  });

  return deferred.promise;
}

var promise = wait();

promise.then(function(res) {
  console.log('s1', res);
}, function(res) {
  console.log('e1', res);
});

setTimeout(function() {
  promise.then(function(res) {
    console.log('s2', res);
  }, function(res) {
    console.log('e2', res);
  });

}, 3000);

// exactly!
