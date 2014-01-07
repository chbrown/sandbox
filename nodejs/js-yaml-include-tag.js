'use strict'; /*jslint node: true, es5: true, indent: 2 */
var fs = require('fs');
var eyes = require('eyes');
var yaml = require('js-yaml');

// for !!include:
// var includeYamlType = new yaml.Type('tag:yaml.org,2002:include', {

var includeYamlType = new yaml.Type('!include', {
  loadKind: 'scalar', // other Kind options: 'sequence', 'mapping'
  loadResolver: function (state) {
    // access the tagged data from YAML via `state.result`
    // after resolving, set `state.result` to the resolved value
    var filename = state.result;
    var contents = fs.readFileSync(filename, {encoding: 'utf8'});
    // use the same circularly-dependent schema, and yay for hoisting!
    state.result = yaml.load(contents, {schema: INCLUDE_SCHEMA});
    return true; // return false on error
  },
});

var INCLUDE_SCHEMA = yaml.Schema.create([includeYamlType]);

var text = fs.readFileSync('test_include_tag.yaml', {encoding: 'utf8'});
var doc = yaml.load(text, {schema: INCLUDE_SCHEMA});
eyes.inspect(doc, 'document');
// util.inspect(loaded, false, 20, true)
// console.error(error.stack || error.message || String(error));
