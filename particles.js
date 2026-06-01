class Particle {
    constructor(x, y, vx, vy, color, life) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.color = color;
        this.life = life;
        this.maxLife = life;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.2; // gravity
        this.life--;
    }

    draw(ctx) {
        const opacity = this.life / this.maxLife;
        ctx.globalAlpha = opacity;
        ctx.fillStyle = this.color;
        
        const size = 4 * opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, size, 0, Math.PI * 2);
        ctx.fill();
    }
}

class ParticleSystem {
    static particles = [];
    static canvas = null;
    static ctx = null;
    static animationId = null;

    static initialize() {
        if (this.canvas) return; // Already initialized

        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '9999';
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');

        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        });

        this.animate();
    }

    static animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Update and draw particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
            this.particles[i].update();
            this.particles[i].draw(this.ctx);

            if (this.particles[i].life <= 0) {
                this.particles.splice(i, 1);
            }
        }

        this.ctx.globalAlpha = 1;

        if (this.particles.length > 0) {
            this.animationId = requestAnimationFrame(() => this.animate());
        } else {
            this.animationId = null;
        }
    }

    static burst(x, y, type = 'default') {
        this.initialize();

        const colorMap = {
            gold: '#FFD700',
            blue: '#4A90E2',
            red: '#FF4444',
            rainbow: ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3'],
            default: '#667eea'
        };

        let colors = colorMap[type] || colorMap.default;
        if (!Array.isArray(colors)) {
            colors = [colors];
        }

        const particleCount = type === 'rainbow' ? 50 : 30;

        for (let i = 0; i < particleCount; i++) {
            const angle = (i / particleCount) * Math.PI * 2;
            const speed = 3 + Math.random() * 5;
            const vx = Math.cos(angle) * speed;
            const vy = Math.sin(angle) * speed - 2;
            
            const color = colors[Math.floor(Math.random() * colors.length)];
            const life = 40 + Math.random() * 30;

            this.particles.push(new Particle(x, y, vx, vy, color, life));
        }

        if (!this.animationId) {
            this.animate();
        }
    }

    static confetti(x, y, count = 50) {
        this.initialize();

        const colors = ['#FFD700', '#FF6B6B', '#4A90E2', '#50E3C2', '#F5A623'];

        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 2 + Math.random() * 6;
            const vx = Math.cos(angle) * speed;
            const vy = Math.sin(angle) * speed - 3;

            const color = colors[Math.floor(Math.random() * colors.length)];
            const life = 60 + Math.random() * 40;

            this.particles.push(new Particle(x, y, vx, vy, color, life));
        }

        if (!this.animationId) {
            this.animate();
        }
    }

    static trail(x, y, color = '#667eea') {
        this.initialize();

        for (let i = 0; i < 5; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 1 + Math.random() * 2;
            const vx = Math.cos(angle) * speed;
            const vy = Math.sin(angle) * speed;

            const life = 20 + Math.random() * 10;

            this.particles.push(new Particle(x, y, vx, vy, color, life));
        }

        if (!this.animationId) {
            this.animate();
        }
    }
}

// Initialize particle system on page load
document.addEventListener('DOMContentLoaded', () => {
    ParticleSystem.initialize();
});
