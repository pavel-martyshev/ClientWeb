"use strict";

(function () {
    function matchTemperatureInput(temperature) {
        return temperature.match(/^-?\d*,?\d*$/g);
    }

    function convertFromCelsiusToKelvin(celsiusTemperature) {
        return (celsiusTemperature + 273.15);
    }

    function convertFromCelsiusToFahrenheit(celsiusTemperature) {
        return (celsiusTemperature * 1.8 + 32);
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
        kelvinTemperatureResult.textContent = `${celsiusTemperature} °C = ${convertFromCelsiusToKelvin(celsiusTemperature).toFixed(2)} K`;

        const fahrenheitTemperatureResult = document.querySelector(".fahrenheit-temperature");
        fahrenheitTemperatureResult.textContent = `${celsiusTemperature} °C = ${convertFromCelsiusToFahrenheit(celsiusTemperature).toFixed(2)} ℉`;
    }

    window.addEventListener("DOMContentLoaded", () => {
        const temperatureInput = document.querySelector(".temperature-input");

        temperatureInput.addEventListener("input", e => {
            if (!matchTemperatureInput(e.target.value)) {
                e.target.value = e.target.value.slice(0, -1);
            }
        });

        temperatureInput.addEventListener("paste", e => {
            e.preventDefault();
  
            const clipboardData = e.clipboardData.getData("text/plain");

            if (matchTemperatureInput(clipboardData)) {
                temperatureInput.value = clipboardData;
            }
        });

        temperatureInput.addEventListener("keydown", e => {
            if (e.key === "Enter") {
                convertTemperature();
            }
        });

        const convertButton = document.querySelector(".convert-button");
        convertButton.addEventListener("click", convertTemperature);
    });
})();
