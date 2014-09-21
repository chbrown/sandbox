
function g() {
  var s = 'go';
  return function f(x) {
    if (x == 'al') {
      return s + x;
    }
    else {
      s += 'o';
      return f;
    }
  };
}

console.log('1', g()('al'));
console.log('2', g()()('al'));
console.log('3', g()()()('al'));

console.log('7', g()()()()()()()('al'));


