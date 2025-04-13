export async function getCityCoordinates(cityName) {
    const apiUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
        return {
            latitude: 25.40389,
            longitude: 101.15333,
            name: "Not found",
            country: "defaulting to Mixing, China"
        }
    }

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
        return {
            latitude: 25.40389,
            longitude: 101.15333,
            name: "Not found",
            country: "defaulting to Mixing, China"
        }
    }

    const firstResult = data.results[0];
    return {
        latitude: firstResult.latitude,
        longitude: firstResult.longitude,
        name: firstResult.name,
        country: firstResult.country
    };

}