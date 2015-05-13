function memoize<T>(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<T>) {
  var get = descriptor.get;
  var memoizedPropertyKey = `_memoized_${propertyKey}`;
  descriptor.get = function() {
    if (!this.hasOwnProperty(memoizedPropertyKey)) {
      this[memoizedPropertyKey] = get.call(this);
    }
    return this[memoizedPropertyKey];
  }
  return descriptor;
}

class NumberSeries {
  constructor(public value: number) { }

  @memoize
  get numberOfDigits(): number {
    console.log('Getting the total number of digits in all natural numbers < %d', this.value);
    var digits = '';
    for (var i = 0; i < this.value; i++) {
      digits += i.toFixed(0);
    }
    return digits.length;
  }
}

var million = new NumberSeries(1000000);
console.error(million.numberOfDigits);
console.error(million.numberOfDigits);
