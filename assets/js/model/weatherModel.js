let WEATHER_CODES = {
    0: ["Klart", "☀️"],
    1: ["Mest klart", "🌤️"],
    2: ["Delvist skyet", "⛅"],
    3: ["Overskyet", "☁️"],
    45: ["Tåge", "🌫️"],
    48: ["Rimtåge", "🌫️"],
    51: ["Let støvregn", "🌦️"],
    53: ["Støvregn", "🌦️"],
    55: ["Kraftig støvregn", "🌧️"],
    56: ["Let underafkølet støvregn", "🌧️"],
    57: ["Kraftig underafkølet støvregn", "🌧️"],
    61: ["Let regn", "🌧️"],
    63: ["Regn", "🌧️"],
    65: ["Kraftig regn", "🌧️"],
    66: ["Let underafkølet regn", "🌧️"],
    67: ["Kraftig underafkølet regn", "🌧️"],
    71: ["Let sne", "🌨️"],
    73: ["Sne", "🌨️"],
    75: ["Kraftig sne", "❄️"],
    77: ["Snefnug", "❄️"],
    80: ["Lette regnbyger", "🌦️"],
    81: ["Regnbyger", "🌧️"],
    82: ["Kraftige regnbyger", "🌧️"],
    85: ["Lette snebyger", "🌨️"],
    86: ["Kraftige snebyger", "❄️"],
    95: ["Tordenvejr", "⛈️"],
    96: ["Torden og let hagl", "⛈️"],
    99: ["Torden og kraftigt hagl", "⛈️"],
};

let FORECAST_URL = "https://api.open-meteo.com/v1/forecast";

export function getWeatherInfo(code) {
    return WEATHER_CODES[code] || ["Ukendt vejr", "🌡️"];
}

export function getForecast(latitude, longitude) {
    let forecastUrl = FORECAST_URL;
    forecastUrl = forecastUrl + "?latitude=" + latitude;
    forecastUrl = forecastUrl + "&longitude=" + longitude;
    forecastUrl = forecastUrl + "&current=temperature_2m,precipitation,rain,snowfall,weather_code,wind_speed_10m,wind_direction_10m";
    forecastUrl = forecastUrl + "&hourly=temperature_2m,precipitation,rain,snowfall,weather_code,wind_speed_10m,wind_direction_10m";
    forecastUrl = forecastUrl + "&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,rain_sum,snowfall_sum,wind_speed_10m_max,wind_direction_10m_dominant";
    forecastUrl = forecastUrl + "&forecast_days=5";
    forecastUrl = forecastUrl + "&temperature_unit=celsius";
    forecastUrl = forecastUrl + "&wind_speed_unit=kmh";
    forecastUrl = forecastUrl + "&precipitation_unit=mm";
    forecastUrl = forecastUrl + "&timezone=auto";

    return fetch(forecastUrl)
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Vejrdata kunne ikke hentes lige nu.");
            }
            return response.json();
        });
}
