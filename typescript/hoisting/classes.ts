class Sedan {
  static upgrades = [Convertible, MonsterTruck]
}

class Convertible extends Sedan {
  static upgrades = [MonsterTruck]
}

class Truck {
  static upgrades = [MonsterTruck]
}

class MonsterTruck extends Truck  {
  static upgrades = []
}

var CarClasses = [Sedan, Convertible, Truck, MonsterTruck]
CarClasses.forEach(CarClass => {
  var upgrades = CarClass.upgrades.map(function(CarClass) {
    return CarClass['name'];
  });
  console.log('%s has upgrades: %j', CarClass['name'], CarClass.upgrades);
});
