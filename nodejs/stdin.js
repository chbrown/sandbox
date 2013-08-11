'use strict'; /*jslint indent: 2, node: true, es5: true */
var data = '';
process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data', function(chunk) {
  console.log('Data!');
  process.stdout.write(chunk);
  data += chunk;
});
