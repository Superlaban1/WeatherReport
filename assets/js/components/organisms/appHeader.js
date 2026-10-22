export function appHeader() {
    const header = document.createElement("header");
    header.className = "top-bar";

    const brand = document.createElement("a");
    brand.className = "brand";
    brand.href = "./";

    const logo = document.createElement("img");
    logo.src = "./assets/img/weather-icon.svg";
    logo.alt = "";
    logo.width = 36;
    logo.height = 36;
    const brandName = document.createElement("span");
    brandName.textContent = "Vejr lige nu";
    brand.appendChild(logo);
    brand.appendChild(brandName);

    const search = document.createElement("form");
    search.className = "search";
    search.id = "location-form";
    const label = document.createElement("label");
    label.className = "visually-hidden";
    label.textContent = "Søg efter en by";
    label.htmlFor = "location-input";

    const input = document.createElement("input");
    input.id = "location-input";
    input.name = "location";
    input.type = "search";
    input.placeholder = "Søg efter en by";
    input.autocomplete = "off";

    const button = document.createElement("button");
    button.textContent = "Søg";
    button.type = "submit";
    search.appendChild(label);
    search.appendChild(input);
    search.appendChild(button);
    header.appendChild(brand);
    header.appendChild(search);
    return header;
}
