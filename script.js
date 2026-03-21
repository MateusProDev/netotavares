// DOM Elements
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');
const scrollToTopBtn = document.getElementById('scroll-to-top');
const heroSlides = document.querySelectorAll('.hero-slide');
const heroIndicators = document.querySelectorAll('.indicator');
const heroPrevBtn = document.querySelector('.hero-prev');
const heroNextBtn = document.querySelector('.hero-next');

// State
let currentSlide = 0;
let slideInterval;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initScrollToTop();
    initHeroSlider();
    initScrollAnimations();
    initSmoothScroll();
});

// Mobile Menu Toggle
function initMobileMenu() {
    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenu.contains(e.target) && !navMenu.contains(e.target)) {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// Scroll to Top Button
function initScrollToTop() {
    if (scrollToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        });

        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Hero Slider
function initHeroSlider() {
    if (heroSlides.length > 0) {
        // Auto slide
        slideInterval = setInterval(nextSlide, 5000);

        // Previous button
        if (heroPrevBtn) {
            heroPrevBtn.addEventListener('click', function() {
                clearInterval(slideInterval);
                prevSlide();
                slideInterval = setInterval(nextSlide, 5000);
            });
        }

        // Next button
        if (heroNextBtn) {
            heroNextBtn.addEventListener('click', function() {
                clearInterval(slideInterval);
                nextSlide();
                slideInterval = setInterval(nextSlide, 5000);
            });
        }

        // Indicators
        heroIndicators.forEach((indicator, index) => {
            indicator.addEventListener('click', function() {
                clearInterval(slideInterval);
                goToSlide(index);
                slideInterval = setInterval(nextSlide, 5000);
            });
        });

        // Pause on hover
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.addEventListener('mouseenter', function() {
                clearInterval(slideInterval);
            });

            heroSection.addEventListener('mouseleave', function() {
                slideInterval = setInterval(nextSlide, 5000);
            });
        }
    }
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % heroSlides.length;
    updateSlide();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + heroSlides.length) % heroSlides.length;
    updateSlide();
}

function goToSlide(index) {
    currentSlide = index;
    updateSlide();
}

function updateSlide() {
    // Update slides
    heroSlides.forEach((slide, index) => {
        slide.classList.remove('active');
        if (index === currentSlide) {
            slide.classList.add('active');
        }
    });

    // Update indicators
    heroIndicators.forEach((indicator, index) => {
        indicator.classList.remove('active');
        if (index === currentSlide) {
            indicator.classList.add('active');
        }
    });
}

// Smooth Scroll for Navigation Links
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.service-card, .destination-card, .feature-item, .stat-item, .contact-item'
    );

    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Staggered animation for grids
    const serviceCards = document.querySelectorAll('.service-card');
    const destinationCards = document.querySelectorAll('.destination-card');

    function staggerAnimation(elements, baseDelay = 100) {
        elements.forEach((element, index) => {
            element.style.animationDelay = `${index * baseDelay}ms`;
        });
    }

    staggerAnimation(serviceCards);
    staggerAnimation(destinationCards);
}



// Header Scroll Effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Active Navigation Link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    const scrollPosition = window.scrollY + 200;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Parallax Effect for Hero
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-slide');
    const rate = scrolled * -0.5;

    parallaxElements.forEach(element => {
        element.style.transform = `translateY(${rate}px)`;
    });
});

// Lazy Loading for Images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', initLazyLoading);

// WhatsApp Integration
function openWhatsApp(message = '') {
    const phone = '5585986518089'; // Replace with actual phone number
    const defaultMessage = 'Olá! Gostaria de mais informações sobre os passeios da Neto Tavares.';
    const finalMessage = message || defaultMessage;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(finalMessage)}`;
    window.open(url, '_blank');
}

// Add WhatsApp floating button
function createWhatsAppButton() {
    const whatsappBtn = document.createElement('a');
    whatsappBtn.href = '#';
    whatsappBtn.className = 'whatsapp-float';
    whatsappBtn.innerHTML = '<i class="fab fa-whatsapp"></i>';
    whatsappBtn.title = 'Fale conosco no WhatsApp';
    
    whatsappBtn.addEventListener('click', function(e) {
        e.preventDefault();
        openWhatsApp();
    });
    
    document.body.appendChild(whatsappBtn);
}

// Add WhatsApp button styles
const whatsappStyles = `
.whatsapp-float {
    position: fixed;
    width: 60px;
    height: 60px;
    bottom: 100px;
    right: 30px;
    background-color: #25d366;
    color: #FFF;
    border-radius: 50px;
    text-align: center;
    font-size: 30px;
    box-shadow: 2px 2px 10px rgba(0,0,0,0.2);
    z-index: 1000;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    animation: pulse 2s infinite;
}

.whatsapp-float:hover {
    background-color: #128C7E;
    transform: scale(1.1);
    color: #FFF;
    text-decoration: none;
}

@keyframes pulse {
    0% {
        box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7);
    }
    70% {
        box-shadow: 0 0 0 10px rgba(37, 211, 102, 0);
    }
    100% {
        box-shadow: 0 0 0 0 rgba(37, 211, 102, 0);
    }
}

@media (max-width: 768px) {
    .whatsapp-float {
        width: 50px;
        height: 50px;
        font-size: 25px;
        bottom: 80px;
        right: 20px;
    }
}
`;

// Inject WhatsApp styles
const styleSheet = document.createElement('style');
styleSheet.textContent = whatsappStyles;
document.head.appendChild(styleSheet);

// Create WhatsApp button when DOM is ready
document.addEventListener('DOMContentLoaded', createWhatsAppButton);

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
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

// Apply debouncing to scroll-heavy functions
window.addEventListener('scroll', debounce(updateActiveNavLink, 100));

// Error handling for failed image loads
document.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2VlZSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjYWFhIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2VtIG7Do28gZGlzcG9uw612ZWw8L3RleHQ+PC9zdmc+';
        e.target.alt = 'Imagem não disponível';
    }
}, true);

// Console welcome message
console.log('%c🏖️ Neto Tavares - Bem-vindo ao paraíso!', 'color: #1565C0; font-size: 16px; font-weight: bold;');
console.log('%cSite desenvolvido com amor para mostrar as belezas do Ceará!', 'color: #0056b3; font-size: 12px;');