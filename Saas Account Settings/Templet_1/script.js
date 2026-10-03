const settingsLinks =
    document.querySelectorAll(".settings-link");

const settingsPanels =
    document.querySelectorAll(".settings-panel");

const toast =
    document.getElementById("toast");

const menuBtn =
    document.getElementById("menuBtn");

const sidebar =
    document.getElementById("sidebar");


/* =========================
   SETTINGS NAVIGATION
========================= */

settingsLinks.forEach(link => {

    link.addEventListener("click", () => {

        const target =
            link.dataset.section;

        settingsLinks.forEach(item => {
            item.classList.remove("active");
        });

        settingsPanels.forEach(panel => {
            panel.classList.remove("active-panel");
        });

        link.classList.add("active");

        document
            .getElementById(target)
            .classList.add("active-panel");

    });

});


/* =========================
   MOBILE SIDEBAR
========================= */

menuBtn.addEventListener("click", () => {

    sidebar.classList.toggle("open");

});


/* =========================
   SAVE PROFILE
========================= */

document
    .getElementById("saveProfile")
    .addEventListener("click", () => {

        const firstName =
            document.getElementById("firstName").value.trim();

        const email =
            document.getElementById("email").value.trim();

        if (firstName === "" || email === "") {

            showToast(
                "Please complete the required fields."
            );

            return;
        }

        showToast(
            "Profile changes saved successfully."
        );

    });


/* =========================
   CHANGE PHOTO
========================= */

document
    .getElementById("changePhoto")
    .addEventListener("click", () => {

        showToast(
            "Profile photo selector opened."
        );

    });


/* =========================
   PASSWORD
========================= */

document
    .getElementById("changePassword")
    .addEventListener("click", () => {

        showToast(
            "Password change process started."
        );

    });


/* =========================
   TWO FACTOR
========================= */

document
    .getElementById("twoFactor")
    .addEventListener("change", event => {

        if (event.target.checked) {

            showToast(
                "Two-factor authentication enabled."
            );

        } else {

            showToast(
                "Two-factor authentication disabled."
            );
        }

    });


/* =========================
   LOGOUT ALL
========================= */

document
    .getElementById("logoutAll")
    .addEventListener("click", () => {

        showToast(
            "All other sessions have been signed out."
        );

    });


/* =========================
   THEME
========================= */

const themeButtons =
    document.querySelectorAll(".theme-btn");

themeButtons.forEach(button => {

    button.addEventListener("click", () => {

        themeButtons.forEach(item => {
            item.classList.remove("active");
        });

        button.classList.add("active");

        if (button.dataset.theme === "dark") {

            document.body.style.background =
                "#171827";

            showToast("Dark appearance selected.");

        } else {

            document.body.style.background =
                "#f7f8fb";

            showToast("Light appearance selected.");
        }

    });

});


/* =========================
   TOAST
========================= */

let toastTimer;

function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);
}