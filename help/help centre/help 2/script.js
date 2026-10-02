/* =====================================================
   INITIALIZE ICONS
===================================================== */

lucide.createIcons();


/* =====================================================
   ELEMENTS
===================================================== */

const body =
    document.body;

const sidebar =
    document.getElementById("sidebar");

const mobileOverlay =
    document.getElementById("mobileOverlay");

const menuBtn =
    document.getElementById("menuBtn");

const closeSidebar =
    document.getElementById("closeSidebar");

const themeToggle =
    document.getElementById("themeToggle");

const topThemeToggle =
    document.getElementById("topThemeToggle");

const searchInput =
    document.getElementById("searchInput");


/* =====================================================
   MOBILE SIDEBAR
===================================================== */

function openSidebar() {

    sidebar.classList.add("open");

    mobileOverlay.classList.add("show");

    body.style.overflow = "hidden";
}


function closeMobileSidebar() {

    sidebar.classList.remove("open");

    mobileOverlay.classList.remove("show");

    body.style.overflow = "";
}


menuBtn.addEventListener(
    "click",
    openSidebar
);


closeSidebar.addEventListener(
    "click",
    closeMobileSidebar
);


mobileOverlay.addEventListener(
    "click",
    closeMobileSidebar
);


/* =====================================================
   SIDEBAR NAVIGATION
===================================================== */

const navLinks =
    document.querySelectorAll(".nav-link");


navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navLinks.forEach(item => {

            item.classList.remove("active");

        });

        link.classList.add("active");


        if (
            window.innerWidth <= 800
        ) {

            closeMobileSidebar();

        }

    });

});


/* =====================================================
   THEME
===================================================== */

function toggleTheme() {

    body.classList.toggle("dark-mode");

    const isDark =
        body.classList.contains("dark-mode");


    localStorage.setItem(
        "orbitTheme",
        isDark ? "dark" : "light"
    );

}


themeToggle.addEventListener(
    "click",
    toggleTheme
);


topThemeToggle.addEventListener(
    "click",
    toggleTheme
);


/* Load saved theme */

const savedTheme =
    localStorage.getItem("orbitTheme");


if (savedTheme === "dark") {

    body.classList.add("dark-mode");

}


/* =====================================================
   SEARCH
===================================================== */

const searchableItems =
    document.querySelectorAll(".searchable");


function performSearch(value) {

    const searchTerm =
        value
            .toLowerCase()
            .trim();


    searchableItems.forEach(item => {

        const text =
            (
                item.innerText +
                " " +
                (
                    item.dataset.keywords || ""
                )
            ).toLowerCase();


        if (
            searchTerm === "" ||
            text.includes(searchTerm)
        ) {

            item.style.display = "";

        } else {

            item.style.display = "none";

        }

    });

}


searchInput.addEventListener(
    "input",
    () => {

        performSearch(
            searchInput.value
        );

    }
);


/* =====================================================
   SEARCH TAGS
===================================================== */

const searchTags =
    document.querySelectorAll(
        ".search-tags button"
    );


searchTags.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const searchValue =
                button.dataset.search;

            searchInput.value =
                searchValue;

            performSearch(
                searchValue
            );

            searchInput.focus();

            document
                .querySelector(".article-section")
                .scrollIntoView({
                    behavior: "smooth"
                });

        }
    );

});


/* =====================================================
   "/" SEARCH SHORTCUT
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        const activeElement =
            document.activeElement;

        const isTyping =
            activeElement.tagName === "INPUT" ||
            activeElement.tagName === "TEXTAREA" ||
            activeElement.tagName === "SELECT";


        if (
            event.key === "/" &&
            !isTyping
        ) {

            event.preventDefault();

            searchInput.focus();

        }

    }
);


/* =====================================================
   ESCAPE SEARCH
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            searchInput.value = "";

            performSearch("");

            searchInput.blur();

        }

    }
);


/* =====================================================
   SUPPORT MODAL
===================================================== */

const modal =
    document.getElementById("modal");

const openSupport =
    document.getElementById("openSupport");

const supportButton =
    document.getElementById("supportButton");

const closeModal =
    document.getElementById("closeModal");


function openSupportModal() {

    modal.classList.add("show");

    body.style.overflow = "hidden";

}


function closeSupportModal() {

    modal.classList.remove("show");

    body.style.overflow = "";

}


openSupport.addEventListener(
    "click",
    openSupportModal
);


supportButton.addEventListener(
    "click",
    openSupportModal
);


closeModal.addEventListener(
    "click",
    closeSupportModal
);


/* Close by clicking background */

modal.addEventListener(
    "click",
    event => {

        if (
            event.target === modal
        ) {

            closeSupportModal();

        }

    }
);


/* Escape closes modal */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            modal.classList.contains("show")
        ) {

            closeSupportModal();

        }

    }
);


/* =====================================================
   SUPPORT FORM
===================================================== */

const supportForm =
    document.getElementById("supportForm");

const formSuccess =
    document.getElementById("formSuccess");


supportForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        formSuccess.style.display =
            "flex";


        supportForm.reset();


        setTimeout(() => {

            formSuccess.style.display =
                "none";

            closeSupportModal();

        }, 2500);

    }
);


/* =====================================================
   VIEW ALL ARTICLES
===================================================== */

const allArticles =
    document.getElementById("allArticles");


allArticles.addEventListener(
    "click",
    () => {

        searchInput.value = "";

        performSearch("");

        document
            .querySelector(".article-section")
            .scrollIntoView({
                behavior: "smooth"
            });

    }
);


/* =====================================================
   ARTICLE CLICK FEEDBACK
===================================================== */

const articleRows =
    document.querySelectorAll(
        ".article-row"
    );


articleRows.forEach(article => {

    article.addEventListener(
        "click",
        () => {

            article.style.borderLeft =
                "3px solid var(--primary)";

            setTimeout(() => {

                article.style.borderLeft =
                    "";

            }, 500);

        }
    );

});