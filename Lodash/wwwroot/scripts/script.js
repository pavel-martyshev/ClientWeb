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

    const peopleAged20To30 = _.chain(people)
        .filter(p => p.age >= 20 && p.age <= 30)
        .sortBy(p => p.age)
        .value();

    console.log(
        "Люди в возрасте от 20 до 30 включительно:",
        peopleAged20To30
    );

    const uniqueNamesAged20To30 = _.chain(peopleAged20To30)
        .uniqBy(p => p.name)
        .orderBy(["age"], ["desc"])
        .map(p => p.name)
        .value();

    console.log(
        "Список уникальных имен людей с возрастом от 20 до 30 включительно:",
        uniqueNamesAged20To30
    );

    const namesCount = _.countBy(people, "name");
    console.log("Количество каждого имени в списке:", namesCount);
})();
