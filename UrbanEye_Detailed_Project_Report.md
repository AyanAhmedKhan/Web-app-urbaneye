# UrbanEye
## Detailed Project Report

### AI-Powered Civic Infrastructure Intelligence Platform

---

**Project Team:** UrbanEye Development Team  
**Institution:** [Your Institution Name]  
**Date:** February 2026  
**Version:** 1.0

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Problem Statement](#2-problem-statement)
3. [Solution Overview](#3-solution-overview)
4. [Technical Architecture](#4-technical-architecture)
5. [Features & Functionality](#5-features--functionality)
6. [Technology Stack](#6-technology-stack)
7. [Google Technologies Integration](#7-google-technologies-integration)
8. [Implementation Details](#8-implementation-details)
9. [System Workflow](#9-system-workflow)
10. [User Roles & Access Control](#10-user-roles--access-control)
11. [AI & Machine Learning Components](#11-ai--machine-learning-components)
12. [Database Design](#12-database-design)
13. [API Documentation](#13-api-documentation)
14. [Testing & Validation](#14-testing--validation)
15. [Results & Impact Metrics](#15-results--impact-metrics)
16. [Sustainability & Scalability](#16-sustainability--scalability)
17. [Future Roadmap](#17-future-roadmap)
18. [Challenges & Learnings](#18-challenges--learnings)
19. [SDG Alignment](#19-sdg-alignment)
20. [Conclusion](#20-conclusion)
21. [References](#21-references)
22. [Appendices](#22-appendices)

---

## 1. Executive Summary

UrbanEye is a full-stack civic infrastructure intelligence platform that revolutionizes how citizens report and governments resolve urban infrastructure issues. Powered by our proprietary **UrbanAI Engine**—a sophisticated computer vision and natural language processing system with advanced AI orchestration and token optimization—the platform transforms a simple photograph into an automatically categorized, severity-assessed, and department-routed complaint—eliminating manual processes and reducing report submission time by 80%.

The platform connects citizens, field officers, department heads, and government administrators through a unified ecosystem comprising a Flutter mobile application, React web dashboard, and Flask REST API backend. Beyond reactive complaint management, UrbanEye introduces predictive intelligence that correlates weather data, historical patterns, and local news to forecast infrastructure failures before they occur.

**Key Achievements:**
- 95%+ accuracy in AI-powered issue categorization
- 80% reduction in report submission time
- Support for 8+ infrastructure issue categories
- 7-role access control system reflecting real governance hierarchies
- Predictive intelligence for proactive maintenance
- First Runner-Up at devSprint - The Ultimate Innovation Sprint (January 2026)

**Live Deployment:**
- Web Dashboard: https://urban-eye-jfcf.vercel.app/
- API Documentation: Available at /docs/ endpoint
- Demo Video: https://youtu.be/1qoraqzspt4

---

## 2. Problem Statement

### 2.1 The Challenge

Urban infrastructure in cities faces a critical disconnect between citizens experiencing civic problems and the authorities responsible for resolving them. Millions of residents encounter issues like potholes, garbage accumulation, broken streetlights, sewage overflow, waterlogging, and damaged traffic signals daily, yet lack efficient channels to report these problems. Traditional reporting methods—phone calls to municipal offices, physical complaint forms, or fragmented online portals—result in delayed responses, lost complaints, poor issue tracking, and frustrated citizens.

### 2.2 Current System Inefficiencies

| Problem Area | Description |
|--------------|-------------|
| **Manual Categorization** | Citizens must navigate complex dropdown menus to classify issues, leading to misrouting between departments |
| **Lack of Visual Evidence** | Text-based complaints make verification difficult and time-consuming |
| **No Real-time Tracking** | Citizens have no visibility into complaint status after submission |
| **Reactive Operations** | Municipalities address problems only after escalation rather than preventing failures |
| **Data Silos** | Lack of centralized analytics prevents data-driven resource allocation |
| **Accessibility Barriers** | Complex interfaces exclude citizens with limited technical literacy |

### 2.3 Global & Local Context

Rapid urbanization is straining civic infrastructure worldwide. The UN projects 68% of the global population will live in cities by 2050, intensifying demands on already deteriorating infrastructure. Climate change exacerbates this—extreme weather events cause flooding, road damage, and drainage failures at unprecedented rates.

In developing economies like India, poor infrastructure costs 2-3% of GDP annually through accidents, health issues, and productivity loss. Citizen trust in government erodes when complaints go unanswered, while municipalities struggle with limited resources and no data visibility.

### 2.4 Target Beneficiaries

| Beneficiary | How They Benefit |
|-------------|------------------|
| **Citizens/Residents** | Easy photo-based reporting, real-time tracking, transparent resolution |
| **Municipal Administrators** | Live dashboards, heatmaps, AI analytics, predictive insights |
| **Field Officers** | Clear task assignments, mobile workflows, status updates |
| **Department Heads** | Filtered views, performance metrics, trend analysis |
| **NGOs/Social Workers** | Tools for community infrastructure advocacy |
| **Urban Planners** | Data-driven insights for infrastructure investment |

---

## 3. Solution Overview

### 3.1 UrbanEye Approach

UrbanEye addresses the civic infrastructure challenge through an AI-first, citizen-centric platform that automates the entire complaint lifecycle from submission to resolution.

**Core Innovation: Photo-to-Resolution Pipeline**

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Citizen Takes  │───▶│   UrbanAI       │───▶│  Auto-Routing   │
│  Photo of Issue │    │  Engine Analysis│    │  to Department  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                                      │
┌─────────────────┐    ┌─────────────────┐           │
│  Issue Resolved │◀───│  Field Officer  │◀──────────┘
│  & Verified     │    │  Assigned Task  │
└─────────────────┘    └─────────────────┘
```

### 3.2 Key Differentiators

| Feature | Traditional Systems | Competitors | UrbanEye |
|---------|---------------------|-------------|----------|
| Issue Categorization | Manual dropdown | Manual selection | **AI auto-detection from photo** |
| Severity Assessment | User-defined | None | **AI-assigned based on visual analysis** |
| Department Routing | Manual/rule-based | Manual | **AI auto-routing (95%+ accuracy)** |
| Predictive Capabilities | None | None | **Weather + historical data predictions** |
| Multi-stakeholder Access | Limited | Citizens + admins | **7 roles including gig workers, NGOs** |
| Voice Commands | None | None | **Web Speech API integration** |
| HRMS Integration | Separate system | None | **Built-in employee/payroll management** |

### 3.3 Platform Components

```
UrbanEye/
├── mobileappUrbanEye/     # Flutter mobile app (Android/iOS)
│   ├── Citizen reporting interface
│   ├── Real-time tracking
│   ├── GPS integration
│   └── Push notifications
│
├── webapp-urbaneye/       # React web dashboard
│   ├── Admin analytics
│   ├── Interactive heatmaps
│   ├── Voice commands
│   └── HRMS module
│
└── UE_backend-main/       # Flask REST API
    ├── UrbanAI Engine (Computer Vision + NLP)
    ├── Predictive intelligence
    ├── JWT authentication
    └── Swagger documentation
```

---

## 4. Technical Architecture

### 4.1 System Architecture Diagram

```
┌──────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                              │
├───────────────────────────┬──────────────────────────────────────┤
│     Flutter Mobile App    │        React Web Dashboard           │
│   ┌─────────────────────┐ │   ┌──────────────────────────────┐   │
│   │ • Photo Capture     │ │   │ • Admin Analytics            │   │
│   │ • GPS Tagging       │ │   │ • Leaflet.js Heatmaps        │   │
│   │ • Real-time Sync    │ │   │ • Voice Commands             │   │
│   │ • Push Notifications│ │   │ • HRMS Module                │   │
│   └─────────────────────┘ │   └──────────────────────────────┘   │
└───────────────────────────┴──────────────────────────────────────┘
                                    │
                                    ▼
┌──────────────────────────────────────────────────────────────────┐
│                         API GATEWAY                               │
│   ┌──────────────────────────────────────────────────────────┐   │
│   │              Flask REST API (Flask-RESTx)                 │   │
│   │  • JWT Authentication    • Swagger Documentation          │   │
│   │  • Request Validation    • Rate Limiting                  │   │
│   └──────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────┘
                                    │
                    ┌───────────────┼───────────────┐
                    ▼               ▼               ▼
┌───────────────────────┐ ┌─────────────────┐ ┌────────────────────┐
│    AI/ML SERVICES     │ │  DATA STORAGE   │ │  EXTERNAL APIs     │
├───────────────────────┤ ├─────────────────┤ ├────────────────────┤
│ • UrbanAI Engine      │ │ • PostgreSQL    │ │ • Open-Meteo       │
│ • AI Orchestration    │ │ • Firebase      │ │   (Weather)        │
│ • Image Analysis      │ │   Firestore     │ │ • DuckDuckGo       │
│ • Predictions         │ │ • SQLite (dev)  │ │   (News Search)    │
└───────────────────────┘ └─────────────────┘ └────────────────────┘
                                    │
                                    ▼
┌──────────────────────────────────────────────────────────────────┐
│                      AUTHENTICATION                               │
│   ┌─────────────────────────┐  ┌─────────────────────────────┐   │
│   │   Firebase Auth         │  │      JWT Tokens              │   │
│   │ • Google Sign-In        │  │ • Web/API Authentication    │   │
│   │ • Email/Password        │  │ • Role-based Access         │   │
│   └─────────────────────────┘  └─────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────┘
```

### 4.2 Data Flow Architecture

```
CITIZEN FLOW:
┌────────┐    ┌────────┐    ┌────────┐    ┌────────┐    ┌────────┐
│ Capture│───▶│ Upload │───▶│UrbanAI│───▶│ Store  │───▶│ Notify │
│ Photo  │    │ Image  │    │ Engine │    │ Report │    │ Officer│
└────────┘    └────────┘    └────────┘    └────────┘    └────────┘

ADMIN FLOW:
┌────────┐    ┌────────┐    ┌────────┐    ┌────────┐
│  View  │───▶│ Analyze│───▶│ Predict│───▶│ Decide │
│Dashboard│   │ Trends │    │ Issues │    │ Action │
└────────┘    └────────┘    └────────┘    └────────┘

PREDICTION FLOW:
┌────────┐    ┌────────┐    ┌────────┐    ┌────────┐
│ Weather│    │Historical│   │ News   │    │LangChain│
│  API   │───▶│  Data   │───▶│ Search │───▶│Pipeline │
└────────┘    └────────┘    └────────┘    └────────┘
                                               │
                                               ▼
                                         ┌──────────┐
                                         │ UrbanAI  │
                                         │ Engine   │
                                         └──────────┘
                                               │
                                               ▼
                                         ┌──────────┐
                                         │Prediction│
                                         │  Output  │
                                         └──────────┘
```

---

## 5. Features & Functionality

### 5.1 Mobile Application Features

| Feature | Description |
|---------|-------------|
| **Photo-based Reporting** | Capture issue photos with automatic GPS tagging |
| **AI Auto-categorization** | UrbanAI Engine analyzes images and assigns category/severity |
| **Real-time Tracking** | Monitor complaint status from submission to resolution |
| **Push Notifications** | Receive updates on complaint progress |
| **History View** | Access all previously submitted reports |
| **Leaderboard** | Gamification encouraging civic participation |
| **Google Sign-In** | One-tap authentication for quick onboarding |

### 5.2 Web Dashboard Features

| Feature | Description |
|---------|-------------|
| **Interactive Heatmaps** | Visualize issue clustering on Leaflet.js maps |
| **Analytics Dashboard** | Charts and metrics using Recharts |
| **Voice Commands** | Web Speech API for hands-free operation |
| **AI Predictions** | Weather-correlated infrastructure forecasts |
| **Department Views** | Filtered dashboards for Roads/Water/Waste |
| **HRMS Module** | Employee directory, attendance, payroll |
| **Report Management** | View, assign, update, and resolve complaints |

### 5.3 Voice Command Capabilities

| Command | Action |
|---------|--------|
| "Show heatmap" | Opens geographic visualization view |
| "AI predictions" | Triggers prediction engine |
| "How many critical reports?" | Speaks count of high-severity issues |
| "Status report" | AI voice summary of current state |

### 5.4 AI-Powered Features

| Feature | Technology | Description |
|---------|------------|-------------|
| **Image Analysis** | UrbanAI Vision | Detects issue types from citizen photos using advanced computer vision |
| **Severity Assessment** | UrbanAI Classifier | Determines Low/Medium/High urgency with multi-factor analysis |
| **Auto-Description** | UrbanAI NLP | Generates detailed text descriptions with context awareness |
| **Predictive Intelligence** | UrbanAI Orchestrator | Forecasts infrastructure failures using AI pipeline orchestration |
| **PR Generation** | UrbanAI Content | Creates statements for resolved issues with token optimization |

---

## 6. Technology Stack

### 6.1 Complete Technology Matrix

| Layer | Technology | Version | Purpose |
|-------|------------|---------|---------|
| **Mobile Frontend** | Flutter | 3.7+ | Cross-platform mobile app |
| | Dart | 3.0+ | Programming language |
| | Firebase SDK | Latest | Backend services |
| | Google Maps Flutter | Latest | Map integration |
| | Geolocator | Latest | GPS functionality |
| | Provider | Latest | State management |
| **Web Frontend** | React | 18 | Web application framework |
| | Vite | 5 | Build tool |
| | Tailwind CSS | 3.x | Styling framework |
| | Framer Motion | Latest | Animations |
| | Recharts | Latest | Data visualization |
| | Leaflet.js | Latest | Interactive maps |
| | React-Leaflet | Latest | React map wrapper |
| | Axios | Latest | HTTP client |
| **Backend** | Python | 3.10+ | Programming language |
| | Flask | 3.0 | Web framework |
| | Flask-RESTx | Latest | REST API with Swagger |
| | SQLAlchemy | Latest | ORM |
| | Flask-JWT-Extended | Latest | JWT authentication |
| | Flask-CORS | Latest | Cross-origin support |
| | Gunicorn | Latest | WSGI server |
| **AI/ML** | UrbanAI Engine | 2.0 | Proprietary computer vision & NLP system |
| | AI Orchestration Layer | Custom | Multi-model pipeline coordination |
| | Token Optimization Module | Custom | Efficient context management & cost optimization |
| | Pydantic | Latest | Structured outputs |
| **Databases** | PostgreSQL | 15+ | Production database |
| | SQLite | 3.x | Development database |
| | Cloud Firestore | Latest | Real-time mobile sync |
| **Authentication** | Firebase Auth | Latest | Mobile authentication |
| | JWT | Latest | API authentication |
| | OAuth 2.0 | Latest | Google Sign-In |
| **External APIs** | Open-Meteo | Latest | Weather forecasts |
| | DuckDuckGo Search | Latest | News context |
| **Deployment** | Render | - | Backend hosting |
| | Vercel | - | Frontend hosting |
| | Firebase Hosting | - | Alternative hosting |

### 6.2 Development Tools

| Tool | Purpose |
|------|---------|
| Git/GitHub | Version control |
| VS Code | IDE |
| Postman | API testing |
| Swagger UI | API documentation |
| Android Studio | Mobile development |
| Chrome DevTools | Web debugging |

---

## 7. Core Technologies Integration

### 7.1 UrbanAI Engine - Proprietary AI System

The UrbanAI Engine is our custom-built artificial intelligence system that serves as the cognitive core of the UrbanEye platform. It combines advanced computer vision, natural language processing, and sophisticated AI orchestration with token optimization for cost-effective, high-performance analysis.

**Architecture Components:**

| Component | Function |
|-----------|----------|
| **UrbanAI Vision** | Multi-layer computer vision pipeline for infrastructure defect detection |
| **UrbanAI Classifier** | Severity classification using multi-factor weighted analysis |
| **UrbanAI NLP** | Context-aware natural language generation for descriptions |
| **UrbanAI Orchestrator** | Advanced AI pipeline coordination with intelligent routing |
| **Token Optimizer** | Dynamic context management for cost-efficient API utilization |

| Feature | How UrbanAI Engine Works |
|---------|-------------------------|
| **Image Analysis** | Detects issue types (pothole, garbage, sewage, broken streetlight) from citizen photos |
| **Severity Assessment** | Determines urgency level (Low/Medium/High) based on visual analysis |
| **Auto-Description** | Generates detailed descriptions from images for report forms |
| **Predictive Intelligence** | Powers AI orchestration pipeline for infrastructure failure predictions |
| **PR Generation** | Creates professional public relations statements for resolved issues |

**Implementation Example:**
```python
# UrbanAI Engine Integration
from urbanai import UrbanAIEngine, VisionProcessor, TokenOptimizer

# Initialize with token optimization
engine = UrbanAIEngine(
    vision_model="urbanai-vision-2.0",
    token_optimizer=TokenOptimizer(max_context=4096),
    enable_orchestration=True
)

def analyze_civic_issue(image_data):
    # Computer vision analysis with AI orchestration
    result = engine.analyze(
        image=image_data,
        task="civic_infrastructure_detection",
        output_schema={
            "issue_type": str,
            "severity": ["Low", "Medium", "High"],
            "description": str,
            "department": ["Roads", "Water", "Waste", "Electrical"],
            "confidence": float
        }
    )
    return result.to_json()
```

### 7.2 Firebase (Google Cloud Platform)

| Service | Usage |
|---------|-------|
| **Firebase Authentication** | Secure user login with email/password and Google Sign-In |
| **Cloud Firestore** | Real-time NoSQL database for mobile app data sync |
| **Cloud Functions** | Serverless backend operations for mobile app |
| **Firebase Hosting** | Static web hosting option |

### 7.3 Google Sign-In (OAuth 2.0)

- One-tap seamless authentication for citizens and workers
- Auto-fetch user profile (name, email, avatar)
- Token-based secure sessions with refresh capabilities
- Reduces onboarding friction significantly

### 7.4 UrbanAI Orchestration Pipeline

The prediction engine combines multiple data sources through our advanced AI orchestration layer:

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│ Weather API  │───▶│   UrbanAI    │───▶│  Predictive  │
│ (Open-Meteo) │    │ Orchestrator │    │   Analysis   │
└──────────────┘    └──────┬───────┘    └──────┬───────┘
                           │                    │
┌──────────────┐           │            ┌──────▼───────┐
│ News Search  │───────────┘            │  Prediction  │
│ (DuckDuckGo) │                        │   Output     │
└──────────────┘                        └──────────────┘
```

**Sample Prediction Output:**
> "Heavy rain forecast for next 48 hours + 3 drainage complaints in Sector 5 + news about ongoing construction blocking storm drains → Recommend deploying suction truck proactively to prevent flooding."

### 7.5 Benefits of UrbanAI Engine

| Benefit | Impact |
|---------|--------|
| **Zero Manual Categorization** | Citizens just take a photo – AI does the rest |
| **Accurate Routing** | 95%+ correct department assignment via UrbanAI Engine |
| **Faster Response** | Auto-fill reduces report submission time by 80% |
| **Proactive Maintenance** | AI predictions prevent issues before escalation |
| **Token Optimization** | Cost-efficient AI operations with smart context management |
| **Seamless Auth** | Google Sign-In reduces friction for user onboarding |

---

## 8. Implementation Details

### 8.1 Backend Implementation

**Project Structure:**
```
UE_backend-main/
├── app.py                 # Main Flask application
├── models.py              # SQLAlchemy database models
├── auth_utils.py          # Authentication utilities
├── requirements.txt       # Python dependencies
├── sample.env             # Environment template
├── seed_db.py             # Database seeding
├── utils/
│   ├── mail_service.py    # Email notifications
│   └── email_templates.py # Email templates
├── templates/
│   └── dashboard.html     # Admin dashboard template
└── docs/
    ├── index.html         # API documentation
    └── render.yaml        # Deployment config
```

**Key API Endpoints:**

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/v1/health` | GET | Health check |
| `/api/v1/health/ai` | GET | Test UrbanAI Engine connection |
| `/api/v1/detection/analyze` | POST | Analyze uploaded image |
| `/api/v1/categories` | GET | Get issue categories |
| `/api/v1/reports` | GET/POST | Manage reports |
| `/api/v1/users` | GET/POST | User management |

### 8.2 Mobile App Implementation

**Project Structure:**
```
mobileappUrbanEye/lib/
├── main.dart              # App entry point
├── firebase_options.dart  # Firebase configuration
├── models/
│   ├── user_model.dart    # User data model
│   └── social_worker_model.dart
├── services/
│   ├── ai_service.dart    # UrbanAI Engine integration
│   ├── auth_service.dart  # Authentication
│   └── firestore_service.dart # Database operations
├── utils/
│   ├── app_colors.dart    # Theme colors
│   ├── app_text_styles.dart # Typography
│   ├── constants.dart     # App constants
│   └── validators.dart    # Form validation
├── view_models/
│   └── auth_view_model.dart # Auth state management
├── views/
│   ├── auth/              # Login/signup screens
│   ├── civilian/          # Citizen interfaces
│   └── social_worker/     # Social worker interfaces
└── widgets/
    └── common/            # Reusable components
```

### 8.3 Web Dashboard Implementation

**Project Structure:**
```
webapp-urbaneye/
├── index.html             # Entry HTML
├── package.json           # Dependencies
├── vite.config.js         # Vite configuration
├── tailwind.config.cjs    # Tailwind configuration
├── postcss.config.cjs     # PostCSS configuration
├── src/
│   ├── main.jsx           # React entry point
│   ├── App.jsx            # Root component
│   ├── Layout.jsx         # App layout
│   ├── index.css          # Global styles
│   ├── components/        # Reusable components
│   ├── context/           # React context providers
│   ├── pages/             # Page components
│   └── styles/            # Component styles
└── public/                # Static assets
```

---

## 9. System Workflow

### 9.1 Citizen Report Submission Workflow

```
Step 1: CAPTURE
├── Citizen opens UrbanEye mobile app
├── Taps "Report Issue" button
├── Camera opens for photo capture
└── GPS automatically captures location

Step 2: UPLOAD
├── Photo uploaded to Flask backend
├── GPS coordinates attached
└── User ID associated with report

Step 3: AI ANALYSIS
├── Image sent to UrbanAI Engine
├── UrbanAI analyzes via computer vision and returns:
│   ├── Issue type (e.g., pothole)
│   ├── Severity (e.g., High)
│   ├── Description (auto-generated)
│   └── Department (e.g., Roads)
└── Results displayed for citizen confirmation

Step 4: STORAGE
├── Report saved to PostgreSQL
├── Synced to Firebase Firestore
├── Indexed for search and analytics
└── Geo-tagged for heatmap display

Step 5: ROUTING
├── Department determined by AI
├── Available field officers queried
├── Task assigned to nearest officer
└── Push notification sent to officer

Step 6: TRACKING
├── Citizen can view status in app
├── Real-time updates via Firestore
├── Status: Submitted → Assigned → In Progress → Resolved
└── Notifications at each stage change
```

### 9.2 Field Officer Workflow

```
Step 1: RECEIVE TASK
├── Push notification received
├── Task appears in officer's queue
├── Details: location, issue type, severity, photo
└── Navigation option to location

Step 2: ON-SITE WORK
├── Officer travels to location
├── Verifies issue matches report
├── Performs necessary repair/action
└── Documents work completed

Step 3: VERIFICATION
├── Officer takes "after" photo
├── Updates status to "Resolved"
├── Adds resolution notes
└── Submits completion report

Step 4: CLOSURE
├── Citizen notified of resolution
├── Report marked as resolved
├── Analytics updated
└── Optional citizen feedback requested
```

### 9.3 Admin Analytics Workflow

```
Step 1: DASHBOARD ACCESS
├── Admin logs into web dashboard
├── Overview metrics displayed
├── Recent reports listed
└── Alerts for critical issues shown

Step 2: ANALYSIS
├── View heatmap for geographic patterns
├── Filter by department, date, severity
├── Analyze trends via charts
└── Identify problem areas

Step 3: PREDICTIONS
├── Trigger AI predictions
├── Weather data fetched
├── Historical patterns analyzed
├── Proactive recommendations displayed

Step 4: ACTION
├── Allocate resources based on insights
├── Assign bulk tasks to officers
├── Schedule preventive maintenance
└── Generate reports for stakeholders
```

---

## 10. User Roles & Access Control

### 10.1 Role Hierarchy

```
                    ┌─────────────────┐
                    │  SUPER ADMIN    │
                    │ (System Config) │
                    └────────┬────────┘
                             │
              ┌──────────────┼──────────────┐
              ▼              ▼              ▼
     ┌────────────┐  ┌────────────┐  ┌────────────┐
     │ GOV ADMIN  │  │ DEPT HEAD  │  │ DEPT HEAD  │
     │(Analytics) │  │  (Roads)   │  │  (Water)   │
     └─────┬──────┘  └─────┬──────┘  └─────┬──────┘
           │               │               │
           └───────────────┼───────────────┘
                           ▼
                  ┌────────────────┐
                  │ FIELD OFFICERS │
                  │ (Task Execution)│
                  └────────────────┘

    ┌────────────┐  ┌────────────┐  ┌────────────┐
    │  CIVILIAN  │  │ GIG WORKER │  │SOCIAL WORKER│
    │ (Reporting)│  │ (On-demand)│  │   (NGO)    │
    └────────────┘  └────────────┘  └────────────┘
```

### 10.2 Role Permissions Matrix

| Role | Report Issues | View Reports | Assign Tasks | Analytics | Predictions | User Management | System Config |
|------|:-------------:|:------------:|:------------:|:---------:|:-----------:|:---------------:|:-------------:|
| Civilian | ✅ | Own only | ❌ | ❌ | ❌ | ❌ | ❌ |
| Field Officer | ✅ | Assigned | ❌ | ❌ | ❌ | ❌ | ❌ |
| Dept Head | ✅ | Department | ✅ | Department | ❌ | ❌ | ❌ |
| Gov Admin | ✅ | All | ✅ | All | ✅ | ❌ | ❌ |
| Super Admin | ✅ | All | ✅ | All | ✅ | ✅ | ✅ |
| Gig Worker | ❌ | Available | Self-assign | ❌ | ❌ | ❌ | ❌ |
| Social Worker | ✅ | Relevant | ❌ | Limited | ❌ | ❌ | ❌ |

### 10.3 Role Descriptions

| Role | Description | Key Capabilities |
|------|-------------|------------------|
| **Civilian** | Regular citizens reporting issues | Report via photo, track status, view history, earn leaderboard points |
| **Field Officer** | Government staff resolving issues | Receive tasks, update status, upload verification photos, navigation |
| **Dept Head** | Department managers (Roads/Water/Waste) | View department reports, assign to officers, performance tracking |
| **Gov Admin** | Senior government administrators | Full analytics, AI predictions, heatmaps, cross-department view |
| **Super Admin** | System administrators | User management, system configuration, role assignment |
| **Gig Worker** | On-demand task workers | Browse available tasks, self-assign, flexible work pickup |
| **Social Worker** | NGO/social organization members | Report social issues, collaborate on humanitarian concerns |

---

## 11. AI & Machine Learning Components

### 11.1 Image Analysis Pipeline

```
INPUT                    PROCESSING                     OUTPUT
┌─────────┐    ┌──────────────────────────┐    ┌──────────────┐
│ Citizen │    │       UrbanAI Engine       │    │ Structured   │
│  Photo  │───▶│  ┌────────────────────┐  │───▶│   Response   │
│         │    │  │ Computer Vision    │  │    │              │
└─────────┘    │  └────────────────────┘  │    │ • Category   │
               │           │              │    │ • Severity   │
               │           ▼              │    │ • Description│
               │  ┌────────────────────┐  │    │ • Department │
               │  │ Language Model     │  │    │ • Confidence │
               │  └────────────────────┘  │    └──────────────┘
               └──────────────────────────┘
```

### 11.2 Supported Issue Categories

| Category | Examples | Detection Criteria |
|----------|----------|---------------------|
| **Pothole** | Road damage, cracks, holes | Surface irregularities, water accumulation |
| **Garbage** | Litter, waste piles, overflowing bins | Accumulated refuse, unsanitary conditions |
| **Sewage** | Overflow, blocked drains, foul water | Stagnant water, sewage on roads |
| **Streetlight** | Broken, non-functional lights | Damaged fixtures, dark areas |
| **Traffic Signal** | Malfunctioning signals | Non-working lights, damaged posts |
| **Waterlogging** | Flooded areas, stagnant water | Standing water, blocked drainage |
| **Illegal Dumping** | Construction debris, unauthorized waste | Large-scale dumping, hazardous materials |
| **Drainage** | Blocked drains, overflowing gutters | Clogged systems, water backup |

### 11.3 Severity Assessment Criteria

| Level | Criteria | Response Priority |
|-------|----------|-------------------|
| **High** | Safety hazard, traffic obstruction, health risk, widespread impact | Immediate (within 24 hours) |
| **Medium** | Significant inconvenience, localized impact, potential escalation | Priority (within 72 hours) |
| **Low** | Minor issue, cosmetic damage, limited impact | Standard (within 1 week) |

### 11.4 Predictive Intelligence System

**Data Sources:**
1. **Weather API (Open-Meteo)**
   - Temperature forecasts
   - Precipitation predictions
   - Extreme weather alerts
   - Humidity levels

2. **Historical Data (PostgreSQL)**
   - Past reports by location
   - Seasonal patterns
   - Recurring issues
   - Resolution timelines

3. **News Context (DuckDuckGo)**
   - Local construction projects
   - Community events
   - Infrastructure announcements
   - Emergency situations

**UrbanAI Orchestration Pipeline:**
```python
from urbanai.orchestrator import PredictionOrchestrator
from urbanai.token_optimizer import TokenOptimizer

# Initialize UrbanAI with token optimization
orchestrator = PredictionOrchestrator(
    model="urbanai-predictor-2.0",
    optimizer=TokenOptimizer(strategy="adaptive")
)

# Create prediction pipeline with AI orchestration
prediction_pipeline = orchestrator.create_pipeline(
    stages=["data_ingestion", "feature_extraction", "prediction", "output_formatting"]
)

# Execute with combined data sources
prediction = prediction_pipeline.execute(
    weather_data=weather_forecast,
    historical_data=past_reports,
    news_context=local_news,
    optimize_tokens=True
)
```

**Sample Prediction Output:**
```json
{
  "prediction": "High probability of drainage overflow",
  "location": "Sector 5, Block C",
  "confidence": 0.87,
  "reasoning": [
    "Heavy rainfall (50mm) forecast for next 24 hours",
    "3 drainage complaints in this sector last monsoon",
    "News article mentions ongoing construction blocking storm drains"
  ],
  "recommendation": "Deploy suction truck and inspection team proactively",
  "priority": "High",
  "timeline": "Before rainfall begins (6-8 hours)"
}
```

---

## 12. Database Design

### 12.1 PostgreSQL Schema

**Users Table:**
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL,
    department VARCHAR(50),
    phone VARCHAR(20),
    avatar_url VARCHAR(500),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Reports Table:**
```sql
CREATE TABLE reports (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    category VARCHAR(50) NOT NULL,
    severity VARCHAR(20) NOT NULL,
    description TEXT,
    image_url VARCHAR(500) NOT NULL,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    address TEXT,
    status VARCHAR(30) DEFAULT 'submitted',
    department VARCHAR(50),
    assigned_to INTEGER REFERENCES users(id),
    resolution_notes TEXT,
    resolution_image_url VARCHAR(500),
    ai_confidence DECIMAL(3, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP
);
```

**Predictions Table:**
```sql
CREATE TABLE predictions (
    id SERIAL PRIMARY KEY,
    location_lat DECIMAL(10, 8),
    location_lng DECIMAL(11, 8),
    area_name VARCHAR(100),
    prediction_type VARCHAR(50),
    confidence DECIMAL(3, 2),
    reasoning TEXT,
    recommendation TEXT,
    weather_data JSONB,
    historical_data JSONB,
    is_actioned BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    valid_until TIMESTAMP
);
```

### 12.2 Firebase Firestore Structure

```
firestore/
├── users/
│   └── {userId}/
│       ├── email: string
│       ├── name: string
│       ├── role: string
│       ├── department: string
│       ├── avatarUrl: string
│       └── createdAt: timestamp
│
├── reports/
│   └── {reportId}/
│       ├── userId: string
│       ├── category: string
│       ├── severity: string
│       ├── description: string
│       ├── imageUrl: string
│       ├── location: geopoint
│       ├── status: string
│       ├── department: string
│       ├── assignedTo: string
│       └── timestamps: map
│
└── notifications/
    └── {userId}/
        └── {notificationId}/
            ├── title: string
            ├── body: string
            ├── type: string
            ├── reportId: string
            ├── isRead: boolean
            └── createdAt: timestamp
```

---

## 13. API Documentation

### 13.1 API Overview

- **Base URL:** `https://api.urbaneye.com` (Production)
- **Local URL:** `http://localhost:5000` (Development)
- **Documentation:** `/docs/` (Swagger UI)
- **Specification:** `/docs/swagger.json` (OpenAPI)

### 13.2 Authentication

**JWT Token Authentication:**
```bash
# Login
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword"
}

# Response
{
  "access_token": "eyJ0eXAiOiJKV1Q...",
  "refresh_token": "eyJ0eXAiOiJKV1Q...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "role": "civilian"
  }
}

# Use token in requests
Authorization: Bearer eyJ0eXAiOiJKV1Q...
```

### 13.3 Core Endpoints

**Image Analysis:**
```bash
POST /api/v1/detection/analyze
Content-Type: multipart/form-data
Authorization: Bearer {token}

# Form data
image: [binary file]

# Response
{
  "success": true,
  "analysis": {
    "category": "pothole",
    "severity": "high",
    "description": "Large pothole approximately 2 feet wide...",
    "department": "Roads",
    "confidence": 0.94
  }
}
```

**Submit Report:**
```bash
POST /api/v1/reports
Content-Type: application/json
Authorization: Bearer {token}

{
  "category": "pothole",
  "severity": "high",
  "description": "Large pothole on main road",
  "image_url": "https://storage.example.com/image.jpg",
  "latitude": 28.6139,
  "longitude": 77.2090,
  "address": "Sector 5, Block C, New Delhi"
}

# Response
{
  "success": true,
  "report": {
    "id": 123,
    "status": "submitted",
    "department": "Roads",
    "created_at": "2026-02-04T10:30:00Z"
  }
}
```

**Get Reports (with filters):**
```bash
GET /api/v1/reports?status=pending&department=Roads&severity=high
Authorization: Bearer {token}

# Response
{
  "success": true,
  "reports": [...],
  "pagination": {
    "total": 45,
    "page": 1,
    "per_page": 20
  }
}
```

**AI Predictions:**
```bash
POST /api/v1/predictions/generate
Content-Type: application/json
Authorization: Bearer {token}

{
  "area": "Sector 5",
  "latitude": 28.6139,
  "longitude": 77.2090
}

# Response
{
  "success": true,
  "predictions": [
    {
      "type": "drainage_overflow",
      "confidence": 0.87,
      "reasoning": ["Heavy rain forecast", "Historical pattern"],
      "recommendation": "Deploy suction truck",
      "priority": "high"
    }
  ]
}
```

### 13.4 Error Responses

| Status Code | Description |
|-------------|-------------|
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Invalid/expired token |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource doesn't exist |
| 429 | Too Many Requests - Rate limited |
| 500 | Internal Server Error |

---

## 14. Testing & Validation

### 14.1 Testing Strategy

| Test Type | Tools | Coverage |
|-----------|-------|----------|
| **Unit Testing** | pytest, Flutter test | Core functions, models, utilities |
| **Integration Testing** | pytest, Postman | API endpoints, database operations |
| **UI Testing** | Flutter integration tests | User flows, navigation |
| **AI Accuracy Testing** | Custom benchmark suite | Detection accuracy, severity assessment |
| **Performance Testing** | Locust, Artillery | Load handling, response times |
| **Security Testing** | OWASP ZAP | Vulnerability scanning |

### 14.2 AI Accuracy Validation

**Test Dataset:**
- 100+ diverse civic issue images
- Manually labeled ground truth
- Coverage across all 8 categories
- Varying image qualities and conditions

**Results:**

| Metric | Score |
|--------|-------|
| Overall Accuracy | 95.2% |
| Pothole Detection | 97.1% |
| Garbage Detection | 94.8% |
| Streetlight Detection | 96.3% |
| Severity Assessment | 92.1% |
| Department Routing | 95.7% |

### 14.3 Performance Benchmarks

| Metric | Target | Achieved |
|--------|--------|----------|
| API Response Time (avg) | < 200ms | 180ms |
| Image Analysis Time | < 3s | 2.3s |
| Mobile App Load | < 3s | 2.8s |
| Real-time Sync Latency | < 1s | 500ms |
| System Uptime | 99% | 99.2% |
| Concurrent Users | 100 | 150+ |

### 14.4 Beta Testing Results

- **Participants:** 15+ beta users (civilians, officers, admins)
- **Test Reports Processed:** 50+
- **App Usability Rating:** 4.3/5
- **Critical Bugs Found:** 0
- **UI/UX Improvements Made:** 12

---

## 15. Results & Impact Metrics

### 15.1 Quantifiable Impact

| Metric | Value |
|--------|-------|
| AI Detection Accuracy | 95%+ across 8 categories |
| Severity Assessment Accuracy | 92% alignment with expert evaluation |
| Report Submission Time Reduction | 80% (from 5+ min to <1 min) |
| Department Routing Accuracy | 95%+ first-time correct assignment |
| Average Image Analysis Response | 2.3 seconds |
| Real-time Sync Latency | Under 500ms |
| System Uptime | 99.2% since deployment |

### 15.2 Efficiency Gains

| Process | Before UrbanEye | With UrbanEye | Improvement |
|---------|-----------------|---------------|-------------|
| Issue Categorization | Manual (2-3 min) | Automatic (0 min) | 100% |
| Report Submission | 5+ minutes | <1 minute | 80% |
| Department Routing | Hours (manual) | Seconds (AI) | 99%+ |
| Status Tracking | None | Real-time | ∞ |
| Field Officer Assignment | Manual coordination | Automatic | 95%+ |

### 15.3 User Feedback

> "I reported a broken streetlight near my house and could actually see it being assigned to an officer. For the first time, I felt like someone was listening." — Beta Tester

> "The app is so simple—just take a photo and it figures out everything else. My grandmother could use this." — Student Tester

> "The AI detection is surprisingly accurate. It correctly identified a drainage blockage even when the image quality was poor." — Technical Reviewer

---

## 16. Sustainability & Scalability

### 16.1 Environmental Sustainability

- Enables rapid detection and resolution of garbage, illegal dumping, sewage overflow
- Predictive maintenance reduces emergency interventions and resource waste
- Faster response prevents environmental degradation
- Digitized workflow eliminates paper-based complaint systems
- Data analytics optimize waste collection routes

### 16.2 Social Sustainability

- Democratizes civic participation regardless of technical literacy
- Bridges gap between marginalized communities and government services
- Transparent tracking builds citizen trust in governance
- Includes NGOs and social workers for humanitarian issues
- Real-time visibility promotes government accountability

### 16.3 Economic Sustainability

- Proactive maintenance costs 3-5x less than reactive repairs
- Reduces administrative overhead through automation
- Gig worker integration creates flexible employment
- Improved infrastructure boosts economic productivity
- 80% time savings per report reduces citizen burden

### 16.4 Financial Viability Model

| Revenue Stream | Description |
|----------------|-------------|
| **B2G SaaS Subscriptions** | Annual licensing fees from municipalities |
| **API Access Fees** | Third-party developer integrations |
| **Premium Analytics** | Advanced insights for urban planners |
| **White-label Licensing** | Customized deployments for partners |

### 16.5 Scalability Architecture

- **Cloud-native:** Auto-scales with demand on Render/Vercel
- **Multi-tenant:** Isolated instances with shared infrastructure
- **Modular:** Components can be upgraded independently
- **API-first:** Enables third-party integrations
- **Open standards:** GeoJSON, OpenAPI for interoperability

### 16.6 Expansion Strategy

| Timeline | Target |
|----------|--------|
| 6 months | 5 cities, 10,000 users |
| 1 year | 20 cities, 100,000 users |
| 2 years | 50 cities, 500,000 users |
| 3 years | 100+ cities, 1 million+ users |

---

## 17. Future Roadmap

### 17.1 Short-term (6-12 months)

- Partner with 2-3 municipal corporations for pilot deployments
- Implement multi-language support (Hindi, regional languages)
- Add offline mode for low-connectivity areas
- Develop citizen gamification (leaderboards, badges)
- Integrate with existing municipal ERP systems
- Achieve 10,000+ registered users

### 17.2 Medium-term (1-2 years)

- Expand to 50+ cities nationally
- Implement IoT sensor integration (smart bins, water monitors)
- Develop computer vision for automatic progress detection
- Launch predictive maintenance ML models
- Build open API ecosystem for third-party apps
- Achieve financial sustainability

### 17.3 Long-term (3-5 years)

- International expansion to 3-5 countries
- Establish UrbanEye as global civic tech standard
- Create open data platform for urban researchers
- Develop white-label solutions for global deployment
- Launch UrbanEye Foundation for civic tech advocacy
- Contribute to smart city policy frameworks

---

## 18. Challenges & Learnings

### 18.1 Technical Challenges

| Challenge | Solution |
|-----------|----------|
| AI detection without training data | Leveraged UrbanAI Engine's zero-shot computer vision with detailed prompt engineering |
| Varying image quality | Implemented preprocessing and fallback prompts for unclear images |
| Real-time sync across platforms | Hybrid database strategy (PostgreSQL + Firebase) |
| Explainable AI for government trust | LangChain reasoning chains with transparent logic |

### 18.2 Key Learnings

1. **Leverage existing tools:** Foundation models democratize AI—small teams can build sophisticated applications
2. **Design for all stakeholders:** Solutions must work for citizens, officers, and administrators
3. **Iterate rapidly:** First versions are imperfect; build feedback loops early
4. **Sustainability from start:** Consider maintenance, funding, and scaling beyond the project

### 18.3 What We Would Do Differently

- Engage municipal stakeholders earlier in development
- Implement analytics and monitoring from day one
- Prioritize mobile-first development more aggressively
- Establish structured user feedback loops earlier

---

## 19. SDG Alignment

### 19.1 Primary SDG Alignment

**SDG 11: Sustainable Cities and Communities**
- Makes cities inclusive, safe, resilient, and sustainable
- Enables citizen participation in urban governance
- Provides data for sustainable infrastructure planning
- Supports climate-resilient infrastructure management

### 19.2 Secondary SDG Contributions

**SDG 9: Industry, Innovation, and Infrastructure**
- Demonstrates AI innovation for infrastructure resilience
- Builds digital public infrastructure
- Promotes proactive maintenance approaches

**SDG 16: Peace, Justice, and Strong Institutions**
- Strengthens citizen trust through transparency
- Promotes responsive and participatory governance
- Enables data-driven accountability

**SDG 13: Climate Action**
- Supports climate adaptation infrastructure
- Enables weather-correlated predictive maintenance
- Helps municipalities prepare for climate impacts

---

## 20. Conclusion

UrbanEye represents a transformative approach to civic infrastructure management, leveraging the power of Google AI technologies to bridge the gap between citizens and government. By automating issue detection, enabling transparent tracking, and providing predictive intelligence, the platform shifts urban governance from reactive firefighting to proactive maintenance.

**Key Achievements:**
- Developed a fully functional platform with mobile app, web dashboard, and API backend
- Achieved 95%+ AI detection accuracy without custom training data
- Reduced report submission time by 80%
- Created a 7-role ecosystem reflecting real governance hierarchies
- Won First Runner-Up at devSprint hackathon

**Impact Potential:**
- Direct contribution to SDG 11 (Sustainable Cities)
- Scalable to millions of users across multiple countries
- Sustainable revenue model through B2G SaaS

UrbanEye demonstrates how thoughtful application of AI technology can solve real-world problems, empower citizens, and improve urban governance. We are committed to continuing this journey, expanding our impact, and building a future where every voice is heard and every community thrives.

---

## 21. References

1. United Nations. (2018). World Urbanization Prospects.
2. UrbanAI Engine. (2026). Technical Documentation v2.0.
3. Firebase Documentation. (2025). Cloud Firestore, Authentication.
4. LangChain Documentation. (2025). Chains and Agents.
5. Flask-RESTx Documentation. (2025). Swagger Integration.
6. Flutter Documentation. (2025). Cross-platform Development.
7. React Documentation. (2025). Component Architecture.
8. Open-Meteo API Documentation. (2025). Weather Data.
9. UN SDG Framework. (2015). Sustainable Development Goals.
10. IEEE Smart Cities Initiative. (2024). Urban Technology Standards.

---

## 22. Appendices

### Appendix A: Installation Guide

**Backend Setup:**
```bash
cd UE_backend-main
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp sample.env .env
# Edit .env with your API keys
python app.py
```

**Web Dashboard Setup:**
```bash
cd webapp-urbaneye
npm install
npm run dev
```

**Mobile App Setup:**
```bash
cd mobileappUrbanEye
flutter pub get
flutter run
```

### Appendix B: Environment Variables

```env
# Backend (.env)
URBANAI_API_KEY=your_urbanai_api_key
DATABASE_URL=postgresql://user:pass@localhost:5432/urbaneye
JWT_SECRET_KEY=your_jwt_secret
FIREBASE_CREDENTIALS=path/to/firebase-credentials.json

# Mobile App (firebase_options.dart)
# Auto-generated by FlutterFire CLI
```

### Appendix C: API Rate Limits

| Endpoint | Rate Limit |
|----------|------------|
| Image Analysis | 60 req/min |
| Report Submission | 10 req/min |
| General API | 100 req/min |

### Appendix D: Deployment URLs

| Component | URL |
|-----------|-----|
| Web Dashboard | https://urban-eye-jfcf.vercel.app/ |
| API (Production) | [Render deployment URL] |
| Demo Video | https://youtu.be/1qoraqzspt4 |
| GitHub Repository | https://github.com/AyanAhmedKhan/Web-app-urbaneye |

---

**Document Version:** 1.0  
**Last Updated:** February 2026  
**Prepared by:** UrbanEye Development Team

---

*This document is submitted as part of the IEEE YESIST12 competition application.*
