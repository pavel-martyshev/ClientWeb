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

    const peopleAverageAge = _.meanBy(people, p => p.age);
    console.log(`Средний возраст всех людей: ${peopleAverageAge}`);

    const peopleAgedFrom20To30 = _.chain(people)
        .filter(p => p.age >= 20 && p.age <= 30)
        .sortBy(p => p.age)
        .value();

    console.log(
        "Люди в возрасте от 20 до 30 включительно:",
        peopleAgedFrom20To30
    );

    const uniqueNamesAgedFrom20To30 = _.chain(peopleAgedFrom20To30)
        .map(p => p.name)
        .uniq()
        .sort()
        .reverse()
        .value();

    console.log(
        "Список уникальных имен людей с возрастом от 20 до 30 включительно:",
        uniqueNamesAgedFrom20To30
    );

    const namesCounts = _.countBy(people, "name");
    console.log("Количество каждого имени в списке:", namesCounts);
})();
