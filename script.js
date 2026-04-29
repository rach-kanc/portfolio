const projects = {
    meditrack: {
        title: "MediTrack",
        stack: ["Python", "Flask", "MySQL", "Chart.js", "Flatpickr"],
        repo: "https://github.com/rach-kanc/MediTrack",
        content: `
            <div class="overlay-copy">
                <span class="detail-label">Project Details</span>
                <h2 id="project-title">MediTrack</h2>

                <div class="project-section">
                    <h3>Problem Statement</h3>
                    <p>Hospitals handle equipment, medicines, and surgery supplies in large numbers. When records are managed manually or across disconnected systems, it becomes hard to track stock, expiry dates, maintenance schedules, and total inventory value. This can lead to wastage, low-stock situations, delayed maintenance, and poor visibility.</p>
                </div>

                <div class="project-section">
                    <h3>Objective</h3>
                    <p>MediTrack was built as a hospital inventory management system that keeps records in one place and helps staff monitor important items in real time. The main goal is to improve inventory control, reduce mistakes, and support faster decisions with alerts, reports, and searchable records.</p>
                </div>

                <div class="project-section">
                    <h3>Features</h3>
                    <ul>
                        <li>Dashboard for equipment, medicines, surgery supplies, and items needing attention</li>
                        <li>Separate inventory modules for equipment, medicines, and surgery items</li>
                        <li>Add, update, search, and delete inventory records</li>
                        <li>Alerts for low stock, expiry, and maintenance needs</li>
                        <li>Reports with date filters and category summaries</li>
                        <li>Global search with live suggestions</li>
                        <li>Export and print support</li>
                        <li>Theme toggle and responsive interface</li>
                        <li>Automatic database setup with demo data</li>
                    </ul>
                </div>

                <div class="project-section">
                    <h3>Tech Stack</h3>
                    <p>Backend: Python, Flask<br>Database: MySQL with mysql-connector-python<br>Frontend: HTML, Jinja templates, CSS, JavaScript<br>Libraries: Chart.js, Flatpickr, Font Awesome</p>
                </div>

                <div class="project-section">
                    <h3>Conclusion</h3>
                    <p>MediTrack is a practical hospital inventory project that improves visibility and control over medical resources. It combines tracking, alerts, reporting, and search in one system, making it useful both as an academic project and as a basic real-world solution.</p>
                </div>
            </div>
        `
    },
    khetsetu: {
        title: "Khet Setu",
        stack: ["Python", "Flask", "SQLite", "PyTorch", "WeatherAPI"],
        content: `
            <div class="overlay-copy">
                <span class="detail-label">Project Details</span>
                <h2 id="project-title">Khet Setu</h2>

                <div class="project-section">
                    <h3>Problem Statement</h3>
                    <p>Farmers often face problems such as lack of awareness about sustainable farming, changing weather, crop diseases, emergency situations like pest attacks or drought, and limited access to fair marketplaces. Traditional awareness methods are often not engaging enough, which slows the adoption of better practices.</p>
                </div>

                <div class="project-section">
                    <h3>Objective</h3>
                    <p>KhetSetu was designed as a digital platform that supports farmers with technology-driven and simple tools. Its goal is to educate farmers, encourage sustainable agriculture, improve decision-making, reduce crop losses, and create a rewarding learning experience through gamification.</p>
                </div>

                <div class="project-section">
                    <h3>Features</h3>
                    <ul>
                        <li>User signup, login, and profile management</li>
                        <li>Gamified dashboard for farmer engagement</li>
                        <li>Quiz system for learning and awareness</li>
                        <li>Points, badges, levels, and leaderboard</li>
                        <li>AI-based crop disease detection using leaf images</li>
                        <li>Weather forecasting support</li>
                        <li>Emergency risk dashboard</li>
                        <li>Marketplace section for farmer access and opportunities</li>
                        <li>Task, reward, and sustainability score tracking</li>
                    </ul>
                </div>

                <div class="project-section">
                    <h3>Tech Stack</h3>
                    <p>Backend: Python, Flask<br>Frontend: HTML, CSS, JavaScript, Jinja templates<br>Database: SQLite<br>Authentication: Werkzeug password hashing<br>AI/ML: Hugging Face Transformers, PyTorch, Vision Transformer<br>Image Processing: Pillow<br>External API: WeatherAPI<br>Deployment: Gunicorn</p>
                </div>

                <div class="project-section">
                    <h3>Conclusion</h3>
                    <p>KhetSetu combines education, gamification, AI, and real-time tools to support farmers in a practical way. It helps users learn better practices, detect crop diseases early, respond to weather changes, and stay motivated through rewards and competition.</p>
                </div>
            </div>
        `
    },
    safar: {
        title: "Safar",
        stack: ["Python", "Flask", "PostgreSQL", "Supabase", "Socket.IO"],
        repo: "https://github.com/Rudra-clrscr/SAFAR-1",
        content: `
            <div class="overlay-copy">
                <span class="detail-label">Project Details</span>
                <h2 id="project-title">Safar</h2>

                <div class="project-section">
                    <h3>Problem Statement</h3>
                    <p>Travelers, especially solo tourists and people visiting unfamiliar places, often face problems such as lack of trusted travel companions, poor coordination during group trips, limited access to real-time safety support, and difficulty handling emergencies quickly. Most travel platforms focus mainly on booking and information, not on group travel, live safety tracking, AI guidance, identity verification, and emergency response together.</p>
                </div>

                <div class="project-section">
                    <h3>Objective</h3>
                    <p>SAFAR was designed as a smart travel platform that helps users create and join travel groups, improve safety through live tracking and alerts, provide AI-based travel help, support secure identity systems, and allow emergency monitoring through an admin dashboard and IoT integration.</p>
                </div>

                <div class="project-section">
                    <h3>Features</h3>
                    <ul>
                        <li>User registration and login with OTP verification</li>
                        <li>KYC-based tourist profile creation</li>
                        <li>Public and private travel group creation and joining</li>
                        <li>Destination-based group planning and coordination</li>
                        <li>Real-time group chat using Socket.IO</li>
                        <li>Live tourist location tracking and safety score monitoring</li>
                        <li>Geo-fenced safety zones and panic alerts</li>
                        <li>AI travel assistant named Mayurya</li>
                        <li>Blockchain ledger named Airavat for secure records</li>
                        <li>Garuda monitoring system for live tracking and SOS handling</li>
                        <li>Admin dashboard for alerts, anomalies, and tourist status</li>
                        <li>Optional IoT support with GPS and SOS hardware</li>
                        <li>Multilingual interface support</li>
                    </ul>
                </div>

                <div class="project-section">
                    <h3>Tech Stack</h3>
                    <p>Frontend: HTML, CSS, JavaScript<br>Backend: Python, Flask<br>Database: PostgreSQL, Supabase, SQLAlchemy<br>Real-time: Flask-SocketIO, Socket.IO<br>Security: OTP verification, Twilio, KYC, blockchain ledger<br>AI: n8n AI agent / Mayurya assistant<br>IoT: ESP8266/ESP32, Blynk Cloud, GPS module, SOS button<br>Deployment: Render, Docker, Gunicorn<br>Libraries: pg8000, python-dotenv, pyserial, Leaflet.js</p>
                </div>

                <div class="project-section">
                    <h3>Conclusion</h3>
                    <p>SAFAR combines travel collaboration, real-time monitoring, AI support, and secure digital systems in one platform. It is meant to make trips more connected, safer, and more reliable by bringing together group travel management, emergency alerts, identity systems, and tracking tools.</p>
                </div>
            </div>
        `
    },
    aurix: {
        title: "AURIX",
        stack: ["Raspberry Pi", "Arduino", "Python", "C++", "Gemini API", "Twilio API"],
        repo: "#",
        content: `
            <div class="overlay-copy">
                <span class="detail-label">Project Details</span>
                <h2 id="project-title">AURIX | AI-Integrated Assistive Healthcare Robot</h2>

                <div class="project-section">
                    <h3>Role</h3>
                    <p>Lead Structural Designer & Systems Integrator</p>
                </div>

                <div class="project-section">
                    <h3>Overview</h3>
                    <p>AURIX (Assistive Utility & Responsive Intelligent Experience) is a specialized robotic platform engineered to assist staff and residents in hospitals and geriatric care facilities. The project addresses two critical needs: the physical automation of medical supply delivery and the psychological need for companionship and immediate emergency response.</p>
                </div>

                <div class="project-section">
                    <h3>Key Contributions</h3>
                    <ul>
                        <li><strong>Structural Design & Prototyping:</strong> Spearheaded the end-to-end mechanical design. Utilized Tinkercad to create a high-fidelity 3D digital twin, ensuring spatial optimization for internal hardware (Raspberry Pi, Arduino, and battery arrays) while maintaining structural integrity for the integrated payload tray.</li>
                        <li><strong>Hardware-Software Orchestration:</strong> Implemented a dual-controller architecture. A Raspberry Pi handles high-level cognitive tasks (Vision and NLP), while an Arduino manages low-level locomotion and real-time motor control.</li>
                        <li><strong>Cognitive Interaction Layer:</strong> Integrated the Gemini API to provide residents with an empathetic, voice-enabled AI companion capable of natural conversation and information retrieval.</li>
                        <li><strong>Emergency Response Subsystem:</strong> Developed a safety protocol using the Twilio API to execute cloud-based emergency calls and SMS alerts, providing a critical safety net for patients in unmonitored zones.</li>
                    </ul>
                </div>

                <div class="project-section">
                    <h3>Technical Features</h3>
                    <ul>
                        <li><strong>Intelligent Communication:</strong> Real-time speech-to-text and text-to-speech interaction via Gemini-powered NLP.</li>
                        <li><strong>Logistics Automation:</strong> A front-mounted delivery platform designed for the stable transport of medications, reports, and nutrition.</li>
                        <li><strong>Remote Mobility:</strong> A 4-motor differential drive system controlled via a custom-built smartphone application for precise maneuvering in clinical settings.</li>
                        <li><strong>Safety Integration:</strong> Integrated camera and microphone for remote patient monitoring and immediate hazard reporting.</li>
                    </ul>
                </div>

                <div class="project-section">
                    <h3>Tech Stack</h3>
                    <p>Hardware: Raspberry Pi, Arduino, Tinkercad<br>Programming: Python, C++<br>APIs: Gemini API, Twilio API<br>Tools: Tinkercad, Smartphone App</p>
                </div>

                <div class="project-section">
                    <h3>Impact & Objective</h3>
                    <p>The primary goal of AURIX is to reduce the operational workload of healthcare professionals by 15-20% through the automation of minor logistical tasks, while simultaneously improving the mental well-being of elderly patients through consistent, intelligent engagement.</p>
                </div>
            </div>
        `
    }
};

const overlay = document.getElementById('project-overlay');
const detailContainer = document.getElementById('project-details');
const closeButton = document.querySelector('.close-btn');
const projectCards = document.querySelectorAll('.project-card');
const glow = document.querySelector('.cursor-glow');
const revealItems = document.querySelectorAll('.reveal');
const copyEmailButton = document.querySelector('.copy-email-btn');

function openProject(id) {
    const project = projects[id];
    if (!project) {
        return;
    }

    detailContainer.innerHTML = `
        ${project.content}
        <div class="tags">
            ${project.stack.map((item) => `<span>${item}</span>`).join('')}
        </div>
        ${project.repo ? `<div class="project-actions"><a href="${project.repo}" class="project-link" target="_blank" rel="noopener noreferrer">Open GitHub Repository</a></div>` : ''}
    `;

    overlay.classList.remove('hidden');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('overlay-open');
}

function closeProject() {
    overlay.classList.add('hidden');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('overlay-open');
}

projectCards.forEach((card) => {
    card.addEventListener('click', () => openProject(card.dataset.project));
    card.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            openProject(card.dataset.project);
        }
    });
});

closeButton.addEventListener('click', closeProject);
overlay.addEventListener('click', (event) => {
    if (event.target.dataset.close === 'true') {
        closeProject();
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !overlay.classList.contains('hidden')) {
        closeProject();
    }
});

document.addEventListener('mousemove', (event) => {
    if (!glow) {
        return;
    }

    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
});

if (copyEmailButton) {
    copyEmailButton.addEventListener('click', async () => {
        const email = copyEmailButton.dataset.email;

        try {
            await navigator.clipboard.writeText(email);
            copyEmailButton.textContent = 'Copied';
            setTimeout(() => {
                copyEmailButton.textContent = 'Copy Email';
            }, 1800);
        } catch (error) {
            copyEmailButton.textContent = email;
        }
    });
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.16
});

revealItems.forEach((item) => observer.observe(item));
