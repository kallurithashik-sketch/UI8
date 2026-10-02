const calendar = document.getElementById("calendar");
const monthTitle = document.getElementById("monthTitle");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const todayBtn = document.getElementById("todayBtn");

const themeBtn = document.getElementById("themeBtn");

const modal = document.getElementById("eventModal");
const createBtn = document.getElementById("createBtn");
const closeModal = document.getElementById("closeModal");

const saveEvent = document.getElementById("saveEvent");

const eventName = document.getElementById("eventName");
const eventDate = document.getElementById("eventDate");

let currentDate = new Date();

let events = [
    {
        name: "Team Meeting",
        date: "2026-10-06"
    },
    {
        name: "Project Review",
        date: "2026-10-14"
    },
    {
        name: "Client Call",
        date: "2026-10-22"
    }
];


function renderCalendar() {

    calendar.innerHTML = "";

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    monthTitle.textContent =
        currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric"
        });

    const firstDay = new Date(year, month, 1);

    let startDay = firstDay.getDay();

    startDay = startDay === 0 ? 6 : startDay - 1;

    const daysInMonth =
        new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < startDay; i++) {

        const empty = document.createElement("div");

        empty.className = "day";

        calendar.appendChild(empty);
    }

    for (let day = 1; day <= daysInMonth; day++) {

        const cell = document.createElement("div");

        cell.className = "day";

        const number = document.createElement("div");

        number.className = "day-number";

        number.textContent = day;

        cell.appendChild(number);

        const dateString =
            `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

        const dayEvents =
            events.filter(event => event.date === dateString);

        dayEvents.forEach(event => {

            const eventElement =
                document.createElement("div");

            eventElement.className = "event";

            eventElement.textContent = event.name;

            cell.appendChild(eventElement);

        });

        calendar.appendChild(cell);
    }
}


prevBtn.addEventListener("click", () => {

    currentDate.setMonth(currentDate.getMonth() - 1);

    renderCalendar();

});


nextBtn.addEventListener("click", () => {

    currentDate.setMonth(currentDate.getMonth() + 1);

    renderCalendar();

});


todayBtn.addEventListener("click", () => {

    currentDate = new Date();

    renderCalendar();

});


createBtn.addEventListener("click", () => {

    modal.classList.add("show");

});


closeModal.addEventListener("click", () => {

    modal.classList.remove("show");

});


saveEvent.addEventListener("click", () => {

    if (!eventName.value || !eventDate.value) {

        alert("Please enter event name and date.");

        return;
    }

    events.push({
        name: eventName.value,
        date: eventDate.value
    });

    eventName.value = "";
    eventDate.value = "";

    modal.classList.remove("show");

    renderCalendar();

});


themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    themeBtn.textContent =
        document.body.classList.contains("dark")
            ? "☀️"
            : "🌙";

});


renderCalendar();