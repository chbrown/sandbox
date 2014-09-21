/*jslint node: true */
var glob = require('glob');

console.error('Compare the results of `echo **/*.py` to the following:\n');

var glob_stream = new glob.Glob('**/*.py');
glob_stream.on('match', function(filename) {
  console.log(filename);
});
glob_stream.on('end', function() {
  console.error('--DONE--');
});
