/**
 * Interactive HTML5 Canvas Background Animation
 * Dynamic theme adaptation (Light / Dark mode)
 * Interactive node connections with mouse repulsion physics
 */

class ParticleBackground {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: null, y: null, radius: 150 };
        this.themeSettings = this.getThemeSettings();

        this.initCanvas();
        this.createParticles();
        this.registerEvents();
        this.observeThemeChanges();
        this.animate();
    }

    getThemeSettings() {
        const isLight = document.documentElement.getAttribute('data-theme') === 'light';
        return {
            // Light: pure black (#000000), Dark: gentle off-white (#e4e4e7)
            rgb: isLight ? '0, 0, 0' : '228, 228, 231',
            particleOpacity: isLight ? 0.38 : 0.12,
            lineOpacity: isLight ? 0.28 : 0.10,
            particleCount: Math.min(Math.floor((window.innerWidth * window.innerHeight) / 9000), 120)
        };
    }

    initCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        this.particles = [];
        const count = this.themeSettings.particleCount;
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                radius: Math.random() * 1.5 + 1,
                originalVx: null,
                originalVy: null
            });
        }
    }

    registerEvents() {
        window.addEventListener('resize', () => {
            this.initCanvas();
            this.themeSettings = this.getThemeSettings();
            this.createParticles();
        });

        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });

        window.addEventListener('mouseleave', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });
    }

    observeThemeChanges() {
        const observer = new MutationObserver(() => {
            this.themeSettings = this.getThemeSettings();
        });
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme']
        });
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const rgb = this.themeSettings.rgb;
        const pOpacity = this.themeSettings.particleOpacity;
        const lOpacity = this.themeSettings.lineOpacity;

        // Update and draw particles
        this.particles.forEach((p) => {
            // Save original velocities if not set
            if (p.originalVx === null) {
                p.originalVx = p.vx;
                p.originalVy = p.vy;
            }

            // Move particle
            p.x += p.vx;
            p.y += p.vy;

            // Bounce off boundaries
            if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;

            // Keep within bounds
            p.x = Math.max(0, Math.min(p.x, this.canvas.width));
            p.y = Math.max(0, Math.min(p.y, this.canvas.height));

            // Mouse Repulsion Physics
            if (this.mouse.x !== null && this.mouse.y !== null) {
                const dx = p.x - this.mouse.x;
                const dy = p.y - this.mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < this.mouse.radius) {
                    const force = (this.mouse.radius - dist) / this.mouse.radius;
                    // Calculate repulsion angle
                    const angle = Math.atan2(dy, dx);
                    // Push particle away gently
                    const pushX = Math.cos(angle) * force * 1.2;
                    const pushY = Math.sin(angle) * force * 1.2;

                    p.vx += pushX;
                    p.vy += pushY;
                }
            }

            // Apply friction and return to base speed gently
            p.vx += (p.originalVx - p.vx) * 0.05;
            p.vy += (p.originalVy - p.vy) * 0.05;

            // Draw dot
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(${rgb}, ${pOpacity})`;
            this.ctx.fill();
        });

        // Draw connections
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const p1 = this.particles[i];
                const p2 = this.particles[j];

                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                // Connect if close enough
                if (dist < 130) {
                    const alpha = (1 - dist / 130) * lOpacity;
                    this.ctx.beginPath();
                    this.ctx.moveTo(p1.x, p1.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.strokeStyle = `rgba(${rgb}, ${alpha})`;
                    this.ctx.lineWidth = 0.8;
                    this.ctx.stroke();
                }
            }
        }

        requestAnimationFrame(() => this.animate());
    }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    new ParticleBackground('bg-canvas');
});
