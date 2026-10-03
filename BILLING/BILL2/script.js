const toast = document.getElementById("toast");


// =========================
// TOAST
// =========================

function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(window.toastTimer);

    window.toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 2200);
}


// =========================
// NAVIGATION
// =========================

document
    .querySelectorAll("nav a")
    .forEach(link => {

        link.addEventListener("click", event => {

            event.preventDefault();

            document
                .querySelectorAll("nav a")
                .forEach(item => {

                    item.classList.remove("active");

                });

            link.classList.add("active");

            const page =
                link.textContent.trim();

            if (page !== "Billing") {

                showToast(
                    `${page} selected`
                );

            }

        });

    });


// =========================
// UPGRADE
// =========================

document
    .getElementById("upgradeBtn")
    .addEventListener("click", () => {

        showToast(
            "Upgrade plans opened"
        );

    });


document
    .getElementById("usageUpgrade")
    .addEventListener("click", () => {

        showToast(
            "Upgrade plans opened"
        );

    });


// =========================
// MANAGE PLAN
// =========================

document
    .getElementById("manageBtn")
    .addEventListener("click", () => {

        showToast(
            "Plan settings opened"
        );

    });


// =========================
// PAYMENT
// =========================

document
    .getElementById("editPayment")
    .addEventListener("click", () => {

        showToast(
            "Payment editor opened"
        );

    });


document
    .getElementById("addCard")
    .addEventListener("click", () => {

        showToast(
            "Add payment method"
        );

    });


// =========================
// COMPANY DETAILS
// =========================

document
    .getElementById("companyEdit")
    .addEventListener("click", () => {

        showToast(
            "Company details editor opened"
        );

    });


// =========================
// SUPPORT
// =========================

document
    .getElementById("supportBtn")
    .addEventListener("click", () => {

        showToast(
            "Support request started"
        );

    });


// =========================
// VIEW ALL
// =========================

document
    .getElementById("viewAll")
    .addEventListener("click", () => {

        showToast(
            "All invoices opened"
        );

    });


// =========================
// DOWNLOAD INVOICE
// =========================

document
    .querySelectorAll(".download")
    .forEach(button => {

        button.addEventListener("click", () => {

            const invoice =
                button.dataset.id;

            const content = `
UI TECHNOLOGIES

Invoice: ${invoice}

Plan: UI Pro
Amount: ₹999
Status: Paid

Billing email:
billing@ui.com

Thank you for using UI.
            `;

            const blob =
                new Blob(
                    [content],
                    {
                        type: "text/plain"
                    }
                );

            const url =
                URL.createObjectURL(blob);

            const link =
                document.createElement("a");

            link.href = url;

            link.download =
                `${invoice}.txt`;

            link.click();

            URL.revokeObjectURL(url);

            showToast(
                `${invoice} downloaded`
            );

        });

    });


// =========================
// AUTO RENEWAL
// =========================

document
    .getElementById("autoRenew")
    .addEventListener("click", function () {

        this.classList.toggle("active");

        if (this.classList.contains("active")) {

            showToast(
                "Auto-renewal enabled"
            );

        } else {

            showToast(
                "Auto-renewal disabled"
            );

        }

    });


// =========================
// SEARCH
// =========================

document
    .getElementById("searchInput")
    .addEventListener("input", event => {

        const query =
            event.target.value
                .toLowerCase()
                .trim();

        document
            .querySelectorAll(".neo-card, .stat-card")
            .forEach(card => {

                if (!query) {

                    card.style.display = "";

                    return;

                }

                const text =
                    card.innerText.toLowerCase();

                card.style.display =
                    text.includes(query)
                        ? ""
                        : "none";

            });

    });


// =========================
// NOTIFICATION
// =========================

document
    .querySelector(".notification")
    .addEventListener("click", () => {

        showToast(
            "You have 1 new notification"
        );

    });