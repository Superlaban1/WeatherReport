export function formatNumber(value, digits = 0) {
    return Number.isFinite(value) ? value.toFixed(digits).replace(".", ",") : "–";
}

export function formatDate(date, options) {
    return new Intl.DateTimeFormat("da-DK", options).format(new Date(`${date}T12:00:00`));
}

export function windDirection(degrees) {
    if (!Number.isFinite(degrees)) return "–";
    return ["N", "NØ", "Ø", "SØ", "S", "SV", "V", "NV"][Math.round(degrees / 45) % 8];
}

export function precipitationText(rain, snow, total) {
    const parts = [];
    if (rain > 0) parts.push(`Regn ${formatNumber(rain, 1)} mm`);
    if (snow > 0) parts.push(`Sne ${formatNumber(snow, 1)} mm`);
    if (!parts.length && total > 0) parts.push(`Nedbør ${formatNumber(total, 1)} mm`);
    return parts.length ? parts.join(" · ") : "Ingen nedbør";
}
