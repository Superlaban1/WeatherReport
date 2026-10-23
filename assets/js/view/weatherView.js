import { dayCard } from "../components/molecules/dayCard.js";
import { hourCard } from "../components/molecules/hourCard.js";
import { currentConditions } from "../components/molecules/currentConditions.js";
import { formatDate } from "../components/atoms/weatherDetails.js";

let selectedDate = null;

export function setupViewEvents(showToday, showForecast, selectDay) {
    document.getElementById("today-tab").addEventListener("click", function () {
        showToday();
    });

    document.getElementById("forecast-tab").addEventListener("click", function () {
        showForecast();
    });

    document.getElementById("day-list").addEventListener("click", function (event) {
        let clickedElement = event.target;

        while (clickedElement && !clickedElement.dataset.date) {
            clickedElement = clickedElement.parentElement;
        }

        if (clickedElement) {
            selectDay(clickedElement.dataset.date);
        }
    });
}

export function showStatus(message, isError) {
    let status = document.getElementById("status");
    status.innerText = message;

    if (isError) {
        status.classList.add("is-error");
    } else {
        status.classList.remove("is-error");
    }
}

export function showError(message) {
    showStatus(message, true);
}

export function setLocation(location) {
    document.getElementById("location-name").innerText = location.name;

    let coordinates = location.latitude.toFixed(2) + "°, ";
    coordinates = coordinates + location.longitude.toFixed(2) + "°";
    document.getElementById("coordinates").innerText = coordinates;
}

export function renderWeather(data) {
    let currentDate = data.current.time.slice(0, 10);

    document.getElementById("current-date").innerText =
        formatDate(currentDate);

    let currentWeather = document.getElementById("current-weather");
    currentWeather.innerHTML = "";
    currentWeather.appendChild(currentConditions(data));

    renderDays(data);
    selectDate(currentDate, data);
    showStatus("Vejret er opdateret.");
}

export function renderDays(data) {
    let dayList = document.getElementById("day-list");
    dayList.innerHTML = "";

    for (let index = 0; index < data.daily.time.length; index++) {
        let card = dayCard(data, index, selectedDate);
        dayList.appendChild(card);
    }
}

export function selectDate(date, data) {
    selectedDate = date;

    let today = data.current.time.slice(0, 10);
    let dateLabel;

    if (date === today) {
        dateLabel = "I dag";
    } else {
        dateLabel = formatDate(date);
    }

    document.getElementById("hourly-title").innerText =
        dateLabel + " time for time";

    let dayCards = document.getElementById("day-list").querySelectorAll(".day-card");
    for (let index = 0; index < dayCards.length; index++) {
        let card = dayCards[index];

        if (card.dataset.date === date) {
            card.classList.add("is-selected");
        } else {
            card.classList.remove("is-selected");
        }
    }

    let hourlyList = document.getElementById("hourly-list");
    hourlyList.innerHTML = "";

    for (let index = 0; index < data.hourly.time.length; index++) {
        let hour = data.hourly.time[index];

        if (hour.startsWith(date)) {
            let card = hourCard(data, index);
            hourlyList.appendChild(card);
        }
    }

    if (data.daily.time.indexOf(date) < 0) {
        showStatus("Der er ingen timeprognose for den valgte dag.", true);
    }
}

export function setTab(tab) {
    let isToday = tab === "today";

    if (isToday) {
        document.getElementById("today-tab").classList.add("is-active");
        document.getElementById("forecast-tab").classList.remove("is-active");
        document.getElementById("forecast-section").hidden = true;
    } else {
        document.getElementById("today-tab").classList.remove("is-active");
        document.getElementById("forecast-tab").classList.add("is-active");
        document.getElementById("forecast-section").hidden = false;
    }
}
