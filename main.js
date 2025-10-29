// Main JavaScript functionality for Decbase website

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initTypewriter();
    initScrollAnimations();
    initPortfolioFilter();
    initTestimonialSlider();
    initFloatingShapes();
    initMobileMenu();
    initModal();
    initSmoothScrolling();
});

// Typewriter effect for hero text
function initTypewriter() {
    const typed = new Typed('#typed-text', {
        strings: [
            'Strategic Business Consulting',
            'Digital Transformation',
            'Growth & Innovation',
            'Data-Driven Solutions'
        ],
        typeSpeed: 60,
        backSpeed: 40,
        backDelay: 2000,
        startDelay: 500,
        loop: true,
        showCursor: true,
        cursorChar: '|'
    });
}

// Scroll animations
function initScrollAnimations() {
    const revealElements = document.querySelectorAll('.reveal-element');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
}

// Portfolio filtering system
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter items with animation
            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    anime({
                        targets: item,
                        opacity: [0, 1],
                        scale: [0.8, 1],
                        duration: 600,
                        easing: 'easeOutCubic',
                        delay: anime.stagger(100)
                    });
                } else {
                    anime({
                        targets: item,
                        opacity: 0,
                        scale: 0.8,
                        duration: 300,
                        easing: 'easeInCubic',
                        complete: () => {
                            item.style.display = 'none';
                        }
                    });
                }
            });
        });
    });
}

// Testimonial slider
function initTestimonialSlider() {
    const splide = new Splide('#testimonials-slider', {
        type: 'loop',
        perPage: 1,
        perMove: 1,
        gap: '2rem',
        autoplay: true,
        interval: 5000,
        pauseOnHover: true,
        breakpoints: {
            768: {
                perPage: 1
            },
            1024: {
                perPage: 2
            }
        }
    });
    
    splide.mount();
}

// Floating shapes animation using Matter.js
function initFloatingShapes() {
    const container = document.getElementById('floating-shapes');
    if (!container) return;
    
    // Create canvas for Matter.js
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    container.appendChild(canvas);
    
    // Matter.js setup
    const Engine = Matter.Engine;
    const Render = Matter.Render;
    const World = Matter.World;
    const Bodies = Matter.Bodies;
    const Mouse = Matter.Mouse;
    const MouseConstraint = Matter.MouseConstraint;
    
    const engine = Engine.create();
    const world = engine.world;
    
    // Create floating shapes
    const shapes = [];
    const shapeCount = 8;
    
    for (let i = 0; i < shapeCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 60 + 20;
        
        const shape = Bodies.circle(x, y, size, {
            render: {
                fillStyle: `rgba(139, 154, 122, ${Math.random() * 0.3 + 0.1})`,
                strokeStyle: `rgba(139, 154, 122, 0.3)`,
                lineWidth: 2
            },
            frictionAir: 0.01,
            restitution: 0.8
        });
        
        shapes.push(shape);
        World.add(world, shape);
        
        // Add gentle floating motion
        Matter.Body.applyForce(shape, shape.position, {
            x: (Math.random() - 0.5) * 0.001,
            y: (Math.random() - 0.5) * 0.001
        });
    }
    
    // Create renderer
    const render = Render.create({
        canvas: canvas,
        engine: engine,
        options: {
            width: canvas.width,
            height: canvas.height,
            wireframes: false,
            background: 'transparent',
            showAngleIndicator: false,
            showVelocity: false
        }
    });
    
    Render.run(render);
    
    // Run the engine
    Engine.run(engine);
    
    // Handle window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        render.options.width = canvas.width;
        render.options.height = canvas.height;
        Render.setPixelRatio(render, window.devicePixelRatio);
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
}

// Modal functionality for portfolio items
function initModal() {
    const modal = document.getElementById('portfolio-modal');
    const closeModal = document.getElementById('close-modal');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    
    portfolioItems.forEach(item => {
        item.addEventListener('click', () => {
            const title = item.querySelector('h3').textContent;
            const description = item.querySelector('p').textContent;
            const category = item.querySelector('span').textContent;
            const img = item.querySelector('img').src;
            
            modalTitle.textContent = title;
            modalContent.innerHTML = `
                <img src="${img}" alt="${title}" class="w-full h-64 object-cover rounded-lg mb-4">
                <div class="mb-4">
                    <span class="text-sage-green font-semibold">${category}</span>
                </div>
                <p class="text-gray-700 leading-relaxed mb-6">${description}</p>
                <div class="bg-gray-50 p-6 rounded-lg">
                    <h4 class="font-semibold text-gray-900 mb-3">Project Details</h4>
                    <ul class="space-y-2 text-gray-600">
                        <li>• Comprehensive market analysis and competitive landscape assessment</li>
                        <li>• Strategic roadmap development with clear milestones and KPIs</li>
                        <li>• Implementation support and change management guidance</li>
                        <li>• Ongoing performance monitoring and optimization</li>
                    </ul>
                </div>
                <div class="mt-6 flex gap-4">
                    <button class="btn-primary text-white px-6 py-3 rounded-lg font-semibold">
                        View Case Study
                    </button>
                    <button class="border-2 border-sage-green text-sage-green px-6 py-3 rounded-lg font-semibold hover:bg-sage-green hover:text-white transition-all duration-300">
                        Contact Us
                    </button>
                </div>
            `;
            
            modal.classList.add('active');
        });
    });
    
    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Navigation active state management
function updateActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Call navigation update on page load
document.addEventListener('DOMContentLoaded', updateActiveNavigation);

// Button click handlers
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-primary') || e.target.textContent.includes('Get Started') || e.target.textContent.includes('Start Your Transformation')) {
        e.preventDefault();
        
        // Add click animation
        anime({
            targets: e.target,
            scale: [1, 0.95, 1],
            duration: 200,
            easing: 'easeInOutQuad'
        });
        
        // Show coming soon message
        showNotification('Coming Soon! This feature will be available shortly.');
    }
});

// Notification system
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'fixed top-20 right-4 bg-sage-green text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Slide in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Slide out and remove
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Service card hover effects
document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            anime({
                targets: card,
                translateY: -8,
                rotateX: 5,
                rotateY: 5,
                duration: 300,
                easing: 'easeOutCubic'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            anime({
                targets: card,
                translateY: 0,
                rotateX: 0,
                rotateY: 0,
                duration: 300,
                easing: 'easeOutCubic'
            });
        });
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero-bg');
    
    if (heroSection) {
        const rate = scrolled * -0.5;
        heroSection.style.transform = `translateY(${rate}px)`;
    }
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
    // Scroll-based animations can be added here
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);

// Preload critical images
function preloadImages() {
    const criticalImages = [
        'resources/consulting-hero.png',
        'resources/hero-bg.png'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize preloading
document.addEventListener('DOMContentLoaded', preloadImages);