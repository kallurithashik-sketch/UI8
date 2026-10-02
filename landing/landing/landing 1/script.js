/* =====================================================
   INITIALIZE ICONS
===================================================== */

lucide.createIcons();


/* =====================================================
   ELEMENTS
===================================================== */

const navbar =
    document.getElementById("navbar");

const mobileMenu =
    document.getElementById("mobileMenu");

const mobileNav =
    document.getElementById("mobileNav");

const demoBtn =
    document.getElementById("demoBtn");

const demoModal =
    document.getElementById("demoModal");

const closeModal =
    document.getElementById("closeModal");

const navCta =
    document.getElementById("navCta");

const heroCta =
    document.getElementById("heroCta");

const finalCta =
    document.getElementById("finalCta");

const mobileCta =
    document.getElementById("mobileCta");

const signupModal =
    document.getElementById("signupModal");

const closeSignup =
    document.getElementById("closeSignup");

const signupForm =
    document.getElementById("signupForm");

const signupSuccess =
    document.getElementById("signupSuccess");


/* =====================================================
   NAVBAR SCROLL EFFECT
===================================================== */

window.addEventListener(
    "scroll",
    () => {

        if (window.scrollY > 30) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    }
);


/* =====================================================
   MOBILE MENU
===================================================== */

mobileMenu.addEventListener(
    "click",
    () => {

        mobileNav.classList.toggle("show");

    }
);


/* Close mobile menu when link clicked */

const mobileLinks =
    mobileNav.querySelectorAll("a");


mobileLinks.forEach(link => {

    link.addEventListener(
        "click",
        () => {

            mobileNav.classList.remove("show");

        }
    );

});


/* =====================================================
   SIGNUP MODAL
===================================================== */

function openSignup() {

    signupModal.classList.add("show");

    document.body.classList.add(
        "modal-open"
    );

}


function closeSignupModal() {

    signupModal.classList.remove("show");

    document.body.classList.remove(
        "modal-open"
    );

}


navCta.addEventListener(
    "click",
    openSignup
);


heroCta.addEventListener(
    "click",
    openSignup
);


finalCta.addEventListener(
    "click",
    openSignup
);


mobileCta.addEventListener(
    "click",
    () => {

        mobileNav.classList.remove("show");

        openSignup();

    }
);


closeSignup.addEventListener(
    "click",
    closeSignupModal
);


/* Click outside signup */

signupModal.addEventListener(
    "click",
    event => {

        if (
            event.target === signupModal
        ) {

            closeSignupModal();

        }

    }
);


/* =====================================================
   SIGNUP FORM
===================================================== */

signupForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        signupSuccess.style.display =
            "flex";


        signupForm.reset();


        setTimeout(
            () => {

                signupSuccess.style.display =
                    "none";

                closeSignupModal();

            },
            2200
        );

    }
);


/* =====================================================
   DEMO MODAL
===================================================== */

function openDemo() {

    demoModal.classList.add("show");

    document.body.classList.add(
        "modal-open"
    );

}


function closeDemo() {

    demoModal.classList.remove("show");

    document.body.classList.remove(
        "modal-open"
    );

}


demoBtn.addEventListener(
    "click",
    openDemo
);


closeModal.addEventListener(
    "click",
    closeDemo
);


/* Click outside demo */

demoModal.addEventListener(
    "click",
    event => {

        if (
            event.target === demoModal
        ) {

            closeDemo();

        }

    }
);


/* =====================================================
   ESCAPE KEY
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeDemo();

            closeSignupModal();

            mobileNav.classList.remove(
                "show"
            );

        }

    }
);


/* =====================================================
   SMOOTH NAVIGATION
===================================================== */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute("href");


                if (
                    targetId === "#" ||
                    targetId === ""
                ) {

                    return;

                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (target) {

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }
        );

    });


/* =====================================================
   SIMPLE DASHBOARD ANIMATION
===================================================== */

const statNumbers =
    document.querySelectorAll(
        ".stat-card strong"
    );


function animateNumber(
    element,
    target,
    suffix = ""
) {

    let current = 0;

    const duration = 1000;

    const startTime =
        performance.now();


    function update(
        currentTime
    ) {

        const progress =
            Math.min(
                (currentTime - startTime) /
                duration,
                1
            );


        current =
            Math.floor(
                progress * target
            );


        element.textContent =
            current + suffix;


        if (
            progress < 1
        ) {

            requestAnimationFrame(
                update
            );

        } else {

            element.textContent =
                target + suffix;

        }

    }


    requestAnimationFrame(
        update
    );

}


/* =====================================================
   INTERSECTION OBSERVER
===================================================== */

const preview =
    document.querySelector(
        ".product-preview"
    );


const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        const values = [
                            [24, ""],
                            [186, ""],
                            [92, "%"],
                            [48, ""]
                        ];


                        statNumbers.forEach(
                            (element, index) => {

                                animateNumber(
                                    element,
                                    values[index][0],
                                    values[index][1]
                                );

                            }
                        );


                        observer.unobserve(
                            preview
                        );

                    }

                }
            );

        },
        {
            threshold: .3
        }
    );


if (preview) {

    observer.observe(preview);

}


/* =====================================================
   BUTTON RIPPLE EFFECT
===================================================== */

const actionButtons =
    document.querySelectorAll(
        ".primary-btn, .nav-cta, .cta-content button"
    );


actionButtons.forEach(button => {

    button.addEventListener(
        "click",
        function () {

            this.style.transform =
                "scale(.97)";


            setTimeout(
                () => {

                    this.style.transform =
                        "";

                },
                120
            );

        }
    );

});