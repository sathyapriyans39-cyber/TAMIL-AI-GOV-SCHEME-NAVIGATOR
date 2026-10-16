
/* =====================================
   GOVERNMENT SCHEME DATA
===================================== */

const schemes = [
    {
        name: "Student Scholarship Support",
        category: "Education",
        description:
            "Explore scholarship opportunities and educational support.",
        occupations: ["Student"],
        icon: "🎓",
        officialUrl: "https://scholarships.gov.in"
    },
    {
        name: "Farmer Assistance",
        category: "Agriculture",
        description:
            "Explore government assistance and support for farmers.",
        occupations: ["Farmer"],
        icon: "🌾",
        officialUrl: "https://pmkisan.gov.in"
    },
    {
        name: "Employment and Skill Development",
        category: "Employment",
        description:
            "Find employment services, career support and skill development.",
        occupations: [
            "Unemployed",
            "Employee",
            "Self-employed"
        ],
        icon: "💼",
        officialUrl: "https://www.ncs.gov.in"
    },
    {
        name: "Women and Family Support",
        category: "Women & Family",
        description:
            "Explore government welfare information for women and families.",
        occupations: [
            "Homemaker",
            "Employee",
            "Self-employed",
            "Other"
        ],
        icon: "👩‍👧",
        officialUrl: "https://www.india.gov.in"
    },
    {
        name: "General Citizen Services",
        category: "Public Services",
        description:
            "Explore government services and public welfare information.",
        occupations: [
            "Student",
            "Farmer",
            "Employee",
            "Self-employed",
            "Unemployed",
            "Homemaker",
            "Other"
        ],
        icon: "🏛️",
        officialUrl: "https://www.india.gov.in"
    }
];


/* =====================================
   PROFILE FORM AND SCHEME RESULTS
===================================== */

const profileForm = document.getElementById("profileForm");
const schemeResults = document.getElementById("schemeResults");
const resultsHeading = document.getElementById("resultsHeading");
const resultsMessage = document.getElementById("resultsMessage");

if (profileForm) {
    profileForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const age = Number(document.getElementById("age").value);
        const gender = document.getElementById("gender").value;
        const occupation = document.getElementById("occupation").value;
        const income = Number(document.getElementById("income").value);
        const district = document.getElementById("district").value;

        if (
            !age || age < 1 || age > 120 ||
            !gender ||
            !occupation ||
            document.getElementById("income").value.trim() === "" ||
            income < 0 ||
            !district
        ) {
            alert("Please enter valid information in all profile fields.");
            return;
        }

        const matchedSchemes = schemes.filter(scheme =>
            scheme.occupations.includes(occupation)
        );

        if (resultsHeading) {
            resultsHeading.textContent = "Recommended Schemes";
        }

        if (resultsMessage) {
            resultsMessage.textContent =
                "Here are sample schemes based on your occupation in " +
                district +
                ". Check the official website for full eligibility rules.";
        }

        if (!schemeResults) {
            return;
        }

        schemeResults.innerHTML = "";

        if (matchedSchemes.length === 0) {
            schemeResults.textContent =
                "No sample schemes found. Try updating your profile.";
            return;
        }

        matchedSchemes.forEach(scheme => {
            const card = document.createElement("div");
            card.className = "scheme-card";

            const icon = document.createElement("div");
            icon.className = "scheme-icon";
            icon.textContent = scheme.icon;

            const title = document.createElement("h3");
            title.textContent = scheme.name;

            const category = document.createElement("p");
            category.className = "scheme-category";
            category.textContent = scheme.category;

            const description = document.createElement("p");
            description.textContent = scheme.description;

            const documentsButton = document.createElement("button");
            documentsButton.type = "button";
            documentsButton.textContent = "Documents Required";
            documentsButton.addEventListener("click", () => {
                alert(
                    "Document requirements depend on the specific scheme. " +
                    "Please check the official scheme website."
                );
            });

            const officialLink = document.createElement("a");
            officialLink.href = scheme.officialUrl;
            officialLink.target = "_blank";
            officialLink.rel = "noopener noreferrer";
            officialLink.textContent = "Visit Official Website";

            card.appendChild(icon);
            card.appendChild(title);
            card.appendChild(category);
            card.appendChild(description);
            card.appendChild(documentsButton);
            card.appendChild(officialLink);

            schemeResults.appendChild(card);
        });

        const resultsSection = document.querySelector(".results-section");

        if (resultsSection) {
            resultsSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
}


/* =====================================
   CATEGORY CARD NAVIGATION
===================================== */

document.querySelectorAll("[data-category]").forEach(card => {
    card.addEventListener("click", () => {
        const category = card.dataset.category;

        if (typeof showView === "function") {
            showView("schemes");
        }

        const occupationField =
            document.getElementById("occupation");
        const genderField =
            document.getElementById("gender");

        if (occupationField) {
            if (category === "Agriculture") {
                occupationField.value = "Farmer";
            } else if (category === "Education") {
                occupationField.value = "Student";
            }
        }

        if (genderField && category === "Women & Family") {
            genderField.value = "Female";
        }

        if (resultsHeading) {
            resultsHeading.textContent = category + " Schemes";
        }

        if (resultsMessage) {
            resultsMessage.textContent =
                "Fill in your profile and submit to see sample recommendations.";
        }
    });
});
