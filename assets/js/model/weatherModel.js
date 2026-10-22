const WEATHER_CODES = {
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

const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";
const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";

export function getWeatherInfo(code) {
    return WEATHER_CODES[code] || ["Ukendt vejr", "🌡️"];
}

export async function getForecast(latitude, longitude) {
    const params = new URLSearchParams({
        latitude: String(latitude),
        longitude: String(longitude),
        current: "temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,wind_speed_10m,wind_direction_10m",
        hourly: "temperature_2m,precipitation,rain,snowfall,weather_code,wind_speed_10m,wind_direction_10m",
        daily: "weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,rain_sum,snowfall_sum,wind_speed_10m_max,wind_direction_10m_dominant",
        forecast_days: "5",
        temperature_unit: "celsius",
        wind_speed_unit: "kmh",
        precipitation_unit: "mm",
        timezone: "auto",
    });
    const response = await fetch(`${FORECAST_URL}?${params}`);
    if (!response.ok) {
        throw new Error("Vejrdata kunne ikke hentes lige nu.");
    }
    return response.json();
}

export async function findLocation(name) {
    const params = new URLSearchParams({
        name,
        count: "1",
        language: "da",
        format: "json",
    });
    const response = await fetch(`${GEOCODING_URL}?${params}`);
    if (!response.ok) {
        throw new Error("Byen kunne ikke søges frem lige nu.");
    }
    const data = await response.json();
    if (!data.results?.length) {
        throw new Error("Vi kunne ikke finde den by. Prøv et andet navn.");
    }
    const [location] = data.results;
    return {
        latitude: location.latitude,
        longitude: location.longitude,
        name: [location.name, location.admin1, location.country].filter(Boolean).join(", "),
    };
}
