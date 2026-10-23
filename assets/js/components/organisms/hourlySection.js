export function hourlySection() {
    let section = document.createElement("section");
    section.className = "hourly-section";
    section.id = "hourly-section";

    let heading = document.createElement("div");
    heading.className = "section-heading";

    let titleGroup = document.createElement("div");
    let eyebrow = document.createElement("p");
    eyebrow.className = "eyebrow";
    eyebrow.innerText = "Temperatur, vind og nedbør";

    let title = document.createElement("h2");
    title.id = "hourly-title";
    title.innerText = "I dag time for time";
    titleGroup.appendChild(eyebrow);
    titleGroup.appendChild(title);
    heading.appendChild(titleGroup);

    let hours = document.createElement("div");
    hours.className = "hourly-list";
    hours.id = "hourly-list";
    section.appendChild(heading);
    section.appendChild(hours);
    return section;
}
