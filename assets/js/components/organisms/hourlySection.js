export function hourlySection() {
    const section = document.createElement("section");
    section.className = "hourly-section";
    section.id = "hourly-section";

    const heading = document.createElement("div");
    heading.className = "section-heading";

    const titleGroup = document.createElement("div");
    const eyebrow = document.createElement("p");
    eyebrow.className = "eyebrow";
    eyebrow.textContent = "Temperatur, vind og nedbør";

    const title = document.createElement("h2");
    title.id = "hourly-title";
    title.textContent = "I dag time for time";
    titleGroup.appendChild(eyebrow);
    titleGroup.appendChild(title);
    heading.appendChild(titleGroup);

    const hours = document.createElement("div");
    hours.className = "hourly-list";
    hours.id = "hourly-list";
    section.appendChild(heading);
    section.appendChild(hours);
    return section;
}
