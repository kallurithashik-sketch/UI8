// ================================
// ELEMENTS
// ================================

const modal = document.getElementById("modal");
const openModal = document.getElementById("openModal");
const closeModal = document.getElementById("closeModal");

const inviteForm = document.getElementById("inviteForm");

const searchInput = document.getElementById("searchInput");
const roleFilter = document.getElementById("roleFilter");

const membersGrid = document.getElementById("membersGrid");
const noResults = document.getElementById("noResults");

const memberCount = document.getElementById("memberCount");
const inviteCount = document.getElementById("inviteCount");

const toast = document.getElementById("toast");
const activityBtn = document.getElementById("activityBtn");


// ================================
// OPEN MODAL
// ================================

openModal.addEventListener("click", () => {
    modal.classList.add("show");

    document.getElementById("newName").focus();
});


// ================================
// CLOSE MODAL
// ================================

closeModal.addEventListener("click", () => {
    modal.classList.remove("show");
});


// Close when clicking outside

modal.addEventListener("click", (event) => {

    if (event.target === modal) {
        modal.classList.remove("show");
    }

});


// Close with Escape

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
        modal.classList.remove("show");
    }

});


// ================================
// SEARCH + FILTER
// ================================

function filterMembers() {

    const searchValue = searchInput.value.toLowerCase().trim();
    const selectedRole = roleFilter.value;

    const cards = document.querySelectorAll(".member-card");

    let visibleCount = 0;

    cards.forEach(card => {

        const name = card.dataset.name.toLowerCase();
        const role = card.dataset.role;

        const matchesSearch =
            name.includes(searchValue);

        const matchesRole =
            selectedRole === "all" ||
            role === selectedRole;

        if (matchesSearch && matchesRole) {

            card.style.display = "";

            visibleCount++;

        } else {

            card.style.display = "none";

        }

    });


    if (visibleCount === 0) {

        noResults.style.display = "block";

    } else {

        noResults.style.display = "none";

    }

}


searchInput.addEventListener("input", filterMembers);

roleFilter.addEventListener("change", filterMembers);


// ================================
// INVITE MEMBER
// ================================

inviteForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const name = document.getElementById("newName").value.trim();
    const email = document.getElementById("newEmail").value.trim();
    const role = document.getElementById("newRole").value;

    if (!name || !email) {
        return;
    }


    // Get initials

    const nameParts = name.split(" ");

    let initials = "";

    if (nameParts.length >= 2) {

        initials =
            nameParts[0][0] +
            nameParts[nameParts.length - 1][0];

    } else {

        initials = name.substring(0, 2);

    }

    initials = initials.toUpperCase();


    // Create new member card

    const card = document.createElement("article");

    card.className = "member-card";

    card.dataset.name = name;
    card.dataset.role = role;


    // Role class

    let roleClass = role.toLowerCase();


    card.innerHTML = `
        <div class="member-top">

            <div class="avatar avatar-maroon">
                ${initials}
            </div>

            <button class="more-btn">
                •••
            </button>

        </div>

        <div class="member-info">

            <h3>${name}</h3>

            <p>${email}</p>

        </div>

        <div class="member-bottom">

            <span class="role ${roleClass}">
                ${role}
            </span>

            <span class="status">
                <i></i> Active
            </span>

        </div>
    `;


    membersGrid.prepend(card);


    // Update count

    const currentCount =
        parseInt(memberCount.textContent);

    memberCount.textContent =
        currentCount + 1;


    // Close modal

    modal.classList.remove("show");

    inviteForm.reset();


    // Show toast

    showToast("Invitation sent successfully.");


    // Update filtering

    filterMembers();

});


// ================================
// TOAST
// ================================

function showToast(message) {

    toast.querySelector("p").textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}


// ================================
// ACTIVITY BUTTON
// ================================

activityBtn.addEventListener("click", () => {

    showToast("All activity is already up to date.");

});


// ================================
// NOTIFICATION
// ================================

document
    .getElementById("notificationBtn")
    .addEventListener("click", () => {

        showToast("You have 3 new notifications.");

    });


// ================================
// NAVIGATION
// ================================

document.querySelectorAll(".nav-links a")
    .forEach(link => {

        link.addEventListener("click", function(event) {

            event.preventDefault();

            document
                .querySelectorAll(".nav-links a")
                .forEach(item => {
                    item.classList.remove("active");
                });

            this.classList.add("active");

        });

    });


// ================================
// VIEW TOGGLE
// ================================

const viewToggle =
    document.getElementById("viewToggle");

let listView = false;

viewToggle.addEventListener("click", () => {

    listView = !listView;

    if (listView) {

        membersGrid.style.gridTemplateColumns =
            "1fr";

        viewToggle.innerHTML =
            "▦ <span>Grid</span>";

    } else {

        membersGrid.style.gridTemplateColumns =
            "";

        viewToggle.innerHTML =
            "☷ <span>View</span>";

    }

});