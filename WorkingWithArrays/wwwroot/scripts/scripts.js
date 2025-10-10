"use strict";

(function () {
    function getNumbersArray(length) {
        return Array.from({ length }, (_, i) => i + 1);
    }

    function getFirstFewElements(array, elementsNumber) {
        return array.slice(0, elementsNumber);
    }

    function getLastFewElements(array, elementsNumber) {
        return array.slice(-elementsNumber);
    }

    function getEvenNumbersSum(array) {
        return array.reduce((sum, number) => {
            if (number % 2 === 0) {
                return sum + number;
            }

            return sum;
        }, 0);
    }

    function getEvenNumbersSquares(array) {
        return array
            .filter(number => number % 2 === 0)
            .map(number => number * number);
    }

    const numbersArray = getNumbersArray(10);
    numbersArray.sort((a, b) => b - a);

    const firstFiveElements = getFirstFewElements(numbersArray, 5);
    const lastFiveElements = getLastFewElements(numbersArray, 5);

    console.log(`Первые 5 элементов: ${firstFiveElements.join(", ")}`);
    console.log(`Последние 5 элементов: ${lastFiveElements.join(", ")}`);
    console.log(`Сумма всех четных чисел = ${getEvenNumbersSum(numbersArray)}`);

    const oneHundredNumbersArray = getNumbersArray(100);
    console.log(`Квадраты четных чисел:\n${getEvenNumbersSquares(oneHundredNumbersArray).join("\n")}`);
})();
