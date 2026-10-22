export function startWeatherController(model, view) {
    let weatherData = null;

    async function loadWeather(location) {
        view.showStatus("Henter vejrdata …");

        try {
            weatherData = await model.getForecast(location.latitude, location.longitude);
            view.setLocation(location);
            view.renderWeather(weatherData);
            view.setTab("today");
        } catch (error) {
            view.showError(error.message);
        }
    }

    async function searchLocation(name) {
        view.showStatus(`Søger efter ${name} …`);

        try {
            const location = await model.findLocation(name);
            await loadWeather(location);
        } catch (error) {
            view.showError(error.message);
        }
    }

    function selectDay(date) {
        if (weatherData === null) return;

        view.selectDate(date, weatherData);
        view.setTab("forecast");
    }

    function showToday() {
        if (weatherData !== null) {
            view.selectDate(weatherData.current.time.slice(0, 10), weatherData);
        }

        view.setTab("today");
    }

    const handlers = {
        onSearch: searchLocation,
        onToday: showToday,
        onForecast: function () {
            view.setTab("forecast");
        },
        onSelectDay: selectDay,
    };
    view.bindHandlers(handlers);

    if (!navigator.geolocation) {
        view.showError("Din browser understøtter ikke lokation. Søg efter en by i stedet.");
        return;
    }

    view.showStatus("Finder vejret for din lokation …");
    navigator.geolocation.getCurrentPosition(
        function (position) {
            loadWeather({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                name: "Din lokation",
            });
        },
        function () {
            view.showError("Vi kunne ikke hente din lokation. Søg efter en by for at se vejret.");
        },
    );
}
