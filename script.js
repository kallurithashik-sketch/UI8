/* =========================================
   UI8 - MODERN SAAS TEMPLATE COLLECTION
   JAVASCRIPT
   ========================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================
       THEME TOGGLE
    ===================================== */

    const themeButton = document.getElementById("themeToggle");

    if (themeButton) {

        themeButton.addEventListener("click", function () {

            document.body.classList.toggle("light-mode");

            if (document.body.classList.contains("light-mode")) {
                themeButton.textContent = "☀";
            } else {
                themeButton.textContent = "◐";
            }

        });

    }


    /* =====================================
       SMOOTH NAVIGATION
    ===================================== */

    const navLinks = document.querySelectorAll(
        '.nav-links a[href^="#"], .hero a[href^="#"]'
    );

    navLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId =
                link.getAttribute("href");

            const target =
                document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    /* =====================================
       BACKGROUND PARTICLES
    ===================================== */

    const canvas =
        document.getElementById("connectionCanvas");

    if (canvas) {

        const ctx = canvas.getContext("2d");

        let particles = [];

        let animationFrame;


        function resizeCanvas() {

            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

        }


        resizeCanvas();


        window.addEventListener(
            "resize",
            resizeCanvas
        );


        /* -------------------------------
           PARTICLE OBJECT
        -------------------------------- */

        class Particle {

            constructor() {

                this.x =
                    Math.random() *
                    canvas.width;

                this.y =
                    Math.random() *
                    canvas.height;

                this.size =
                    Math.random() * 2 + 0.5;

                this.speedX =
                    (Math.random() - 0.5) * 0.4;

                this.speedY =
                    (Math.random() - 0.5) * 0.4;

                this.opacity =
                    Math.random() * 0.5 + 0.2;

            }


            update() {

                this.x += this.speedX;

                this.y += this.speedY;


                if (this.x < 0) {
                    this.x = canvas.width;
                }

                if (this.x > canvas.width) {
                    this.x = 0;
                }

                if (this.y < 0) {
                    this.y = canvas.height;
                }

                if (this.y > canvas.height) {
                    this.y = 0;
                }

            }


            draw() {

                ctx.beginPath();

                ctx.arc(
                    this.x,
                    this.y,
                    this.size,
                    0,
                    Math.PI * 2
                );

                ctx.fillStyle =
                    "rgba(139, 92, 246, " +
                    this.opacity +
                    ")";

                ctx.fill();

            }

        }


        /* -------------------------------
           CREATE PARTICLES
        -------------------------------- */

        function createParticles() {

            particles = [];

            const amount =
                window.innerWidth < 700
                    ? 35
                    : 75;


            for (let i = 0; i < amount; i++) {

                particles.push(
                    new Particle()
                );

            }

        }


        createParticles();


        /* -------------------------------
           CONNECT PARTICLES
        -------------------------------- */

        function connectParticles() {

            const maxDistance = 130;


            for (
                let i = 0;
                i < particles.length;
                i++
            ) {

                for (
                    let j = i + 1;
                    j < particles.length;
                    j++
                ) {

                    const dx =
                        particles[i].x -
                        particles[j].x;

                    const dy =
                        particles[i].y -
                        particles[j].y;

                    const distance =
                        Math.sqrt(
                            dx * dx +
                            dy * dy
                        );


                    if (distance < maxDistance) {

                        const opacity =
                            1 -
                            distance /
                            maxDistance;


                        ctx.beginPath();

                        ctx.moveTo(
                            particles[i].x,
                            particles[i].y
                        );

                        ctx.lineTo(
                            particles[j].x,
                            particles[j].y
                        );

                        ctx.strokeStyle =
                            "rgba(139, 92, 246, " +
                            opacity * 0.12 +
                            ")";

                        ctx.lineWidth = 1;

                        ctx.stroke();

                    }

                }

            }

        }


        /* -------------------------------
           PARTICLE ANIMATION
        -------------------------------- */

        function animateParticles() {

            ctx.clearRect(
                0,
                0,
                canvas.width,
                canvas.height
            );


            particles.forEach(
                function (particle) {

                    particle.update();

                    particle.draw();

                }
            );


            connectParticles();


            animationFrame =
                requestAnimationFrame(
                    animateParticles
                );

        }


        animateParticles();


        window.addEventListener(
            "resize",
            function () {

                createParticles();

            }
        );

    }


    /* =====================================
       MODULE CONNECTION LINES
    ===================================== */

    const network =
        document.querySelector(".network");

    const svg =
        document.getElementById(
            "connectionSvg"
        );


    if (network && svg) {


        /*
         * Connections between modules
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
         * Create unique line ID
         */

        let lineCounter = 0;


        /*
         * Get center position
         */

        function getCenter(element) {

            const rect =
                element.getBoundingClientRect();

            const networkRect =
                network.getBoundingClientRect();


            return {

                x:
                    rect.left +
                    rect.width / 2 -
                    networkRect.left,

                y:
                    rect.top +
                    rect.height / 2 -
                    networkRect.top

            };

        }


        /*
         * Create one connection
         */

        function createConnection(
            startElement,
            endElement
        ) {

            const start =
                getCenter(startElement);

            const end =
                getCenter(endElement);


            /*
             * Calculate curve
             */

            const centerX =
                (start.x + end.x) / 2;

            const centerY =
                (start.y + end.y) / 2;


            const curve =
                Math.min(
                    70,
                    Math.max(
                        -70,
                        (end.x - start.x) * 0.08
                    )
                );


            /*
             * Create SVG path
             */

            const path =
                document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "path"
                );


            const pathId =
                "ui8-line-" +
                lineCounter++;

            
            path.id = pathId;


            const pathData =

                "M " +
                start.x +
                " " +
                start.y +

                " Q " +
                (centerX + curve) +
                " " +
                (centerY - curve) +

                " " +
                end.x +
                " " +
                end.y;


            path.setAttribute(
                "d",
                pathData
            );


            path.classList.add(
                "connection-line"
            );


            svg.appendChild(path);


            /*
             * Create moving glowing dot
             */

            const dot =
                document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "circle"
                );


            dot.setAttribute(
                "r",
                "3"
            );


            dot.classList.add(
                "connection-dot"
            );


            /*
             * Animation
             */

            const animateMotion =
                document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "animateMotion"
                );


            animateMotion.setAttribute(
                "dur",
                (2.5 + Math.random() * 2) +
                "s"
            );


            animateMotion.setAttribute(
                "repeatCount",
                "indefinite"
            );


            const motionPath =
                document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "mpath"
                );


            motionPath.setAttribute(
                "href",
                "#" + pathId
            );


            animateMotion.appendChild(
                motionPath
            );


            dot.appendChild(
                animateMotion
            );


            svg.appendChild(dot);

        }


        /*
         * Draw all connections
         */

        function drawConnections() {

            /*
             * Remove old lines
             */

            const oldLines =
                svg.querySelectorAll(
                    ".connection-line, .connection-dot"
                );


            oldLines.forEach(
                function (element) {

                    element.remove();

                }
            );


            lineCounter = 0;


            /*
             * Create new lines
             */

            connections.forEach(
                function (connection) {

                    const startElement =
                        document.getElementById(
                            connection[0]
                        );


                    const endElement =
                        document.getElementById(
                            connection[1]
                        );


                    if (
                        startElement &&
                        endElement
                    ) {

                        createConnection(
                            startElement,
                            endElement
                        );

                    }

                }
            );

        }


        /*
         * First drawing
         */

        setTimeout(
            drawConnections,
            500
        );


        /*
         * Redraw on resize
         */

        let resizeTimer;


        window.addEventListener(
            "resize",
            function () {

                clearTimeout(
                    resizeTimer
                );


                resizeTimer =
                    setTimeout(
                        function () {

                            drawConnections();

                        },
                        200
                    );

            }
        );


        /*
         * Redraw when page loads completely
         */

        window.addEventListener(
            "load",
            function () {

                setTimeout(
                    drawConnections,
                    300
                );

            }
        );


        /* =================================
           MODULE HOVER
        ================================= */

        const modules =
            document.querySelectorAll(
                ".module-card"
            );


        modules.forEach(
            function (module) {

                module.addEventListener(
                    "mouseenter",
                    function () {

                        module.style.zIndex =
                            "50";

                    }
                );


                module.addEventListener(
                    "mouseleave",
                    function () {

                        module.style.zIndex =
                            "5";

                    }
                );

            }
        );

    }


    /* =====================================
       TEMPLATE CARD ANIMATION
    ===================================== */

    const templateCards =
        document.querySelectorAll(
            ".template-card"
        );


    templateCards.forEach(
        function (card) {

            card.addEventListener(
                "mouseenter",
                function () {

                    card.style.transform =
                        "translateY(-10px)";

                }
            );


            card.addEventListener(
                "mouseleave",
                function () {

                    card.style.transform =
                        "translateY(0)";

                }
            );

        }
    );


    /* =====================================
       SCROLL NAVBAR EFFECT
    ===================================== */

    const navbar =
        document.querySelector(
            ".navbar"
        );


    window.addEventListener(
        "scroll",
        function () {

            if (!navbar) {
                return;
            }


            if (window.scrollY > 50) {

                navbar.style.background =
                    "rgba(8, 8, 14, 0.90)";

                navbar.style.boxShadow =
                    "0 15px 50px rgba(0,0,0,0.35)";

            } else {

                navbar.style.background =
                    "rgba(10, 10, 17, 0.72)";

                navbar.style.boxShadow =
                    "0 10px 40px rgba(0,0,0,0.25)";

            }

        }
    );


    /* =====================================
       HERO PREVIEW FLOATING ANIMATION
    ===================================== */

    const preview =
        document.querySelector(
            ".preview-window"
        );


    if (preview) {

        let floatingTime = 0;


        function animatePreview() {

            floatingTime += 0.02;


            const movement =
                Math.sin(
                    floatingTime
                ) * 5;


            preview.style.marginTop =
                movement + "px";


            requestAnimationFrame(
                animatePreview
            );

        }


        animatePreview();

    }


    /* =====================================
       PAGE LOADED
    ===================================== */

    document.body.classList.add(
        "page-loaded"
    );

});
