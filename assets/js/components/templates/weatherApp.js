import { appHeader } from "../organisms/appHeader.js";
import { currentWeatherSection } from "../organisms/currentWeatherSection.js";
import { forecastSection } from "../organisms/forecastSection.js";
import { hourlySection } from "../organisms/hourlySection.js";
import { sourceFooter } from "../organisms/sourceFooter.js";
import { viewTabs } from "../organisms/viewTabs.js";

export function weatherApp() {
    const main = document.createElement("main");
    main.className = "app";

    const status = document.createElement("p");
    status.className = "status";
    status.textContent = "Finder vejret for din lokation …";
    status.id = "status";

    main.appendChild(appHeader());
    main.appendChild(status);
    main.appendChild(currentWeatherSection());
    main.appendChild(viewTabs());
    main.appendChild(forecastSection());
    main.appendChild(hourlySection());
    main.appendChild(sourceFooter());
    return main;
}
