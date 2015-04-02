var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Sedan = (function () {
    function Sedan() {
    }
    Sedan.upgrades = [Convertible, MonsterTruck];
    return Sedan;
})();
var Convertible = (function (_super) {
    __extends(Convertible, _super);
    function Convertible() {
        _super.apply(this, arguments);
    }
    Convertible.upgrades = [MonsterTruck];
    return Convertible;
})(Sedan);
var Truck = (function () {
    function Truck() {
    }
    Truck.upgrades = [MonsterTruck];
    return Truck;
})();
var MonsterTruck = (function (_super) {
    __extends(MonsterTruck, _super);
    function MonsterTruck() {
        _super.apply(this, arguments);
    }
    MonsterTruck.upgrades = [];
    return MonsterTruck;
})(Truck);
var CarClasses = [Sedan, Convertible, Truck, MonsterTruck];
CarClasses.forEach(function (CarClass) {
    var upgrades = CarClass.upgrades.map(function (CarClass) {
        return CarClass['name'];
    });
    console.log('%s has upgrades: %j', CarClass['name'], CarClass.upgrades);
});
