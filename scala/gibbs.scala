// Compare to ../nodejs/gibbs.js
var count = 0
val max = 100000000
for (i <- 1 to max) {
  val x = Math.random * 2 - 1
  val y = Math.random * 2 - 1
  if (x*x + y*y < 1) count += 1
}
println("Pi is roughly " + 4.0 * count / max)
