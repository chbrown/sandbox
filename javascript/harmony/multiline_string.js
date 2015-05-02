function raw(arg1) {
  console.log(arg1);
  return 'ignored';
}

var s = raw`
    xref
    0 6
    0000000000 65535 f
    0000000015 00000 n
    0000000096 00000 n
    0000000304 00000 n
    0000000443 00000 n
    0000001293 00000 n
    `;

console.log('<' + s + '>');
