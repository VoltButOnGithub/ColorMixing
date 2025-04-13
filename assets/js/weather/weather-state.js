export const weatherState = {
    current: {
        city: "None (default)",
        temperature: 20,
        precipitation: 0,
    },
    mixersMixing: 0,
    onChange: [],
}

export const defaultWeatherState = {
    city: "None (default)",
    temperature: 20,
    precipitation: 0,
}

export const errorWeatherState = {
    city: "Error",
    temperature: 20,
    precipitation: 100,
}
