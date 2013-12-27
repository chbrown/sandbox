/** Instructions:

npm install NodObjC

Documentation:

https://github.com/TooTallNate/NodObjC

*/
var ObjC = require('NodObjC');

// First import the "Foundation" framework
ObjC.framework('Foundation');

// Setup the recommended NSAutoreleasePool instance
var pool = ObjC.NSAutoreleasePool('alloc')('init');

// NSStrings and JavaScript Strings are distinct objects, you must create an
//   NSString from a JS String when an Objective-C class method requires one.
var string = ObjC.NSString('stringWithUTF8String', 'Hello Objective-C World!');

// Print out the contents of string -- .toString() ends up calling [string description]
console.log(string);
// Prints "Hello Objective-C World!"

var pasteboard = ObjC.NSPasteboard.generalPasteboard();
// can do pasteboard-type things with this pasteboard...

pool('drain');
