# GEC Tirunelveli — ELYX 26 Cultural Events Platform

An enterprise-grade, high-performance web platform for Government College of Engineering, Tirunelveli, built for the annual cultural festival **ELYX 26** (Artifex). Features real-time Supabase integration, student registration pass generation, event management, and role-based access control.

---

## 1. Project Overview

* **Institution**: Government College of Engineering, Tirunelveli (GEC Tirunelveli)
* **Festival**: ELYX 26 Cultural Fest / Artifex
* **Organizing Body**: Fine Arts Association & Cultural Committees
* **Capabilities**:
  * Public event directory, rules, eligibility, and scheduling
  * Student event registration with client-side and database-level duplicate prevention
  * Instant entry pass lookup and generation
  * Protected admin management console for faculty incharges and core coordinators
  * Full real-time synchronization with Supabase PostgreSQL database

---

## 2. Tech Stack

* **Frontend**: React 19, TypeScript, Vite
* **Styling**: TailwindCSS, Lucide Icons, Glassmorphism UI tokens
* **Validation**: Zod (strict schema validation for forms)
* **Backend / Database**: Supabase (PostgreSQL 17)
* **Security & Auth**: Supabase Auth, Row-Level Security (RLS), Role-Based Access Control (RBAC)
* **Storage**: Supabase Storage (`event-assets` bucket)
* **Linting & Code Quality**: Oxlint

---

## 3. Architecture & Data Access

The project adopts a modular layered data-access architecture:

```text
src/
├── lib/
│   └── supabase.ts            # Supabase client singleton with session persistence
├── services/
│   ├── authService.ts         # Authentication operations (sign in, sign up, sign out, password reset)
│   ├── eventService.ts        # Events querying and administration
│   ├── registrationService.ts # Registration submission, pass lookup, and cancellation
│   ├── coordinatorService.ts  # Coordinator and committee roster management
│   └── profileService.ts      # User profile fetch and update
├── hooks/
│   ├── useAuth.ts             # Auth hook (session, user, role status)
│   ├── useEvents.ts           # Events reactive state and updates
│   └── useRegistrations.ts    # Student registrations reactive state
├── context/
│   └── AuthContext.tsx        # Centralized React AuthProvider & session listener
└── pages/                     # Public and Admin console pages
```

---

## 4. Environment Variables

Create a `.env` file in the project root based on `.env.example`:

```bash
# Modern Supabase Publishable Key and Project URL (Prefixed with VITE_ for Vite)
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_your-publishable-key-here

# Legacy Anon Key (Supported for backward compatibility)
VITE_SUPABASE_ANON_KEY=your-legacy-anon-key-here
```

> **Security Notice**: Never place `SUPABASE_SERVICE_ROLE_KEY` or PostgreSQL passwords in client-side `.env` files. Only publishable keys are safe for frontend use.

---

## 5. Database Architecture

The PostgreSQL database schema consists of:

1. **`public.profiles`**: Extends `auth.users` with college details (`register_number`, `department`, `year`, `phone`, `role`).
2. **`public.events`**: Cultural events catalog including eligibility, rules (JSONB), team sizing, faculty incharge (JSONB), coordinators (JSONB), dates, and status.
3. **`public.registrations`**: Student event registrations. Enforces integrity via unique constraint `uq_student_event_reg (register_number, event_id)` preventing duplicate registrations at the database level.
4. **`public.coordinators`**: Student coordinators and organizing committees.
5. **`public.announcements`**: Live notices and alerts.
6. **`storage.buckets`**: Public `event-assets` bucket for posters and documents.

---

## 6. Row Level Security (RLS) & Security Policies

All tables have Row Level Security enabled (`rowsecurity = true`):

* **Events**:
  * Public can read active events (`SELECT USING (true)`).
  * Only verified administrators can insert, update, or delete events.
* **Registrations**:
  * Anyone can insert a registration if the event status is `registration_open` and the deadline has not passed.
  * Students can only read and manage their own registrations (`student_id = (SELECT auth.uid())`).
  * Admins can view and update all registrations.
  * Students can cancel their own registration.
  * Self-service pass lookup is powered by a secure RPC function (`lookup_passes_by_reg_no`) that returns pass details while protecting personal phone numbers and emails.
* **Profiles**:
  * Users can read and update their own profile.
  * Admins have full access.
  * Database trigger (`handle_new_user`) strictly defaults new accounts to `student` role, preventing client privilege escalation.

---

## 7. Migration Workflow

All database modifications are stored as versioned migrations in `supabase/migrations/`:

| Migration | Description |
| :--- | :--- |
| `001_initial_schema.sql` | Core tables (`profiles`, `events`, `coordinators`, `registrations`, `announcements`) and triggers |
| `002_rls_policies.sql` | Row Level Security policies and `is_admin()` security definer function |
| `003_indexes.sql` | Performance indexes on slugs, dates, categories, register numbers |
| `004a_seed_events_part1.sql` | Events catalog seed (Part 1) |
| `004b_seed_events_part2.sql` | Events catalog seed (Part 2) |
| `005_admin_bootstrap.sql` | `handle_new_user()` trigger and `promote_user_to_admin()` function |
| `006_seed_coordinators_and_announcements.sql` | Student leadership roster and initial announcements |
| `007_event_enhancements_and_cancellation_policy.sql` | Capacity, eligibility columns, and student cancellation RLS policy |
| `008_storage_setup.sql` | `event-assets` bucket and storage RLS |
| `009_security_hardening.sql` | Revoke RPC execution on internal security definer functions |
| `010_optimize_rls_policies.sql` | Performance optimization using `(SELECT auth.uid())` |
| `011_secure_profile_roles.sql` | Hardened profile role enforcement |
| `012_activate_elyx26_dates.sql` | Active schedule dates for ELYX 26 |
| `013_pass_lookup_function.sql` | Secure RPC function for self-service pass lookup |

---

## 8. Admin Setup Instructions

1. Navigate to `/admin/login` on the website.
2. Select **Register Account** and sign up with the faculty/organizer email (e.g. `admin@gcetly.ac.in`).
3. To promote this user to administrator, execute the following SQL in your Supabase SQL Editor:
   ```sql
   SELECT public.promote_user_to_admin('admin@gcetly.ac.in');
   ```
4. Sign in at `/admin/login` to access the full live management console.

---

## 9. Local Development & Build

### Install Dependencies
```bash
npm install
```

### Run Local Development Server
```bash
npm run dev
```

### Typecheck & Production Build
```bash
npm run build
```

### Run Linter
```bash
npm run lint
```

### Production Preview
```bash
npm run preview
```

---

## 10. Deployment

* **Vercel**: Pre-configured with [vercel.json](file:///g:/culturs/vercel.json) rewrite rules to support Single Page Application (SPA) client-side routing.
* **Environment Configuration**: Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` in the hosting environment variables settings.
