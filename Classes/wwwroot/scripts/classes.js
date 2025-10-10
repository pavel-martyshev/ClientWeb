class ClassAnimal {
    constructor(name) {
        this.name = name;
    }

    speak() {
        console.log(`${this.name} издает звук`);
    }
}

class ClassCat extends ClassAnimal {
    constructor(name) {
        super(name);
    }

    speak() {
        console.log(`${this.name} мяукает`);
    }
}

class ClassDog extends ClassAnimal {
    constructor(name) {
        super(name);
    }

    speak() {
        console.log(`${this.name} гавкает`);
    }
}

(function() {
    const animal = new ClassAnimal("Животное");
    animal.speak();

    const cat = new ClassCat("Сара");
    cat.speak();

    const dog = new ClassDog("Шарик");
    dog.speak();
})();