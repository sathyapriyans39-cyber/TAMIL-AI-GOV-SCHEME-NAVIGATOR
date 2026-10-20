# 🏛️ Tamil AI Government Scheme Navigator
### தமிழ் அரசு திட்டங்கள் AI வழிகாட்டி

A simple, user-friendly, full-stack web application designed to help citizens of Tamil Nadu (students, women, farmers, job-seekers, senior citizens, and economically weaker sections) discover and navigate welfare schemes offered by the **Tamil Nadu State Government** and the **Central Government**.

---

## 📋 Table of Contents
1. [Project Overview](#-project-overview)
2. [Key Features](#-key-features)
3. [Technology Stack](#-technology-stack)
4. [Project Structure](#-project-structure)
5. [Windows CMD Setup & Run Instructions](#-windows-cmd-setup--run-instructions)
6. [Demo Accounts for Testing & Viva](#-demo-accounts-for-testing--viva)
7. [System Architecture (College Viva Explanation)](#-system-architecture-college-viva-explanation)
8. [API Endpoints Reference](#-api-endpoints-reference)
9. [Limitations & Future Enhancements](#-limitations--future-enhancements)

---

## 🎯 Project Overview

Government welfare schemes often fail to reach beneficiaries because information is scattered across dozens of different department websites. Ordinary citizens often struggle to understand complex eligibility rules, don't know which documents are mandatory, and don't know where to apply.

**Tamil AI Government Scheme Navigator** bridges this gap:
- **Bilingual Interface:** Simple, accessible Tamil (தமிழ்) and English.
- **Smart Eligibility Checker:** Evaluates age, gender, occupation, student status, and income against actual scheme conditions.
- **AI Scheme Assistant:** Answers citizen queries in plain language with verified scheme benefits, application links, and official helplines.
- **e-Sevai Centre Locator:** Finds verified Taluk/district service centres with addresses, contact details, and Google Maps navigation.
- **Admin Management:** Protected dashboard for government officers to publish, edit, or update schemes and broadcast in-app notifications.

---

## ✨ Key Features

### 1. Home & Schemes Explorer (`client/index.html`)
- Displays all Tamil Nadu State and Central Government schemes.
- Filter by category: Education, Women Welfare, Agriculture, Health, MSME/Loans, Housing, Social Welfare.
- Toggle between **All Schemes**, **Tamil Nadu State Government (தமிழ்நாடு அரசு)**, and **Central Government (மத்திய அரசு)**.
- Live keyword search across Tamil and English titles, departments, and descriptions.
- Detailed modal popup showing benefits, eligibility checklists, required documents with issuing authority, and official application portals.

### 2. Smart Eligibility Checker
- Interactive questionnaire gathering key criteria: Age, Gender, District (all 38 TN districts), Occupation, Student status, 6th-12th TN Govt School study status, Annual Family Income, and Community category.
- Evaluates rules deterministically and highlights matching reasons (e.g., *"Age 20 qualifies"*, *"Income within ₹2,50,000 ceiling"*, *"Tamil Nadu resident"*).
- Includes prominent disclaimers advising citizens that final eligibility is decided by government departments upon document verification.

### 3. AI Assistant Chatbot
- Bilingual chatbot supporting Tamil and English queries.
- Suggestion chips for quick queries (*"பெண்களுக்கான திட்டங்கள் என்ன?"*, *"மாணவர் உதவித்தொகை"*, *"விவசாயிகள் நிதி"*).
- Supports external LLM API (Sarvam / OpenAI) if keys are provided in `.env`.
- **100% Deterministic Fallback:** If external APIs are unavailable or offline, the system uses built-in scheme matching to answer accurately from verified data without hallucinations.

### 4. e-Sevai Centre Locator
- Filterable search across 38 districts of Tamil Nadu.
- Displays verified centre names, taluks, operating hours, phone numbers, and direct Google Maps directions links.

### 5. Citizen & Admin Authentication (`client/login.html`)
- Citizen registration and login with secure password hashing (`bcryptjs`) and JWT sessions.
- User data saved persistently in `server/data/users_store.json`.
- Quick 1-click credential auto-fill buttons for viva demonstrations.

### 6. Admin Scheme Management (`client/admin.html`)
- Restricted to users with the `ADMIN` role.
- Real-time portal metrics (Total Schemes, State vs Central breakdown, Total Registered Users).
- Form to add new schemes with complete field validation (Name, Level, Department, Category, Benefits, Documents, Official URL).
- Instant update in the citizen catalog and automatic in-app notification broadcast.
- Scheme edit and deletion capabilities.

---

## 🛠️ Technology Stack

Designed specifically for clarity, readability, and ease of demonstration during college vivas:

- **Frontend:** Pure HTML5, Vanilla CSS3 (responsive design system with Tamil Nadu Government colors), and Vanilla JavaScript (ES6+). No complex bundlers or heavyweight frontend frameworks.
- **Backend:** Node.js with Express.js REST API.
- **Database / Data Store:** Persistent JSON storage (`users_store.json`) and structured JavaScript data modules (`schemes.js`, `centres.js`).
- **Authentication:** `jsonwebtoken` (JWT) and `bcryptjs` password hashing.
- **AI Engine:** Dual-layer architecture: Sarvam/OpenAI API integration with built-in rule-based fallback answering from verified government scheme records.

---

## 📂 Project Structure

```
tamil-ai-gov-scheme-navigator/
├── .env.example              # Sample environment configuration
├── .gitignore                # Git ignore rules
├── package.json              # Root project configuration and npm start script
├── README.md                 # Complete project documentation and viva guide
├── start.bat                 # 1-Click Windows CMD launcher
│
├── client/                   # Frontend Web Application (HTML / CSS / JS)
│   ├── favicon.svg           # Government portal emblem favicon
│   ├── index.html            # Main citizen portal (Search, Eligibility, AI, e-Sevai)
│   ├── login.html            # User login and registration page
│   ├── admin.html            # Admin dashboard for scheme CRUD and metrics
│   ├── css/
│   │   └── style.css         # Responsive Tamil Nadu Gov-inspired design system
│   └── js/
│       ├── app.js            # Main controller: Language switcher, Eligibility, e-Sevai, Notifs
│       ├── auth.js           # Auth session, JWT storage, Login/Register helpers
│       ├── chatbot.js        # AI chat UI, message bubbles, quick suggestions
│       └── schemes.js        # Scheme loading, keyword search, cards, details modal
│
└── server/                   # Backend API Server (Node.js + Express)
    ├── .env                  # Local server environment variables
    ├── .env.example          # Sample environment configuration
    ├── package.json          # Server dependencies
    ├── server.js             # Main server entry point (Serves APIs & client static files)
    ├── data/
    │   ├── schemes.js        # 19+ authentic TN and Central schemes (94KB bilingual dataset)
    │   ├── centres.js        # Verified e-Sevai centres across Tamil Nadu districts
    │   └── users_store.json  # Persistent JSON user store
    ├── middleware/
    │   └── authMiddleware.js # JWT verification and Admin role guards
    ├── routes/
    │   ├── admin.js          # Admin metrics, Add/Edit/Delete scheme endpoints
    │   ├── ai.js             # AI Assistant chat endpoint
    │   ├── auth.js           # User registration, login, profile endpoints
    │   ├── centres.js        # e-Sevai centre search and district list endpoints
    │   ├── notifications.js  # In-app notifications endpoints
    │   └── schemes.js        # Scheme search, category, and eligibility match endpoints
    └── services/
        ├── ai.js             # AI query processor (Language detection, LLM, Fallback engine)
        ├── eligibilityEngine.js # Multi-criteria profile rule evaluator
        └── notificationService.js # In-app notification dispatcher
```

---

## 💻 Windows CMD Setup & Run Instructions

### Prerequisites
- **Node.js** (v18 or higher recommended). Check with:
  ```cmd
  node -v
  ```

### Step 1: Install Dependencies
Open Windows Command Prompt (`cmd.exe`) in the project directory:
```cmd
cd server
npm install
cd ..
```

### Step 2: Run the Application
You can run the application in any of the following three ways:

#### Option A (Recommended - 1-Click Launcher):
Double-click `start.bat` or run:
```cmd
start.bat
```
*This starts the server and automatically opens `http://localhost:5000/` in your default browser.*

#### Option B (From Root using npm):
```cmd
npm start
```

#### Option C (Direct Node command):
```cmd
node server/server.js
```

Then visit in your web browser:
👉 **`http://localhost:5000/`**

---

## 🔑 Demo Accounts for Testing & Viva

| Role | Email | Password | Access Level |
|---|---|---|---|
| **Administrator** | `admin@tamilnadugov.in` | `admin123` | Full access to Admin Dashboard (`/admin.html`), Scheme CRUD, Metrics |
| **Citizen (Student)** | `kavitha@example.com` | `user123` | Public portal, Eligibility Checker, Profile, Saved Schemes |

*Note: On the `login.html` page, click "Auto-fill Admin Login" or "Auto-fill Citizen Login" for instant testing without manual typing.*

---

## 🎓 System Architecture (College Viva Explanation)

During a viva voce examination or project demonstration, you can explain the architecture as follows:

```
+-------------------------------------------------------------------------------+
|                           CLIENT (Frontend Tier)                              |
|   HTML5 + Vanilla CSS3 + Vanilla JavaScript (ES6 Modules)                     |
|   - index.html (Schemes Catalogue, Eligibility Checker, Chatbot, e-Sevai)     |
|   - login.html (Citizen & Admin Auth)                                         |
|   - admin.html (Scheme Management Dashboard & Metrics)                        |
+-------------------------------------------------------------------------------+
                                    |
                         HTTP / REST API (JSON)
                                    |
+-------------------------------------------------------------------------------+
|                           SERVER (Backend Tier)                               |
|   Node.js + Express.js Server (server/server.js) running on Port 5000         |
|   - Serves static frontend files from /client directly                        |
|   - Middleware: CORS, JSON Body Parser, JWT Auth & Role Guard                 |
|   - Routes: /api/schemes, /api/auth, /api/admin, /api/centres, /api/ai        |
+-------------------------------------------------------------------------------+
         |                                  |                        |
         v                                  v                        v
+------------------+             +--------------------+   +---------------------+
|   DATA STORAGE   |             | ELIGIBILITY ENGINE |   |     AI ASSISTANT    |
| - schemes.js     |             | - Age, Gender,     |   | - Language Detector |
| - centres.js     |             |   Income, Student, |   | - External LLM API  |
| - users_store    |             |   Govt school match|   | - Rule-Based Pure   |
|   (JSON on disk) |             | - Match reasons %  |   |   Fallback Engine   |
+------------------+             +--------------------+   +---------------------+
```

### Key Technical Questions & Answers for Viva:

**Q1: Why did you use Vanilla HTML/CSS/JavaScript instead of a heavy framework like React?**
> *Answer:* Vanilla HTML, CSS, and JS provide fast load times, zero build dependencies, clean readable code, and ensure anyone can run and modify the project on Windows CMD without complex package installation or configuration issues. It accurately reflects solid fundamentals of web development.

**Q2: How does the AI Assistant work when external APIs (Sarvam / OpenAI) are offline?**
> *Answer:* The AI assistant has a dual-layer architecture. If an external API key is present and reachable, it uses generative AI grounded in system instructions. If the API key is missing or the external service fails, the backend seamlessly switches to an embedded rule-based RAG service in `server/services/ai.js`. It retrieves the matching scheme from `data/schemes.js` and formats an accurate response in Tamil or English with official links, helplines, and verification disclaimers, preventing hallucinations.

**Q3: How is user data stored and secured?**
> *Answer:* Passwords are encrypted using one-way cryptographic hashing (`bcryptjs` with salt rounds). User sessions are verified via JSON Web Tokens (`jsonwebtoken`). User records are persisted safely in `server/data/users_store.json`.

**Q4: How does the Eligibility Checker evaluate candidate suitability?**
> *Answer:* The `eligibilityEngine.js` module compares candidate inputs (age, gender, income, student status, govt school study) against structured rules on each scheme. It returns a match percentage and specific reasons explaining why the citizen qualifies, while noting that the result is preliminary.

---

## 📡 API Endpoints Reference

### Public Endpoints:
- `GET /api/schemes` - Retrieve schemes with keyword, category, and government level filters.
- `GET /api/schemes/categories` - List available scheme categories.
- `GET /api/schemes/:id` - Retrieve complete details for a single scheme.
- `POST /api/schemes/match-profile` - Evaluate citizen criteria against all schemes.
- `GET /api/centres` - List e-Sevai centres filtered by district or keyword.
- `GET /api/centres/districts` - List all 38 districts of Tamil Nadu.
- `POST /api/ai/chat` - Query the bilingual AI assistant.
- `GET /api/health` - Server health status and version.

### Authentication Endpoints:
- `POST /api/auth/register` - Create a new citizen account.
- `POST /api/auth/login` - Authenticate citizen or admin, returns JWT token.
- `GET /api/auth/me` - Get current user profile (requires Bearer token).
- `PUT /api/auth/profile` - Update citizen profile.

### Admin-Only Endpoints (Requires Admin JWT):
- `GET /api/admin/metrics` - Portal metrics (scheme count, user count).
- `POST /api/admin/schemes` - Add new government scheme and broadcast notification.
- `PUT /api/admin/schemes/:id` - Update existing scheme information.
- `DELETE /api/admin/schemes/:id` - Deactivate/delete a scheme.

---

## ⚠️ Limitations & Future Enhancements

1. **Database:** Currently uses disk-persisted JSON (`users_store.json`). In large-scale enterprise deployments, this can be transitioned to PostgreSQL or Firebase Firestore.
2. **e-Sevai Map:** Currently provides direct Google Maps directions links based on verified coordinates. A live embedded Leaflet/OpenStreetMap layer can be added if offline map rendering is preferred.
3. **Application Submissions:** The portal guides citizens with required documents and directs them to official departmental portals (`tn.gov.in`, `tnesevai.tn.gov.in`) rather than accepting direct citizen welfare disbursements, in adherence to government cybersecurity policies.
