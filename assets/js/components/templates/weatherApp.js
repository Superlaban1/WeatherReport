import { appHeader } from "../organisms/appHeader.js";
import { currentWeatherSection } from "../organisms/currentWeatherSection.js";
import { forecastSection } from "../organisms/forecastSection.js";
import { hourlySection } from "../organisms/hourlySection.js";
import { viewTabs } from "../organisms/viewTabs.js";

export function weatherApp() {
    let main = document.createElement("main");
    main.className = "app";

    let status = document.createElement("p");
    status.className = "status";
    status.innerText = "Finder vejret for din lokation …";
    status.id = "status";

    main.appendChild(appHeader());
    main.appendChild(status);
    main.appendChild(currentWeatherSection());
    main.appendChild(viewTabs());
    main.appendChild(forecastSection());
    main.appendChild(hourlySection());
    return main;
}
