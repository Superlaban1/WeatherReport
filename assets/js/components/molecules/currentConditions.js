import { formatNumber, precipitationText, windDirection } from "../atoms/weatherDetails.js";
import { weatherIcon } from "../atoms/weatherIcon.js";
import { getWeatherInfo } from "../../model/weatherModel.js";

function weatherDetail(label, value) {
    const detail = document.createElement("p");
    const detailLabel = document.createElement("span");
    detailLabel.textContent = label;
    const detailValue = document.createElement("strong");
    detailValue.textContent = value;
    detail.appendChild(detailLabel);
    detail.appendChild(detailValue);
    return detail;
}

export function currentConditions(data) {
    const current = data.current;
    const [description, icon] = getWeatherInfo(current.weather_code);
    const section = document.createElement("div");
    section.className = "current-content";

    const summary = document.createElement("div");
    summary.className = "current-main";
    summary.append(weatherIcon(icon));
    const temperature = document.createElement("div");
    const temperatureValue = document.createElement("p");
    temperatureValue.className = "temperature";
    temperatureValue.textContent = `${formatNumber(current.temperature_2m)}°`;
    const weatherDescription = document.createElement("p");
    weatherDescription.className = "weather-description";
    weatherDescription.textContent = description;
    temperature.appendChild(temperatureValue);
    temperature.appendChild(weatherDescription);
    summary.appendChild(temperature);

    const details = document.createElement("div");
    details.className = "current-details";
    details.appendChild(weatherDetail("Føles som", `${formatNumber(current.apparent_temperature)}°`));
    details.appendChild(weatherDetail(
        "Vind",
        `${formatNumber(current.wind_speed_10m)} km/t ${windDirection(current.wind_direction_10m)}`,
    ));
    details.appendChild(weatherDetail(
        "Nedbør",
        precipitationText(current.rain, current.snowfall, current.precipitation),
    ));
    details.appendChild(weatherDetail("Luftfugtighed", `${formatNumber(current.relative_humidity_2m)}%`));

    section.appendChild(summary);
    section.appendChild(details);
    return section;
}
