var files = [
    {
        id: 1,
        n: "Brand guidelines",
        t: "folder",
        s: "12 items",
        by: "Priya",
        d: "Today",
        st: 1
    },

    {
        id: 2,
        n: "Q3 board report.pdf",
        t: "pdf",
        s: "4.2 MB",
        by: "Marcus",
        d: "Today",
        st: 1
    },

    {
        id: 3,
        n: "Product roadmap",
        t: "folder",
        s: "8 items",
        by: "You",
        d: "Yesterday"
    },

    {
        id: 4,
        n: "Hero banner.png",
        t: "img",
        s: "1.8 MB",
        by: "Lena",
        d: "Yesterday"
    },

    {
        id: 5,
        n: "Customer interviews.docx",
        t: "doc",
        s: "640 KB",
        by: "You",
        d: "Sep 28"
    },

    {
        id: 6,
        n: "Revenue forecast.xlsx",
        t: "sheet",
        s: "2.1 MB",
        by: "Marcus",
        d: "Sep 27",
        st: 1
    },

    {
        id: 7,
        n: "Launch assets.zip",
        t: "zip",
        s: "48 MB",
        by: "Lena",
        d: "Sep 24"
    },

    {
        id: 8,
        n: "Contract - Northwind.pdf",
        t: "pdf",
        s: "980 KB",
        by: "Priya",
        d: "Sep 20"
    }
];


var lab = {
    folder: "DIR",
    pdf: "PDF",
    img: "IMG",
    doc: "DOC",
    sheet: "XLS",
    zip: "ZIP"
};


var S = {
    view: "list",
    nav: "All files",
    type: "All",
    q: "",
    sel: null,
    nid: 9
};


var $ = function (i) {
    return document.getElementById(i);
};


var navs = [
    "All files",
    "Recent",
    "Starred",
    "Shared with me",
    "Trash"
];


function toast(m) {

    var t = $("toast");

    t.textContent = m;

    t.classList.add("on");

    clearTimeout(toast.h);

    toast.h = setTimeout(function () {
        t.classList.remove("on");
    }, 1800);
}


function vis() {

    return files.filter(function (f) {

        if (S.nav == "Starred" && !f.st) {
            return false;
        }

        if (S.nav == "Trash") {
            return !!f.tr;
        }

        if (f.tr) {
            return false;
        }

        if (
            S.nav == "Shared with me" &&
            f.by == "You"
        ) {
            return false;
        }

        if (
            S.nav == "Recent" &&
            ["Today", "Yesterday"].indexOf(f.d) < 0
        ) {
            return false;
        }

        if (
            S.type != "All" &&
            lab[f.t] != S.type
        ) {
            return false;
        }

        return f.n
            .toLowerCase()
            .indexOf(S.q.toLowerCase()) > -1;
    });
}


function render() {

    $("nav").innerHTML =
        navs.map(function (n) {

            return `
                <button
                    class="${n == S.nav ? "on" : ""}"
                    data-n="${n}"
                >
                    ${n}
                </button>
            `;

        }).join("");


    $("title").textContent = S.nav;


    var v = vis();


    $("count").textContent =
        v.length +
        (v.length == 1 ? " item" : " items");


    $("chips").innerHTML =
        [
            "All",
            "DIR",
            "PDF",
            "IMG",
            "DOC",
            "XLS",
            "ZIP"
        ]
        .map(function (c) {

            return `
                <button
                    class="chip ${c == S.type ? "on" : ""}"
                    data-c="${c}"
                >
                    ${
                        c == "All"
                            ? "All types"
                            : c == "DIR"
                                ? "Folders"
                                : c
                    }
                </button>
            `;

        }).join("") +

        `<span class="sp"></span>` +

        `
            <button class="chip" id="vw">
                ${
                    S.view == "list"
                        ? "Grid view"
                        : "List view"
                }
            </button>
        `;


    var h = "";


    if (!v.length) {

        h = `
            <div class="empty">
                Nothing here yet.
                Upload a file or change your filters.
            </div>
        `;

    }

    else if (S.view == "list") {

        h = v.map(function (f) {

            return `
                <div
                    class="row ${S.sel == f.id ? "sel" : ""}"
                    data-id="${f.id}"
                    tabindex="0"
                >

                    <span class="ic t-${f.t}">
                        ${lab[f.t]}
                    </span>

                    <span class="n">
                        ${f.n}
                    </span>

                    <span class="m">
                        ${f.by}
                    </span>

                    <span class="m">
                        ${f.d}
                    </span>

                    <button
                        class="star ${f.st ? "on" : ""}"
                        data-s="${f.id}"
                        aria-label="Star"
                    >
                        ★
                    </button>

                </div>
            `;

        }).join("");

    }

    else {

        h = `
            <div class="grid">

                ${v.map(function (f) {

                    return `
                        <div
                            class="card ${S.sel == f.id ? "sel" : ""}"
                            data-id="${f.id}"
                            tabindex="0"
                        >

                            <div class="ic t-${f.t}">
                                ${lab[f.t]}
                            </div>

                            <div class="n">
                                ${f.n}
                            </div>

                            <div class="m">
                                ${f.s} · ${f.d}
                            </div>

                        </div>
                    `;

                }).join("")}

            </div>
        `;
    }


    $("list").innerHTML = h;


    var f = files.filter(function (x) {
        return x.id == S.sel;
    })[0];


    var d = $("det");


    $("wrap").className =
        "wrap" + (f ? " det" : "");


    if (f) {

        d.style.display = "block";
        d.hidden = false;


        d.innerHTML = `

            <span
                class="ic t-${f.t}"
                style="width:44px;height:44px"
            >
                ${lab[f.t]}
            </span>

            <h3>
                ${f.n}
            </h3>

            <dl>

                <dt>Size</dt>
                <dd>${f.s}</dd>

                <dt>Owner</dt>
                <dd>${f.by}</dd>

                <dt>Modified</dt>
                <dd>${f.d}</dd>

                <dt>Access</dt>
                <dd>
                    ${f.by == "You" ? "Only you" : "Team"}
                </dd>

            </dl>

            <div class="acts">

                <button
                    class="pri"
                    data-a="Download started"
                >
                    Download
                </button>

                <button data-a="Link copied">
                    Copy link
                </button>

                <button
                    data-a="${
                        f.tr
                            ? "Restored"
                            : "Moved to trash"
                    }"
                    data-del="1"
                >
                    ${
                        f.tr
                            ? "Restore"
                            : "Delete"
                    }
                </button>

            </div>
        `;

    }

    else {

        d.style.display = "none";
        d.hidden = true;

    }
}


document.addEventListener("click", function (e) {

    var t = e.target;
    var b;


    if (b = t.closest("[data-n]")) {

        S.nav = b.dataset.n;
        S.sel = null;

    }


    else if (b = t.closest("[data-c]")) {

        S.type = b.dataset.c;

    }


    else if (t.id == "vw") {

        S.view =
            S.view == "list"
                ? "grid"
                : "list";

    }


    else if (b = t.closest("[data-s]")) {

        var f = files.filter(function (x) {
            return x.id == b.dataset.s;
        })[0];

        f.st = !f.st;

        toast(
            f.st
                ? "Starred"
                : "Unstarred"
        );

    }


    else if (b = t.closest("[data-id]")) {

        S.sel = +b.dataset.id;

    }


    else if (b = t.closest("[data-a]")) {

        toast(b.dataset.a);

        if (b.dataset.del) {

            var g = files.filter(function (x) {
                return x.id == S.sel;
            })[0];

            g.tr = !g.tr;

            S.sel = null;
        }
    }


    else if (t.id == "up") {

        files.unshift({
            id: S.nid++,
            n: "Untitled upload " +
                (S.nid - 9) +
                ".pdf",
            t: "pdf",
            s: "1.1 MB",
            by: "You",
            d: "Today"
        });

        S.nav = "All files";

        toast("Uploaded");

    }


    else if (t.id == "theme") {

        var r = document.documentElement;

        var dk =
            r.dataset.theme
                ? r.dataset.theme == "dark"
                : matchMedia(
                    "(prefers-color-scheme:dark)"
                ).matches;

        r.dataset.theme =
            dk
                ? "light"
                : "dark";

    }


    else {
        return;
    }


    render();

});


document.addEventListener(
    "keydown",
    function (e) {

        if (e.key == "Enter") {

            var b =
                e.target.closest &&
                e.target.closest("[data-id]");

            if (b) {

                S.sel = +b.dataset.id;

                render();
            }
        }
    }
);


$("q").addEventListener(
    "input",
    function (e) {

        S.q = e.target.value;

        render();

        $("q").focus();
    }
);


render();