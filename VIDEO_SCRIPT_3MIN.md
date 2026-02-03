# UrbanEye - Complete Video Script (3+ Minutes)
## Full Explanation: Roles, Dashboards, Frontend & Backend

---

# PART 1: INTRODUCTION (0:00 - 0:30)

**[Visual: UrbanEye logo animation with smart city background]**

**Narrator:**
"Every day, cities face thousands of unreported infrastructure problems – potholes damaging vehicles, broken streetlights creating safety hazards, garbage piling up in neighborhoods.

Welcome to **UrbanEye** – an AI-powered civic infrastructure intelligence platform that connects citizens, field workers, and government administrators in one seamless ecosystem.

Let's explore how every piece of this system works together."

---

# PART 2: SYSTEM ARCHITECTURE (0:30 - 1:00)

**[Visual: Architecture diagram showing 3 tiers]**

**Narrator:**
"UrbanEye operates on a three-tier architecture:

**Tier 1 - Mobile App**: Built with Flutter, our cross-platform app lets citizens report issues from Android or iOS devices.

**Tier 2 - Web Dashboard**: A React-based admin portal gives government officials real-time visibility into city-wide problems.

**Tier 3 - Backend API**: A Flask REST API serves as the brain – handling AI analysis, authentication, database operations, and predictive intelligence.

All three components communicate through secure API endpoints, with PostgreSQL storing all data persistently."

---

# PART 3: USER ROLES (1:00 - 2:00)

**[Visual: Role hierarchy diagram with 6 user types]**

**Narrator:**
"UrbanEye supports **six distinct user roles**, each with specific permissions:

---

### 1. CIVILIAN (Citizens)
**[Visual: Show Flutter app - Civilian Dashboard]**

"Citizens are the eyes and ears of the city. Through the mobile app, they can:
- **Report Issues**: Snap a photo, and our Gemini AI automatically categorizes it
- **Track Progress**: See real-time status updates on their reports
- **View Heatmaps**: Explore a live map showing issues across their neighborhood
- **Community Leaderboard**: Earn points for reporting – gamifying civic participation
- **Book Services**: Schedule express or premium repair services, Urban Company style"

---

### 2. SOCIAL WORKER (NGO/Private/Government Workers)
**[Visual: Show Flutter app - Social Worker Dashboard]**

"Social workers bridge the gap between citizens and solutions. They see:
- **Pending Requests**: Issues assigned to their category (government, NGO, or private)
- **Priority Indicators**: High, medium, or low urgency markers
- **Budget & Timeline**: Estimated costs and completion times
- **Quick Actions**: Accept, update, or escalate requests
- **Leaderboard**: Track their contribution alongside peers"

---

### 3. FIELD OFFICER (Ground Staff)
**[Visual: Show React Dashboard - Field Officer View]**

"Field officers are the boots on the ground. Their streamlined dashboard shows:
- **My Tasks**: Only issues assigned to them – no clutter
- **Location Data**: GPS coordinates and addresses
- **Status Updates**: Mark tasks as 'In Progress' or 'Resolved'
- **Proof Uploads**: Capture before/after photos for verification
- **History**: Track their completed work for accountability"

---

### 4. DEPARTMENT HEAD
**[Visual: Show React Dashboard - Department Head View]**

"Department heads manage their teams. They control:
- **Department Reports**: Only issues routed to Roads, Water, Waste, or Electrical
- **Team Management**: View all field officers in their department
- **Assignment Power**: Assign specific reports to specific officers
- **Analytics**: Track resolution rates and pending backlogs"

---

### 5. GOVERNMENT ADMIN
**[Visual: Show React Dashboard - Gov Admin View with full analytics]**

"Government admins get the complete city picture:
- **Citywide Statistics**: Total reports, resolved, pending, in-progress
- **Interactive Heatmap**: Zoom into hotspots with clustered issue markers
- **Multi-Chart Analytics**: Pie charts, bar graphs, area trends by category, severity, and department
- **AI Predictions**: Weather-correlated failure forecasting
- **Team Management**: Add department heads, field officers – full staff control
- **PR Generator**: AI-generated public relations statements for resolved issues"

---

### 6. SUPER ADMIN (System Owner)
**[Visual: Show React Dashboard - Super Admin with seeder tools]**

"Super admins have god-mode access:
- **All Gov Admin Features** plus...
- **User Management**: Create any role, update credentials, manage all users
- **Database Seeder**: Generate test data for Delhi, Gwalior, or Canberra
- **Secret API Access**: Protected endpoints for system configuration
- **Cross-City Analytics**: Filter and compare data across multiple cities"

---

# PART 4: FRONTEND DEEP-DIVE (2:00 - 2:45)

**[Visual: Split screen - Flutter app & React dashboard]**

**Narrator:**
"Let's explore the frontends:

### FLUTTER MOBILE APP
**[Visual: App screens scrolling]**

- **Animated UI**: Smooth glassmorphic design with floating particle backgrounds
- **Bottom Navigation**: Dashboard, Leaderboard, Community, My Reports
- **Report Issue Flow**: Camera → AI Analysis → Auto-fill form → Submit with location
- **Firebase Integration**: Authentication, real-time sync, push notifications
- **Offline Support**: Queue reports when disconnected

### REACT WEB DASHBOARD  
**[Visual: Dashboard with charts and maps]**

- **Role-Based Routing**: Different components load based on user role
- **Leaflet Maps**: Interactive heatmap with OpenStreetMap tiles
- **Recharts Analytics**: Pie charts, bar graphs, area charts, radial gauges
- **Framer Motion**: Silky animations and transitions
- **Responsive Sidebar**: Collapsible navigation for desktop and mobile"

---

# PART 5: BACKEND DEEP-DIVE (2:45 - 3:30)

**[Visual: Code architecture diagram with API endpoints]**

**Narrator:**
"The Flask backend is the powerhouse:

### CORE TECHNOLOGIES
- **Flask + Flask-RESTX**: Swagger-documented REST API at `/docs/`
- **PostgreSQL + SQLAlchemy**: Robust ORM with connection pooling
- **Google Gemini 2.5 Flash**: Multi-modal AI for image analysis
- **LangChain + Pydantic**: Structured AI outputs for predictions
- **JWT Authentication**: Secure token-based access control

### KEY API NAMESPACES
```
/api/v1/health     → System health checks
/api/v1/detection  → AI image analysis
/api/v1/reports    → CRUD for civic issues
/api/v1/auth       → Login, signup, Google OAuth
/api/v1/bookings   → Urban Company-style service bookings
/api/v1/ngo        → NGO help request management
/api/v1/gov        → Government staff management
/api/v1/gig        → Gig worker job assignments
/api/v1/hr         → HRMS: Attendance, Payroll, Candidates
```

### DATABASE MODELS
**[Visual: ER diagram]**

- **User**: Stores all roles with department assignments
- **Report**: Issues with geo-coordinates, severity, status lifecycle
- **ReportLog**: Complete audit trail of every status change
- **Worker**: Gig/NGO/MCD workers with skills and availability
- **Job**: Links reports to workers for task management
- **Booking**: Service requests with payment status and ETA
- **NGORequest**: Large-scale community help requests
- **EmployeeProfile**: Designation, salary, bank details
- **Attendance**: Daily check-in/check-out tracking
- **Payroll**: Monthly salary calculations with deductions

### AI PIPELINE
**[Visual: Flowchart of image → Gemini → category → department]**

1. Image uploaded via API
2. Sent to Gemini with specialized civic detection prompt
3. Returns: category, description, severity, bounding box
4. Backend auto-assigns department (Roads/Water/Waste/Electrical)
5. Creates report with initial log entry
6. Pushes to dashboard in real-time

### PREDICTIVE INTELLIGENCE
**[Visual: Weather + history → predictions]**

- Fetches Open-Meteo weather data (rainfall, temperature)
- Uses DuckDuckGo search for local infrastructure news
- LangChain chains historical patterns with live data
- Generates predictions: location, risk %, estimated repair cost
- Admins can one-click convert predictions to tickets"

---

# PART 6: SECURITY & DEPLOYMENT (3:30 - 3:50)

**[Visual: Security badges and cloud icons]**

**Narrator:**
"Enterprise-grade security:

- **JWT Tokens**: 24-hour expiry with role-based claims
- **RBAC Decorators**: `@role_required('dept_head')` blocks unauthorized access
- **Password Hashing**: bcrypt for secure storage
- **CORS Configured**: Whitelist for Flutter and React origins
- **Connection Pooling**: 10 active connections, 20 overflow, auto-reconnect
- **API Key Rotation**: Multiple Gemini keys with automatic failover on quota errors

### DEPLOYMENT READY
- **Render**: Direct deployment with `render.yaml`
- **Docker**: Containerized for Kubernetes
- **Environment Variables**: Secure secrets via `.env`"

---

# PART 7: USER JOURNEY WALKTHROUGH (3:50 - 4:15)

**[Visual: Animated user journey flow]**

**Narrator:**
"Here's how a pothole gets fixed:

1. **Citizen** spots a pothole → Opens app → Snaps photo
2. **Gemini AI** analyzes → Detects 'pothole', severity 'high'
3. **Backend** creates report → Routes to 'Roads' department
4. **Dept Head** sees new issue → Assigns to **Field Officer**
5. **Field Officer** receives task → Travels to location → Fixes pothole
6. **Field Officer** uploads proof photo → Marks 'Resolved'
7. **Citizen** gets notification → Rates experience
8. **Gov Admin** sees resolution reflected in analytics"

---

# PART 8: IMPACT & CLOSING (4:15 - 4:30)

**[Visual: Before/after city shots + statistics]**

**Narrator:**
"UrbanEye transforms how cities operate:

✓ **Faster Response Times**: AI routing eliminates manual triage  
✓ **Transparency**: Citizens track every status update  
✓ **Data-Driven Decisions**: Predictive analytics prevent failures  
✓ **Engaged Communities**: Gamification drives participation  
✓ **Scalable**: From neighborhoods to entire metropolitan areas

**UrbanEye** – Building smarter, more resilient cities. Together."

**[Visual: Logo + GitHub links fade in]**

---

# QUICK REFERENCE: ROLE-DASHBOARD MATRIX

| Role | Platform | Key Features |
|------|----------|--------------|
| **Civilian** | Flutter App | Report issues, track status, leaderboard, book services |
| **Social Worker** | Flutter App | View assigned requests, accept/reject, update status |
| **Field Officer** | React Web | My tasks, resolve issues, upload proof |
| **Dept Head** | React Web | Department reports, assign officers, team management |
| **Gov Admin** | React Web | All reports, heatmap, analytics, predictions, staff mgmt |
| **Super Admin** | React Web | All above + user CRUD, database seeder, secret APIs |

---

# TECH STACK SUMMARY

| Layer | Technology |
|-------|------------|
| Mobile Frontend | Flutter + Dart + Firebase |
| Web Frontend | React + Vite + Tailwind + Recharts + Leaflet |
| Backend | Flask + Flask-RESTX + SQLAlchemy |
| Database | PostgreSQL (Render) / SQLite (Local) |
| AI | Google Gemini 2.5 Flash + LangChain |
| Auth | JWT + bcrypt + Google OAuth |
| Deployment | Render / Docker |

---

**Total Duration**: ~4:30 (can trim to 3:00 by condensing role section)  
**Tone**: Professional, informative, engaging  
**Audience**: Stakeholders, investors, developers, government officials
