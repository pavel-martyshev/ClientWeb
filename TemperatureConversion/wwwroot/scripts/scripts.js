function conversation() {
    const temperatureInput = document.querySelector(".temperature-input");
    const celsiusTemperature = Number(temperatureInput.value);
    temperatureInput.value = "";

    const kelvinTemperatureResult = document.querySelector(".kelvin-temperature");
    kelvinTemperatureResult.textContent = `${celsiusTemperature} °C = ${(celsiusTemperature + 273.15).toFixed(2)} K`;

    const fahrenheitTemperatureResult = document.querySelector(".fahrenheit-temperature");
    fahrenheitTemperatureResult.textContent = `${celsiusTemperature} °C = ${(celsiusTemperature * 1.8 + 32).toFixed(2)} ℉`;
}

(function() {
    const temperatureInput = document.querySelector(".temperature-input");
    temperatureInput.addEventListener("input", (e) => {
        e.target.value = e.target.value.replace(/[^0-9,.-]/g, "").replace(/,/g, ".");
    });

    const convertButton = document.querySelector(".convert-button");
    convertButton.addEventListener("click", conversation);
})();