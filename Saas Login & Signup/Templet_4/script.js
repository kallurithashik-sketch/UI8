const authForm = document.getElementById("authForm");

const loginTab = document.getElementById("loginTab");
const signupTab = document.getElementById("signupTab");

const title = document.getElementById("title");
const subtitle = document.getElementById("subtitle");

const nameGroup = document.getElementById("nameGroup");
const nameInput = document.getElementById("name");

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const forgotPassword =
    document.getElementById("forgotPassword");

const togglePassword =
    document.getElementById("togglePassword");

const strengthBox =
    document.getElementById("strengthBox");

const strengthText =
    document.getElementById("strengthText");

const strengthBars =
    document.querySelectorAll(".strength-bars span");

const termsBox =
    document.getElementById("termsBox");

const terms =
    document.getElementById("terms");

const rememberBox =
    document.getElementById("rememberBox");

const submitBtn =
    document.getElementById("submitBtn");

const bottomMessage =
    document.getElementById("bottomMessage");

const bottomSwitch =
    document.getElementById("bottomSwitch");

const googleBtn =
    document.getElementById("googleBtn");

const toast =
    document.getElementById("toast");

const nameError =
    document.getElementById("nameError");

const emailError =
    document.getElementById("emailError");

const passwordError =
    document.getElementById("passwordError");

const termsError =
    document.getElementById("termsError");


let isSignup = false;


/* =========================
   CHANGE MODE
========================= */

function setMode(signup) {

    isSignup = signup;

    clearErrors();

    loginTab.classList.toggle("active", !isSignup);
    signupTab.classList.toggle("active", isSignup);

    if (isSignup) {

        title.textContent =
            "Create your FlowDesk account";

        subtitle.textContent =
            "Set up your workspace and start collaborating.";

        nameGroup.classList.remove("hidden");

        strengthBox.classList.remove("hidden");

        termsBox.classList.remove("hidden");

        rememberBox.classList.add("hidden");

        forgotPassword.classList.add("hidden");

        submitBtn.textContent =
            "Create my workspace";

        bottomMessage.textContent =
            "Already have a FlowDesk account?";

        bottomSwitch.textContent =
            "Sign in";

        passwordInput.setAttribute(
            "autocomplete",
            "new-password"
        );

    } else {

        title.textContent =
            "Sign in to FlowDesk";

        subtitle.textContent =
            "Welcome back. Please enter your details.";

        nameGroup.classList.add("hidden");

        strengthBox.classList.add("hidden");

        termsBox.classList.add("hidden");

        rememberBox.classList.remove("hidden");

        forgotPassword.classList.remove("hidden");

        submitBtn.textContent =
            "Continue to workspace";

        bottomMessage.textContent =
            "New to FlowDesk?";

        bottomSwitch.textContent =
            "Create an account";

        passwordInput.setAttribute(
            "autocomplete",
            "current-password"
        );
    }
}


loginTab.addEventListener("click", () => {
    setMode(false);
});


signupTab.addEventListener("click", () => {
    setMode(true);
});


bottomSwitch.addEventListener("click", () => {
    setMode(!isSignup);
});


/* =========================
   PASSWORD TOGGLE
========================= */

togglePassword.addEventListener("click", () => {

    const hidden =
        passwordInput.type === "password";

    passwordInput.type =
        hidden ? "text" : "password";

    togglePassword.textContent =
        hidden ? "Hide" : "Show";
});


/* =========================
   PASSWORD STRENGTH
========================= */

passwordInput.addEventListener("input", () => {

    if (!isSignup) {
        return;
    }

    const password =
        passwordInput.value;

    let score = 0;

    if (password.length >= 6) {
        score++;
    }

    if (/[A-Z]/.test(password)) {
        score++;
    }

    if (/[0-9]/.test(password)) {
        score++;
    }

    if (/[^A-Za-z0-9]/.test(password)) {
        score++;
    }

    strengthBars.forEach((bar, index) => {

        bar.classList.toggle(
            "active",
            index < score
        );

    });


    if (password.length === 0) {

        strengthText.textContent =
            "Password strength";

    } else if (score <= 1) {

        strengthText.textContent =
            "Weak password";

    } else if (score === 2) {

        strengthText.textContent =
            "Medium password";

    } else if (score === 3) {

        strengthText.textContent =
            "Good password";

    } else {

        strengthText.textContent =
            "Strong password";
    }
});


/* =========================
   VALIDATION
========================= */

function validEmail(email) {

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
            "Email is required.";

        emailInput.classList.add("input-error");

        valid = false;

    } else if (!validEmail(emailInput.value.trim())) {

        emailError.textContent =
            "Enter a valid work email.";

        emailInput.classList.add("input-error");

        valid = false;
    }


    if (passwordInput.value.length < 6) {

        passwordError.textContent =
            "Password must be at least 6 characters.";

        passwordInput.classList.add("input-error");

        valid = false;
    }


    if (isSignup && !terms.checked) {

        termsError.textContent =
            "Please accept the terms to continue.";

        valid = false;
    }


    return valid;
}


function clearErrors() {

    nameError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";
    termsError.textContent = "";

    nameInput.classList.remove("input-error");
    emailInput.classList.remove("input-error");
    passwordInput.classList.remove("input-error");
}


/* =========================
   SUBMIT
========================= */

authForm.addEventListener("submit", (event) => {

    event.preventDefault();

    if (!validateForm()) {
        return;
    }

    if (isSignup) {

        showToast(
            "Your FlowDesk workspace has been created!"
        );

    } else {

        showToast(
            "Welcome back! Login successful."
        );
    }
});


/* =========================
   FORGOT PASSWORD
========================= */

forgotPassword.addEventListener("click", (event) => {

    event.preventDefault();

    const email =
        emailInput.value.trim();

    if (!validEmail(email)) {

        showToast(
            "Enter a valid email first."
        );

        emailInput.focus();

        return;
    }

    showToast(
        "Password reset instructions sent."
    );
});


/* =========================
   GOOGLE
========================= */

googleBtn.addEventListener("click", () => {

    showToast(
        "Google authentication selected."
    );
});


/* =========================
   TOAST
========================= */

let toastTimeout;

function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimeout);

    toastTimeout = setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);
}