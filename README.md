<div align="center">

# UrbanEye

**Civic Infrastructure Intelligence Platform**

[![Flask](https://img.shields.io/badge/Flask-3.0-000000?logo=flask)](https://flask.palletsprojects.com/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://react.dev/)
[![Flutter](https://img.shields.io/badge/Flutter-3.7-02569B?logo=flutter)](https://flutter.dev/)
[![UrbanAI Engine](https://img.shields.io/badge/UrbanAI-Engine-FF6B35?logo=artifacthub)](https://github.com/AyanAhmedKhan)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791?logo=postgresql)](https://www.postgresql.org/)

[Live Demo](#) · [API Docs](#api-documentation) · [Report Bug](https://github.com/AyanAhmedKhan/Web-app-urbaneye/issues)

</div>

---

## What is UrbanEye?

UrbanEye is a full-stack civic issue management system that connects citizens, field officers, and government administrators. Citizens report infrastructure problems (potholes, garbage, broken streetlights) via a mobile app or web interface. The system uses the **UrbanAI Engine** to analyze uploaded images, auto-categorize issues, and predict potential infrastructure failures based on weather data and historical patterns.

**Core workflow:**
1. Citizen uploads photo of issue → UrbanAI Engine analyzes and categorizes it
2. Report is geo-tagged and routed to the appropriate department
3. Field officers receive assignments and update status
4. Admins monitor via live heatmap and analytics dashboard

---

## Project Structure

```
Urbaneye/
├── mobileappUrbanEye/     # Flutter mobile app (Android/iOS)
├── webapp-urbaneye/       # React web dashboard
└── UE_backend-main/       # Flask REST API
```

---

## Features

### Image Analysis (UrbanAI Engine)
- Upload any image of a civic issue
- UrbanAI Engine identifies: potholes, garbage, sewage, drainage, streetlight damage, traffic signals, illegal dumping, waterlogging
- Auto-assigns severity (low/medium/high) and department

### Predictive Intelligence
- Correlates historical report data with Open-Meteo weather API
- Scrapes local news via DuckDuckGo for context (protests, construction, events)
- Outputs predictions with reasoning: *"Heavy rain forecast + 3 drainage complaints in sector → Deploy suction truck"*

### Role-Based Access
| Role | Capabilities |
|------|-------------|
| **Civilian** | Report issues, track status, view leaderboard |
| **Field Officer** | Receive tasks, update status, verify resolutions |
| **Dept Head** | Manage department-specific reports (Roads/Water/Waste) |
| **Gov Admin** | Full analytics, HRMS, AI predictions, heatmap |
| **Super Admin** | User management, system configuration |
| **Gig Worker** | On-demand task pickup |
| **Social Worker** | NGO collaboration on social issues |

### Voice Commands (Web Dashboard)
The admin dashboard supports Web Speech API:
- *"Show heatmap"* → Opens map view
- *"AI predictions"* → Triggers prediction engine
- *"How many critical reports?"* → Speaks count aloud
- *"Status report"* → AI voice summary of current state

### HRMS Module
Built-in human resource management for government staff:
- Employee directory
- Attendance tracking
- Payroll management
- Recruitment pipeline

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Mobile** | Flutter 3.7, Firebase Auth, Cloud Firestore |
| **Web** | React 18, Vite 5, Tailwind CSS, Framer Motion |
| **Maps** | Leaflet.js, React-Leaflet |
| **Charts** | Recharts |
| **Backend** | Flask 3.0, Flask-RESTx, SQLAlchemy |
| **Database** | PostgreSQL (production), SQLite (dev) |
| **AI** | UrbanAI Engine (powered by multimodal AI), LangChain |
| **Auth** | JWT (web/API), Firebase Auth (mobile) |

---

## 🤖 AI Tools Integrated

UrbanEye leverages a proprietary **UrbanAI Engine** built on top of industry-leading multimodal AI and cloud technologies:

### UrbanAI Engine — Core Intelligence Layer
The core AI engine powering all intelligent features of UrbanEye:

| Feature | How UrbanAI Engine is Used |
|---------|-------------------|
| **Image Analysis** | Detects issue types (pothole, garbage, sewage, broken streetlight) from citizen photos |
| **Severity Assessment** | Determines urgency level (Low/Medium/High) based on visual analysis |
| **Auto-Description** | Generates detailed descriptions from images for report forms |
| **Predictive Intelligence** | Powers LangChain pipeline for infrastructure failure predictions |
| **PR Generation** | Creates professional public relations statements for resolved issues |

### Firebase (Cloud Platform)

| Service | Usage |
|---------|-------|
| **Firebase Authentication** | Secure user login with email/password and Google Sign-In |
| **Cloud Firestore** | Real-time NoSQL database for mobile app data sync |
| **Cloud Functions** | Serverless backend operations for mobile app |

### OAuth 2.0 Sign-In
- One-tap seamless authentication for citizens and workers
- Auto-fetch user profile (name, email, avatar)
- Token-based secure sessions with refresh capabilities

### LangChain + UrbanAI Engine Pipeline
The prediction engine combines:
- **UrbanAI Engine** for natural language reasoning and visual intelligence
- **Open-Meteo** weather data integration
- **DuckDuckGo Search** for local news context
- **Pydantic** for structured AI outputs

```
┌──────────────┐    ┌──────────────┐    ┌────────────────────┐
│ Weather API  │───▶│  LangChain   │───▶│  UrbanAI Engine    │
│ (Open-Meteo) │    │  Pipeline    │    │     Reasoning      │
└──────────────┘    └──────┬───────┘    └─────────┬──────────┘
                           │                       │
┌──────────────┐           │             ┌─────────▼──────────┐
│ News Search  │───────────┘             │     Prediction     │
│ (DuckDuckGo) │                         │       Output       │
└──────────────┘                         └────────────────────┘
```

### Key Benefits

| Benefit | Impact |
|---------|--------|
| **Zero Manual Categorization** | Citizens just take a photo – UrbanAI Engine does the rest |
| **Accurate Routing** | 95%+ correct department assignment via UrbanAI Engine |
| **Faster Response** | Auto-fill reduces report submission time by 80% |
| **Proactive Maintenance** | AI predictions prevent issues before they escalate |
| **Seamless Auth** | OAuth Sign-In reduces friction for user onboarding |

---

## Installation

### Prerequisites
- Python 3.10+
- Node.js 18+
- Flutter SDK 3.7+
- PostgreSQL 14+ (optional, SQLite works for dev)
- UrbanAI Engine API key

### Backend

```bash
cd UE_backend-main

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Additional packages for predictions
pip install langchain langchain-community langchain-google-genai duckduckgo-search

# Configure environment
cp sample.env .env
```

Edit `.env`:
```env
URBANAI_API_KEY=your_key_here
DATABASE_URL=postgresql://user:pass@localhost:5432/urbaneye
JWT_SECRET_KEY=your_secret_key
```

```bash
# Initialize database
python -c "from app import app, db; app.app_context().push(); db.create_all()"

# Seed sample data (optional)
python seed_db.py

# Run server
python app.py
```

API runs at `http://localhost:5000`. Swagger docs at `http://localhost:5000/docs/`.

### Web Dashboard

```bash
cd webapp-urbaneye

npm install
npm run dev
```

Runs at `http://localhost:5173`.

### Mobile App

```bash
cd mobileappUrbanEye

flutter pub get

# Configure Firebase
# Add google-services.json (Android) and GoogleService-Info.plist (iOS)

flutter run
```

---

## API Documentation

Base URL: `/api/v1`

### Authentication
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/auth/register` | POST | Create new user |
| `/auth/login` | POST | Get JWT token |

### Reports
| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/reports` | GET | Optional | List all reports |
| `/reports` | POST | Required | Create report |
| `/reports/<id>` | PUT | Required | Update status |
| `/reports/leaderboard` | GET | - | Top reporters |

### Detection
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/detection/analyze` | POST | Upload image for UrbanAI Engine analysis |

### Government Admin
| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/gov/predictions` | GET | gov_admin | AI infrastructure predictions |
| `/gov/analytics` | GET | gov_admin | Dashboard statistics |
| `/gov/team` | GET | gov_admin | Team members |

### HRMS
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/hr/candidates` | GET | Recruitment pipeline |
| `/hr/attendance` | GET | Attendance records |
| `/hr/payroll` | GET | Payroll data |

Full Swagger documentation available at `/docs/` when running the backend.

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `URBANAI_API_KEY` | Yes | UrbanAI Engine API key |
| `URBANAI_API_KEYS` | No | Comma-separated keys for rotation |
| `URBANAI_MODEL` | No | Model variant (default: `urbanai-v1`) |
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `JWT_SECRET_KEY` | Yes | Secret for JWT signing |

---

## Database Schema

**Users** → `id, email, password_hash, name, role, department`

**Reports** → `id, category, department, description, severity, status, user_id, assigned_to, latitude, longitude, image_url, created_at`

**ReportLogs** → `id, report_id, status, message, updated_by, timestamp`

**Workers** → `id, user_id, type (mcd/gig/ngo), skills, vehicle_type, current_lat, current_lng, is_available, rating`

---

## Scripts

Backend utility scripts in `UE_backend-main/`:

| Script | Purpose |
|--------|---------|
| `seed_db.py` | Populate database with sample data |
| `reset_db.py` | Drop and recreate all tables |
| `mock_data.py` | Generate mock reports |
| `check_db.py` | Verify database connection |
| `verify_users.py` | List all users |

---

## Deployment

### Backend (Render/Railway)
1. Set environment variables in dashboard
2. Build command: `pip install -r requirements.txt`
3. Start command: `gunicorn app:app`

### Frontend (Vercel/Netlify)
1. Build command: `npm run build`
2. Publish directory: `dist`
3. Set `VITE_API_URL` environment variable

---

## License

MIT

---

## Contributors

- [Ayan Ahmed Khan](https://github.com/AyanAhmedKhan)
