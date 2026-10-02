/* =========================================
   MODERN SAAS UI COLLECTION
   HOME PAGE JAVASCRIPT
========================================= */


// =========================================
// THEME TOGGLE
// =========================================

const themeToggle = document.getElementById("themeToggle");


// Check previously saved theme

const savedTheme = localStorage.getItem("saas-theme");

if (savedTheme === "dark") {

    document.body.classList.add("dark-mode");

    themeToggle.textContent = "☀️";

}


// Toggle theme

themeToggle.addEventListener("click", function () {

    document.body.classList.toggle("dark-mode");


    const isDarkMode =
        document.body.classList.contains("dark-mode");


    if (isDarkMode) {

        themeToggle.textContent = "☀️";

        localStorage.setItem("saas-theme", "dark");

    } else {

        themeToggle.textContent = "🌙";

        localStorage.setItem("saas-theme", "light");

    }

});


// =========================================
// SMOOTH SCROLL
// =========================================

const navigationLinks =
    document.querySelectorAll('a[href^="#"]');


navigationLinks.forEach(function (link) {

    link.addEventListener("click", function (event) {

        const targetId =
            this.getAttribute("href");


        if (targetId === "#") {
            return;
        }


        const target =
            document.querySelector(targetId);


        if (target) {

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});


// =========================================
// TEMPLATE CARD ANIMATION
// =========================================

const templateCards =
    document.querySelectorAll(".template-card");


const observer =
    new IntersectionObserver(

        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                }

            });

        },

        {
            threshold: 0.15
        }

    );


templateCards.forEach(function (card) {

    card.style.opacity = "0";

    card.style.transform = "translateY(20px)";

    card.style.transition =
        "opacity 0.5s ease, transform 0.5s ease";

    observer.observe(card);

});


// =========================================
// TEMPLATE BUTTON CLICK
// =========================================

const templateButtons =
    document.querySelectorAll(".template-btn");


templateButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const templateName =
            this.closest(".template-card")
                .querySelector("h3")
                .textContent;


        console.log(
            "Opening template:",
            templateName
        );

    });

});


// =========================================
// CONSOLE MESSAGE
// =========================================

console.log(
    "Modern SaaS UI Collection loaded successfully."
);