const toast = document.getElementById("toast");

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}

/* User Dropdown */

const userButton = document.getElementById("userButton");
const userDropdown = document.getElementById("userDropdown");

userButton.addEventListener("click", () => {
    userDropdown.classList.toggle("show");
});

document.addEventListener("click", (event) => {
    if (!userButton.contains(event.target) &&
        !userDropdown.contains(event.target)) {
        userDropdown.classList.remove("show");
    }
});

/* Save Profile */

document.getElementById("profileSave").addEventListener("click", () => {
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();

    if (!firstName || !lastName) {
        showToast("Please enter your first and last name.");
        return;
    }

    document.querySelector(".profile-info h2").textContent =
        `${firstName} ${lastName}`;

    document.querySelector(".profile-avatar").textContent =
        `${firstName[0]}${lastName[0]}`.toUpperCase();

    document.querySelector(".mini-avatar").textContent =
        `${firstName[0]}${lastName[0]}`.toUpperCase();

    showToast("Profile updated successfully.");
});

/* Edit Profile */

document.getElementById("editProfileBtn").addEventListener("click", () => {
    document.getElementById("firstName").focus();

    window.scrollTo({
        top: 300,
        behavior: "smooth"
    });
});

/* Save All */

document.getElementById("saveAllBtn").addEventListener("click", () => {
    showToast("All changes saved successfully.");
});

/* Password */

document.getElementById("passwordBtn").addEventListener("click", () => {
    showToast("Password change screen opened.");
});

/* Two Factor */

document.getElementById("twoFactor").addEventListener("change", function () {
    if (this.checked) {
        showToast("Two-factor authentication enabled.");
    } else {
        showToast("Two-factor authentication disabled.");
    }
});

/* Login Alerts */

document.getElementById("loginAlerts").addEventListener("change", function () {
    showToast(
        this.checked
            ? "Login alerts enabled."
            : "Login alerts disabled."
    );
});

/* Theme */

const themeButtons = document.querySelectorAll(".theme-btn");

themeButtons.forEach(button => {
    button.addEventListener("click", () => {

        themeButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const selectedTheme = button.dataset.theme;

        if (selectedTheme === "dark") {
            document.body.classList.add("dark");
            showToast("Dark mode enabled.");
        } else {
            document.body.classList.remove("dark");
            showToast("Light mode enabled.");
        }
    });
});

/* Deactivate */

document.getElementById("deactivateBtn").addEventListener("click", () => {
    const confirmed = confirm(
        "Are you sure you want to deactivate this account?"
    );

    if (confirmed) {
        showToast("Account deactivation requested.");
    }
});

/* Delete */

document.getElementById("deleteBtn").addEventListener("click", () => {
    const confirmed = confirm(
        "Are you sure you want to delete this account?"
    );

    if (confirmed) {
        showToast("Account deletion requested.");
    }
});

/* Logout */

document.getElementById("logoutBtn").addEventListener("click", () => {
    showToast("You have been logged out.");
});