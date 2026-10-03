const overlay =
    document.getElementById("overlay");

const openPalette =
    document.getElementById("openPalette");

const heroCommand =
    document.getElementById("heroCommand");

const search =
    document.getElementById("commandSearch");

const commands =
    document.querySelectorAll(".commands button");


function openCommandPalette() {

    overlay.classList.add("show");

    search.focus();

}


function closeCommandPalette() {

    overlay.classList.remove("show");

    search.value = "";

    commands.forEach(command => {

        command.style.display = "flex";

    });

}


openPalette.addEventListener(
    "click",
    openCommandPalette
);


heroCommand.addEventListener(
    "click",
    openCommandPalette
);


document.addEventListener("keydown", event => {

    if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "k"
    ) {

        event.preventDefault();

        openCommandPalette();

    }


    if (event.key === "Escape") {

        closeCommandPalette();

    }

});


overlay.addEventListener("click", event => {

    if (event.target === overlay) {

        closeCommandPalette();

    }

});


search.addEventListener("input", () => {

    const value =
        search.value.toLowerCase();

    commands.forEach(command => {

        const text =
            command.textContent.toLowerCase();

        command.style.display =
            text.includes(value)
                ? "flex"
                : "none";

    });

});


commands.forEach(command => {

    command.addEventListener("click", () => {

        const name =
            command.dataset.command;

        alert(`Selected: ${name}`);

        closeCommandPalette();

    });

});