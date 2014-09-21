#!/usr/bin/env node
/*jslint node: true */
var dgram = require('dgram');
var socket = dgram.createSocket('udp4');

// port 9004 goes well with the server in ../c/datagrams.c

socket
.on('message', function(msg, rinfo) {
  console.log('message from %j: "%s"', rinfo, msg);
})
.on('error', function(err) {
  console.error('Error received:', err);
})
.on('listening', function() {
  console.log('Socket listening on address: %j', socket.address());
  //socket.addMembership('224.0.0.114');
  // 0.0.0.0 is the default, I think:
  //socket.addMembership('0.0.0.0');
})
.bind(9004);
