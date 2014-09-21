/*jslint node: true */

Math.log10 = function(x) {
  return Math.log(x) / Math.LN10; // Math.LN10 = Math.log(10.0)
};

function padLeft(string, width, fill) {
  if (fill === undefined) fill = ' ';
  while (string.length < width) {
    string = fill + string;
  }
  return string;
}
function formatNumber(number, padding, width) {
  var integer = number | 0;
  var fractional = number - integer;
  var left = padLeft(integer.toString().slice(0, padding), padding, ' ');
  var right = fractional.toFixed(width).slice(2);
  return left + '.' + right;
}

/** Set up timing handling:
From the Node.js documentation (http://nodejs.org/api/process.html#process_process_hrtime):

    `process.hrtime()`
        Returns the current high-resolution real time in a [seconds, nanoseconds] tuple Array.

    `process.hrtime(start)`
        You may pass in the result of a previous call to process.hrtime() to get a diff reading.

In absolute terms, these figures are arbitrary, but they are useful for measuring time intervals:

    var start = process.hrtime();
    // do something
    var elapsed = process.hrtime(start);
    console.log('%d seconds + %d nanoseconds have elapsed', elapsed[0], elapsed[1]);

*/
function total_runtime(n_iterations, func) {
  // returns floating-point seconds
  var started = process.hrtime();
  for (var i = 0; i < n_iterations; i++) func();
  var elapsed = process.hrtime(started);
  // console.error('total_runtime elapsed:', elapsed[0] + (elapsed[1] / 1e9));
  return elapsed[0] + (elapsed[1] / 1e9);
}
function avg_runtime(func) {
  // returns floating-point seconds required per loop. maybe logs.
  // we want the total time taken to be at least 0.2 seconds, like python's timeit, but we don't try forever
  for (var j = 0; j < 10; j++) {
    // maybe should somehow ensure everything is reset before each time this loop runs?
    var iterations = Math.pow(10, j);
    // console.error('#%d', iterations);
    var elapsed_seconds = total_runtime(iterations, func);
    if (elapsed_seconds > 0.2) {
      // get the seconds per iteration
      return elapsed_seconds / iterations;
    }
    // if we were quicker than that, retry with more loops to get an accurate average
  }
  return -1;
}

var padding = 0;
var width = 0;
function timeit(name, func) {
  var seconds_per_iteration = avg_runtime(func);
  var magnitude = Math.log10(seconds_per_iteration);
  // padding is the number of digits needed to the left of the decimal point
  //   e.g.: 143.55 -> 3, 1.09 -> 1, 0.0093 -> 0
  padding = Math.max(padding, Math.ceil(magnitude));
  // width is the number of digits needed to the right of the decimal point
  //   e.g.: 143.55 -> 0, 1.09 -> 0, 0.0093 -> 4
  width = Math.max(width, -Math.floor(magnitude));
  var margin = 3;
  console.log('%s %s seconds', padLeft(name, 10), formatNumber(seconds_per_iteration, padding, width + margin));
}

var trig = function() {
  // http://en.wikipedia.org/wiki/Box-Muller_transform
  var u1 = Math.random(), u2 = Math.random();
  var a = Math.sqrt(-2 * Math.log(u1));
  var b = 2.0 * Math.PI * u2;
  var z1 = a * Math.cos(b);
  var z2 = a * Math.sin(b);
  return z1;
};


var polar = function() {
  var x1, x2, rad;
  do {
    x1 = 2 * Math.random() - 1;
    x2 = 2 * Math.random() - 1;
    rad = x1 * x1 + x2 * x2;
  } while (rad >= 1 || rad === 0);
  var c = Math.sqrt(-2 * Math.log(rad) / rad);

  var z1 = x1 * c;
  var z2 = x2 * c;
  return z1;
};

timeit('trig', trig);
timeit('polar', polar);

// generating a lot of them...
// var zs = [];
// for (var g = 0; g < 10000; g++) {
//   var z = polar();
//   zs.push(z);
//   console.log(z);
// }

// var sum = 0;
// for (var m = 0; m < zs.length; m++) sum += zs[m];
// var mean = sum / zs.length;

// var variance = 0;
// for (var v = 0; v < zs.length; v++) variance += Math.pow(zs[v] - mean, 2);
// console.error('E[Z] = %s, Var[Z] = %s', mean, variance / zs.length);
