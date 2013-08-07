var http = require('http');

http.createServer(function (req, res) {
  setTimeout(function () {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World');
  }, 20);
}).listen(80);

console.log('Server running at http://127.0.0.1:80/');
