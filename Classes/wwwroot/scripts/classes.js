"use strict";

(function () {
    class Animal {
        constructor(name) {
            this.name = name;
        }

        speak() {
            console.log(`${this.name} издает звук`);
        }
    }

    class Cat extends Animal {
        constructor(name) {
            super(name);
        }

        speak() {
            console.log(`${this.name} мяукает`);
        }
    }

    class Dog extends Animal {
        constructor(name) {
            super(name);
        }

        speak() {
            console.log(`${this.name} гавкает`);
        }
    }

    const animal = new Animal("Животное");
    animal.speak();

    const cat = new Cat("Сара");
    cat.speak();

    const dog = new Dog("Шарик");
    dog.speak();
})();
