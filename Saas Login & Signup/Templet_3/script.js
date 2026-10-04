const authForm = document.getElementById("authForm");

const formTitle = document.getElementById("formTitle");
const formSubtitle = document.getElementById("formSubtitle");

const nameGroup = document.getElementById("nameGroup");
const nameInput = document.getElementById("name");

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");

const passwordToggle = document.getElementById("passwordToggle");
const rememberRow = document.getElementById("rememberRow");

const submitBtn = document.getElementById("submitBtn");

const switchMode = document.getElementById("switchMode");
const switchMessage = document.getElementById("switchMessage");

const forgotPassword = document.getElementById("forgotPassword");
const googleBtn = document.getElementById("googleBtn");

const toast = document.getElementById("toast");

let isSignup = false;


/* =========================
   LOGIN / SIGNUP SWITCH
========================= */

switchMode.addEventListener("click", () => {

    isSignup = !isSignup;

    clearErrors();

    if (isSignup) {

        formTitle.textContent = "Create your account";

        formSubtitle.textContent =
            "Start your workspace in just a few seconds.";

        nameGroup.classList.remove("hidden");

        rememberRow.classList.add("hidden");

        forgotPassword.classList.add("hidden");

        submitBtn.textContent = "Create account";

        switchMessage.textContent =
            "Already have an account?";

        switchMode.textContent =
            "Log in";

        passwordInput.setAttribute(
            "autocomplete",
            "new-password"
        );

    } else {

        formTitle.textContent = "Welcome back";

        formSubtitle.textContent =
            "Enter your details to access your workspace.";

        nameGroup.classList.add("hidden");

        rememberRow.classList.remove("hidden");

        forgotPassword.classList.remove("hidden");

        submitBtn.textContent = "Log in";

        switchMessage.textContent =
            "Don't have an account?";

        switchMode.textContent =
            "Create an account";

        passwordInput.setAttribute(
            "autocomplete",
            "current-password"
        );
    }
});


/* =========================
   PASSWORD VISIBILITY
========================= */

passwordToggle.addEventListener("click", () => {

    const isPassword =
        passwordInput.type === "password";

    passwordInput.type =
        isPassword ? "text" : "password";

    passwordToggle.textContent =
        isPassword ? "Hide" : "Show";

    passwordToggle.setAttribute(
        "aria-label",
        isPassword ? "Hide password" : "Show password"
    );
});


/* =========================
   VALIDATION
========================= */

function validateEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}


function validateForm() {

    let valid = true;

    clearErrors();

    if (isSignup && nameInput.value.trim() === "") {

        nameError.textContent =
            "Please enter your name.";

        nameInput.classList.add("input-error");

        valid = false;
    }


    if (emailInput.value.trim() === "") {

        emailError.textContent =
            "Email address is required.";

        emailInput.classList.add("input-error");

        valid = false;

    } else if (!validateEmail(emailInput.value.trim())) {

        emailError.textContent =
            "Please enter a valid email address.";

        emailInput.classList.add("input-error");

        valid = false;
    }


    if (passwordInput.value.length < 6) {

        passwordError.textContent =
            "Password must contain at least 6 characters.";

        passwordInput.classList.add("input-error");

        valid = false;
    }

    return valid;
}


function clearErrors() {

    nameError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";

    nameInput.classList.remove("input-error");
    emailInput.classList.remove("input-error");
    passwordInput.classList.remove("input-error");
}


/* =========================
   FORM SUBMIT
========================= */

authForm.addEventListener("submit", (event) => {

    event.preventDefault();

    if (!validateForm()) {
        return;
    }

    if (isSignup) {

        showToast(
            "Account created successfully!"
        );

    } else {

        showToast(
            "Login successful!"
        );
    }
});


/* =========================
   FORGOT PASSWORD
========================= */

forgotPassword.addEventListener("click", (event) => {

    event.preventDefault();

    const email = emailInput.value.trim();

    if (email === "") {

        showToast(
            "Enter your email to reset your password."
        );

        emailInput.focus();

        return;
    }

    if (!validateEmail(email)) {

        showToast(
            "Please enter a valid email address."
        );

        emailInput.focus();

        return;
    }

    showToast(
        "Password reset instructions sent!"
    );
});


/* =========================
   GOOGLE BUTTON
========================= */

googleBtn.addEventListener("click", () => {

    showToast(
        "Google sign-in selected."
    );
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