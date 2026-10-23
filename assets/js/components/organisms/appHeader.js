export function appHeader() {
    let header = document.createElement("header");
    header.className = "top-bar";

    let brand = document.createElement("a");
    brand.className = "brand";
    brand.href = "./";

    let logo = document.createElement("img");
    logo.src = "./assets/img/weather-icon.svg";
    logo.alt = "";
    logo.width = 36;
    logo.height = 36;
    let brandName = document.createElement("span");
    brandName.innerText = "Vejr lige nu";
    brand.appendChild(logo);
    brand.appendChild(brandName);

    header.appendChild(brand);
    return header;
}
