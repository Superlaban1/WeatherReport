export function formatDate(date) {
    let dateParts = date.split("-");
    return dateParts[2] + "-" + dateParts[1] + "-" + dateParts[0];
}

export function windDirection(degrees) {
    if (!Number.isFinite(degrees)) {
        return "–";
    }

    let directions = ["N", "NØ", "Ø", "SØ", "S", "SV", "V", "NV"];
    let directionIndex = Math.round(degrees / 45);

    if (directionIndex === 8) {
        directionIndex = 0;
    }

    return directions[directionIndex];
}

export function precipitationText(rain, snow, total) {
    let precipitation = "";

    if (rain > 0) {
        let rainAmount = Math.round(rain * 10) / 10;
        let rainText = rainAmount.toString();
        rainText = rainText.replace(".", ",");
        precipitation = "Regn " + rainText + " mm";
    }

    if (snow > 0) {
        let snowAmount = Math.round(snow * 10) / 10;
        let snowText = snowAmount.toString();
        snowText = snowText.replace(".", ",");

        if (precipitation !== "") {
            precipitation = precipitation + " · ";
        }
        precipitation = precipitation + "Sne " + snowText + " mm";
    }

    if (precipitation === "" && total > 0) {
        let totalAmount = Math.round(total * 10) / 10;
        let totalText = totalAmount.toString();
        totalText = totalText.replace(".", ",");
        precipitation = "Nedbør " + totalText + " mm";
    }

    if (precipitation === "") {
        return "Ingen nedbør";
    }

    return precipitation;
}
