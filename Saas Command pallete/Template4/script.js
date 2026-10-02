const modal =
    document.getElementById("commandModal");

const commandButton =
    document.getElementById("commandButton");

const search =
    document.getElementById("search");

const commandButtons =
    document.querySelectorAll(".command-list button");

const quickButtons =
    document.querySelectorAll(".quick-grid button");


function openModal() {

    modal.classList.add("show");

    search.focus();

}


function closeModal() {

    modal.classList.remove("show");

    search.value = "";

    commandButtons.forEach(button => {

        button.style.display = "flex";

    });

}


commandButton.addEventListener(
    "click",
    openModal
);


document.addEventListener("keydown", event => {

    if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "k"
    ) {

        event.preventDefault();

        openModal();

    }

    if (event.key === "Escape") {

        closeModal();

    }

});


modal.addEventListener("click", event => {

    if (event.target === modal) {

        closeModal();

    }

});


search.addEventListener("input", () => {

    const value =
        search.value.toLowerCase();

    commandButtons.forEach(button => {

        const text =
            button.textContent.toLowerCase();

        button.style.display =
            text.includes(value)
                ? "flex"
                : "none";

    });

});


commandButtons.forEach(button => {

    button.addEventListener("click", () => {

        const command =
            button.textContent.trim();

        alert("Command selected: " + command);

        closeModal();

    });

});


quickButtons.forEach(button => {

    button.addEventListener("click", () => {

        alert(
            "Quick Action: " +
            button.dataset.command
        );

    });

});