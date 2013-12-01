// Compare to ../python/sleeper.py
var i = 0;

(function loop() {
  console.log('loop #%d', i);
  i++;
  setTimeout(loop, 2000);
})();
