import { formatDate, precipitationText, windDirection } from "../atoms/weatherDetails.js";
import { getWeatherInfo } from "../../model/weatherModel.js";

export function dayCard(data, index, selectedDate) {
    let date = data.daily.time[index];
    let weatherInfo = getWeatherInfo(data.daily.weather_code[index]);
    let description = weatherInfo[0];
    let icon = weatherInfo[1];
    let selected = date === selectedDate;

    let card = document.createElement("button");
    card.className = "day-card";
    if (selected) {
        card.className = card.className + " is-selected";
    }
    card.type = "button";
    card.dataset.date = date;

    let dayName = document.createElement("span");
    dayName.className = "day-name";
    if (index === 0) {
        dayName.innerText = "I dag";
    } else {
        dayName.innerText = formatDate(date);
    }
    let dayIcon = document.createElement("span");
    dayIcon.className = "day-icon";
    dayIcon.innerText = icon;
    let dayWeather = document.createElement("span");
    dayWeather.className = "day-weather";
    dayWeather.innerText = description;
    card.appendChild(dayName);
    card.appendChild(dayIcon);
    card.appendChild(dayWeather);

    let temperatures = document.createElement("span");
    temperatures.className = "day-temperatures";
    let maximum = document.createElement("strong");
    maximum.innerText = `${Math.round(data.daily.temperature_2m_max[index])}°`;
    temperatures.appendChild(maximum);

    let minimum = document.createElement("span");
    minimum.innerText = ` / ${Math.round(data.daily.temperature_2m_min[index])}°`;
    temperatures.appendChild(minimum);
    card.appendChild(temperatures);

    let wind = document.createElement("span");
    wind.className = "day-wind";
    wind.innerText = `Vind ${Math.round(data.daily.wind_speed_10m_max[index])} km/t ${windDirection(data.daily.wind_direction_10m_dominant[index])}`;
    let precipitation = document.createElement("span");
    precipitation.className = "day-precipitation";
    precipitation.innerText = precipitationText(
        data.daily.rain_sum[index],
        data.daily.snowfall_sum[index],
        data.daily.precipitation_sum[index],
    );
    card.appendChild(wind);
    card.appendChild(precipitation);
    return card;
}
