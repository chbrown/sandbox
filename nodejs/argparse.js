#!/usr/bin/env node

var args = (function(argv) {
  var args = {};
  var f = 0;
  for (var arg, i = 0; (arg = argv[i]); i++) {
    if (arg.match(/^-.+/)) {
      var next = argv[i+1];
      if (arg.match(/=/)) {
        var parts = arg.split(/=/);
        arg = parts[0];
        next = parts.slice(1).join('=');
      }
      else if (next && !next.match(/^-.+/)) {
        i++;
      }
      else {
        next = true;
      }
      args[arg.slice(1)] = next;
    }
    else {
      args[f++] = arg;
    }
  }
  return args;
})(process.argv.slice(2));

console.log('optimist', require('optimist').argv);
console.log('process', process.argv);
console.log('argparse', args);
