if (typeof __decorate !== "function") __decorate = function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
function memoize(target, propertyKey, descriptor) {
    var get = descriptor.get;
    var memoizedPropertyKey = "_memoized_" + propertyKey;
    descriptor.get = function () {
        if (!this.hasOwnProperty(memoizedPropertyKey)) {
            this[memoizedPropertyKey] = get.call(this);
        }
        return this[memoizedPropertyKey];
    };
    return descriptor;
}
var NumberSeries = (function () {
    function NumberSeries(value) {
        this.value = value;
    }
    Object.defineProperty(NumberSeries.prototype, "numberOfDigits", {
        get: function () {
            console.log('Getting the total number of digits in all natural numbers < %d', this.value);
            var digits = '';
            for (var i = 0; i < this.value; i++) {
                digits += i.toFixed(0);
            }
            return digits.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumberSeries.prototype, "numberOfDigits",
        __decorate([
            memoize
        ], NumberSeries.prototype, "numberOfDigits", Object.getOwnPropertyDescriptor(NumberSeries.prototype, "numberOfDigits")));
    return NumberSeries;
})();
var million = new NumberSeries(1000000);
console.error(million.numberOfDigits);
console.error(million.numberOfDigits);
