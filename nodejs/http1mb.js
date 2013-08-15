var http = require('http');
var bytes = new Buffer(1024*1024);

// start this file with `node http1mb.js` and then benchmark it:
// ab -c 100 -n 10000 http://127.0.0.1:8000/

for (var i = 0; i < bytes.length; i++) {
  bytes[i] = 100;
}

http.createServer(function (req, res) {
  res.writeHead(200);
  res.write(bytes);
  res.end();
}).listen(8000);
