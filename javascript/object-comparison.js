// http://stackoverflow.com/questions/1068834/object-comparison-in-javascript
Object.prototype.equals2 = function(x) {
  for (var p in this) {
      if(typeof(x[p])=='undefined') {return false;}
  }
  for (p in this) {
      if (this[p]) {
          switch(typeof(this[p])) {
              case 'object':
                  if (!this[p].equals(x[p])) { return false; } break;
              case 'function':
                  if (typeof(x[p])=='undefined' ||
                      (p != 'equals' && this[p].toString() != x[p].toString()))
                      return false;
                  break;
              default:
                  if (this[p] != x[p]) { return false; }
          }
      } else {
          if (x[p])
              return false;
      }
  }
  for (p in x) {
      if(typeof(this[p])=='undefined') {return false;}
  }
  return true;
};

function compare(a, b) {
  if (Array.isArray(a) && Array.isArray(b)) {

  }
  else if (Array.isArray(a) || Array.isArray(b)) {
    throw new Error('a and b are not the same type (only one is an array).');
  }
  else {
    if (typeof(a) == 'object' && typeof(b) == 'object') {
      compareObjects(a, b);
    }
  }
}
function compareLists(a, b) {
  if (a.length != b.length) {
    throw new Error('a and b are not the same length.');
  }
  for (var i = 0; i < a.length; i++) {
    compare(a[i], b[i]);
  }
}
function compareObjects(a, b) {
  var a_keys = Object.keys(a), b_keys = Object.keys(b);
  if (a_keys.length != b_keys.length) {
    throw new Error('a and b do not have the same keys.');
  }
  for (var i = 0; i < a.length; i++) {
    compare(a[i], b[i]);
  }
}

function assertEq(a, b) {
  if (a.equals(b)) {
    console.log('Sweet!');
  }
  else {
    console.log(a, '!=', b);
  }
}
