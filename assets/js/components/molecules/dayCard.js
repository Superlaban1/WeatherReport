import { formatDate, formatNumber, precipitationText, windDirection } from "../atoms/weatherDetails.js";
import { getWeatherInfo } from "../../model/weatherModel.js";

export function dayCard(data, index, selectedDate) {
    const date = data.daily.time[index];
    const [description, icon] = getWeatherInfo(data.daily.weather_code[index]);
    const selected = date === selectedDate;

    const card = document.createElement("button");
    card.className = selected ? "day-card is-selected" : "day-card";
    card.type = "button";
    card.dataset.date = date;

    const dayName = document.createElement("span");
    dayName.className = "day-name";
    dayName.textContent = index === 0 ? "I dag" : formatDate(date, { weekday: "short" });
    const dayIcon = document.createElement("span");
    dayIcon.className = "day-icon";
    dayIcon.textContent = icon;
    const dayWeather = document.createElement("span");
    dayWeather.className = "day-weather";
    dayWeather.textContent = description;
    card.appendChild(dayName);
    card.appendChild(dayIcon);
    card.appendChild(dayWeather);

    const temperatures = document.createElement("span");
    temperatures.className = "day-temperatures";
    const maximum = document.createElement("strong");
    maximum.textContent = `${formatNumber(data.daily.temperature_2m_max[index])}°`;
    temperatures.appendChild(maximum);
    temperatures.appendChild(document.createTextNode(` / ${formatNumber(data.daily.temperature_2m_min[index])}°`));
    card.appendChild(temperatures);

    const wind = document.createElement("span");
    wind.className = "day-wind";
    wind.textContent = `Vind ${formatNumber(data.daily.wind_speed_10m_max[index])} km/t ${windDirection(data.daily.wind_direction_10m_dominant[index])}`;
    const precipitation = document.createElement("span");
    precipitation.className = "day-precipitation";
    precipitation.textContent = precipitationText(
        data.daily.rain_sum[index],
        data.daily.snowfall_sum[index],
        data.daily.precipitation_sum[index],
    );
    card.appendChild(wind);
    card.appendChild(precipitation);
    return card;
}
