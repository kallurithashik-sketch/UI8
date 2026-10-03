const searchInput =
    document.getElementById("searchInput");

const sideLinks =
    document.querySelectorAll(".side-link");

searchInput.addEventListener("input", function () {

    const searchText =
        this.value.toLowerCase().trim();

    sideLinks.forEach(function (link) {

        const text =
            link.textContent.toLowerCase();

        if (text.includes(searchText)) {
            link.style.display = "block";
        } else {
            link.style.display = "none";
        }

    });

});

document.addEventListener("keydown", function (event) {

    if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "k"
    ) {

        event.preventDefault();

        searchInput.focus();

    }

});

const languageButtons =
    document.querySelectorAll(".language");

const codeBlock =
    document.getElementById("codeBlock");

const codeExamples = {

    node: `import { WebTech } from '@webtech/sdk';

const wt = new WebTech({
    apiKey: '[YOUR_API_KEY]'
});

const run = await wt.runs.create({
    project: 'my-first-project',
    input: 'Hello, Web Tech'
});

console.log(run.status);`,

    python: `from webtech import WebTech

wt = WebTech(
    api_key="[YOUR_API_KEY]"
)

run = wt.runs.create(
    project="my-first-project",
    input="Hello, Web Tech"
)

print(run.status)`,

    curl: `curl -X POST https://api.webtech.dev/v2/runs
-H "Authorization: Bearer [YOUR_API_KEY]"
-H "Content-Type: application/json"
-d '{
    "project": "my-first-project",
    "input": "Hello, Web Tech"
}'`

};

languageButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        languageButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        this.classList.add("active");

        const language =
            this.dataset.language;

        codeBlock.textContent =
            codeExamples[language];

    });

});

const copyButton =
    document.getElementById("copyButton");

copyButton.addEventListener("click", async function () {

    const code =
        codeBlock.textContent;

    try {

        await navigator.clipboard.writeText(code);

        copyButton.textContent = "✓";

        setTimeout(function () {

            copyButton.textContent = "⧉";

        }, 1500);

    } catch (error) {

        console.error(error);

    }

});

sideLinks.forEach(function (link) {

    link.addEventListener("click", function (event) {

        event.preventDefault();

        sideLinks.forEach(function (item) {
            item.classList.remove("selected");
        });

        this.classList.add("selected");

    });

});

const topLinks =
    document.querySelectorAll(".top-nav a");

topLinks.forEach(function (link) {

    link.addEventListener("click", function (event) {

        event.preventDefault();

        topLinks.forEach(function (item) {
            item.classList.remove("active");
        });

        this.classList.add("active");

    });

});

const apiButton =
    document.querySelector(".api-button");

apiButton.addEventListener("click", function () {

    alert(
        "API key generation is available in the developer dashboard."
    );

});

const cards =
    document.querySelectorAll(".card");

cards.forEach(function (card) {

    card.addEventListener("click", function (event) {

        event.preventDefault();

        const title =
            this.querySelector("h3").textContent;

        alert(
            title + " documentation selected."
        );

    });

});