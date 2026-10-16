
/* ===============================
   LANGUAGE SELECTOR
================================ */

const languageSelect = document.getElementById("language");
const welcomeTitle = document.getElementById("welcomeTitle");

if (languageSelect && welcomeTitle) {
    languageSelect.addEventListener("change", function () {

        if (languageSelect.value === "ta") {
            welcomeTitle.innerHTML =
                "உங்களுக்கான அரசு திட்டங்களைக் கண்டறியுங்கள்";
        } else {
            welcomeTitle.innerHTML =
                "Discover Government Schemes Made for You";
        }

    });
}
