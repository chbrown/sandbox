#!/usr/bin/env node
var http = require('http');
var argv = require('optimist')
  .default({
    hostname: '127.0.0.1',
    port: 9009,
  }).argv;

var post = function(req, res) {
  req.on('data', function(chunk) {
    console.log('chunk', chunk.toString());
  });
  req.on('end', function() {
    res.end();
  });
};

http.createServer(function(req, res) {
  console.log('req.method', req.method);

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'X-Args');
  res.setHeader('Access-Control-Allow-Methods', '*');
  // res.setHeader('Access-Control-Expose-Headers', '*');
  // req.getHeader("Access-Control-Request-Headers"));

  if (req.method == 'POST') {
    post(req, res);
  }
  else {
    res.end();
  }
}).listen(argv.port, argv.hostname, function() {
  console.log('listening on http://%s:%d', argv.hostname, argv.port);
});
