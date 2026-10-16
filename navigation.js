
/* ===============================
   PAGE NAVIGATION
================================ */

const navLinks = document.querySelectorAll(".nav-link");
const views = document.querySelectorAll(".view");
const pageTitle = document.getElementById("pageTitle");

const pageNames = {
    overview: "Dashboard",
    schemes: "Find Schemes",
    assistant: "AI Assistant",
    centres: "Service Centres"
};

function showView(viewName) {
    views.forEach(view => {
        view.classList.remove("active");
    });

    const selectedView = document.getElementById(viewName);

    if (selectedView) {
        selectedView.classList.add("active");
    }

    navLinks.forEach(link => {
        link.classList.toggle(
            "active",
            link.dataset.view === viewName
        );
    });

    if (pageTitle) {
        pageTitle.textContent =
            pageNames[viewName] || "Dashboard";
    }
}

/* Sidebar navigation */
navLinks.forEach(link => {
    link.addEventListener("click", event => {
        event.preventDefault();
        showView(link.dataset.view);
    });
});

/* Buttons that open another page */
document.querySelectorAll("[data-go]").forEach(button => {
    button.addEventListener("click", () => {
        showView(button.dataset.go);
    });
});

/* Help button */
const helpButton = document.getElementById("helpButton");

if (helpButton) {
    helpButton.addEventListener("click", () => {
        showView("assistant");
    });
}

/* Open dashboard when the website starts */
showView("overview");

console.log("Tamil AI Government Scheme Navigator loaded.");
console.log("Navigation is ready.");
