import { api } from '../../services/api.js';
import { components } from './components.js';

let projectsData = [];

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const [projects, skills, certs, leadership, events] = await Promise.all([
            api.getProjects(),
            api.getSkills(),
            api.getCertificates(),
            api.getLeadership(),
            api.getEvents()
        ]);

        projectsData = projects || [];
        renderProjects(projectsData);
        renderSkills(skills || []);
        renderCertificates(certs || []);
        renderLeadership(leadership || []);
        renderEvents(events || []);

        initObserver();

    } catch (error) {
        console.error('Error rendering dynamic content:', error);
    }
});

function renderProjects(projects) {
    const container = document.querySelector('.project-grid');
    if (!container) return;
    
    let displayProjects = projects;
    if (window.location.pathname === '/' || window.location.pathname.endsWith('index.html')) {
        displayProjects = projects.slice(0, 4);
    }
    
    container.innerHTML = displayProjects.map(p => components.projectCard(p)).join('');
    
    const cards = container.querySelectorAll('.project-card');
    cards.forEach(card => {
        card.addEventListener('click', () => openProjectModal(card.dataset.projectId));
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openProjectModal(card.dataset.projectId);
            }
        });
    });
}

function renderSkills(skills) {
    const container = document.querySelector('.skills-layout');
    if (!container) return;
    
    const grouped = skills.reduce((acc, skill) => {
        if (!acc[skill.category]) acc[skill.category] = [];
        acc[skill.category].push(skill);
        return acc;
    }, {});

    const html = Object.keys(grouped).map(category => 
        components.skillCard(category, grouped[category])
    ).join('');
    
    container.innerHTML = html;
}

function renderCertificates(certs) {
    const container = document.querySelector('.cert-grid');
    if (!container) return;

    let displayCerts = certs;
    if (window.location.pathname === '/' || window.location.pathname.endsWith('index.html')) {
        displayCerts = certs.slice(0, 6);
    }

    container.innerHTML = displayCerts.map(c => components.certCard(c)).join('');

    const cards = container.querySelectorAll('.cert-card');
    cards.forEach(card => {
        card.style.cursor = 'pointer';
        card.setAttribute('tabindex', '0');
        const clickHandler = () => {
            const img = card.querySelector('img');
            if (img && window.openCertificate) {
                window.openCertificate(img.src, img.alt);
            }
        };
        card.addEventListener('click', clickHandler);
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                clickHandler();
            }
        });
    });
}

function renderLeadership(leadership) {
    const container = document.querySelector('.leadership-section .background-grid');
    if (!container) return;
    container.innerHTML = leadership.map(l => components.leadershipCard(l)).join('');
}

function renderEvents(events) {
    const container = document.querySelector('#events .background-grid');
    if (!container) return;
    container.innerHTML = events.map(e => components.eventCard(e)).join('');
}

function openProjectModal(id) {
    const project = projectsData.find(p => p.id === id);
    if (!project) return;
    
    const detailContainer = document.getElementById('project-details');
    const overlay = document.getElementById('project-overlay');

    detailContainer.innerHTML = `
        <div class="overlay-copy">
            <span class="detail-label">Project Details</span>
            <h2 id="project-title">${project.title}</h2>
            ${project.problem_statement ? `
            <div class="project-section">
                <h3>Problem Statement</h3>
                <p>${project.problem_statement}</p>
            </div>` : ''}
            ${project.objective ? `
            <div class="project-section">
                <h3>Objective</h3>
                <p>${project.objective}</p>
            </div>` : ''}
            ${project.full_description ? `
            <div class="project-section">
                <h3>Description</h3>
                <p>${project.full_description}</p>
            </div>` : ''}
            ${project.features && project.features.length ? `
            <div class="project-section">
                <h3>Features</h3>
                <ul>${project.features.map(f => `<li>${f}</li>`).join('')}</ul>
            </div>` : ''}
            ${project.thumbnail ? `
            <div class="project-section">
                <img src="${project.thumbnail}" style="max-width:100%; border-radius:8px;" alt="${project.title}">
            </div>` : ''}
        </div>
        <div class="tags">
            ${(project.tech_stack || []).map(item => `<span>${item}</span>`).join('')}
        </div>
        ${project.github_url ? `<div class="project-actions"><a href="${project.github_url}" class="project-link" target="_blank" rel="noopener noreferrer">Open GitHub Repository</a></div>` : ''}
        ${project.live_demo ? `<div class="project-actions"><a href="${project.live_demo}" class="project-link" target="_blank" rel="noopener noreferrer">Live Demo</a></div>` : ''}
    `;

    overlay.classList.remove('hidden');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('overlay-open');
}

function initObserver() {
    const revealItems = document.querySelectorAll('.reveal:not(.visible)');
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
}
