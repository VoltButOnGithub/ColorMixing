import {getCityCoordinates} from "./location.js";
import {defaultWeatherState} from "./weather-state.js";

export async function getWeatherForCity(cityName) {
    const coordinates = await getCityCoordinates(cityName);

    // Construct the weather API URL
    const weatherApiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&current=temperature_2m,precipitation`;

    const response = await fetch(weatherApiUrl);

    if (!response.ok) {
        return defaultWeatherState;
    }

    const weatherData = await response.json();

    return {
        city: `${coordinates.name}, ${coordinates.country}`,
        temperature: weatherData.current.temperature_2m,
        precipitation: weatherData.current.precipitation,
    }
}