#!/usr/bin/env node
var dgram = require('dgram');
var sock = dgram.createSocket('udp4');
sock.on('message', function(msg, rinfo) {
    console.log(mdg, rinfo);
});
sock.on('error', function(err) {
    console.error('Error received:', err);
});
sock.bind(5050);
// , function() {
//     sock.addMembership('0.0.0.0');
// });
