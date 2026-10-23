import { precipitationText, windDirection } from "../atoms/weatherDetails.js";
import { weatherIcon } from "../atoms/weatherIcon.js";
import { getWeatherInfo } from "../../model/weatherModel.js";

export function currentConditions(data) {
    let current = data.current;
    let weatherInfo = getWeatherInfo(current.weather_code);
    let description = weatherInfo[0];
    let icon = weatherInfo[1];
    let section = document.createElement("div");
    section.className = "current-content";

    let summary = document.createElement("div");
    summary.className = "current-main";
    summary.appendChild(weatherIcon(icon));
    let temperature = document.createElement("div");
    let temperatureValue = document.createElement("p");
    temperatureValue.className = "temperature";
    temperatureValue.innerText = `${Math.round(current.temperature_2m)}°`;
    let weatherDescription = document.createElement("p");
    weatherDescription.className = "weather-description";
    weatherDescription.innerText = description;
    temperature.appendChild(temperatureValue);
    temperature.appendChild(weatherDescription);
    summary.appendChild(temperature);

    let details = document.createElement("div");
    details.className = "current-details";

    let windDetail = document.createElement("p");
    let windLabel = document.createElement("span");
    windLabel.innerText = "Vind";
    let windValue = document.createElement("strong");
    windValue.innerText =
        `${Math.round(current.wind_speed_10m)} km/t ${windDirection(current.wind_direction_10m)}`;
    windDetail.appendChild(windLabel);
    windDetail.appendChild(windValue);
    details.appendChild(windDetail);

    let precipitationDetail = document.createElement("p");
    let precipitationLabel = document.createElement("span");
    precipitationLabel.innerText = "Nedbør";
    let precipitationValue = document.createElement("strong");
    precipitationValue.innerText =
        precipitationText(current.rain, current.snowfall, current.precipitation);
    precipitationDetail.appendChild(precipitationLabel);
    precipitationDetail.appendChild(precipitationValue);
    details.appendChild(precipitationDetail);

    section.appendChild(summary);
    section.appendChild(details);
    return section;
}
