# Rachit Kanchan — Portfolio

Personal portfolio website of **Rachit Kanchan**, a B.Tech CSE student at SRMS CET focused on backend engineering, databases, and scalable systems.

🔗 **Live:** https://portfolio-beta-nine-4um2ztuguj.vercel.app/

---

## Sections

- **Hero** — Introduction & availability status
- **About** — Focus areas: Database Architecture, Backend Engineering, Applied Solutions
- **Projects** — MediTrack, Khet Setu, Safar, AURIX
- **Background** — Education timeline & Certifications
- **Skills** — Languages, Databases, Dev Tools, Data Analytics, Deployment, AI Tools
- **Leadership** — Google Student Ambassador, IEEE Member, Equinox Club, SSoC Contributor
- **Contact** — Email & social links

## Projects

| Project | Description | Stack |
|---|---|---|
| [MediTrack](https://github.com/rach-kanc/MediTrack) | Hospital inventory & equipment tracking system | Flask, MySQL, Chart.js |
| [Khet Setu](https://github.com/rach-kanc/Khet-Setu) | Smart farming platform with AI/ML & gamification | Flask, SQLite, AI/ML |
| [Safar](https://github.com/Rudra-clrscr/SAFAR-1) | Group travel coordination with live tracking & alerts | Flask, PostgreSQL, Socket.IO |
| AURIX | AI-integrated assistive healthcare robot | Raspberry Pi, Arduino, Python, Gemini API |

## Tech Stack

- **Frontend:** Vanilla HTML/CSS/JS + Space Grotesk & IBM Plex Mono fonts
- **Backend (CMS):** Supabase (PostgreSQL, Storage, Auth)
- **Build Tool:** Vite
- **Analytics:** Vercel Analytics
- **Deployment:** Vercel

## Local Setup

To run this dynamic CMS portfolio locally, you'll need to link it to a Supabase project.

1. **Clone and Install**
   ```bash
   git clone https://github.com/rach-kanc/portfolio.git
   cd portfolio
   npm install
   ```

2. **Supabase Database & Storage Setup**
   - Create a new project in [Supabase](https://supabase.com).
   - Go to the **SQL Editor** in your Supabase dashboard and run the entire contents of `schema.sql` to create all tables and RLS policies.
   - Create a new public storage bucket named `portfolio-media`.
   - Setup Supabase Authentication (Email/Password) and create an admin user for yourself. Make sure "Auto Confirm User?" is checked.

3. **Environment Variables**
   - Create a `.env` file in the root of your project:
     ```env
     VITE_SUPABASE_URL=your_supabase_project_url
     VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

4. **Run Locally**
   ```bash
   npm run dev
   ```
   - The main portfolio will run at `http://localhost:5173/`
   - The Admin Dashboard will be at `http://localhost:5173/admin/login.html`

## Contact

- 📧 [rachkanc@gmail.com](mailto:rachkanc@gmail.com)
- 💼 [linkedin.com/in/rachitkanchan](https://www.linkedin.com/in/rachitkanchan/)
- 🐙 [github.com/rach-kanc](https://github.com/rach-kanc)
