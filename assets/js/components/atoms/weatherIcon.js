export function weatherIcon(icon) {
    let element = document.createElement("span");
    element.className = "weather-icon";
    element.innerText = icon;
    return element;
}
