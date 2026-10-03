const languages = {

    node: `
<span class="c">npm i @webtech/sdk</span>

<span class="k">import</span> { WebTech } <span class="k">from</span> <span class="s">'@webtech/sdk'</span>;

<span class="k">const</span> wt = <span class="k">new</span> <span class="f">WebTech</span>({
    apiKey: <span class="s">'YOUR_API_KEY'</span>
});

<span class="k">const</span> run = <span class="k">await</span> wt.runs.<span class="f">create</span>({
    project: <span class="s">'my-first-project'</span>,
    input: <span class="s">'Hello, WebTech'</span>
});

console.<span class="f">log</span>(run.status);
`,

    py: `
<span class="c">pip install webtech</span>

<span class="k">from</span> webtech <span class="k">import</span> WebTech

wt = <span class="f">WebTech</span>(
    api_key=<span class="s">"YOUR_API_KEY"</span>
)

run = wt.runs.<span class="f">create</span>(
    project=<span class="s">"my-first-project"</span>,
    input=<span class="s">"Hello, WebTech"</span>
)

<span class="f">print</span>(run.status)
`,

    curl: `
<span class="f">curl</span> https://api.webtech.dev/v2/runs

-H <span class="s">"Authorization: Bearer YOUR_API_KEY"</span>

-H <span class="s">"Content-Type: application/json"</span>

-d <span class="s">'{
    "project": "my-first-project",
    "input": "Hello, WebTech"
}'</span>
`

};


let currentLanguage = "node";

let timer;


const code =
    document.getElementById("code");

const output =
    document.getElementById("out");

const copyButton =
    document.getElementById("cp");

const runButton =
    document.getElementById("run");


function showCode(language) {

    currentLanguage = language;

    code.innerHTML =
        languages[language];


    document
        .querySelectorAll("[role='tab']")
        .forEach(function (button) {

            button.setAttribute(
                "aria-selected",
                button.dataset.l === language
            );

        });

}


document
    .querySelectorAll("[role='tab']")
    .forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                showCode(
                    button.dataset.l
                );

            }
        );

    });


showCode("node");


copyButton.addEventListener(
    "click",
    function () {

        const text =
            code.textContent;

        navigator.clipboard
            .writeText(text)
            .then(function () {

                copyButton.textContent =
                    "Copied";

                setTimeout(
                    function () {

                        copyButton.textContent =
                            "Copy";

                    },
                    1500
                );

            })
            .catch(function () {

                copyButton.textContent =
                    "Select + copy";

            });

    }
);


runButton.addEventListener(
    "click",
    function () {

        clearTimeout(timer);

        let step = 0;

        const lines = [

            "<em>POST v2 runs</em>",

            "status: queued",

            "status: running",

            "status: <b>completed</b> 212 ms"

        ];

        output.innerHTML = "";


        function showOutput() {

            step++;

            output.innerHTML =
                lines
                    .slice(0, step)
                    .join("<br>");

            if (step < lines.length) {

                timer =
                    setTimeout(
                        showOutput,
                        420
                    );

            }

        }


        showOutput();

    }
);