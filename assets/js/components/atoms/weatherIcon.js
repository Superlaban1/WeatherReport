export function weatherIcon(icon) {
    const element = document.createElement("span");
    element.className = "weather-icon";
    element.textContent = icon;
    return element;
}
