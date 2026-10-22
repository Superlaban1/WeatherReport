export function sourceFooter() {
    const footer = document.createElement("footer");
    footer.append(document.createTextNode("Vejrdata fra "));

    const source = document.createElement("a");
    source.textContent = "Open-Meteo";
    source.href = "https://open-meteo.com/";
    source.target = "_blank";
    source.rel = "noreferrer";
    footer.append(source);
    return footer;
}
