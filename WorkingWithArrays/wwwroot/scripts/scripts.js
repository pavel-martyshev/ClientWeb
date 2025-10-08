"use strict";

(function () {
    function getNumbersArray(length) {
        return Array.from({ length: length }, (_, i) => i + 1);
    }

    function getFirstFiveElements(array) {
        return array.slice(0, 5);
    }

    function getLastFiveElements(array) {
        return array.slice(-5);
    }

    function getAllEvenNumbersSum(array) {
        return array.reduce((sum, number) => {
            if (number % 2 === 0) {
                return sum + number;
            }

            return sum;
        }, 0);
    }

    function getEvenNumbersSquares(array) {
        return Array.from(
            array.filter((number) => number % 2 === 0),
            (number) => number * number
        );
    }

    const numbersArray = getNumbersArray(10);
    numbersArray.sort((a, b) => b - a);

    const firstFiveElements = getFirstFiveElements(numbersArray);
    const lastFiveElements = getLastFiveElements(numbersArray);

    console.log(`Первые 5 элементов: ${firstFiveElements.join(", ")}`);
    console.log(`Последние 5 элементов: ${lastFiveElements.join(", ")}`);
    console.log(`Сумма всех четных чисел = ${getAllEvenNumbersSum(numbersArray)}`);

    const oneHundredNumbersArray = getNumbersArray(100);
    console.log(`Квадраты четных чисел:\n${getEvenNumbersSquares(oneHundredNumbersArray).join("\n")}`);
})();
