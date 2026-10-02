// ================= MOBILE MENU =================

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("show");

    const icon = menuBtn.querySelector("i");

    if (navLinks.classList.contains("show")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
    } else {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    }

});


// Close mobile menu after clicking a link

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("show");

        const icon = menuBtn.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});


// ================= START BUTTONS =================

const startBtn = document.getElementById("startBtn");
const ctaStart = document.getElementById("ctaStart");

function showSignupMessage() {

    alert(
        "Welcome to Flowly!\n\n" +
        "Your free workspace is ready to be created."
    );

}

startBtn.addEventListener("click", showSignupMessage);
ctaStart.addEventListener("click", showSignupMessage);


// ================= DEMO BUTTON =================

const demoBtn = document.getElementById("demoBtn");

demoBtn.addEventListener("click", () => {

    alert(
        "Demo video coming soon!\n\n" +
        "This area can be connected to your product demo video."
    );

});


// ================= SCROLL ANIMATION =================

const animatedElements = document.querySelectorAll(
    ".feature-card, .workflow-card, .stat-card, .dashboard-window"
);

const observer = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

            }

        });

    },
    {
        threshold: 0.15
    }
);


animatedElements.forEach(element => {

    element.classList.add("animate-on-scroll");

    observer.observe(element);

});


// ================= NAVBAR SHADOW =================

window.addEventListener("scroll", () => {

    const navbar = document.querySelector(".navbar");

    if (window.scrollY > 20) {

        navbar.style.boxShadow =
            "0 5px 25px rgba(0, 0, 0, 0.06)";

    } else {

        navbar.style.boxShadow = "none";

    }

});


// ================= FEATURE HOVER =================

const featureCards =
    document.querySelectorAll(".feature-card");

featureCards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-7px)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "translateY(0)";

    });

});


// ================= SMOOTH BUTTON FEEDBACK =================

document.querySelectorAll(".primary-btn, .white-btn").forEach(button => {

    button.addEventListener("click", () => {

        button.style.transform = "scale(0.97)";

        setTimeout(() => {

            button.style.transform = "";

        }, 120);

    });

});