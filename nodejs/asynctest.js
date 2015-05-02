var async = require('async');

function add1(n, callback) {
  setTimeout(function () {
    callback(null, n + 1);
  }, 10);
}

function mul3(n, callback) {
  setTimeout(function () {
    callback(null, n * 3);
  }, 10);
}


function make4(callback) {
  setTimeout(function () {
    callback(null, 4);
  }, 10);
}

var make4add1mul3 = async.compose(mul3, add1, make4);

var callback = function (err, result) {
  // result now equals 15
  console.log(result, 'should == 15');
};

// make4add1mul3(callback);

// 6 => 6 + 7 => 13 * 2 => 26

var composed = async.compose(
  function(n, callback) {
    setTimeout(function () {
      callback(null, n * 2);
    }, 200);
  },
  function(n, callback) {
    setTimeout(function () {
      callback(null, n + 7);
    }, 100);
  },
  function(callback) {
    setTimeout(function () {
      callback(null, 6);
    }, 50);
  }
);

composed(function (err, result) {
  console.log("after-compose", err, result);
  // git_commit.author(function(err, user) {
  //   callback(err, user);
  // });
});
