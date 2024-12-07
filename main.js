import { getDate } from "./helpers.js";
import { storage } from "./storage.js";
import { UI } from "./ui.js";

const apiKey = "7f29c2bc7747d22a3855ca8cc66a7b47"; // этот ключ имеет ограничение в кол-ве запросов, если будут ошибки - придется сгенерировать новый или спросить в чате
let lat;
let lon;
const currentCity = storage.getCurrentCity();
let favoriteCities = storage.getFavoriteCities();

const fetchWeatherNow = (cityName) => {
    const serverUrl = "http://api.openweathermap.org/data/2.5/weather";
    const url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;
    return fetch(url).then((response) => {
        if (response.status === 404) {
            throw new Error("city not found!");
        }
        return response.json();
    });
};

const fetchWeatherForecast = () => {
    const serverUrl = "https://api.openweathermap.org/data/2.5/forecast";
    const url = `${serverUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    return fetch(url).then((response) => {
        if (response.status === 404) {
            throw new Error("Ошибка");
        }
        return response.json();
    });
};

const getAndRenderWeather = async (city) => {
    if (city !== null) {
        await fetchWeatherNow(city)
            .then((data) => {
                renderWeatherNow(data);

                lon = data.coord.lon;
                lat = data.coord.lat;
            })
            .catch((error) => {
                alert(error.message);
                console.error(error);
            });

        fetchWeatherForecast()
            .then((data) => {
                renderWeatherForecast(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }
};

getAndRenderWeather(currentCity);
renderFavorites(favoriteCities);

UI.search.form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let searchCity = UI.search.value.value.trim();

    if (searchCity === "") {
        return alert("Поле ввода не может быть пустым");
    }

    getAndRenderWeather(searchCity);
    storage.saveCurrentCity(searchCity);
});

UI.weatherNow.weatherBlock.addEventListener("click", (e) => {
    if (e.target.id === "favorites") {
        UI.weatherNow.iconFavorites.src = "assets/heart active.svg";

        if (!favoriteCities.includes(UI.weatherNow.currentCity.innerText)) {
            favoriteCities.push(UI.weatherNow.currentCity.innerText);
            renderFavorites(favoriteCities);

            storage.saveFavoriteCities(favoriteCities);
        }
    }
});

UI.favorites.listCities.addEventListener("click", async (e) => {
    let city = e.target.innerText;
    if (e.target.id === "selectedCities") {
        getAndRenderWeather(city);
        storage.saveCurrentCity(city);
    }
    if (e.target.id === "deleteCity") {
        const targetCity = e.target.parentElement.id;
        favoriteCities = favoriteCities.filter((city) => targetCity !== city);
        renderFavorites(favoriteCities);
        storage.saveFavoriteCities(favoriteCities);
    }
});

function renderWeatherNow(data) {
    UI.weatherNow.currentCity.innerText = data.name;
    UI.weatherNow.temp.innerText = data.main.temp.toFixed() + "°";
    UI.weatherNow.imgCloud.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    UI.weatherNow.iconFavorites.src = `assets/heart ${
        favoriteCities.includes(data.name) ? "active" : "inactive"
    }.svg`;
    UI.weatherNow.feelsLike.innerText = `Feels like: ${data.main.feels_like.toFixed()}`;
    UI.weatherNow.sunrise.innerText = `Sunrise: ${getDate(data.sys.sunrise)}`;
    UI.weatherNow.sunset.innerText = `Sunset: ${getDate(data.sys.sunset)}`;
}

function renderWeatherForecast(data) {
    let forecastWeather = "";
    const array = data.list;
    for (let i = 0; i < 3; i++) {
        const element = array[i];
        forecastWeather += `<div class="blockForecastDay">
                    <div class="elBlockForecast">${getDate(element.dt)}</div>
                    <div class="forecastDay">
                        <div>
                            <div>Temperature: ${element.main.temp.toFixed()}°</div>
                            <div>Feels like: ${element.main.feels_like.toFixed()}°</div>
                        </div>
                        <div>
                            <img
                                src="https://openweathermap.org/img/wn/${
                                    element.weather[0].icon
                                }.png"
                                }.png"
                                alt=""
                            />
                        </div>
                    </div>
                </div>`;
    }

    UI.forecast.block.innerHTML = forecastWeather;
}

function renderFavorites(cities) {
    let injectHTML = "";

    cities.forEach((city) => {
        injectHTML += `<div id=${city} class="liContainer">
                <li id="selectedCities">${city}</li>
                <img 
                    id="deleteCity"
                    class="closeImg"
                    src="assets/aveiimnfj.png"
                    alt=""
                />
            </div>`;
    });

    UI.favorites.listCities.innerHTML = injectHTML;
}
