export function currentWeatherSection() {
    const section = document.createElement("section");
    section.className = "current";

    const heading = document.createElement("div");
    heading.className = "current-heading";

    const date = document.createElement("p");
    date.className = "eyebrow";
    date.id = "current-date";
    const location = document.createElement("h1");
    location.textContent = "Dit lokale vejr";
    location.id = "location-name";
    const coordinates = document.createElement("p");
    coordinates.className = "coordinates";
    coordinates.id = "coordinates";
    heading.appendChild(date);
    heading.appendChild(location);
    heading.appendChild(coordinates);

    const weather = document.createElement("div");
    weather.className = "current-weather";
    weather.id = "current-weather";
    section.appendChild(heading);
    section.appendChild(weather);
    return section;
}
