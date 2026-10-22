import { formatNumber, precipitationText, windDirection } from "../atoms/weatherDetails.js";
import { getWeatherInfo } from "../../model/weatherModel.js";

export function hourCard(data, index) {
    const weatherInfo = getWeatherInfo(data.hourly.weather_code[index]);
    const icon = weatherInfo[1];
    const card = document.createElement("article");
    card.className = "hour-card";

    const time = document.createElement("time");
    time.textContent = data.hourly.time[index].slice(11, 16);
    const weather = document.createElement("span");
    weather.className = "hour-icon";
    weather.textContent = icon;

    const temperature = document.createElement("strong");
    temperature.textContent = `${formatNumber(data.hourly.temperature_2m[index])}°`;
    const wind = document.createElement("span");
    wind.className = "hour-wind";
    wind.textContent = `${formatNumber(data.hourly.wind_speed_10m[index])} km/t`;
    const direction = document.createElement("span");
    direction.className = "hour-direction";
    direction.textContent = windDirection(data.hourly.wind_direction_10m[index]);
    const precipitation = document.createElement("span");
    precipitation.className = "hour-precipitation";
    precipitation.textContent = precipitationText(
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
