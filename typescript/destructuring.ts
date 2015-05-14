function move({x, y}, dx: number, dy: number) {
  return {x: x + dx, y: y + dy};
}
var originalPoint = {x: 10, y: 10};
var movedPoint = move(originalPoint, 30, 40);
console.log('current location:', movedPoint);
// outputs: "current location: { x: 40, y: 50 }"
