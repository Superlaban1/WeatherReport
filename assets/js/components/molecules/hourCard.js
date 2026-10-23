import { precipitationText, windDirection } from "../atoms/weatherDetails.js";
import { getWeatherInfo } from "../../model/weatherModel.js";

export function hourCard(data, index) {
    let weatherInfo = getWeatherInfo(data.hourly.weather_code[index]);
    let icon = weatherInfo[1];
    let card = document.createElement("article");
    card.className = "hour-card";

    let time = document.createElement("time");
    time.innerText = data.hourly.time[index].slice(11, 16);
    let weather = document.createElement("span");
    weather.className = "hour-icon";
    weather.innerText = icon;

    let temperature = document.createElement("strong");
    temperature.innerText = `${Math.round(data.hourly.temperature_2m[index])}°`;
    let wind = document.createElement("span");
    wind.className = "hour-wind";
    wind.innerText = `${Math.round(data.hourly.wind_speed_10m[index])} km/t`;
    let direction = document.createElement("span");
    direction.className = "hour-direction";
    direction.innerText = windDirection(data.hourly.wind_direction_10m[index]);
    let precipitation = document.createElement("span");
    precipitation.className = "hour-precipitation";
    precipitation.innerText = precipitationText(
        data.hourly.rain[index],
        data.hourly.snowfall[index],
        data.hourly.precipitation[index],
    );

    card.appendChild(time);
    card.appendChild(weather);
    card.appendChild(temperature);
    card.appendChild(wind);
    card.appendChild(direction);
    card.appendChild(precipitation);
    return card;
}
