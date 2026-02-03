# UrbanEye - Complete Pitch Script
## Role-Wise Explanation → Features → Technology Deep-Dive

---

# OPENING: THE VISION (1 minute)

**[Visual: Montage of urban problems - potholes, garbage, broken lights, flooding]**

**Narrator:**
"Every city faces the same challenge: infrastructure problems that go unreported, misrouted, or forgotten. Citizens don't know who to call. Government departments work in silos. Field workers lack visibility.

**UrbanEye** changes everything.

We've built an AI-powered civic intelligence platform that connects every stakeholder in the urban ecosystem – from the citizen who spots a pothole to the field officer who fixes it, and every administrator in between.

Let's walk through how each role experiences UrbanEye."

---

---

# PART 1: ROLE-WISE EXPLANATION

---

## ROLE 1: CIVILIAN (Citizens)

**[Visual: Flutter mobile app screens - dashboard, report issue, my reports]**

**Narrator:**
"Citizens are the foundation of UrbanEye. They're the eyes and ears of the city."

### Platform: Flutter Mobile App (Android & iOS)

### Dashboard Home
**[Visual: Animated civilian dashboard with floating particles]**

"When a civilian logs in, they see a beautifuls, animated dashboard with:
- **Quick Stats**: How many issues they've reported, how many resolved
- **City Pulse**: Live activity feed showing recent reports nearby
- **Action Buttons**: Report Issue, View Map, Check Leaderboard"

---

### Feature 1: Report an Issue (AI-Powered)
**[Visual: Camera opens → Photo taken → AI analyzing → Form auto-filled]**

"Reporting is effortless:

1. **Tap 'Report Issue'** → Camera opens
2. **Snap a photo** of the problem (pothole, garbage, broken light)
3. **AI Analyzes Instantly** → Google Gemini Vision identifies:
   - Issue type (pothole, garbage, sewage, etc.)
   - Severity (low/medium/high)
   - Detailed description
4. **Form Auto-Fills** → Citizen just confirms and submits
5. **GPS Auto-Tags** → Exact location captured automatically

No typing. No guessing which department to contact. Just point and shoot."

---

### Feature 2: Track My Reports
**[Visual: My Reports page with status timeline]**

"Citizens can track every report they've submitted:

- **Status Updates**: Open → Assigned → In Progress → Resolved
- **Timeline View**: See exactly when each status change happened
- **Who's Working On It**: Field officer name visible once assigned
- **Push Notifications**: Get alerted when status changes"

---

### Feature 3: Interactive Heatmap
**[Visual: Map with colored markers - red, orange, green]**

"Citizens can explore their neighborhood:

- **Live Issue Map**: See all reported problems nearby
- **Color-Coded Markers**:
  - 🔴 Red = High severity / Unresolved
  - 🟠 Orange = Medium / In Progress
  - 🟢 Green = Low / Resolved
- **Tap for Details**: Each marker shows category, description, report date"

---

### Feature 4: Community Leaderboard
**[Visual: Leaderboard with ranks, names, XP points]**

"We gamify civic participation:

- **Earn XP**: 5 points per report submitted
- **Climb the Ranks**: Top reporters get featured
- **Monthly Rewards**: Recognition for most active citizens
- **Healthy Competition**: Encourages consistent reporting"

---

### Feature 5: Book Services (Urban Company Style)
**[Visual: Service booking flow - select service, choose time, confirm]**

"For faster resolution, citizens can book professional help:

- **Express Service**: Same-day repair booking
- **Premium Service**: Verified contractors with guarantees
- **Choose Time Slot**: Morning, evening, or custom
- **Track Worker**: Real-time ETA and arrival updates
- **Secure Payment**: Pay after job completion"

---

### Feature 6: Request NGO Help
**[Visual: NGO request form with categories]**

"For large-scale community issues:

- **Categories**: Environment, Animal Welfare, Sanitation, Community
- **Scale Selection**: Small, Medium, Large
- **Auto-Match NGO**: System finds the right organization
- **Track Progress**: Updates from assigned NGO"

---

### Civilian Summary

| Feature | Description |
|---------|-------------|
| AI Photo Report | Snap → Auto-categorize → Submit |
| My Reports | Full lifecycle tracking |
| Heatmap | Neighborhood issue visualization |
| Leaderboard | Gamified participation |
| Book Services | On-demand repair booking |
| NGO Requests | Community-scale help |

---

---

## ROLE 2: SOCIAL WORKER (NGO / Private Contractor / Government Worker)

**[Visual: Flutter app - Social Worker Dashboard]**

**Narrator:**
"Social workers are the bridge between citizens and solutions. They can be:
- **Government Workers**: Municipal employees
- **NGO Workers**: Volunteers from partner organizations
- **Private Contractors**: Verified service providers"

### Platform: Flutter Mobile App

### Dashboard Overview
**[Visual: Social worker dashboard with stats cards]**

"Social workers see a specialized dashboard with:
- **Pending Requests**: Issues assigned to their category
- **Stats Cards**: Total tasks, completed, in progress
- **Priority Badges**: High/Medium/Low markers
- **Quick Actions**: Accept, Reject, Update"

---

### Feature 1: View Assigned Requests
**[Visual: List of request cards with details]**

"Each request card shows:
- **Request ID**: Unique identifier
- **Title**: Quick summary (e.g., 'Pothole Repair Needed')
- **Location**: Address and map link
- **Priority Level**: Visual indicator
- **Time Posted**: How long ago
- **Category**: Road Maintenance, Waste, etc.
- **Estimated Budget**: Approximate cost
- **Estimated Time**: Days to complete"

---

### Feature 2: Accept or Decline Jobs
**[Visual: Accept/Decline buttons with confirmation]**

"Workers can:
- **Accept**: Takes ownership of the request
- **Decline**: Passes to another worker with reason
- **View Details**: Full description, images, citizen info"

---

### Feature 3: Update Status & Add Notes
**[Visual: Status update dropdown + notes field]**

"Once accepted:
- **Update Status**: In Progress → Completed
- **Add Notes**: Progress updates visible to citizen
- **Upload Proof**: Before/after photos
- **Request Resources**: Flag if additional help needed"

---

### Feature 4: Worker Leaderboard
**[Visual: Leaderboard with worker rankings]**

"Performance tracking:
- **Jobs Completed**: Total count
- **Rating**: Average citizen satisfaction
- **Response Time**: How fast they accept jobs
- **Monthly Recognition**: Top performers highlighted"

---

### Feature 5: Quick Actions Menu
**[Visual: Quick action buttons grid]**

"Fast access to:
- Navigate to Location (opens maps)
- Call Citizen (if permission granted)
- Report Blocker (flag issues)
- Complete Task (with photo proof)"

---

### Social Worker Summary

| Feature | Description |
|---------|-------------|
| Request Queue | View all assigned jobs |
| Accept/Decline | Take ownership or pass |
| Status Updates | Real-time progress tracking |
| Proof Upload | Before/after documentation |
| Leaderboard | Performance recognition |

---

---

## ROLE 3: FIELD OFFICER (Government Ground Staff)

**[Visual: React web dashboard - Field Officer view]**

**Narrator:**
"Field officers are government employees who handle on-ground repairs. They work within their assigned department."

### Platform: React Web Dashboard

### Dashboard Overview
**[Visual: Clean, focused task list]**

"Field officers see a streamlined interface:
- **My Tasks**: Only issues assigned to them
- **No Clutter**: No analytics, no city-wide data
- **Focus Mode**: Just what they need to do their job"

---

### Feature 1: Task List
**[Visual: Task cards with location pins]**

"Each task shows:
- **Issue Category**: Pothole, Streetlight, Drainage
- **Location**: Address with map preview
- **Severity**: High (red), Medium (orange), Low (green)
- **Assigned Date**: When they received the task
- **Deadline**: Expected resolution time"

---

### Feature 2: Update Task Status
**[Visual: Status dropdown - Accepted, In Progress, Resolved]**

"Officers can update status:
- **Accepted**: Acknowledged the assignment
- **In Progress**: Work has started
- **Resolved**: Job complete

Each update is logged with timestamp and officer ID."

---

### Feature 3: Upload Resolution Proof
**[Visual: Camera icon + upload button]**

"Proof of work:
- **Before Photo**: Automatically attached from report
- **After Photo**: Officer uploads completion proof
- **Verification**: Admin can compare before/after
- **Audit Trail**: Everything documented"

---

### Feature 4: History Tab
**[Visual: Completed tasks archive]**

"View past work:
- **Completed Tasks**: Full archive
- **Performance Metrics**: Resolution time averages
- **Ratings**: Citizen feedback (if enabled)"

---

### Field Officer Summary

| Feature | Description |
|---------|-------------|
| My Tasks | Focused assignment list |
| Status Updates | In Progress → Resolved |
| Proof Upload | Before/after photos |
| History | Completed work archive |

---

---

## ROLE 4: DEPARTMENT HEAD

**[Visual: React web dashboard - Dept Head view]**

**Narrator:**
"Department heads manage their teams and their department's reports. They have visibility only within their assigned department – Roads, Water, Waste, or Electrical."

### Platform: React Web Dashboard

### Dashboard Overview
**[Visual: Department-filtered dashboard]**

"Department heads see:
- **Department Stats**: Total, resolved, pending, in progress
- **Team Members**: All field officers in their department
- **Filtered Reports**: Only issues for their department"

---

### Feature 1: View Department Reports
**[Visual: Report list with department filter already applied]**

"All reports auto-filtered:
- If Dept Head is 'Roads' → Only sees potholes, sidewalks, traffic signals
- If Dept Head is 'Water' → Only sees drainage, sewage, waterlogging
- No access to other departments' data"

---

### Feature 2: Assign Reports to Officers
**[Visual: Assign modal - select officer dropdown]**

"Dispatch work:
1. **Select Report** from queue
2. **Click 'Assign'**
3. **Choose Field Officer** from dropdown
4. **Confirm** → Officer receives notification

Report status auto-updates to 'Assigned'."

---

### Feature 3: Manage Field Team
**[Visual: Team list with officer profiles]**

"Team management:
- **View All Officers**: Name, contact, current workload
- **Active Tasks**: How many jobs each officer has
- **Availability**: Who's free for new assignments
- **Performance**: Resolution rates per officer"

---

### Feature 4: Department Analytics
**[Visual: Charts showing department performance]**

"Track department health:
- **Resolution Rate**: % of issues resolved
- **Average Resolution Time**: Days to fix
- **Backlog**: Pending issues count
- **Trends**: Week-over-week comparison"

---

### Department Head Summary

| Feature | Description |
|---------|-------------|
| Department Reports | Auto-filtered by department |
| Assign Officers | Dispatch work to team |
| Team Management | View and manage officers |
| Department Analytics | Performance tracking |

---

---

## ROLE 5: GOVERNMENT ADMIN

**[Visual: React web dashboard - Full Gov Admin view with all panels]**

**Narrator:**
"Government admins have city-wide visibility. They see everything – every report, every department, every officer. This is the command center for civic operations."

### Platform: React Web Dashboard

### Dashboard Overview
**[Visual: Rich dashboard with stats, charts, map]**

"The gov admin dashboard is feature-rich:
- **City-Wide Stats**: Total reports across all departments
- **Interactive Heatmap**: Every issue on a live map
- **Multi-Department Analytics**: Compare Roads vs Water vs Waste
- **AI Predictions**: Proactive failure detection
- **Team Management**: All staff across all departments"

---

### Feature 1: City Statistics Panel
**[Visual: Stats cards with animated counters]**

"At-a-glance metrics:
- **Total Reports**: All-time count
- **Resolved**: Successfully fixed
- **Pending**: Awaiting assignment
- **In Progress**: Currently being worked on
- **Team Size**: Total staff count"

---

### Feature 2: Interactive Heatmap
**[Visual: Full-screen map with clustered markers]**

"Geographic visualization:
- **All Reports Plotted**: Every issue as a marker
- **Cluster View**: Zoom out to see hotspots
- **Filter by Department**: Roads only, Water only, etc.
- **Filter by Status**: Open, In Progress, Resolved
- **Filter by City**: Delhi, Gwalior, Canberra
- **Street View**: Click marker → See location photo"

---

### Feature 3: Comprehensive Analytics
**[Visual: Multiple charts - pie, bar, area, radial]**

"Data visualization:

**Pie Charts:**
- Issues by Category (Pothole, Garbage, etc.)
- Issues by Severity (High/Medium/Low)
- Issues by Status (Open/Assigned/Resolved)

**Bar Charts:**
- Issues by Department (Roads, Water, Waste)
- Issues per Week (Trend analysis)

**Area Charts:**
- Resolution trends over time
- Report volume patterns

**Radial Gauges:**
- Resolution rate percentage
- SLA compliance"

---

### Feature 4: AI Predictive Intelligence
**[Visual: Prediction markers on map with risk %]**

"Proactive failure detection:

**How It Works:**
1. AI analyzes weather (rainfall, temperature)
2. Searches local news for infrastructure incidents
3. Reviews historical report clusters
4. Predicts future failure points

**Prediction Output:**
- **Location**: Lat/Lng on map
- **Issue Type**: Drainage, Pothole, etc.
- **Risk Level**: High (92%), Medium (65%), etc.
- **Estimated Repair Cost**: ₹15,000
- **Reasoning**: 'Heavy rainfall + historical clogging'

**Admin Actions:**
- View prediction details
- One-click 'Create Ticket' → Converts to real report
- Dispatch team proactively"

---

### Feature 5: HR & Personnel Management
**[Visual: HR module with tabs]**

"Full HRMS features:

**Recruitment:**
- View candidates
- Track application status (Applied → Interview → Hired)
- Add new job postings

**Attendance:**
- Daily check-in/check-out logs
- Present/Absent/Late status
- Attendance reports

**Payroll:**
- Monthly salary records
- Deductions and bonuses
- Payment status (Pending/Paid)"

---

### Feature 6: Staff Management
**[Visual: Add staff modal]**

"Manage government employees:
- **View All Staff**: Dept heads, field officers
- **Add New Staff**: Create accounts with role assignment
- **Edit Permissions**: Update roles/departments
- **Deactivate Accounts**: Remove access"

---

### Feature 7: Voice Command Interface
**[Visual: Microphone icon + voice feedback bar]**

"Hands-free control:

**Example Commands:**
- 'Show dashboard' → Opens overview
- 'Open heatmap' → Switches to map view
- 'How many reports?' → Speaks: '142 total, 98 resolved'
- 'Show critical incidents' → Filters to high severity
- 'Filter to Delhi' → Zooms to Delhi data
- 'Refresh data' → Reloads all data

**Response:** System speaks back using text-to-speech."

---

### Feature 8: Weekly PR Generator
**[Visual: Generated PR text + AI image attempt]**

"Public relations automation:

**Generate PR Statement:**
- Click 'Generate Weekly PR'
- AI analyzes week's statistics
- Produces professional announcement

**Example Output:**
> 'This week, UrbanEye resolved 87 infrastructure issues across Delhi NCR. Our teams addressed 23 potholes, cleared 15 garbage hotspots, and fixed 12 drainage blocks.'

**AI Image Generation:**
- Attempts to generate smart city visual
- Uses Google Imagen 3 (experimental)
- Falls back to curated placeholders"

---

### Feature 9: Data Export
**[Visual: Download button + CSV icon]**

"Export capabilities:
- **Download Reports**: CSV format
- **Filter Before Export**: By date, department, status
- **Use in External Tools**: Excel, Tableau, etc."

---

### Government Admin Summary

| Feature | Description |
|---------|-------------|
| City Stats | All-city metrics |
| Heatmap | Geographic visualization |
| Analytics | Charts and graphs |
| AI Predictions | Proactive failure detection |
| HR Management | Recruitment, attendance, payroll |
| Staff Management | Add/edit/remove employees |
| Voice Commands | Hands-free control |
| PR Generator | Auto-create announcements |
| Data Export | Download reports |

---

---

## ROLE 6: SUPER ADMIN (System Owner)

**[Visual: React web dashboard - Super Admin with advanced controls]**

**Narrator:**
"Super admins have god-mode access. They control the entire system – users, data, configuration, and testing tools."

### Platform: React Web Dashboard

### All Gov Admin Features PLUS:

---

### Feature 1: Secret User Management
**[Visual: Secret admin panel with user table]**

"Full user control:
- **View All Users**: Every account in the system
- **Create Any Role**: Civilian, Social Worker, Dept Head, Gov Admin, Field Officer
- **Edit User Details**: Name, email, role, department
- **Reset Passwords**: Generate new credentials
- **Delete Users**: Remove accounts
- **Secret Key Protection**: All actions require master key"

---

### Feature 2: Database Seeder
**[Visual: Seeder controls - city dropdown, count slider]**

"Test data generation:
- **Select City**: Delhi, Gwalior, Canberra
- **Choose Count**: 10, 25, 50 reports
- **One-Click Seed**: Populates database with realistic test data
- **Random Distribution**: Issues spread across geo-bounds
- **Category Variety**: Mix of potholes, garbage, drainage, etc."

---

### Feature 3: Full Data Seeder
**[Visual: 'Seed All Cities' button]**

"Bulk population:
- **Seed All Cities**: 50+ reports across all supported cities
- **Stress Testing**: Verify system handles large datasets
- **Demo Preparation**: Quick setup for presentations"

---

### Feature 4: System Statistics
**[Visual: User role distribution chart]**

"Platform-wide metrics:
- **Total Users**: All accounts
- **Role Distribution**: How many of each role
- **Department Distribution**: Users per department
- **New Users This Week**: Growth tracking"

---

### Feature 5: API Key Management
**[Visual: Key rotation status]**

"Gemini API management:
- **Active Key Indicator**: Which key is in use
- **Quota Status**: Usage monitoring
- **Manual Rotation**: Force switch to next key
- **Key Health**: Test each key"

---

### Super Admin Summary

| Feature | Description |
|---------|-------------|
| All Gov Admin Features | Full city-wide access |
| User CRUD | Create/Read/Update/Delete any user |
| Database Seeder | Generate test data |
| System Stats | Platform-wide metrics |
| API Key Management | Gemini key rotation |

---

---

# PART 2: COMPLETE FEATURE LIST

---

## FRONTEND FEATURES

### Flutter Mobile App (Citizens & Social Workers)

| Feature | Description |
|---------|-------------|
| Animated Dashboard | Glassmorphic UI with floating particles |
| AI Photo Analysis | Gemini-powered issue detection |
| GPS Auto-Tagging | Automatic location capture |
| Real-Time Tracking | Status updates with push notifications |
| Interactive Heatmap | Leaflet-based issue visualization |
| Gamification | XP points, leaderboard, ranks |
| Service Booking | Urban Company-style scheduling |
| NGO Requests | Community-scale help requests |
| Offline Queue | Submit when back online |
| Firebase Auth | Email/password + Google OAuth |

---

### React Web Dashboard (Government Roles)

| Feature | Description |
|---------|-------------|
| Role-Based Routing | Different views per role |
| Interactive Heatmap | Leaflet + OpenStreetMap |
| Recharts Analytics | Pie, bar, area, radial charts |
| Voice Commands | Web Speech API integration |
| Staff Management | Add/edit/remove employees |
| Report Assignment | Dispatch to field officers |
| AI Predictions | Predictive maintenance markers |
| PR Generator | Auto-create announcements |
| HRMS Module | Recruitment, attendance, payroll |
| Responsive Design | Mobile-friendly sidebar |

---

## BACKEND FEATURES

### Flask REST API

| Feature | Description |
|---------|-------------|
| Swagger Documentation | Interactive API docs at /docs/ |
| JWT Authentication | Secure token-based access |
| Role-Based Access Control | Decorators for permission checking |
| Multi-Key API Rotation | Automatic failover on quota errors |
| Connection Pooling | SQLAlchemy pool for reliability |
| Google OAuth | Social login integration |
| Email Service | Welcome emails via Flask-Mail |

---

### Database Models (PostgreSQL)

| Model | Purpose |
|-------|---------|
| User | All roles with department |
| Report | Issues with geo-coordinates |
| ReportLog | Audit trail of status changes |
| Worker | Gig/NGO/MCD profiles |
| Job | Report-to-worker assignments |
| Booking | Service requests |
| NGORequest | Community help requests |
| EmployeeProfile | HR details |
| Attendance | Check-in/out logs |
| Payroll | Salary records |
| Candidate | Recruitment tracking |

---

## AI FEATURES

### AI Feature 1: Image Analysis (Gemini Vision)

| Aspect | Detail |
|--------|--------|
| Model | Google Gemini 2.5 Flash |
| Input | Photo (PNG/JPG/WEBP) |
| Output | Category, description, severity, bounding box |
| Categories | 10 civic issue types |
| Auto-Routing | Category → Department mapping |

---

### AI Feature 2: Predictive Intelligence (LangChain)

| Aspect | Detail |
|--------|--------|
| Data Sources | Weather + News + Historical Reports |
| Weather API | Open-Meteo (free) |
| News API | DuckDuckGo Search |
| Processing | LangChain + Pydantic |
| Output | Location, risk %, cost, reasoning |
| Action | One-click ticket creation |

---

### AI Feature 3: Voice Commands

| Aspect | Detail |
|--------|--------|
| Technology | Web Speech API |
| Commands | Navigation, queries, filters |
| Response | Text-to-speech feedback |
| Platform | Web dashboard only |

---

### AI Feature 4: PR Generation

| Aspect | Detail |
|--------|--------|
| Text Generation | Gemini analyzes weekly stats |
| Image Generation | Imagen 3 (experimental) |
| Fallback | Curated placeholder images |

---

### AI Feature 5: API Resilience

| Aspect | Detail |
|--------|--------|
| Multi-Key | Multiple Gemini API keys |
| Auto-Rotation | On 429 quota error |
| Logging | Active key tracking |

---

---

# PART 3: TECHNOLOGY STACK

---

## Full Stack Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     URBANEYE ARCHITECTURE                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐     ┌─────────────┐     ┌─────────────┐   │
│  │   FLUTTER   │     │    REACT    │     │    FLASK    │   │
│  │  Mobile App │────▶│ Web Dashboard│────▶│  REST API   │   │
│  │ (Dart)      │     │ (JavaScript) │     │  (Python)   │   │
│  └─────────────┘     └─────────────┘     └──────┬──────┘   │
│                                                  │          │
│                                          ┌──────▼──────┐   │
│                                          │ POSTGRESQL  │   │
│                                          │  Database   │   │
│                                          └──────┬──────┘   │
│                                                  │          │
│  ┌─────────────┐     ┌─────────────┐     ┌──────▼──────┐   │
│  │   GEMINI    │     │  LANGCHAIN  │     │  OPEN-METEO │   │
│  │  AI Vision  │◀───▶│  Pipeline   │◀───▶│  Weather    │   │
│  └─────────────┘     └─────────────┘     └─────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Technology Table

| Layer | Technology | Version |
|-------|------------|---------|
| **Mobile Frontend** | Flutter | 3.7+ |
| | Dart | 3.0+ |
| | Firebase Auth | Latest |
| | flutter_animate | Animation library |
| **Web Frontend** | React | 18 |
| | Vite | Build tool |
| | Tailwind CSS | Styling |
| | Recharts | Charts |
| | Leaflet | Maps |
| | Framer Motion | Animations |
| | Axios | HTTP client |
| **Backend** | Flask | 3.0 |
| | Flask-RESTX | Swagger docs |
| | Flask-JWT-Extended | Auth |
| | SQLAlchemy | ORM |
| | Flask-Mail | Email |
| | Flask-CORS | Cross-origin |
| **Database** | PostgreSQL | 15 |
| | SQLite | Local dev |
| **AI - Vision** | Google Gemini | 2.5 Flash |
| **AI - Predictions** | LangChain | Latest |
| | Pydantic | V2 |
| **AI - Weather** | Open-Meteo | Free API |
| **AI - News** | DuckDuckGo Search | Free |
| **AI - Voice** | Web Speech API | Browser |
| **AI - Images** | Google Imagen 3 | Experimental |
| **Deployment** | Render | Cloud |
| | Docker | Container |

---

---

# PART 4: USER JOURNEY EXAMPLES

---

## Journey 1: Citizen Reports a Pothole

```
1. Citizen opens UrbanEye app
2. Taps "Report Issue" → Camera opens
3. Takes photo of pothole
4. AI analyzes → Detects "Pothole", Severity "High"
5. Form auto-fills with description
6. Citizen confirms → Report submitted
7. GPS auto-tags location
8. Backend creates report → Routes to "Roads" department
9. Citizen sees report in "My Reports" with status "Open"
```

---

## Journey 2: Dept Head Assigns the Report

```
1. Dept Head (Roads) logs into web dashboard
2. Sees new report in queue
3. Clicks report → Views details and photo
4. Clicks "Assign" → Selects Field Officer "Ravi Kumar"
5. Confirms assignment
6. Report status → "Assigned"
7. Field Officer Ravi receives notification
```

---

## Journey 3: Field Officer Resolves the Issue

```
1. Field Officer opens web dashboard
2. Sees task in "My Tasks"
3. Clicks task → Views location on map
4. Travels to location → Fixes pothole
5. Takes "after" photo → Uploads as proof
6. Updates status → "Resolved"
7. Citizen receives push notification: "Your issue has been resolved!"
```

---

## Journey 4: Gov Admin Uses AI Predictions

```
1. Gov Admin opens dashboard → Clicks "AI Predictions"
2. System fetches weather data (heavy rain forecast)
3. Searches news ("Delhi drainage news")
4. Analyzes historical reports (drainage clusters)
5. Generates 5 predictions:
   - Drainage Overflow at Lat 28.61, Lng 77.21 (92% risk)
   - Waterlogging at Lat 28.55, Lng 77.26 (78% risk)
   - etc.
6. Admin clicks prediction → "Create Ticket"
7. Proactive report created → Assigned to Water department
8. Team dispatched BEFORE the failure occurs
```

---

## Journey 5: Citizen Books Express Service

```
1. Citizen views their "Open" report
2. Taps "Book Express Service"
3. Selects time slot: "Today Evening"
4. Confirms booking → Pays ₹299
5. Verified contractor assigned
6. Citizen tracks ETA on map
7. Contractor arrives → Fixes issue → Takes proof photo
8. Citizen rates service → Report marked "Resolved"
```

---

---

# PART 5: IMPACT & CLOSING

---

## Key Benefits

| Stakeholder | Benefit |
|-------------|---------|
| **Citizens** | Easy reporting, full transparency, faster resolution |
| **Social Workers** | Clear assignments, mobile-first workflow |
| **Field Officers** | Focused task list, no information overload |
| **Dept Heads** | Team visibility, workload management |
| **Gov Admins** | City-wide analytics, predictive intelligence |
| **City Government** | Data-driven decisions, improved public trust |

---

## Metrics That Matter

- **Faster Response Time**: AI routing eliminates manual triage
- **Higher Resolution Rates**: Clear accountability per officer
- **Proactive Maintenance**: AI predicts failures before they happen
- **Citizen Engagement**: Gamification drives consistent reporting
- **Transparency**: Full audit trail for every report

---

## Closing Statement

**[Visual: UrbanEye logo with smart city silhouette]**

**Narrator:**
"UrbanEye isn't just an app. It's a complete civic intelligence ecosystem.

From the citizen who spots a broken streetlight to the government admin who tracks city-wide trends – every stakeholder is connected, informed, and empowered.

**AI analyzes. Departments collaborate. Cities improve.**

Welcome to the future of urban governance. Welcome to **UrbanEye**."

---

---

# APPENDIX: QUICK REFERENCE TABLES

---

## Role-Platform Matrix

| Role | Platform | Primary Actions |
|------|----------|-----------------|
| Civilian | Flutter App | Report, Track, Book, Leaderboard |
| Social Worker | Flutter App | View Jobs, Accept, Update, Complete |
| Field Officer | React Web | View Tasks, Update Status, Upload Proof |
| Dept Head | React Web | View Dept Reports, Assign Officers |
| Gov Admin | React Web | Full Analytics, AI Predictions, HR |
| Super Admin | React Web | User CRUD, Seeder, System Config |

---

## API Endpoint Summary

| Namespace | Purpose |
|-----------|---------|
| /api/v1/health | System health checks |
| /api/v1/detection | AI image analysis |
| /api/v1/reports | CRUD for reports |
| /api/v1/auth | Login, signup, OAuth |
| /api/v1/bookings | Service bookings |
| /api/v1/ngo | NGO help requests |
| /api/v1/gov | Government operations |
| /api/v1/gig | Gig worker jobs |
| /api/v1/hr | HRMS operations |
| /api/v1/heatmap | Map data |
| /api/v1/categories | Issue categories |

---

## AI Capability Summary

| AI Feature | Technology | Trigger |
|------------|------------|---------|
| Image Analysis | Gemini 2.5 Flash | Photo upload |
| Predictions | LangChain + Gemini | Admin clicks "Predict" |
| Voice Commands | Web Speech API | Admin clicks mic |
| PR Generation | Gemini | Admin clicks "Generate PR" |
| Auto-Routing | Backend logic | Every new report |
| Key Rotation | Custom | On API quota error |

---

**END OF PITCH SCRIPT**

---

*Total Duration: ~15-20 minutes (full presentation)*
*Condensed Version: ~8-10 minutes (skip detailed feature lists)*
*Quick Demo: ~5 minutes (show one user journey per role)*
