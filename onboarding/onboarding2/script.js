function continueSetup() {

    const name =
        document.getElementById("name").value.trim();

    const company =
        document.getElementById("company").value.trim();

    if (name === "") {

        alert("Please enter your name.");

        return;
    }

    if (company === "") {

        alert("Please enter your company.");

        return;
    }

    alert(
        `Welcome to NovaFlow, ${name}!`
    );
}