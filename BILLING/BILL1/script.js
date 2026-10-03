const toast = document.getElementById("toast");


/* =========================
   TOAST
========================= */

function showToast(message) {

  toast.textContent = message;

  toast.classList.add("show");

  clearTimeout(window.toastTimer);

  window.toastTimer = setTimeout(() => {

    toast.classList.remove("show");

  }, 2400);
}


/* =========================
   SIDEBAR NAVIGATION
========================= */

document
  .querySelectorAll(".navigation a")
  .forEach(link => {

    link.addEventListener("click", event => {

      event.preventDefault();

      document
        .querySelectorAll(".navigation a")
        .forEach(item => {

          item.classList.remove("active");

        });


      link.classList.add("active");


      const page = link.dataset.page;


      if (page !== "Billing") {

        showToast(`${page} section selected`);

      }

    });

  });


/* =========================
   PLAN BUTTONS
========================= */

document
  .getElementById("managePlan")
  .addEventListener("click", () => {

    showToast("Plan management opened");

  });


document
  .getElementById("upgradeBtn")
  .addEventListener("click", () => {

    showToast("Upgrade plans opened");

  });


document
  .getElementById("enterpriseBtn")
  .addEventListener("click", () => {

    showToast("Enterprise plans opened");

  });


/* =========================
   PAYMENT
========================= */

document
  .getElementById("editPayment")
  .addEventListener("click", () => {

    showToast("Payment method editor opened");

  });


document
  .getElementById("addPayment")
  .addEventListener("click", () => {

    showToast("Add payment method");

  });


/* =========================
   USAGE
========================= */

document
  .getElementById("detailsBtn")
  .addEventListener("click", () => {

    showToast("Usage details opened");

  });


/* =========================
   BILLING HISTORY
========================= */

document
  .getElementById("viewAll")
  .addEventListener("click", () => {

    showToast("Showing all invoices");

  });


/* =========================
   INVOICE DOWNLOAD
========================= */

document
  .querySelectorAll(".download")
  .forEach(button => {

    button.addEventListener("click", () => {

      const invoice =
        button.dataset.invoice;


      const invoiceText = `
NEXORA

Invoice: ${invoice}

Plan: Pro Plan
Amount: ₹999
Status: Paid

Thank you for using Nexora.
      `;


      const blob = new Blob(
        [invoiceText],
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


/* =========================
   AUTO RENEWAL
========================= */

document
  .getElementById("autoRenew")
  .addEventListener("click", () => {

    const toggle =
      document.querySelector(".toggle");


    const enabled =
      toggle.classList.toggle("on");


    const status =
      document.querySelector(
        "#autoRenew strong"
      );


    status.textContent =
      enabled
        ? "Enabled"
        : "Disabled";


    showToast(
      `Auto-renewal ${
        enabled
          ? "enabled"
          : "disabled"
      }`
    );

  });


/* =========================
   NOTIFICATION
========================= */

document
  .getElementById("notificationBtn")
  .addEventListener("click", () => {

    showToast(
      "You have 1 new notification"
    );

  });


/* =========================
   PROFILE
========================= */

document
  .getElementById("profileBtn")
  .addEventListener("click", () => {

    showToast("Profile menu opened");

  });


/* =========================
   SUPPORT
========================= */

document
  .getElementById("supportBtn")
  .addEventListener("click", () => {

    showToast(
      "Support request started"
    );

  });


/* =========================
   SEARCH
========================= */

document
  .getElementById("searchInput")
  .addEventListener("input", event => {

    const query =
      event.target.value
        .trim()
        .toLowerCase();


    document
      .querySelectorAll(".card")
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