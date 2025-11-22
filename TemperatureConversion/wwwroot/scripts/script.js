"use strict";

(function () {
    function isNumber(string) {
        return /^-?$|^-?[1-9]\d*([,.]\d*)?$/.test(string);
    }

    function convertFromCelsiusToKelvin(celsiusTemperature) {
        return celsiusTemperature + 273.15;
    }

    function convertFromCelsiusToFahrenheit(celsiusTemperature) {
        return celsiusTemperature * 1.8 + 32;
    }

    function convertTemperature(e) {
        e.preventDefault();
        const temperatureInput = document.querySelector(".temperature-input");

        if (temperatureInput.value === "") {
            return;
        }

        const celsiusTemperature = Number(temperatureInput.value.replace(",", "."));

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
        let lastValidValue = "";

        temperatureInput.addEventListener("input", e => {
            const value = e.target.value.trim();

            if (isNumber(value)) {
                lastValidValue = value;
            } else {
                e.target.value = lastValidValue;
            }
        });

        const converterForm = document.querySelector(".converter-form");
        converterForm.addEventListener("submit", convertTemperature);
    });
})();
