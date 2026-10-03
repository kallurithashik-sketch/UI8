const themeBtn =
    document.getElementById("themeBtn");

const notificationBtn =
    document.getElementById("notificationBtn");

const notificationBox =
    document.getElementById("notificationBox");

const searchInput =
    document.getElementById("searchInput");

const dateBtn =
    document.getElementById("dateBtn");

const chartSelect =
    document.getElementById("chartSelect");


// THEME

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    const dark =
        document.body.classList.contains("dark");

    themeBtn.textContent =
        dark ? "☀️" : "🌙";

});


// NOTIFICATIONS

notificationBtn.addEventListener("click", event => {

    event.stopPropagation();

    notificationBox.classList.toggle("show");

});


document.addEventListener("click", event => {

    if (
        !notificationBox.contains(event.target) &&
        event.target !== notificationBtn
    ) {

        notificationBox.classList.remove("show");

    }

});


// DATE FILTER

dateBtn.addEventListener("click", () => {

    const options = [
        "Last 7 days",
        "Last 30 days",
        "Last 90 days",
        "This year"
    ];

    const current =
        dateBtn.textContent.replace("📅 ", "").trim();

    const index =
        options.indexOf(current);

    const next =
        options[(index + 1) % options.length];

    dateBtn.textContent =
        "📅 " + next + " ▾";

});


// SEARCH

searchInput.addEventListener("keydown", event => {

    if (event.key === "Enter") {

        const value =
            searchInput.value.trim();

        if (value) {

            alert(
                "Searching for: " + value
            );

        }

    }

});


// CHART YEAR

chartSelect.addEventListener("change", () => {

    alert(
        "Revenue data updated for " +
        chartSelect.value
    );

});


// KEYBOARD SHORTCUT

document.addEventListener("keydown", event => {

    if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "k"
    ) {

        event.preventDefault();

        searchInput.focus();

    }

});