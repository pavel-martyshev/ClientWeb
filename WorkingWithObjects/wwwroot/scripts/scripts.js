(function () {
  const countries = [
    {
      name: "Япония",
      towns: [
        {
          name: "Токио",
          population: 13960000,
        },
        {
          name: "Осака",
          population: 2740000,
        },
        {
          name: "Нагоя",
          population: 2320000,
        },
        {
          name: "Киото",
          population: 1460000,
        },
        {
          name: "Саппоро",
          population: 1920000,
        },
      ],
    },
    {
      name: "Италия",
      towns: [
        {
          name: "Рим",
          population: 2870000,
        },
        {
          name: "Милан",
          population: 1370000,
        },
        {
          name: "Флоренция",
          population: 710000,
        },
      ],
    },
    {
      name: "Финляндия",
      towns: [
        {
          name: "Хельсинки",
          population: 660000,
        },
        {
          name: "Тампере",
          population: 250000,
        },
      ],
    },
    {
      name: "Перу",
      towns: [
        {
          name: "Лима",
          population: 9700000,
        },
        {
          name: "Арекипа",
          population: 1000000,
        },
        {
          name: "Трухильо",
          population: 920000,
        },
        {
          name: "Куско",
          population: 435000,
        },
      ],
    },
    {
      name: "Марокко",
      towns: [
        {
          name: "Касабланка",
          population: 3700000,
        },
        {
          name: "Рабат",
          population: 580000,
        },
        {
          name: "Марракеш",
          population: 840000,
        },
        {
          name: "Фес",
          population: 1150000,
        },
        {
          name: "Танжер",
          population: 1100000,
        },
        {
          name: "Агадир",
          population: 420000,
        },
      ],
    },
  ];

  const countryWithMostTowns = countries.reduce(
    (countryWithMostTowns, current) => {
      if (!countryWithMostTowns) {
        return current;
      }

      current.towns.length > countryWithMostTowns.towns.length
        ? current
        : countryWithMostTowns;
    },
    0
  );

  console.log(countryWithMostTowns.name);

  const countriesWithPopulation = {};
  countries.forEach((country) => {
    countriesWithPopulation[country.name] = country.towns.reduce(
      (entirePopulation, currentTown) => {
        return entirePopulation + currentTown.population;
      },
      0
    );
  });

  console.log(countriesWithPopulation);
})();
