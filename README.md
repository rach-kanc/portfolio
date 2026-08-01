# Rachit Kanchan — Portfolio & Personal CMS

A premium, highly interactive personal portfolio website and custom Content Management System (CMS) built for **Rachit Kanchan**, a B.Tech CSE student at SRMS CET focused on backend engineering, database architectures, and open-source software.

🔗 **Live Portfolio:** https://portfolio-beta-nine-4um2ztuguj.vercel.app/

---

## ✨ Features & Interactive Highlights

- **🌗 Dual-Theme System:** Starts in bright, high-contrast **Light Mode** by default, with a seamless, persistence-cached toggle to **Dark Mode**.
- **🎨 Premium Visual Aesthetics:** Styled with a modern cyber-minimalist design system using *Space Grotesk* and *IBM Plex Mono* fonts, featuring backdropped panel glassmorphism, micro-animations, and custom cursor glows.
- **🎒 Responsive Horizontal Timeline:** A custom education timeline that renders as a horizontal node-and-stem roadmap on desktop, and seamlessly pivots to a vertical layout on mobile devices.
- **✨ Perimeter Floating Stickers:** Clean, playful background emojis dynamically distributed across safe white-space margins so they never overlap or interfere with text content.
- **🛠️ Self-Secured CMS Dashboard:** A built-in administrator portal (`/admin/dashboard.html`) powered by Supabase Auth and Database RLS, allowing real-time CRUD management for projects, skills, certificates, leadership items, and events.
- **📂 Categorized Project Board:** Organized project grids grouped dynamically by build context:
  - **🌍 Open-Source Contributions**
  - **👤 Personal Projects & Experiments**
  - **🤝 Teamwork Projects (hackathon/team builds)**

---

## 🚀 Key Projects

| Project | Category / Type | Description | Stack |
| :--- | :--- | :--- | :--- |
| **🌿 EcoSphere** | Hackathons & Teamwork | Enterprise-grade Environmental, Social & Governance (ESG) platform with auto carbon tracking. | FastAPI, React 18, PostgreSQL, SQLAlchemy |
| **✈️ Destinix AI Travel** | AI & Open Source | Travel planning platform with Gemini AI day-by-day itineraries and Firebase auth. | React 19, Express, Nodemailer, Firebase Auth |
| **🇮🇳 DeshSafe** | Social Impact & Open Source | Disaster reporting and crisis map tracking platform. | Next.js, Leaflet.js, Firebase Auth, Tailwind |
| **🧠 Memact Memory** | Storage & Open Source | Secure agent memory context layer with vector searches and encrypted AES backup. | Node.js, PostgreSQL, JWT, OAuth 2.0 |
| **🎨 InnerHue** | Wellness & Open Source | Mood tracking analytics web app with 3D color orb visualizer. | Next.js, Framer Motion, Local Storage |
| **📦 MERN Product Store** | Web App & Open Source | Production-ready full-stack product catalog with Docker Compose support. | MongoDB, Express, React, Chakra UI, Docker |
| **🧰 One File Tools** | Developer Utilities | Zero-dependency, single-file serverless browser tools. | HTML5, CSS3, JavaScript, Node.js (Build) |
| **🛠️ Project Toolsuite** | Developer Utilities | PWA-supported sitemap automated developer resource workbench. | HTML5, CSS3, JavaScript, Service Workers, Python |
| **🩺 MediTrack** | Personal Projects | Hospital inventory and medical equipment tracking system. | Flask, MySQL, Chart.js, Flatpickr |
| **🚜 Khet Setu** | Teamwork Projects | Smart farming and crop disease forecasting gamified system. | Flask, SQLite, Machine Learning models |

---

## 🛠️ Core Tech Stack

- **Frontend Core:** HTML5, Vanilla CSS3, Modern ES6+ JavaScript
- **Backend Service (CMS):** Supabase (PostgreSQL Database, Storage Buckets, JWT Authentication, RLS Policies)
- **Bundler & Build Tool:** Vite
- **Analytics & Hosting:** Vercel Hosting & Vercel Web Analytics

---

## ⚙️ Local Setup & Installation

To run the local development server and connect it to your Supabase CMS instance:

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/rach-kanc/portfolio.git
cd portfolio
npm install
```

### 2. Database Schema Configuration
- Create a new project in your [Supabase Dashboard](https://supabase.com).
- Open the **SQL Editor** tab and execute the entire contents of the `schema.sql` file. This creates all relational tables (`projects`, `skills`, `certificates`, `leadership`, `events`) and applies RLS security policies.
- Create a new public storage bucket named `portfolio-media`.
- Go to Authentication -> Providers, enable Email/Password, and create your Admin user (ensure auto-confirm is checked).

### 3. Setup Environment variables
Create a `.env` file at the root of the project:
```env
VITE_SUPABASE_URL=https://your-supabase-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key-here
```

### 4. Boot Dev Server
```bash
npm run dev
```
- **Portfolio Website:** `http://localhost:5173/`
- **CMS Admin Dashboard:** `http://localhost:5173/admin/login.html`

---

## 📬 Contact & Socials

- 📧 [rachkanc@gmail.com](mailto:rachkanc@gmail.com)
- 💼 [LinkedIn](https://www.linkedin.com/in/rachitkanchan/)
- 🐙 [GitHub](https://github.com/rach-kanc)
