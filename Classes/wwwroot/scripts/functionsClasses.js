function Animal(name) {
    this.name = name;
}

Animal.prototype.speak = function() {
    console.log(`${this.name} издает звук`);
}

function Cat(name) {
    Animal.call(this, name);
}

Cat.prototype.speak = function() {
    console.log(`${this.name} мяукает`);
}

Object.setPrototypeOf(Cat.prototype, Animal.prototype);

function Dog(name) {
    Animal.call(this, name);
}

Dog.prototype.speak = function() {
    console.log(`${this.name} гавкает`);
}

Object.setPrototypeOf(Dog.prototype, Animal.prototype);

(function() {
    const animal = new Animal("Животное");
    animal.speak();

    const cat = new Cat("Сара");
    cat.speak();

    const dog = new Dog("Шарик");
    dog.speak();
})();