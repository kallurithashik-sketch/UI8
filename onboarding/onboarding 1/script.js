// ==========================================
// SAAS ONBOARDING - JAVASCRIPT
// ==========================================


let currentStep = 1;

const totalSteps = 4;


// Elements

const steps = document.querySelectorAll(".step");

const progressBar =
    document.getElementById("progressBar");

const stepText =
    document.getElementById("stepText");

const dots =
    document.querySelectorAll(".dot");

const backBtn =
    document.getElementById("backBtn");

const continueBtn =
    document.getElementById("continueBtn");

const skipBtn =
    document.getElementById("skipBtn");


// Form values

let userName = "";

let workspaceName = "";

let teamSize = "";

let selectedGoals = [];


// ==========================================
// SHOW STEP
// ==========================================

function showStep(stepNumber) {

    currentStep = stepNumber;


    // Hide all steps

    steps.forEach(step => {

        step.classList.remove("active");

    });


    // Show current step

    const current =
        document.querySelector(
            `.step[data-step="${stepNumber}"]`
        );

    current.classList.add("active");


    // Update progress

    const progress =
        (stepNumber / totalSteps) * 100;

    progressBar.style.width =
        `${progress}%`;


    // Update text

    stepText.textContent =
        `Step ${stepNumber} of ${totalSteps}`;


    // Update dots

    dots.forEach((dot, index) => {

        dot.classList.toggle(
            "active",
            index + 1 === stepNumber
        );

    });


    // Back button

    if (stepNumber === 1) {

        backBtn.style.visibility = "hidden";

    } else {

        backBtn.style.visibility = "visible";

    }


    // Final button

    if (stepNumber === totalSteps) {

        continueBtn.innerHTML =
            `Get Started <i class="fa-solid fa-arrow-right"></i>`;

    } else {

        continueBtn.innerHTML =
            `Continue <i class="fa-solid fa-arrow-right"></i>`;

    }

}


// ==========================================
// STEP 1 VALIDATION
// ==========================================

function validateStepOne() {

    const nameInput =
        document.getElementById("name");

    const workspaceInput =
        document.getElementById("workspace");


    userName =
        nameInput.value.trim();

    workspaceName =
        workspaceInput.value.trim();


    if (userName === "") {

        nameInput.focus();

        nameInput.style.borderColor =
            "#e05252";

        setTimeout(() => {

            nameInput.style.borderColor = "";

        }, 1500);

        return false;

    }


    if (workspaceName === "") {

        workspaceInput.focus();

        workspaceInput.style.borderColor =
            "#e05252";

        setTimeout(() => {

            workspaceInput.style.borderColor = "";

        }, 1500);

        return false;

    }


    return true;
}


// ==========================================
// STEP 2 OPTIONS
// ==========================================

const optionCards =
    document.querySelectorAll(".option-card");


optionCards.forEach(card => {

    card.addEventListener("click", () => {

        optionCards.forEach(item => {

            item.classList.remove("selected");

        });


        card.classList.add("selected");


        teamSize =
            card.dataset.value;

    });

});


// ==========================================
// STEP 3 GOALS
// ==========================================

const goalCards =
    document.querySelectorAll(".goal-card");


goalCards.forEach(card => {

    card.addEventListener("click", () => {

        card.classList.toggle("selected");


        const goal =
            card.querySelector("span").textContent;


        if (card.classList.contains("selected")) {

            if (!selectedGoals.includes(goal)) {

                selectedGoals.push(goal);

            }

        } else {

            selectedGoals =
                selectedGoals.filter(
                    item => item !== goal
                );

        }

    });

});


// ==========================================
// CONTINUE BUTTON
// ==========================================

continueBtn.addEventListener("click", () => {


    // STEP 1

    if (currentStep === 1) {

        if (!validateStepOne()) {

            return;

        }

        showStep(2);

        return;
    }


    // STEP 2

    if (currentStep === 2) {

        if (teamSize === "") {

            alert(
                "Please select your team size."
            );

            return;

        }

        showStep(3);

        return;
    }


    // STEP 3

    if (currentStep === 3) {

        if (selectedGoals.length === 0) {

            alert(
                "Please select at least one goal."
            );

            return;

        }


        updateCompletionScreen();

        showStep(4);

        return;
    }


    // STEP 4

    if (currentStep === 4) {

        alert(
            `Welcome to Flowly, ${userName}!`
        );

    }

});


// ==========================================
// BACK BUTTON
// ==========================================

backBtn.addEventListener("click", () => {

    if (currentStep > 1) {

        showStep(currentStep - 1);

    }

});


// ==========================================
// SKIP BUTTON
// ==========================================

skipBtn.addEventListener("click", () => {

    const confirmation =
        confirm(
            "Are you sure you want to skip onboarding?"
        );


    if (confirmation) {

        showStep(4);

        updateCompletionScreen();

    }

});


// ==========================================
// COMPLETION SCREEN
// ==========================================

function updateCompletionScreen() {

    const workspaceResult =
        document.getElementById(
            "workspaceResult"
        );

    const teamResult =
        document.getElementById(
            "teamResult"
        );


    if (workspaceName !== "") {

        workspaceResult.textContent =
            `${workspaceName} is ready to go`;

    }


    if (teamSize !== "") {

        teamResult.textContent =
            `Set up for a ${teamSize} team`;

    }

}


// ==========================================
// KEYBOARD SUPPORT
// ==========================================

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Enter" &&
            currentStep < totalSteps
        ) {

            continueBtn.click();

        }


        if (
            event.key === "Escape" &&
            currentStep > 1
        ) {

            backBtn.click();

        }

    }
);


// ==========================================
// INITIALIZE
// ==========================================

showStep(1);