"use strict";

(function() {
    const array = Array.from({ length: 10 }, (_, i) => i + 1);
    array.reverse();

    const firstFiveElements = array.slice(0, 5);
    const lastFiveElements = array.slice(5);

    console.log(`Первые 5 элементов: ${firstFiveElements.join(", ")}`);
    console.log(`Последние 5 элементов: ${lastFiveElements.join(", ")}`);

    const sumWithInitial = array.reduce((accumulator, currentValue) => {
        if (currentValue % 2 === 0) {
            return accumulator + currentValue;
        }

        return accumulator;
    }, 0);

    console.log(`Сумма всех четных чисел - ${sumWithInitial}`);
})();

(function() {
    const array = Array.from({ length: 100 }, (_, i) => i + 1);
    const arrayEvenNumbersSquares = [];

    array.reduce((_, currentValue) => {
        if (currentValue % 2 === 0) {
            arrayEvenNumbersSquares.push(Math.sqrt(currentValue));
        }
    }, 0);

    console.log(`Квадраты четных чисел:\n${arrayEvenNumbersSquares.join("\n")}`);
})();