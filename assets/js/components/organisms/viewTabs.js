export function viewTabs() {
    let tabs = document.createElement("nav");
    tabs.className = "tabs";

    let today = document.createElement("button");
    today.className = "tab is-active";
    today.innerText = "I dag";
    today.id = "today-tab";
    today.type = "button";

    let forecast = document.createElement("button");
    forecast.className = "tab";
    forecast.innerText = "5 dage";
    forecast.id = "forecast-tab";
    forecast.type = "button";

    tabs.appendChild(today);
    tabs.appendChild(forecast);
    return tabs;
}
