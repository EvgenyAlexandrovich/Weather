export const UI = {
    search: {
        form: document.getElementById("form"),
        value: document.getElementById("searchCity"),
    },
    weatherNow: {
        currentCity: document.getElementById("lastRequestWeather"),
        temp: document.getElementById("lastRequestTemp"),
        imgCloud: document.getElementById("imgCloud"),
        weatherBlock: document.getElementById("weatherBlock"),
        iconFavorites: document.getElementById("favorites"),
        feelsLike: document.getElementById("feelsLike"),
        sunrise: document.getElementById("sunrise"),
        sunset: document.getElementById("sunset"),
    },
    favorites: {
        listCities: document.getElementById("listCities"),
    },
    forecast: { block: document.querySelector(".sectionForestDay") },
};

export const city = document.getElementById("searchCity");
export const form = document.getElementById("form");

export const lastRequestWeather = document.getElementById("lastRequestWeather");
export const lastRequestTemp = document.getElementById("lastRequestTemp");
export const imgCloud = document.getElementById("imgCloud");
export const weatherBlock = document.getElementById("weatherBlock");
export const like = document.getElementById("favorites");
export const feelsLike = document.getElementById("feelsLike");
export const sunrise = document.getElementById("sunrise");
export const sunset = document.getElementById("sunset");

export const listCities = document.getElementById("listCities");
export const forecast = document.querySelector(".sectionForestDay");
