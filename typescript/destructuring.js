function move(_a, dx, dy) {
    var x = _a.x, y = _a.y;
    return { x: x + dx, y: y + dy };
}
var originalPoint = { x: 10, y: 10 };
var movedPoint = move(originalPoint, 30, 40);
console.log('current location:', movedPoint);
// outputs: "current location: { x: 40, y: 50 }"
var Point = (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    return Point;
})();
var pointInstance = new Point(-5, -5);
console.log('current location:', move(pointInstance, 10, 10));
