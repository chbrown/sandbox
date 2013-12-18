function EventEmitter() {
  this.events = {};
}
EventEmitter.prototype.on = function(name, callback, context) {
  if (this.events[name] === undefined) this.events[name] = [];
  this.events[name].push({fn: callback, thisArg: context});
  return this;
};
EventEmitter.prototype.off = function(name, callback) {
  for (var i = (this.events[name] ? this.events[name].length : 0) - 1; i >= 0; i--) {
    if (this.events[name][i].callback === callback) {
      this.events[name].splice(i, 1);
    }
  }
};
EventEmitter.prototype.emit = function(name /*, args*/) {
  var length = this.events[name] ? this.events[name].length : 0;
  var args = Array.prototype.slice.call(arguments, 1);
  for (var i = 0; i < length; i++) {
    var handler = this.events[name][i];
    handler.fn.apply(handler.thisArg, args);
  }
};

/** extend (inherit from) like this:

    var Control = function() {
      EventEmitter.call(this);
      // etc.
    }
    Control.prototype = Object.create(EventEmitter.prototype);
    Control.prototype.constructor = Control;

*/
