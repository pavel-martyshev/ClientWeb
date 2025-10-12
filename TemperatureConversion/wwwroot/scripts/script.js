"use strict";

(function () {
    function convertFromCelsiusToKelvin(celsiusTemperature) {
        return (celsiusTemperature + 273.15).toFixed(2);
    }

    function convertFromFahrenheitToKelvin(celsiusTemperature) {
        return (celsiusTemperature * 1.8 + 32).toFixed(2);
    }

    function convertTemperature() {
        const temperatureInput = document.querySelector(".temperature-input");

        if (temperatureInput.value === "") {
            return;
        }

        const celsiusTemperature = Number(temperatureInput.value);

        if (isNaN(celsiusTemperature)) {
            temperatureInput.value = "";
            return;
        }

        const kelvinTemperatureResult = document.querySelector(".kelvin-temperature");
        kelvinTemperatureResult.textContent = `${celsiusTemperature} °C = ${convertFromCelsiusToKelvin(celsiusTemperature)} K`;

        const fahrenheitTemperatureResult = document.querySelector(".fahrenheit-temperature");
        fahrenheitTemperatureResult.textContent = `${celsiusTemperature} °C = ${convertFromFahrenheitToKelvin(celsiusTemperature)} ℉`;
    }

    window.addEventListener("DOMContentLoaded", () => {
        const temperatureInput = document.querySelector(".temperature-input");
        temperatureInput.addEventListener("input", (e) => {
            if (!e.target.value.match(/^-?\d*,?\d*$/g)) {
                e.target.value = e.target.value.slice(0, -1);
            }
        });
        temperatureInput.addEventListener("keydown", event => {
            if (event.key === "Enter") {
                convertTemperature();
            }
        });

        const convertButton = document.querySelector(".convert-button");
        convertButton.addEventListener("click", convertTemperature);
    })
})();
