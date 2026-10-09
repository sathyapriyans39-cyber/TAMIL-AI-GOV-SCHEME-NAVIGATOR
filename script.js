// ======================================
// 1. PAGE NAVIGATION
// ======================================

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

    const selectedView = document.getElementById(viewName);

    if (!selectedView) {
        return;
    }

    views.forEach(function (view) {
        view.classList.remove("active");
    });

    selectedView.classList.add("active");

    navLinks.forEach(function (link) {

        link.classList.toggle(
            "active",
            link.dataset.view === viewName
        );

    });

    pageTitle.textContent = pageNames[viewName] || "Dashboard";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        showView(link.dataset.view);

    });

});


document.querySelectorAll("[data-go]").forEach(function (button) {

    button.addEventListener("click", function () {

        showView(button.dataset.go);

    });

});


document.getElementById("helpButton").addEventListener("click", function () {

    showView("assistant");

});



// ======================================
// 2. LANGUAGE SELECTOR
// ======================================

const languageSelect = document.getElementById("language");

languageSelect.addEventListener("change", function () {

    const selectedLanguage = languageSelect.value;

    if (selectedLanguage === "ta") {

        document.getElementById("welcomeTitle").innerHTML =
            "அரசு நலத்திட்டங்கள்,<br><span>அனைவருக்கும் எளிதாக.</span>";

    } else {

        document.getElementById("welcomeTitle").innerHTML =
            "Government benefits,<br><span>made accessible to everyone.</span>";

    }

});



// ======================================
// 3. CATEGORY CARD NAVIGATION
// ======================================

document.querySelectorAll("[data-category]").forEach(function (card) {

    card.addEventListener("click", function () {

        showView("schemes");

        const category = card.dataset.category;

        const occupation = document.getElementById("occupation");

        if (category === "Agriculture") {
            occupation.value = "Farmer";
        }

        if (category === "Education") {
            occupation.value = "Student";
        }

        if (category === "Women") {
            document.getElementById("gender").value = "Female";
        }

        document.getElementById("resultsHeading").textContent =
            category + " opportunities";

        document.getElementById("resultsMessage").textContent =
            "Complete your profile to see relevant sample recommendations.";

    });

});



// ======================================
// 4. SAMPLE SCHEME DATA
// ======================================

// Demonstration data only.
// These are example categories, not a verified list
// of currently available government schemes.

const schemes = [

    {
        name: "Student Scholarship Support",
        category: "Education",
        occupation: ["Student"],
        description:
            "Explore scholarship opportunities and check the documents that may be required.",
        icon: "fa-graduation-cap",
        officialUrl: "https://scholarships.gov.in/"
    },

    {
        name: "Farmer Assistance",
        category: "Agriculture",
        occupation: ["Farmer"],
        description:
            "Explore agricultural assistance and check relevant official scheme information.",
        icon: "fa-seedling",
        officialUrl: "https://pmkisan.gov.in/"
    },

    {
        name: "Employment and Skill Development",
        category: "Employment",
        occupation: ["Unemployed", "Employee", "Self-employed"],
        description:
            "Explore employment services, training opportunities and skill-development resources.",
        icon: "fa-briefcase",
        officialUrl: "https://www.ncs.gov.in/"
    },

    {
        name: "Women and Family Support",
        category: "Women & Family",
        occupation: ["Homemaker", "Employee", "Self-employed", "Other"],
        description:
            "Explore women-focused services and family welfare information.",
        icon: "fa-people-group",
        officialUrl: "https://www.india.gov.in/"
    },

    {
        name: "General Citizen Services",
        category: "Public Services",
        occupation: [
            "Student",
            "Farmer",
            "Employee",
            "Self-employed",
            "Unemployed",
            "Homemaker",
            "Other"
        ],
        description:
            "Explore public services and use official portals to verify scheme details.",
        icon: "fa-building-columns",
        officialUrl: "https://www.india.gov.in/"
    }

];



// ======================================
// 5. PROFILE FORM AND RECOMMENDATIONS
// ======================================

const profileForm = document.getElementById("profileForm");

const schemeResults = document.getElementById("schemeResults");

const resultsHeading = document.getElementById("resultsHeading");

const resultsMessage = document.getElementById("resultsMessage");


profileForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const age = Number(document.getElementById("age").value);

    const gender = document.getElementById("gender").value;

    const occupation = document.getElementById("occupation").value;

    const income = document.getElementById("income").value;

    const district = document.getElementById("district").value;


    if (
        !Number.isFinite(age) ||
        age < 1 ||
        age > 120 ||
        !gender ||
        !occupation ||
        income === "" ||
        !district
    ) {

        alert("Please enter valid details in all fields.");

        return;

    }


    // Simple sample matching rule.
    // This is not an official eligibility decision.

    const matches = schemes.filter(function (scheme) {

        return scheme.occupation.includes(occupation);

    });


    resultsHeading.textContent = "Your sample recommendations";

    resultsMessage.textContent =
        "Showing " + matches.length +
        " category matches for your profile in " + district +
        ". These are not verified eligibility results.";


    schemeResults.replaceChildren();


    if (matches.length === 0) {

        schemeResults.innerHTML = `
            <div class="empty-state">
                <i class="fa-solid fa-circle-info"></i>
                <h3>No sample matches found</h3>
                <p>
                    Try reviewing your profile or explore official
                    government portals for additional information.
                </p>
            </div>
        `;

        return;

    }


    matches.forEach(function (scheme) {

        const card = document.createElement("article");

        card.className = "scheme-card";


        const top = document.createElement("div");

        top.className = "scheme-card-top";


        const icon = document.createElement("div");

        icon.className = "scheme-icon";

        const iconElement = document.createElement("i");

        iconElement.className = "fa-solid " + scheme.icon;

        icon.appendChild(iconElement);


        const titleArea = document.createElement("div");


        const title = document.createElement("h3");

        title.textContent = scheme.name;


        const category = document.createElement("span");

        category.className = "scheme-category";

        category.textContent = scheme.category;


        titleArea.appendChild(title);

        titleArea.appendChild(category);


        top.appendChild(icon);

        top.appendChild(titleArea);


        const description = document.createElement("p");

        description.textContent = scheme.description;


        const actions = document.createElement("div");

        actions.className = "scheme-actions";


        const documentButton = document.createElement("button");

        documentButton.type = "button";

        documentButton.innerHTML =
            '<i class="fa-solid fa-file-lines"></i> Documents';


        documentButton.addEventListener("click", function () {

            alert(
                "Documents to check may include identity proof, " +
                "address proof, income certificate, bank details, " +
                "or educational certificates, depending on the scheme. " +
                "Verify the exact requirements on the official portal."
            );

        });


        const officialLink = document.createElement("a");

        officialLink.href = scheme.officialUrl;

        officialLink.target = "_blank";

        officialLink.rel = "noopener noreferrer";

        officialLink.innerHTML =
            'Official portal <i class="fa-solid fa-arrow-up-right-from-square"></i>';


        actions.appendChild(documentButton);

        actions.appendChild(officialLink);


        card.appendChild(top);

        card.appendChild(description);

        card.appendChild(actions);


        schemeResults.appendChild(card);

    });


    // Move to the results area so the user can see the output.

    document.querySelector(".results-section").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

});



// ======================================
// 6. AI ASSISTANT - DEMO RESPONSES
// ======================================

// Important:
// This chatbot uses predefined keyword rules.
// It does not connect to a live AI model or government database.

const chatForm = document.getElementById("chatForm");

const chatInput = document.getElementById("chatInput");

const chatMessages = document.getElementById("chatMessages");


function addMessage(text, sender) {

    const message = document.createElement("div");

    message.className =
        sender === "user"
            ? "message user-message"
            : "message assistant-message";


    const avatar = document.createElement("div");

    avatar.className = "message-avatar";


    const icon = document.createElement("i");

    icon.className =
        sender === "user"
            ? "fa-solid fa-user"
            : "fa-solid fa-robot";


    avatar.appendChild(icon);


    const bubble = document.createElement("div");

    bubble.className = "message-bubble";


    const paragraph = document.createElement("p");

    paragraph.textContent = text;


    const time = document.createElement("span");

    time.className = "message-time";

    time.textContent =
        sender === "user" ? "You" : "TamilAI Assistant";


    bubble.appendChild(paragraph);

    bubble.appendChild(time);


    message.appendChild(avatar);

    message.appendChild(bubble);


    chatMessages.appendChild(message);


    chatMessages.scrollTop = chatMessages.scrollHeight;

}


function getAssistantReply(message) {

    const text = message.toLowerCase();


    // Tamil greeting and basic responses

    if (
        text.includes("வணக்கம்") ||
        text.includes("நன்றி") ||
        text.includes("நலத்திட்டம்")
    ) {

        if (text.includes("நன்றி")) {
            return "நன்றி! Thank you. Please verify scheme information through the relevant official government portal.";
        }

        if (text.includes("நலத்திட்டம்")) {
            return "அரசு நலத்திட்டங்களைப் பற்றி அறிய, உங்கள் வயது, தொழில் மற்றும் வருமான விவரங்களின் அடிப்படையில் மாதிரி பரிந்துரைகளைப் பார்க்கலாம். This is a demonstration, not official eligibility verification.";
        }

        return "வணக்கம்! I can help you explore education, agriculture, employment and family welfare scheme categories.";

    }


    if (
        text.includes("hello") ||
        text.includes("hi") ||
        text.includes("vanakkam")
    ) {

        return "Vanakkam! I can help you explore sample government scheme categories. Are you a student, farmer, employee or looking for another type of support?";

    }


    if (
        text.includes("student") ||
        text.includes("scholarship") ||
        text.includes("education") ||
        text.includes("college")
    ) {

        return "For education support, start by checking the National Scholarship Portal at scholarships.gov.in. Depending on the scheme, you may need an institution ID, academic records, income certificate and bank details. Requirements vary, so verify them on the official portal.";

    }


    if (
        text.includes("farmer") ||
        text.includes("agriculture") ||
        text.includes("crop") ||
        text.includes("விவசாய")
    ) {

        return "For agricultural support, you can explore PM-KISAN at pmkisan.gov.in and check relevant Tamil Nadu agriculture services. Eligibility and documents vary by scheme. Please verify the current rules through the official portal.";

    }


    if (
        text.includes("women") ||
        text.includes("woman") ||
        text.includes("family") ||
        text.includes("பெண்")
    ) {

        return "You can explore women-focused and family welfare services through official government portals. The relevant scheme, eligibility and application process depend on your circumstances. This demo cannot confirm eligibility.";

    }


    if (
        text.includes("job") ||
        text.includes("employment") ||
        text.includes("skill") ||
        text.includes("unemployed")
    ) {

        return "For employment and skill-development resources, visit the National Career Service at ncs.gov.in. You can explore job-related services and career support. Check each programme's current eligibility and registration requirements.";

    }


    if (
        text.includes("document") ||
        text.includes("certificate") ||
        text.includes("documents")
    ) {

        return "Documents depend on the specific scheme. Common examples include identity proof, residence proof, income certificate, bank account details and education certificates. Not every scheme requires all these documents. Check the official scheme guidelines before applying.";

    }


    if (
        text.includes("income") ||
        text.includes("eligible") ||
        text.includes("eligibility") ||
        text.includes("qualify")
    ) {

        return "Eligibility can depend on age, family income, occupation, residence and other scheme-specific conditions. Use Find Schemes to explore sample category matches. This demo does not calculate official eligibility or verify your application.";

    }


    if (
        text.includes("apply") ||
        text.includes("application") ||
        text.includes("register")
    ) {

        return "First, identify the scheme and read its official eligibility rules. Then review the required documents, use the official application portal, and save your application reference if one is provided. This demo does not submit applications.";

    }


    if (
        text.includes("centre") ||
        text.includes("esevai") ||
        text.includes("csc") ||
        text.includes("location") ||
        text.includes("near")
    ) {

        return "Open the Service Centres page, choose your district and select Find Centres. Google Maps will open a search for nearby service centres. Check the location and available services before visiting.";

    }


    return "I can help you explore sample information about student scholarships, farmer assistance, employment, women and family welfare, and application documents. Try asking, 'I am a student' or 'What documents do I need?' This is a rule-based demo assistant, not a live AI service.";

}



// Handle chatbot form

chatForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const message = chatInput.value.trim();


    if (!message) {
        return;
    }


    addMessage(message, "user");


    chatInput.value = "";


    const reply = getAssistantReply(message);


    setTimeout(function () {

        addMessage(reply, "assistant");

    }, 350);

});



// Suggested question buttons

document.querySelectorAll("[data-prompt]").forEach(function (button) {

    button.addEventListener("click", function () {

        chatInput.value = button.dataset.prompt;

        chatForm.requestSubmit();

    });

});



// ======================================
// 7. VOICE INPUT
// ======================================

const voiceButton = document.getElementById("voiceButton");

const voiceStatus = document.getElementById("voiceStatus");


voiceButton.addEventListener("click", function () {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    if (!SpeechRecognition) {

        voiceStatus.textContent =
            "Voice input is not supported by this browser. Try a supported browser or type your question.";

        return;

    }


    const recognition = new SpeechRecognition();


    recognition.lang =
        languageSelect.value === "ta"
            ? "ta-IN"
            : "en-IN";


    recognition.interimResults = false;

    recognition.maxAlternatives = 1;


    voiceStatus.textContent = "Listening... Please speak.";

    voiceButton.classList.add("listening");


    recognition.onresult = function (event) {

        const spokenText = event.results[0][0].transcript;

        chatInput.value = spokenText;

        voiceStatus.textContent = "Voice input received.";

        chatInput.focus();

    };


    recognition.onerror = function () {

        voiceStatus.textContent =
            "Could not recognize your voice. Please try again or type your question.";

    };


    recognition.onend = function () {

        voiceButton.classList.remove("listening");

    };


    try {

        recognition.start();

    } catch (error) {

        voiceStatus.textContent =
            "Voice input could not start. Please try again.";

        voiceButton.classList.remove("listening");

    }

});



// ======================================
// 8. SERVICE CENTRE SEARCH
// ======================================

const centreButton = document.getElementById("centreButton");

const centreDistrict = document.getElementById("centreDistrict");


centreButton.addEventListener("click", function () {

    const district = centreDistrict.value;

    const searchQuery =
        "Common Service Centre CSC e-Sevai near " +
        district +
        ", Tamil Nadu";


    const mapsURL =
        "https://www.google.com/maps/search/?api=1&query=" +
        encodeURIComponent(searchQuery);


    window.open(mapsURL, "_blank", "noopener,noreferrer");

});



// ======================================
// 9. STARTUP
// ======================================

showView("overview");

console.log("TamilAI Scheme Navigator loaded successfully.");
console.log("Demo mode: sample scheme rules and predefined chatbot responses.");