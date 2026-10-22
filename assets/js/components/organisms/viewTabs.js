export function viewTabs() {
    const tabs = document.createElement("nav");
    tabs.className = "tabs";

    const today = document.createElement("button");
    today.className = "tab is-active";
    today.textContent = "I dag";
    today.id = "today-tab";
    today.type = "button";

    const forecast = document.createElement("button");
    forecast.className = "tab";
    forecast.textContent = "5 dage";
    forecast.id = "forecast-tab";
    forecast.type = "button";

    tabs.appendChild(today);
    tabs.appendChild(forecast);
    return tabs;
}
