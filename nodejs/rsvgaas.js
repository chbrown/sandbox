#!/usr/bin/env node
/*jslint node: true */
var path = require('path');
var http = require('http');
var child_process = require('child_process');
var argv = require('optimist')
  .default({
    hostname: '127.0.0.1',
    port: 1151,
  }).argv;

http.createServer(function(req, res) {
  // rsvg-convert --help ...
  // Application Options:
  //   -d, --dpi-x=<float>        pixels per inch [optional; defaults to 90dpi]
  //   -p, --dpi-y=<float>        pixels per inch [optional; defaults to 90dpi]
  //   -x, --x-zoom=<float>       x zoom factor [optional; defaults to 1.0]
  //   -y, --y-zoom=<float>       y zoom factor [optional; defaults to 1.0]
  //   -z, --zoom=<float>         zoom factor [optional; defaults to 1.0]
  //   -w, --width=<int>          width [optional; defaults to the SVG's width]
  //   -h, --height=<int>         height [optional; defaults to the SVG's height]
  //   -f, --format=[png, pdf, ps, svg, xml, recording]
  //                              save format [optional; defaults to 'png']
  //   -o, --output               output filename [optional; defaults to stdout]
  //   -a, --keep-aspect-ratio    whether to preserve the aspect ratio
  //                              [optional; defaults to FALSE]
  //   -b, --background-color=[black, white, #abccee, #aaa...]
  //                              set the background color
  //                              [optional; defaults to None]
  //   -v, --version              show version information
  //   --base-uri                 base uri

  var args = [];
  if (req.headers.args) {
    args = req.headers.args.split(/\s+/);
  }
  console.log('$ rsvg-convert', args);
  var proc = child_process.spawn('rsvg-convert', args, {
    // stdin, stdout, stderr
    stdio: ['pipe', 'pipe', process.stderr]
  });

  proc.on('error', function(err) {
    console.error('rsvg-convert child process error', err);
    res.end();
  });
  proc.stdout.pipe(res);
  req.pipe(proc.stdin);

}).listen(argv.port, argv.hostname, function() {
  console.log('listening on http://%s:%d', argv.hostname, argv.port);
});
