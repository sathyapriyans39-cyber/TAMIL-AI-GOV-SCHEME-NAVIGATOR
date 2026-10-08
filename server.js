const express = require("express");
const cors = require("cors");
const multer = require("multer");

const app = express();

app.use(cors());
app.use(express.json());

const upload = multer({
    storage: multer.memoryStorage()
});

// Sarvam API Key
const SARVAM_API_KEY = "sk_337hlcbc_jDngdwV0N9AUAiD4aWZLLzvu";


// ===============================
// AI CHAT MODULE
// ===============================

app.post("/api/chat", async (req, res) => {

    try {

        const { message } = req.body;

        const response = await fetch(
            "https://api.sarvam.ai/v1/chat/completions",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "api-subscription-key": SARVAM_API_KEY
                },

                body: JSON.stringify({
                    model: "sarvam-105b",

                    messages: [
                        {
                            role: "system",
                            content:
                                "You are Tamil AI Government Scheme Navigator. Help users understand Indian and Tamil Nadu government schemes. Answer clearly and simply in Tamil or English. Provide scheme name, benefits, eligibility, documents and application information when available."
                        },

                        {
                            role: "user",
                            content: message
                        }
                    ]
                })
            }
        );

        const data = await response.json();

        console.log("AI Response:", data);

        const reply =
            data.choices?.[0]?.message?.content ||
            "Sorry, I could not generate a response.";

        res.json({
            reply: reply
        });

    } catch (error) {

        console.error("AI Error:", error);

        res.status(500).json({
            error: "AI service error"
        });

    }

});


// ===============================
// SARVAM SPEECH TO TEXT
// ===============================

app.post(
    "/api/speech-to-text",
    upload.single("audio"),
    async (req, res) => {

        try {

            if (!req.file) {

                return res.status(400).json({
                    error: "Audio file is required"
                });

            }

            const formData = new FormData();

            const audioBlob = new Blob(
                [req.file.buffer],
                {
                    type: req.file.mimetype
                }
            );

            formData.append(
                "file",
                audioBlob,
                req.file.originalname
            );

            formData.append(
                "model",
                "saaras:v3"
            );

            formData.append(
                "language_code",
                "ta-IN"
            );

            formData.append(
                "mode",
                "transcribe"
            );

            const response = await fetch(
                "https://api.sarvam.ai/speech-to-text",
                {
                    method: "POST",

                    headers: {
                        "api-subscription-key":
                            SARVAM_API_KEY
                    },

                    body: formData
                }
            );

            const data = await response.json();

            console.log("Speech Response:", data);

            res.json({
                transcript:
                    data.transcript || ""
            });

        } catch (error) {

            console.error(
                "Speech-to-Text Error:",
                error
            );

            res.status(500).json({
                error: "Speech recognition failed"
            });

        }

    }
);


// ===============================
// SARVAM TEXT TO SPEECH
// ===============================

app.post(
    "/api/text-to-speech",
    async (req, res) => {

        try {

            const {
                text,
                language = "ta-IN"
            } = req.body;

            const response = await fetch(
                "https://api.sarvam.ai/text-to-speech",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",

                        "api-subscription-key":
                            SARVAM_API_KEY
                    },

                    body: JSON.stringify({

                        text: text,

                        target_language_code:
                            language,

                        model: "bulbul:v3",

                        speaker: "shubh",

                        pace: 1,

                        speech_sample_rate: 24000,

                        output_audio_codec: "wav"

                    })
                }
            );

            const data = await response.json();

            console.log(
                "Text-to-Speech Response:",
                data
            );

            res.json({
                audio:
                    data.audios?.[0] || ""
            });

        } catch (error) {

            console.error(
                "Text-to-Speech Error:",
                error
            );

            res.status(500).json({
                error: "Text to speech failed"
            });

        }

    }
);


// ===============================
// SERVER
// ===============================

app.listen(5000, () => {

    console.log(
        "================================="
    );

    console.log(
        "Tamil AI Government Scheme Navigator"
    );

    console.log(
        "Server running at:"
    );

    console.log(
        "http://localhost:5000"
    );

    console.log(
        "================================="
    );

});