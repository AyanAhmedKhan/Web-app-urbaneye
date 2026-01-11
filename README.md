# 🏙️ UrbanEye - Smart Civic Intelligence Platform

**UrbanEye** is a next-generation civic issue management and predictive intelligence system designed to streamline city operations. It leverages AI, real-time data, and voice-activated controls to help government administrations, field officers, and citizens work together for better urban infrastructure.

---

## 🚀 Key Features

### 🧠 **AI Predictive Intelligence**
- **Incident Prediction:** Uses Google Gemini 2.5 Flash to predict infrastructure failures (potholes, drainage, etc.) before they happen.
- **Multi-Source Analysis:** Correlates 3 data sources in real-time:
  1. **Historical Data:** Past incident patterns.
  2. **Live Weather:** Open-Meteo API (Rain/Wind analysis).
  3. **Local News:** DuckDuckGo Search (Civic news monitoring).
- **Voice Summary:** "Read out predictions" command.

### 🎙️ **Voice Command System**
- **Hands-Free Control:** Navigate the entire dashboard using voice.
- **Smart Queries:** Ask "How many critical reports?", "Show me Delhi map", or "Open Analytics".
- **Real-Time Feedback:** Visual feedback overlay and spoken responses (Text-to-Speech).

### 👥 **Role-Based Ecosystem**
- **Civic App (Citizens):** Report issues with geolocation & photos.
- **Gov Admin Dashboard:** Analytics, HR management, AI predictions, and heatmap.
- **Field Officer App:** Receive tasks, update status, and verify resolutions.
- **Department Head:** Manage specific departments (Roads, Water, Waste).
- **Social Worker (NGO):** Collaborate on social issues.
- **Gig Worker:** On-demand task fulfillment.

### 📊 **Advanced Analytics & Visualization**
- **Live Heatmap:** Interactive Leaflet map with severity clustering.
- **Real-Time Stats:** animated counters, severity distribution charts.
- **HRMS:** Staff directory, attendance, payroll, and recruitment tracking.

---

## 🛠️ Tech Stack

### **Frontend** (`webapp-urbaneye`)
- **Framework:** React 18 + Vite
- **Styling:** Tailwind CSS + Framer Motion (Animations)
- **Maps:** Leaflet.js + React-Leaflet
- **Charts:** Recharts
- **Icons:** Lucide React

### **Backend** (`UE_backend-main`)
- **Framework:** Flask (Python) + Flask-RESTx
- **Database:** PostgreSQL (SQLAlchemy + connection pooling)
- **AI/ML:** Google Gemini (LangChain + Google GenAI)
- **Auth:** JWT (JSON Web Tokens)
- **Storage:** Cloudinary / Local Storage

---

## 📦 Installation & Setup

### 1. Backend Setup
```bash
cd UE_backend-main

# Install dependencies
pip install -r requirements.txt
# Ensure LangChain packages are installed
pip install langchain langchain-community langchain-google-genai duckduckgo-search pydantic

# Configure Environment Variables (.env)
cp .env.example .env
# Add your keys:
# GEMINI_API_KEY=...
# DATABASE_URL=postgresql://...
# JWT_SECRET_KEY=...

# Run Server
python app.py
```

### 2. Frontend Setup
```bash
cd webapp-urbaneye

# Install Node modules
npm install

# Run Development Server
npm run dev
```

---

## 🎤 Voice Commands Guide
Click the microphone icon (bottom-right) and say:

| Command | Action |
|---------|--------|
| **"Show Dashboard"** | Go to Overview |
| **"Open Analytics"** | View Charts & Stats |
| **"Show Heatmap"** | Open City Map |
| **"AI Predictions"** | Predictive Intelligence Mode |
| **"Search Delhi"** | Filter data to Delhi |
| **"How many reports?"** | Hear total stats |
| **"Show Critical"** | Audit high-severity issues |

---

## 🔮 AI Architecture
The system uses a **Retrieval-Augmented Generation (RAG)** approach for predictions:
1. **Context Retrieval:** Fetches live weather (Open-Meteo) and news (DuckDuckGo).
2. **Historical Context:** Retrieves relevant past incident clusters from DB.
3. **Inference:** Gemini 1.5 Flash analyzes correlations to predict "High Risk" zones.
4. **Action:** Generates maintenance tickets automatically.

---

## 👨‍💻 Team
Developed for the **UrbanEye Project**.
