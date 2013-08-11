#!/usr/bin/env node
'use strict'; /*jslint indent: 2, node: true, es5: true */
var dgram = require('dgram');
var sock = dgram.createSocket('udp4');
sock.on('message', function(msg, rinfo) {
  console.log(msg, rinfo);
});
sock.on('error', function(err) {
  console.error('Error received:', err);
});
sock.bind(5050);
// , function() {
//     sock.addMembership('0.0.0.0');
// });
