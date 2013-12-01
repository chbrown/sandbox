// Compare to ../scala/gibbs.scala
// var started = (new Date()).getTime();
var count = 0;
var max = 100000000;
for (var i = 1; i < max; i++) {
  var x = Math.random() * 2 - 1;
  var y = Math.random() * 2 - 1;
  if ((x*x) + (y*y) < 1) {
    count++;
  }
  // if (i % 100) {
  //   var est = "\r" + 4.0 * count / max;
  //   process.stdout.write(est);
  //   var spacer = 40 - est.length
  //   process.stdout.write();
  //   process.stdout.flush();
  // }
}
// var ended = (new Date()).getTime();
//  + " in " + ((ended - started) / 1000.0) + "s"
console.log("Pi is roughly " + 4.0 * count / max);
