import * as weatherModel from "./model/weatherModel.js";
import { startWeatherController } from "./controller/weatherController.js";
import { WeatherView } from "./view/weatherView.js";
import { weatherApp } from "./components/templates/weatherApp.js";

const app = document.getElementById("app");
app.replaceChildren(weatherApp());

const view = new WeatherView();
startWeatherController(weatherModel, view);

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register(new URL("../../sw.js", import.meta.url))
        .catch((error) => console.error("Service worker kunne ikke registreres:", error));
}
