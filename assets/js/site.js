import * as weatherModel from "./model/weatherModel.js";
import { startWeatherController } from "./controller/weatherController.js";
import { weatherApp } from "./components/templates/weatherApp.js";

let app = document.getElementById("app");
while (app.firstChild) {
    app.removeChild(app.firstChild);
}
app.appendChild(weatherApp());

startWeatherController(weatherModel);

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js")
        .catch(function (error) {
            console.error("Service worker kunne ikke registreres:", error);
        });
}
