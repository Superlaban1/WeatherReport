export function forecastSection() {
    const section = document.createElement("section");
    section.className = "forecast-section";
    section.id = "forecast-section";

    const heading = document.createElement("div");
    heading.className = "section-heading";

    const titleGroup = document.createElement("div");
    const eyebrow = document.createElement("p");
    eyebrow.className = "eyebrow";
    eyebrow.textContent = "Planlæg din uge";

    const title = document.createElement("h2");
    title.id = "forecast-title";
    title.textContent = "De næste 5 dage";
    titleGroup.appendChild(eyebrow);
    titleGroup.appendChild(title);

    const hint = document.createElement("p");
    hint.className = "hint";
    hint.textContent = "Vælg en dag for at se time for time";
    heading.appendChild(titleGroup);
    heading.appendChild(hint);

    const days = document.createElement("div");
    days.className = "day-list";
    days.id = "day-list";
    section.appendChild(heading);
    section.appendChild(days);
    return section;
}
