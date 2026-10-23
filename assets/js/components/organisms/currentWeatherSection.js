export function currentWeatherSection() {
    let section = document.createElement("section");
    section.className = "current";

    let heading = document.createElement("div");
    heading.className = "current-heading";

    let date = document.createElement("p");
    date.className = "eyebrow";
    date.id = "current-date";
    let location = document.createElement("h1");
    location.innerText = "Dit lokale vejr";
    location.id = "location-name";
    let coordinates = document.createElement("p");
    coordinates.className = "coordinates";
    coordinates.id = "coordinates";
    heading.appendChild(date);
    heading.appendChild(location);
    heading.appendChild(coordinates);

    let weather = document.createElement("div");
    weather.className = "current-weather";
    weather.id = "current-weather";
    section.appendChild(heading);
    section.appendChild(weather);
    return section;
}
