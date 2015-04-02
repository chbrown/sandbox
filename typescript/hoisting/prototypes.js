var util = require('util');

function Sedan() {}
Sedan.upgrades = [Convertible, MonsterTruck];

function Convertible() {}
Convertible.upgrades = [MonsterTruck];
util.inherits(Convertible, Sedan);

function Truck() {}
Truck.upgrades = [MonsterTruck];

function MonsterTruck() {}
MonsterTruck.upgrades = [];
util.inherits(MonsterTruck, Truck);

var CarConstructors = [Sedan, Convertible, Truck, MonsterTruck];
CarConstructors.forEach(function(CarConstructor) {
  var upgrades = CarConstructor.upgrades.map(function(CarConstructor) {
    return CarConstructor.name;
  });
  console.log('%s has upgrades: %j', CarConstructor.name, upgrades);
});
