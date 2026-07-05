const overlay = document.getElementById('project-overlay');
const detailContainer = document.getElementById('project-details');
const closeButton = document.querySelector('.close-btn');
const glow = document.querySelector('.cursor-glow');
const copyEmailButton = document.querySelector('.copy-email-btn');
const revealItems = document.querySelectorAll('.reveal');

function closeProject() {
    overlay.classList.add('hidden');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('overlay-open');
}

window.closeProject = closeProject;

window.openCertificate = function(imgSrc, altText) {
    detailContainer.innerHTML = `
        <div class="overlay-copy" style="text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <img src="${imgSrc}" alt="${altText}" style="max-width: 100%; max-height: 85vh; height: auto; border-radius: 12px; box-shadow: 0 10px 40px rgba(0,0,0,0.5); object-fit: contain;">
            <h3 style="margin-top: 1.5rem; color: var(--text-main); font-size: 1.5rem;">${altText}</h3>
        </div>
    `;

    overlay.classList.remove('hidden');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('overlay-open');
};

const resumeBtn = document.getElementById('resume-btn');
if (resumeBtn) {
    resumeBtn.addEventListener('click', () => {
        const imgSrc = resumeBtn.dataset.resumeSrc;
        if (imgSrc) {
            window.openCertificate(imgSrc, 'Rachit Kanchan - Resume');
        }
    });
}

if (closeButton) {
    closeButton.addEventListener('click', closeProject);
}

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

// --- Advanced Cyber-Minimalist Interactions ---

// 1. 3D Tilt Effect for Cards
const tiltCards = document.querySelectorAll('.skill-card, .project-card, .timeline-card, .about-card');
tiltCards.forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Max rotation of 6 degrees for a subtle tech feel
        const rotateX = ((y - centerY) / centerY) * -6; 
        const rotateY = ((x - centerX) / centerX) * 6;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        card.style.transition = 'none';
        
        // Dynamic border highlight based on cursor position
        card.style.borderColor = 'rgba(0, 82, 255, 0.5)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transition = 'transform 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease';
        card.style.borderColor = '';
    });
});

// 2. Cyberpunk Hacker Text Effect
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";
const scramblers = document.querySelectorAll('.section-kicker, .eyebrow');

scramblers.forEach(el => {
    el.addEventListener('mouseover', event => {
        let iterations = 0;
        const target = event.target;
        const targetText = target.dataset.value || target.innerText;
        
        if (!target.dataset.value) {
            target.dataset.value = targetText;
        }
        
        clearInterval(target.interval);
        
        target.interval = setInterval(() => {
            target.innerText = targetText.split("")
                .map((letter, index) => {
                    if(index < iterations) {
                        return targetText[index];
                    }
                    return letters[Math.floor(Math.random() * letters.length)]
                })
                .join("");
            
            if(iterations >= targetText.length){ 
                clearInterval(target.interval);
                target.innerText = targetText; // Ensure exact match at the end
            }
            iterations += 1 / 3;
        }, 30);
    });
});

// 3. Enhanced Interactive Cursor Glow
const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-card, .timeline-card');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        if (glow) {
            glow.style.transform = 'translate(-50%, -50%) scale(1.6)';
            glow.style.background = 'radial-gradient(circle, rgba(0, 82, 255, 0.25) 0%, rgba(0, 82, 255, 0) 70%)';
        }
    });
    el.addEventListener('mouseleave', () => {
        if (glow) {
            glow.style.transform = 'translate(-50%, -50%) scale(1)';
            glow.style.background = ''; // Reverts to CSS defined background
        }
    });
});

// 4. Theme Toggle Logic
const themeToggleBtn = document.getElementById('theme-toggle');
const moonIcon = document.querySelector('.moon-icon');
const sunIcon = document.querySelector('.sun-icon');

const currentTheme = localStorage.getItem('theme') || 'dark';

if (currentTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    if(moonIcon && sunIcon) {
        moonIcon.style.display = 'block';
        sunIcon.style.display = 'none';
    }
}

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        if (theme === 'light') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'dark');
            if(moonIcon && sunIcon) {
                moonIcon.style.display = 'none';
                sunIcon.style.display = 'block';
            }
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            if(moonIcon && sunIcon) {
                moonIcon.style.display = 'block';
                sunIcon.style.display = 'none';
            }
        }
    });
}

// 5. Scroll to Top Button
const scrollToTopBtn = document.getElementById('scroll-to-top');

if (scrollToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
