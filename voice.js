
/* =====================================
   VOICE INPUT
===================================== */

const voiceButton = document.getElementById("voiceButton");
const voiceStatus = document.getElementById("voiceStatus");

const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

if (voiceButton) {
    if (SpeechRecognition) {
        const recognition = new SpeechRecognition();

        recognition.continuous = false;
        recognition.interimResults = false;

        voiceButton.addEventListener("click", function () {
            const languageSelect =
                document.getElementById("language");

            recognition.lang =
                languageSelect && languageSelect.value === "ta"
                    ? "ta-IN"
                    : "en-IN";

            if (voiceStatus) {
                voiceStatus.textContent =
                    "Listening... Please speak now.";
            }

            try {
                recognition.start();
            } catch (error) {
                if (voiceStatus) {
                    voiceStatus.textContent =
                        "Voice recognition is already active. Please try again.";
                }
            }
        });

        recognition.onresult = function (event) {
            const transcript =
                event.results[0][0].transcript;

            const chatInput =
                document.getElementById("chatInput");

            if (chatInput) {
                chatInput.value = transcript;
            }

            if (voiceStatus) {
                voiceStatus.textContent =
                    "Voice captured! Press Send to continue.";
            }
        };

        recognition.onerror = function () {
            if (voiceStatus) {
                voiceStatus.textContent =
                    "Voice input failed. Check microphone permission or type your message.";
            }
        };

        recognition.onend = function () {
            if (
                voiceStatus &&
                voiceStatus.textContent ===
                    "Listening... Please speak now."
            ) {
                voiceStatus.textContent = "";
            }
        };
    } else {
        voiceButton.addEventListener("click", function () {
            if (voiceStatus) {
                voiceStatus.textContent =
                    "Voice input is not supported by this browser. Please try Chrome or type your message.";
            }
        });
    }
}
