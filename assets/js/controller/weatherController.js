import {
    renderWeather,
    selectDate,
    setLocation,
    setTab,
    setupViewEvents,
    showError,
    showStatus,
} from "../view/weatherView.js";

export function startWeatherController(model) {
    let weatherData = null;

    function loadWeather(location) {
        showStatus("Henter vejrdata …");

        model.getForecast(location.latitude, location.longitude)
            .then(function (data) {
                weatherData = data;
                setLocation(location);
                renderWeather(weatherData);
                setTab("today");
            })
            .catch(function (error) {
                showError(error.message);
            });
    }

    function selectDay(date) {
        if (weatherData === null) {
            return;
        }

        selectDate(date, weatherData);
        setTab("forecast");
    }

    function showToday() {
        if (weatherData !== null) {
            selectDate(weatherData.current.time.slice(0, 10), weatherData);
        }

        setTab("today");
    }

    function showForecast() {
        setTab("forecast");
    }

    setupViewEvents(showToday, showForecast, selectDay);

    if (!navigator.geolocation) {
        showError("Din browser understøtter ikke lokation.");
        return;
    }

    showStatus("Finder vejret for din lokation …");
    navigator.geolocation.getCurrentPosition(
        function (position) {
            let location = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                name: "Din lokation",
            };
            loadWeather(location);
        },
        function () {
            showError("Vi kunne ikke hente din lokation. Kontrollér lokationstilladelsen i browseren.");
        },
    );
}
