// ==========================================
// NOVAFLOW SAAS ONBOARDING 2
// ==========================================

let currentStep = 1;

const totalSteps = 4;


// ================= ELEMENTS =================

const contentSteps =
    document.querySelectorAll(".content-step");

const sideSteps =
    document.querySelectorAll(".side-step");

const progressFill =
    document.getElementById("progressFill");

const progressText =
    document.getElementById("progressText");

const nextButton =
    document.getElementById("nextButton");

const backButton =
    document.getElementById("backButton");


// ================= USER DATA =================

let firstName = "";

let lastName = "";

let company = "";

let jobTitle = "";

let selectedTheme = "dark";


// ================= SHOW STEP =================

function showStep(step) {

    currentStep = step;


    // Content

    contentSteps.forEach(section => {

        section.classList.remove("active");

    });


    const activeContent =
        document.querySelector(
            `[data-content="${step}"]`
        );

    if (activeContent) {
        activeContent.classList.add("active");
    }


    // Sidebar

    sideSteps.forEach(side => {

        const number =
            Number(side.dataset.step);

        side.classList.remove("active");

        if (number < step) {

            side.classList.add("completed");

        } else {

            side.classList.remove("completed");

        }

        if (number === step) {

            side.classList.add("active");

        }

    });


    // Progress

    const progress =
        (step / totalSteps) * 100;

    progressFill.style.width =
        `${progress}%`;

    progressText.textContent =
        `${progress}% completed`;


    // Back button

    if (step === 1) {

        backButton.style.visibility =
            "hidden";

    } else {

        backButton.style.visibility =
            "visible";

    }


    // Next button

    if (step === totalSteps) {

        nextButton.innerHTML =
            `Open my workspace
             <i class="fa-solid fa-arrow-right"></i>`;

    } else {

        nextButton.innerHTML =
            `Continue
             <i class="fa-solid fa-arrow-right"></i>`;

    }

}


// ================= STEP 1 =================

function validateProfile() {

    const first =
        document.getElementById("firstName");

    const last =
        document.getElementById("lastName");

    const companyInput =
        document.getElementById("company");


    firstName =
        first.value.trim();

    lastName =
        last.value.trim();

    company =
        companyInput.value.trim();


    if (firstName === "") {

        first.focus();

        highlightError(first);

        return false;

    }


    if (lastName === "") {

        last.focus();

        highlightError(last);

        return false;

    }


    if (company === "") {

        companyInput.focus();

        highlightError(companyInput);

        return false;

    }


    jobTitle =
        document
            .getElementById("jobTitle")
            .value
            .trim();


    return true;
}


// ================= ERROR =================

function highlightError(input) {

    input.style.borderColor =
        "#e65b6a";

    setTimeout(() => {

        input.style.borderColor = "";

    }, 1200);

}


// ================= THEME =================

const themeButtons =
    document.querySelectorAll(".theme-option");


themeButtons.forEach(button => {

    button.addEventListener("click", () => {

        themeButtons.forEach(item => {

            item.classList.remove("active");

        });


        button.classList.add("active");


        selectedTheme =
            button.dataset.theme;

    });

});


// ================= INTEGRATIONS =================

const integrationCards =
    document.querySelectorAll(
        ".integration-card"
    );


integrationCards.forEach(card => {

    card.addEventListener("click", () => {

        card.classList.toggle("connected");


        const status =
            card.querySelector(
                ".connect-status"
            );


        if (card.classList.contains("connected")) {

            status.textContent =
                "Connected";

        } else {

            status.textContent =
                "Connect";

        }

    });

});


// ================= NEXT =================

nextButton.addEventListener(
    "click",
    () => {


        // Step 1

        if (currentStep === 1) {

            if (!validateProfile()) {

                return;

            }

            showStep(2);

            return;
        }


        // Step 2

        if (currentStep === 2) {

            updatePreferences();

            showStep(3);

            return;
        }


        // Step 3

        if (currentStep === 3) {

            updateSummary();

            showStep(4);

            return;
        }


        // Step 4

        if (currentStep === 4) {

            alert(
                `Welcome to NovaFlow, ${firstName}!`
            );

        }

    }
);


// ================= BACK =================

backButton.addEventListener(
    "click",
    () => {

        if (currentStep > 1) {

            showStep(currentStep - 1);

        }

    }
);


// ================= UPDATE PREFERENCES =================

function updatePreferences() {

    const theme =
        selectedTheme === "dark"
            ? "Dark"
            : "Light";


    document.getElementById(
        "summaryTheme"
    ).textContent = theme;

}


// ================= UPDATE SUMMARY =================

function updateSummary() {

    const fullName =
        `${firstName} ${lastName}`.trim();


    document.getElementById(
        "summaryName"
    ).textContent =
        fullName || "Your name";


    document.getElementById(
        "summaryCompany"
    ).textContent =
        company || "Your workspace";


    document.getElementById(
        "summaryTheme"
    ).textContent =
        selectedTheme === "dark"
            ? "Dark"
            : "Light";

}


// ================= SAVE & EXIT =================

document
    .querySelector(".save-btn")
    .addEventListener(
        "click",
        () => {

            alert(
                "Your onboarding progress has been saved."
            );

        }
    );


// ================= UPLOAD BUTTON =================

document
    .querySelector(".upload-btn")
    .addEventListener(
        "click",
        () => {

            alert(
                "Profile photo upload selected."
            );

        }
    );


// ================= KEYBOARD =================

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Enter" &&
            currentStep < totalSteps
        ) {

            nextButton.click();

        }


        if (
            event.key === "ArrowLeft" &&
            currentStep > 1
        ) {

            backButton.click();

        }

    }
);


// ================= INITIALIZE =================

showStep(1);