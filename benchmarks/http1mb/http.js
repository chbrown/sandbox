var http = require('http');
var bytes = new Buffer(1024*1024);

for (var i = 0; i < bytes.length; i++) {
  bytes[i] = 100;
}

http.createServer(function (req, res) {
  res.writeHead(200);
  res.write(bytes);
  res.end();
}).listen(8000);
