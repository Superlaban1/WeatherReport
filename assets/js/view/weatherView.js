import { dayCard } from "../components/molecules/dayCard.js";
import { hourCard } from "../components/molecules/hourCard.js";
import { currentConditions } from "../components/molecules/currentConditions.js";
import { formatDate } from "../components/atoms/weatherDetails.js";

const byId = (id) => document.getElementById(id);

export class WeatherView {
    constructor() {
        this.selectedDate = null;
        this.onSelectDay = () => {};
        this.onSearch = () => {};
        this.onToday = () => {};
        this.onForecast = () => {};
        byId("location-form").addEventListener("submit", (event) => {
            event.preventDefault();
            const input = byId("location-input");
            const name = input.value.trim();
            if (name) this.onSearch(name);
        });
        byId("today-tab").addEventListener("click", () => this.onToday());
        byId("forecast-tab").addEventListener("click", () => this.onForecast());
        byId("day-list").addEventListener("click", (event) => {
            const button = event.target.closest("[data-date]");
            if (button) this.onSelectDay(button.dataset.date);
        });
    }

    bindHandlers(handlers) {
        this.onSearch = handlers.onSearch;
        this.onToday = handlers.onToday;
        this.onForecast = handlers.onForecast;
        this.onSelectDay = handlers.onSelectDay;
    }

    showStatus(message, isError = false) {
        const status = byId("status");
        status.textContent = message;
        status.classList.toggle("is-error", isError);
    }

    setLocation(location) {
        byId("location-name").textContent = location.name;
        byId("coordinates").textContent = `${location.latitude.toFixed(2)}°, ${location.longitude.toFixed(2)}°`;
    }

    renderWeather(data) {
        const current = data.current;
        byId("current-date").textContent = formatDate(current.time.slice(0, 10), {
            weekday: "long",
            day: "numeric",
            month: "long",
        });
        byId("current-weather").replaceChildren(currentConditions(data));
        this.renderDays(data);
        this.selectDate(current.time.slice(0, 10), data);
        this.showStatus("Vejret er opdateret.");
    }

    renderDays(data) {
        const dayList = document.getElementById("day-list");
        const cards = data.daily.time.map((date, index) => dayCard(data, index, this.selectedDate));
        dayList.replaceChildren(...cards);
    }

    selectDate(date, data) {
        this.selectedDate = date;
        const dailyIndex = data.daily.time.indexOf(date);
        const dateLabel = date === data.current.time.slice(0, 10)
            ? "I dag"
            : formatDate(date, { weekday: "long", day: "numeric", month: "long" });
        byId("hourly-title").textContent = `${dateLabel} time for time`;
        byId("day-list").querySelectorAll(".day-card").forEach((card) => {
            const selected = card.dataset.date === date;
            card.classList.toggle("is-selected", selected);
        });
        const hourlyIndices = data.hourly.time
            .map((time, index) => time.startsWith(date) ? index : -1)
            .filter((index) => index >= 0);
        const cards = hourlyIndices.map((index) => hourCard(data, index));
        byId("hourly-list").replaceChildren(...cards);
        if (dailyIndex < 0) this.showStatus("Der er ingen timeprognose for den valgte dag.", true);
    }

    setTab(tab) {
        const isToday = tab === "today";
        byId("today-tab").classList.toggle("is-active", isToday);
        byId("forecast-tab").classList.toggle("is-active", !isToday);
        byId("forecast-section").hidden = isToday;
    }

    showError(message) {
        this.showStatus(message, true);
    }
}
