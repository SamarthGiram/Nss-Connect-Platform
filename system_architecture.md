# System Design & Architecture - NSS Connect Platform

This document describes the live, secure system architecture of the **NSS Connect Platform**, illustrating how the frontend React client interacts with Supabase services and PostgreSQL tables.

---

## Architecture Diagram (Mermaid)

Below is the live system design diagram. You can copy this code block into any markdown viewer, GitHub repository, or Mermaid live editor.

```mermaid
graph TD
    %% User Roles & Client Tier
    subgraph Client_Tier["Client Tier (React Single-Page Application)"]
        UserStudent["Student (Volunteer)"]
        UserProf["Professor (Coordinator)"]
        UserAdmin["Administrator"]

        subgraph ReactApp["React Frontend (Vite & Tailwind CSS)"]
            Router["React Router (ProtectedRoute)"]
            AuthCtx["AuthContext (JWT Session)"]
            
            subgraph Dashboards["Role-Based Dashboards"]
                SDash["Student Dashboard"]
                PDash["Professor Dashboard"]
                ADash["Admin Dashboard"]
            end
            
            subgraph Services["API Service Modules"]
                U_Serv["usersService.js"]
                E_Serv["eventsService.js"]
                Att_Serv["attendanceService.js"]
                Ann_Serv["announcementsService.js"]
            end
        end
    end

    %% BaaS Tier (Supabase)
    subgraph BaaS_Tier["Backend-as-a-Service Tier (Supabase)"]
        S_Client["Supabase JS Client SDK"]
        S_Auth["Supabase Authentication (Email & Role JWT)"]
        S_Realtime["Supabase Realtime (WebSockets)"]
        
        subgraph PostgreSQL["PostgreSQL Database Schema"]
            T_Users["users (profiles / roles)"]
            T_Events["events (camps / details)"]
            T_Attendance["attendance (volunteer logs)"]
            T_Announcements["announcements (alerts)"]
        end
        
        RLS["Row-Level Security (RLS) Policies"]
    end

    %% Connections & Data Flow
    UserStudent -->|"Interacts"| Router
    UserProf -->|"Interacts"| Router
    UserAdmin -->|"Interacts"| Router
    
    Router --> AuthCtx
    AuthCtx --> Dashboards
    
    Dashboards --> Services
    
    %% API Services to Supabase Client SDK
    Services --> S_Client
    
    %% Supabase SDK Routing
    S_Client -->|"Authenticate / Login"| S_Auth
    S_Client -->|"Listen for alerts (WSS)"| S_Realtime
    S_Client -->|"HTTPS REST Queries"| RLS
    
    %% RLS Guarding DB tables
    RLS -->|"Select/Insert/Update (Validated)"| PostgreSQL
    
    %% DB Associations
    T_Users -->|"1-to-many"| T_Attendance
    T_Events -->|"1-to-many"| T_Attendance
    T_Users -->|"1-to-many"| T_Announcements
```

---

## Architectural Component Breakdown

### 1. Client Tier (Frontend Application)
* **Technology**: React.js with Vite builder and Tailwind CSS styling.
* **Router & Protection (`ProtectedRoute.jsx`)**: Checks the active user session and validates their role (Student, Professor, or Admin) before resolving routing paths.
* **Authentication Context (`AuthContext.jsx`)**: Establishes global React state tracking for user login, signup, session logs, and signout handlers.
* **Service Modules**: JavaScript modules (e.g., `usersService.js`, `eventsService.js`) encapsulate DB communications, making UI components cleaner and more reusable.

### 2. Backend-as-a-Service Tier (Supabase)
* **Supabase Client SDK**: Communicates securely over HTTPS/WSS protocols.
* **Supabase Auth**: Manages JWT tokens, signups, logins, and session persistence securely without managing raw passwords locally.
* **Realtime Listener**: Opens a persistent WebSocket connection (`S_Realtime`) so that when a coordinator adds an announcement, student dashboards show immediate toast banners.

### 3. Database & Security Tier
* **PostgreSQL Engine**: Relational storage engine hosting structured schemas:
  * `users` / `profiles`: Stores details (name, email, role, college).
  * `events`: Tracks camps, campaign details, descriptions, and capacity limits.
  * `attendance`: Maps student check-ins and verified volunteering hours.
  * `announcements`: Stores notification broadcasts.
* **Row-Level Security (RLS)**: Crucial security rules evaluated in the DB, preventing students from editing hours or coordinators from accessing other college programs.
