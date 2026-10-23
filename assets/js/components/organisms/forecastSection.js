export function forecastSection() {
    let section = document.createElement("section");
    section.className = "forecast-section";
    section.id = "forecast-section";

    let heading = document.createElement("div");
    heading.className = "section-heading";

    let titleGroup = document.createElement("div");
    let eyebrow = document.createElement("p");
    eyebrow.className = "eyebrow";
    eyebrow.innerText = "Planlæg din uge";

    let title = document.createElement("h2");
    title.id = "forecast-title";
    title.innerText = "De næste 5 dage";
    titleGroup.appendChild(eyebrow);
    titleGroup.appendChild(title);

    let hint = document.createElement("p");
    hint.className = "hint";
    hint.innerText = "Vælg en dag for at se time for time";
    heading.appendChild(titleGroup);
    heading.appendChild(hint);

    let days = document.createElement("div");
    days.className = "day-list";
    days.id = "day-list";
    section.appendChild(heading);
    section.appendChild(days);
    return section;
}
