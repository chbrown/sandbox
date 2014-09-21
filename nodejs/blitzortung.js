/*jslint node: true */
var WebSocket = require('ws');

// port is random between 8010 and 8019, inclusive
var ws = new WebSocket('ws://websocketserver.blitzortung.org:8013/');

ws.on('open', function() {
  // http://www.blitzortung.org/Webpages/index.php?lang=en&page_0=30

  // {"region":3,"west":-108,"east":-92,"north":38,"south":24.3}

  var areas = {
    europe: {"region":1,"west":-20,"east":44,"north":71.5,"south":23.1},
    oceania: {"region":2,"west":110,"east":180,"north":10,"south":-51.6},
    north_america: {"region":3,"west":-130,"east":-60,"north":62.5,"south":2.3},
    asia: {"region":4,"west":85,"east":155,"north":58,"south":-4.5},
    south_america: {"region":5,"west":-102,"east":-22,"north":16,"south":-57},
  };

  ws.send(JSON.stringify(areas.north_america));
});

ws.on('message', function(string, flags) {
  var data = JSON.parse(string);
  console.log('[%s] lat=%s, lon=%s (%s) %s', data.time, data.lat, data.lon, data.dev, data.delay);
});
