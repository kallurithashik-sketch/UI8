const daysContainer = document.getElementById("days");

const prev = document.getElementById("prev");
const next = document.getElementById("next");

const selectedDate =
    document.getElementById("selectedDate");

const addBtn =
    document.getElementById("addBtn");

const modal =
    document.getElementById("modal");

const close =
    document.getElementById("close");

const save =
    document.getElementById("save");

const title =
    document.getElementById("title");

const time =
    document.getElementById("time");

const eventList =
    document.getElementById("eventList");

const themeBtn =
    document.getElementById("themeBtn");

let date = new Date();


function renderDays() {

    daysContainer.innerHTML = "";

    const year = date.getFullYear();
    const month = date.getMonth();

    const daysInMonth =
        new Date(year, month + 1, 0).getDate();

    for (let i = 1; i <= daysInMonth; i++) {

        const day = document.createElement("div");

        day.className = "day";

        day.textContent = i;

        day.addEventListener("click", () => {

            document
                .querySelectorAll(".day")
                .forEach(d => d.classList.remove("selected"));

            day.classList.add("selected");

            selectedDate.textContent =
                `${i} ${date.toLocaleString("default", {
                    month: "long"
                })} ${year}`;

        });

        daysContainer.appendChild(day);

    }
}


prev.addEventListener("click", () => {

    date.setMonth(date.getMonth() - 1);

    renderDays();

});


next.addEventListener("click", () => {

    date.setMonth(date.getMonth() + 1);

    renderDays();

});


addBtn.addEventListener("click", () => {

    modal.classList.add("show");

});


close.addEventListener("click", () => {

    modal.classList.remove("show");

});


save.addEventListener("click", () => {

    if (!title.value || !time.value) {

        alert("Please enter event details.");

        return;

    }

    const item =
        document.createElement("div");

    item.className = "agenda-item";

    item.innerHTML = `
        <div class="time">${time.value}</div>

        <div class="event-info">
            <h3>${title.value}</h3>
            <p>New Event · My Calendar</p>
        </div>
    `;

    eventList.appendChild(item);

    title.value = "";
    time.value = "";

    modal.classList.remove("show");

});


themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    themeBtn.textContent =
        document.body.classList.contains("dark")
            ? "☀️"
            : "🌙";

});


renderDays();