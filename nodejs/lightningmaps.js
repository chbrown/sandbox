/*jslint node: true */
var WebSocket = require('ws');

var ws = new WebSocket('ws://ws.lightningmaps.org/');

ws.on('message', function(string, flags) {
  var data = JSON.parse(string);
  var strokes = data.strokes || [];
  strokes.forEach(function(stroke) {
    console.log('[%s] lat=%s, lon=%s (%d)', stroke.time, stroke.lat, stroke.lon, stroke.dev);
  });
});
