document.addEventListener("DOMContentLoaded", function () {

    const network = document.querySelector(".network");
    const svg = document.getElementById("connectionSvg");

    if (!network || !svg) {
        return;
    }


    const modules = [
        "module1",
        "module2",
        "module3",
        "module4",
        "module5",
        "module6",
        "module7",
        "module8"
    ];


    /*
        Which modules should connect?
    */

    const connections = [

        ["module1", "module2"],
        ["module1", "module3"],

        ["module2", "module3"],
        ["module2", "module8"],

        ["module8", "module3"],
        ["module8", "module6"],

        ["module3", "module4"],
        ["module3", "module5"],

        ["module3", "module6"],

        ["module4", "module7"],

        ["module5", "module6"],
        ["module5", "module7"],

        ["module6", "module8"],

        ["module7", "module8"]

    ];


    /*
        Create SVG connection line
    */

    function createLine(startElement, endElement) {

        const startRect =
            startElement.getBoundingClientRect();

        const endRect =
            endElement.getBoundingClientRect();

        const networkRect =
            network.getBoundingClientRect();


        const x1 =
            startRect.left +
            startRect.width / 2 -
            networkRect.left;


        const y1 =
            startRect.top +
            startRect.height / 2 -
            networkRect.top;


        const x2 =
            endRect.left +
            endRect.width / 2 -
            networkRect.left;


        const y2 =
            endRect.top +
            endRect.height / 2 -
            networkRect.top;


        /*
            Create curved path
        */

        const middleX =
            (x1 + x2) / 2;


        const middleY =
            (y1 + y2) / 2;


        const curveAmount = 35;


        const path = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
        );


        const d = `
            M ${x1} ${y1}
            Q ${middleX + curveAmount}
              ${middleY - curveAmount}
              ${x2} ${y2}
        `;


        path.setAttribute("d", d);

        path.classList.add("connection-line");


        svg.appendChild(path);


        /*
            Animated glowing dot
        */

        const dot =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "circle"
            );


        dot.setAttribute("r", "3");

        dot.classList.add("connection-dot");


        /*
            Animate dot along path
        */

        const animate =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "animateMotion"
            );


        animate.setAttribute(
            "dur",
            (2 + Math.random() * 2) + "s"
        );


        animate.setAttribute(
            "repeatCount",
            "indefinite"
        );


        animate.setAttribute(
            "rotate",
            "auto"
        );


        const motionPath =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "mpath"
            );


        motionPath.setAttribute(
            "href",
            "#" + path.id
        );


        /*
            Give path unique ID
        */

        const lineId =
            "line-" +
            Math.random()
                .toString(36)
                .substring(2, 9);


        path.id = lineId;


        motionPath.setAttribute(
            "href",
            "#" + lineId
        );


        animate.appendChild(motionPath);

        dot.appendChild(animate);

        svg.appendChild(dot);

    }


    /*
        Draw all connections
    */

    function drawConnections() {

        /*
            Remove old lines
        */

        svg.querySelectorAll(
            ".connection-line, .connection-dot"
        ).forEach(function (element) {

            element.remove();

        });


        connections.forEach(function (connection) {

            const start =
                document.getElementById(
                    connection[0]
                );


            const end =
                document.getElementById(
                    connection[1]
                );


            if (start && end) {

                createLine(start, end);

            }

        });

    }


    /*
        Initial drawing
    */

    setTimeout(function () {

        drawConnections();

    }, 300);


    /*
        Redraw when window changes
    */

    window.addEventListener(
        "resize",
        function () {

            drawConnections();

        }
    );


    /*
        Hover effect
    */

    modules.forEach(function (moduleId) {

        const card =
            document.getElementById(moduleId);


        if (!card) {
            return;
        }


        card.addEventListener(
            "mouseenter",
            function () {

                card.style.zIndex = "20";

            }
        );


        card.addEventListener(
            "mouseleave",
            function () {

                card.style.zIndex = "5";

            }
        );

    });


    /*
        Theme toggle
    */

    const themeButton =
        document.getElementById("themeToggle");


    if (themeButton) {

        themeButton.addEventListener(
            "click",
            function () {

                document.body.classList.toggle(
                    "light-mode"
                );

                /*
                    Redraw connections
                    after theme change
                */

                setTimeout(
                    drawConnections,
                    100
                );

            }
        );

    }

});
