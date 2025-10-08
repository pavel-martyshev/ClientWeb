(function () {
    function getCountriesArray() {
        return [
            {
                name: "Япония",
                cities: [
                    {
                        name: "Токио",
                        population: 13960000
                    },
                    {
                        name: "Осака",
                        population: 2740000
                    },
                    {
                        name: "Нагоя",
                        population: 2320000
                    },
                    {
                        name: "Киото",
                        population: 1460000
                    },
                    {
                        name: "Саппоро",
                        population: 1920000
                    }
                ]
            },
            {
                name: "Италия",
                cities: [
                    {
                        name: "Рим",
                        population: 2870000
                    },
                    {
                        name: "Милан",
                        population: 1370000
                    },
                    {
                        name: "Флоренция",
                        population: 710000
                    }
                ]
            },
            {
                name: "Финляндия",
                cities: [
                    {
                        name: "Хельсинки",
                        population: 660000
                    },
                    {
                        name: "Тампере",
                        population: 250000
                    }
                ]
            },
            {
                name: "Перу",
                cities: [
                    {
                        name: "Лима",
                        population: 9700000
                    },
                    {
                        name: "Арекипа",
                        population: 1000000
                    },
                    {
                        name: "Трухильо",
                        population: 920000
                    },
                    {
                        name: "Куско",
                        population: 435000
                    }
                ]
            },
            {
                name: "Марокко",
                cities: [
                    {
                        name: "Касабланка",
                        population: 3700000
                    },
                    {
                        name: "Рабат",
                        population: 580000
                    },
                    {
                        name: "Марракеш",
                        population: 840000
                    },
                    {
                        name: "Фес",
                        population: 1150000
                    },
                    {
                        name: "Танжер",
                        population: 1100000
                    },
                    {
                        name: "Агадир",
                        population: 420000
                    }
                ]
            }
        ];
    }

    function getCountriesWithMostCountCities(countries) {
        const maxCitiesCount = Math.max(...countries.map((country) => country.cities.length));
        return countries.filter((country) => country.cities.length === maxCitiesCount);
    }

    function getCountriesWithPopulation(countries) {
        const countriesWithPopulations = {};

        countries.forEach((country) => {
            countriesWithPopulations[country.name] = country.cities.reduce((populationSum, city) => {
                return populationSum + city.population;
            }, 0);
        });

        return countriesWithPopulations;
    }

    const countries = getCountriesArray();

    const countriesWithMostCountCities = getCountriesWithMostCountCities(countries);
    console.log(
        `Страны с самым большим количеством городов:\n${countriesWithMostCountCities
            .map((country) => country.name)
            .join("\n")}`
    );

    console.log(getCountriesWithPopulation(countries));
})();
