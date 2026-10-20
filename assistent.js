
/* =====================================
   AI ASSISTANT / CHATBOT
===================================== */

const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const chatMessages = document.getElementById("chatMessages");


/* Display a message in the chat window */
function addMessage(text, sender) {
    if (!chatMessages) return;

    const message = document.createElement("div");
    message.className = "chat-message " + sender;
    message.textContent = text;

    chatMessages.appendChild(message);

    chatMessages.scrollTop = chatMessages.scrollHeight;
}


/* Generate a sample reply */
function getAssistantReply(message) {
    const text = message.toLowerCase();

    if (
        text.includes("வணக்கம்") ||
        text.includes("hello") ||
        text.includes("hi")
    ) {
        return "வணக்கம்! Hello! I can help you explore government schemes. Tell me whether you are a student, farmer, employee, or looking for other welfare support.";
    }

    if (
        text.includes("student") ||
        text.includes("scholarship") ||
        text.includes("கல்வி") ||
        text.includes("மாணவர்")
    ) {
        return "Students can explore scholarship opportunities at https://scholarships.gov.in. Check the official scheme details for eligibility and application dates.";
    }

    if (
        text.includes("farmer") ||
        text.includes("agriculture") ||
        text.includes("விவசாய")
    ) {
        return "Farmers can explore PM-KISAN information at https://pmkisan.gov.in. Eligibility conditions apply, so please verify them on the official website.";
    }

    if (
        text.includes("women") ||
        text.includes("woman") ||
        text.includes("பெண்கள்")
    ) {
        return "For women's welfare schemes, explore https://www.india.gov.in and check Tamil Nadu government welfare announcements for current eligibility requirements.";
    }

    if (
        text.includes("job") ||
        text.includes("employment") ||
        text.includes("வேலை")
    ) {
        return "You can explore employment and career services through the National Career Service at https://www.ncs.gov.in.";
    }

    if (
        text.includes("health") ||
        text.includes("medical") ||
        text.includes("மருத்துவ")
    ) {
        return "For healthcare scheme information, visit https://www.india.gov.in and verify current health scheme details through the official government portal.";
    }

    if (
        text.includes("housing") ||
        text.includes("house") ||
        text.includes("வீடு")
    ) {
        return "You can explore government housing scheme information at https://www.india.gov.in. Check the scheme's official eligibility conditions before applying.";
    }

    if (
        text.includes("income") ||
        text.includes("eligibility") ||
        text.includes("தகுதி")
    ) {
        return "Eligibility may depend on your age, annual family income, occupation, district, and other scheme-specific conditions. Please check the official scheme website before applying.";
    }

    if (
        text.includes("நன்றி") ||
        text.includes("thank")
    ) {
        return "You're welcome! நன்றி! Please verify scheme details on official government websites before applying.";
    }

    return "I can help you explore education, agriculture, employment, women's welfare, healthcare, and housing schemes. Tell me which category you are interested in. இந்த வகைகளில் உங்களுக்கு தேவையான திட்டத்தைப் பற்றி கேளுங்கள்.";
}


/* Handle chat form submission */
if (chatForm && chatInput && chatMessages) {
    chatForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const userMessage = chatInput.value.trim();

        if (!userMessage) return;

        addMessage(userMessage, "user");
        chatInput.value = "";

        const reply = getAssistantReply(userMessage);

        setTimeout(() => {
            addMessage(reply, "assistant");
        }, 350);
    });
}


/* Suggested prompt buttons */
document.querySelectorAll("[data-prompt]").forEach(button => {
    button.addEventListener("click", () => {
        if (!chatInput || !chatForm) return;

        chatInput.value = button.dataset.prompt;
        chatForm.requestSubmit();
    });
});
