const themeBtn =
    document.getElementById("themeBtn");

const shareBtn =
    document.getElementById("shareBtn");

const exportBtn =
    document.getElementById("exportBtn");

const trafficSelect =
    document.getElementById("trafficSelect");

const periodButtons =
    document.querySelectorAll(".period button");


// THEME TOGGLE

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    const dark =
        document.body.classList.contains("dark");

    themeBtn.textContent =
        dark ? "☀️" : "🌙";

});


// SHARE

shareBtn.addEventListener("click", async () => {

    try {

        await navigator.clipboard.writeText(
            window.location.href
        );

        shareBtn.textContent = "✓ Copied";

        setTimeout(() => {

            shareBtn.textContent = "↗ Share";

        }, 1500);

    } catch {

        alert(
            "Dashboard link: " +
            window.location.href
        );

    }

});


// PERIOD BUTTONS

periodButtons.forEach(button => {

    button.addEventListener("click", () => {

        periodButtons.forEach(item => {

            item.classList.remove(
                "period-active"
            );

        });

        button.classList.add(
            "period-active"
        );

        console.log(
            "Selected period:",
            button.textContent
        );

    });

});


// TRAFFIC FILTER

trafficSelect.addEventListener("change", () => {

    console.log(
        "Selected metric:",
        trafficSelect.value
    );

});


// EXPORT

exportBtn.addEventListener("click", () => {

    const csv =
`Traffic Source,Percentage
Google Search,42.8%
Direct,28.4%
Social Media,17.2%
Referral,11.6%`;

    const blob =
        new Blob([csv], {
            type: "text/csv"
        });

    const url =
        URL.createObjectURL(blob);

    const link =
        document.createElement("a");

    link.href = url;

    link.download =
        "traffic-sources.csv";

    link.click();

    URL.revokeObjectURL(url);

});


// KPI HOVER MESSAGE

const kpis =
    document.querySelectorAll(".kpi");

kpis.forEach(kpi => {

    kpi.addEventListener("click", () => {

        const title =
            kpi.querySelector(".kpi-title")
                .textContent.trim();

        const value =
            kpi.querySelector("strong")
                .textContent;

        console.log(
            title + ": " + value
        );

    });

});