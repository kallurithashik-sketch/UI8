/* =========================================
   INITIALIZE ICONS
========================================= */

lucide.createIcons();


/* =========================================
   THEME TOGGLE
========================================= */

const themeToggle =
    document.getElementById("themeToggle");


themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light-mode");


    const icon =
        themeToggle.querySelector("svg");


    if (
        document.body.classList
        .contains("light-mode")
    ) {

        icon.setAttribute(
            "data-lucide",
            "sun"
        );

    } else {

        icon.setAttribute(
            "data-lucide",
            "moon"
        );

    }


    lucide.createIcons();

});


/* =========================================
   SEARCH FUNCTION
========================================= */

const searchInput =
    document.getElementById("searchInput");


const articles =
    document.querySelectorAll(".article");


const categories =
    document.querySelectorAll(".category-card");


searchInput.addEventListener("input", () => {

    const searchTerm =
        searchInput.value
        .toLowerCase()
        .trim();


    articles.forEach(article => {

        const text =
            article.innerText
            .toLowerCase();


        if (
            text.includes(searchTerm)
            || searchTerm === ""
        ) {

            article.style.display = "flex";

        } else {

            article.style.display = "none";

        }

    });


    categories.forEach(category => {

        const text =
            category.innerText
            .toLowerCase();


        if (
            text.includes(searchTerm)
            || searchTerm === ""
        ) {

            category.style.display = "flex";

        } else {

            category.style.display = "none";

        }

    });

});


/* =========================================
   QUICK SEARCH BUTTONS
========================================= */

const quickSearchButtons =
    document.querySelectorAll(".quick-search");


quickSearchButtons.forEach(button => {

    button.addEventListener("click", () => {

        const value =
            button.dataset.search;

        searchInput.value = value;

        searchInput.dispatchEvent(
            new Event("input")
        );

        searchInput.focus();

    });

});


/* =========================================
   KEYBOARD SHORTCUT - CTRL + K
========================================= */

document.addEventListener("keydown", event => {

    if (
        (event.ctrlKey || event.metaKey)
        && event.key.toLowerCase() === "k"
    ) {

        event.preventDefault();

        searchInput.focus();

    }

});


/* =========================================
   FAQ ACCORDION
========================================= */

const faqItems =
    document.querySelectorAll(".faq-item");


faqItems.forEach(item => {

    const question =
        item.querySelector(".faq-question");


    question.addEventListener("click", () => {

        const isActive =
            item.classList.contains("active");


        /* Close all FAQs */

        faqItems.forEach(otherItem => {

            otherItem.classList.remove(
                "active"
            );

        });


        /* Open selected FAQ */

        if (!isActive) {

            item.classList.add("active");

        }

    });

});


/* =========================================
   CONTACT MODAL
========================================= */

const modalOverlay =
    document.getElementById("modalOverlay");


const contactBtn =
    document.getElementById("contactBtn");


const supportBtn =
    document.getElementById("supportBtn");


const modalClose =
    document.getElementById("modalClose");


function openModal() {

    modalOverlay.classList.add("show");

    document.body.style.overflow = "hidden";

}


function closeModal() {

    modalOverlay.classList.remove("show");

    document.body.style.overflow = "";

}


contactBtn.addEventListener(
    "click",
    openModal
);


supportBtn.addEventListener(
    "click",
    openModal
);


modalClose.addEventListener(
    "click",
    closeModal
);


/* Close when clicking outside */

modalOverlay.addEventListener(
    "click",
    event => {

        if (
            event.target === modalOverlay
        ) {

            closeModal();

        }

    }
);


/* Escape key */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeModal();

        }

    }
);


/* =========================================
   SUPPORT FORM
========================================= */

const supportForm =
    document.getElementById("supportForm");


const successMessage =
    document.getElementById("successMessage");


supportForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        successMessage.style.display =
            "block";


        supportForm.reset();


        setTimeout(() => {

            successMessage.style.display =
                "none";

            closeModal();

        }, 2500);

    }
);