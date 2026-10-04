const modal = document.getElementById("modal");
const addUserBtn = document.getElementById("addUserBtn");
const closeModal = document.getElementById("closeModal");
const cancelBtn = document.getElementById("cancelBtn");
const userForm = document.getElementById("userForm");

const searchInput = document.getElementById("searchInput");
const roleFilter = document.getElementById("roleFilter");
const statusFilter = document.getElementById("statusFilter");

const userTable = document.getElementById("userTable");
const emptyState = document.getElementById("emptyState");
const resultCount = document.getElementById("resultCount");

const toast = document.getElementById("toast");

/* Toast */

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}

/* Modal */

addUserBtn.addEventListener("click", () => {
    modal.classList.add("show");
});

closeModal.addEventListener("click", () => {
    modal.classList.remove("show");
});

cancelBtn.addEventListener("click", () => {
    modal.classList.remove("show");
});

modal.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.classList.remove("show");
    }
});

/* Search and Filters */

function filterUsers() {

    const search = searchInput.value.toLowerCase();
    const role = roleFilter.value;
    const status = statusFilter.value;

    const rows = userTable.querySelectorAll("tr");
    let visibleCount = 0;

    rows.forEach(row => {

        const name = row.dataset.name.toLowerCase();
        const rowRole = row.dataset.role;
        const rowStatus = row.dataset.status;

        const matchesSearch = name.includes(search);
        const matchesRole =
            role === "all" || rowRole === role;
        const matchesStatus =
            status === "all" || rowStatus === status;

        if (matchesSearch && matchesRole && matchesStatus) {
            row.style.display = "";
            visibleCount++;
        } else {
            row.style.display = "none";
        }

    });

    if (visibleCount === 0) {
        emptyState.style.display = "block";
    } else {
        emptyState.style.display = "none";
    }

    resultCount.textContent =
        `Showing ${visibleCount} user${visibleCount !== 1 ? "s" : ""}`;
}

searchInput.addEventListener("input", filterUsers);
roleFilter.addEventListener("change", filterUsers);
statusFilter.addEventListener("change", filterUsers);

/* Add User */

userForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const name = document.getElementById("newName").value.trim();
    const email = document.getElementById("newEmail").value.trim();
    const role = document.getElementById("newRole").value;

    if (!name || !email) {
        return;
    }

    const initials = name
        .split(" ")
        .map(word => word[0])
        .join("")
        .substring(0, 2)
        .toUpperCase();

    const row = document.createElement("tr");

    row.dataset.name = name;
    row.dataset.role = role;
    row.dataset.status = "Invited";

    row.innerHTML = `
        <td>
            <div class="user-cell">
                <div class="avatar blue">${initials}</div>
                <div>
                    <strong>${name}</strong>
                    <span>${email}</span>
                </div>
            </div>
        </td>

        <td>
            <span class="role ${role.toLowerCase()}">
                ${role}
            </span>
        </td>

        <td>
            <span class="status invited">
                <i></i> Invited
            </span>
        </td>

        <td>Not active</td>
        <td>Today</td>

        <td>
            <button class="more-btn">•••</button>
        </td>
    `;

    userTable.appendChild(row);

    modal.classList.remove("show");
    userForm.reset();

    updateStats();

    showToast("User invitation sent successfully.");

    filterUsers();
});

/* Statistics */

function updateStats() {

    const rows = userTable.querySelectorAll("tr");

    let total = rows.length;
    let active = 0;
    let invited = 0;
    let admins = 0;

    rows.forEach(row => {

        if (row.dataset.status === "Active") {
            active++;
        }

        if (row.dataset.status === "Invited") {
            invited++;
        }

        if (row.dataset.role === "Admin") {
            admins++;
        }
    });

    document.getElementById("totalUsers").textContent = total;
    document.getElementById("activeUsers").textContent = active;
    document.getElementById("invitedUsers").textContent = invited;
    document.getElementById("adminUsers").textContent = admins;
}

/* More Buttons */

document.addEventListener("click", (event) => {

    if (event.target.classList.contains("more-btn")) {
        showToast("User action menu opened.");
    }

});