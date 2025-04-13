export const weatherTemplate = (weatherInfo) => {
    const div = document.createElement('div');
    div.className = 'weather-info';
    div.innerHTML = `
        <p class="city-name">Current city: ${weatherInfo.city}</p>
        <p class="temperature">Temperature: ${weatherInfo.temperature} C</p>
        <p class="precipitation">Precipitation: ${weatherInfo.precipitation} mm</p>
    `;
    return div;
};