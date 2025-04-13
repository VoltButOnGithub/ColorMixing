import {getWeatherForCity} from "./weather.js";
import {weatherTemplate} from "../templates/weather-template.js";
import {weatherState} from "./weather-state.js";

class WeatherForm {
    constructor() {
        this.cityInputElement = document.getElementById("city-input");
        this.applyCityButton = document.getElementById("apply-city-button");
        this.applyCityButton.addEventListener("click", (e) => {
            e.preventDefault();
            this.applyCity();
        });
        this.weatherInfoElement = document.getElementById("weather-info");
        this.applyCity();
    }

    async applyCity() {
        weatherState.current = await getWeatherForCity(this.cityInputElement.value);
        weatherState.onChange.forEach((value) => value());
        this.updateWeatherInfo();
    }

    updateWeatherInfo() {
        this.weatherInfoElement.innerHTML = '';
        this.weatherInfoElement.appendChild(weatherTemplate(weatherState.current));
    }

}

document.addEventListener('DOMContentLoaded', () => {
    const weatherForm = new WeatherForm();
});