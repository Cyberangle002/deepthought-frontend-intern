// Create floating particles
function createParticles() {
    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
        document.body.appendChild(particle);
    }
}

// Initialize particles on page load
createParticles();

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 1s ease forwards';
        }
    });
}, observerOptions);

// Observe all cards for animation
document.querySelectorAll('.tech-card, .quality-card, .mindset-card').forEach(card => {
    observer.observe(card);
});

// CTA button click handler
document.querySelector('.cta-nav').addEventListener('click', () => {
    alert('Welcome to DeepThought! Ready to start your learning journey?');
});

// Mobile menu toggle (if needed in future)
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        const navLinks = document.querySelector('.nav-links');
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });
}

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / 800);
    }
});

// Tech card click handler
document.querySelectorAll('.tech-card').forEach(card => {
    card.addEventListener('click', function() {
        const techName = this.querySelector('h3').textContent;
        console.log(`Clicked on: ${techName}`);
        // You can add more functionality here
    });
});

// Add hover sound effect (optional - commented out)
/*
document.querySelectorAll('.tech-card, .quality-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        // Play hover sound
        // const audio = new Audio('hover-sound.mp3');
        // audio.play();
    });
});
*/

// Log page load time
window.addEventListener('load', () => {
    console.log('DeepThought page loaded successfully!');
    console.log('Page load time:', performance.now().toFixed(2), 'ms');
});