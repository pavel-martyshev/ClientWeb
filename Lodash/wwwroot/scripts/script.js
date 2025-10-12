"use strict";

(function () {
    const people = [
        { name: "Дмитрий", age: 28 },
        { name: "Елена", age: 24 },
        { name: "Сергей", age: 35 },
        { name: "Ольга", age: 31 },
        { name: "Ольга", age: 42 },
        { name: "Анна", age: 26 },
        { name: "Елена", age: 33 },
        { name: "Наталья", age: 29 },
        { name: "Игорь", age: 39 },
        { name: "Дмитрий", age: 27 }
    ];

    console.log(`Средний возраст всех людей: ${_.meanBy(people, p => p.age)}`);

    console.log(
        _.chain(people)
            .filter(p => {
                if (p.age >= 20 && p.age <= 30) {
                    return p;
                }
            })
            .orderBy(["age"])
            .value()
    );

    console.log(
        _.chain(people)
            .uniqBy(p => p.name)
            .filter(p => {
                if (p.age >= 20 && p.age <= 30) {
                    return p;
                }
            })
            .orderBy(["age"], ["desc"])
            .value()
    );

    console.log(_.countBy(people, "name"));
})();
