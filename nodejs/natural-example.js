/*jslint node: true */
var natural = require('natural');
// From https://github.com/NaturalNode/natural
// npm install natural

function timeit(func, name, iterations) {
  if (iterations === undefined) iterations = 1000;
  var started = Date.now(), ended, ms; // Date.now() retuns millisecond ticks
  for (var i = 0; i < 1000000; i++) {
    func();
  }
  ended = Date.now();
  ms = ended - started;
  console.log(iterations + ' ' + name + ': ' + ms + 'ms, ' + (ms/iterations) + 'ms per loop');
  return ms;
}

timeit(function() {
  natural.JaroWinklerDistance("jellyfish", "smellyfish");
}, 'jaro', 1000000);
