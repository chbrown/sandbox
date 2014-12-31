/*jslint node: true */
var net = require('net');

var server = net.createServer();
server.on('listening', function() {
  console.log('server:listening -> %j', server.address());
})
server.on('connection', function(socket) {
  console.log('server:connection');

  socket.on('drain', function() {
    console.log('socket:drain');
  });
  socket.on('data', function(buffer) {
    console.log('socket:data=%j', buffer.toString());
  });
  socket.on('error', function(err) {
    console.log('socket:error', err);
  });
  socket.on('close', function() {
    console.log('socket:close');
  });
  socket.on('end', function() {
    console.log('socket:end');
  });

  // socket.write('done\n');
  // socket.end();
});
server.on('error', function(err) {
  console.log('server:error', err);
})
server.on('close', function() {
  console.log('server:close');
})

// server.listen('/tmp/listen.sock');
server.listen(6600);

// echo 'hello' > /tmp/listen.sock
// echo 'Message' > /dev/tcp/127.0.0.1/6600
// echo 'waiting' | nc localhost 6600
