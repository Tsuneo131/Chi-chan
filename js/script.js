// ========================================
// Mobile Navigation Toggle
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Toggle body scroll
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target) || navToggle.contains(event.target);
        
        if (!isClickInsideNav && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// ========================================
// Smooth Scrolling for Navigation Links
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerOffset = 70;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// Header Scroll Effect
// ========================================
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;

    // Add shadow when scrolled
    if (currentScroll > 10) {
        header.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
    }

    lastScroll = currentScroll;
});

// ========================================
// Intersection Observer for Fade-in Animation
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all elements with fade-in class
document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
});

// ========================================
// Dynamic Year in Footer
// ========================================
const currentYear = new Date().getFullYear();
const copyrightElement = document.querySelector('.footer-copyright');
if (copyrightElement) {
    copyrightElement.textContent = `© ${currentYear} ちーちゃん. All rights reserved.`;
}

// ========================================
// Loading Animation for External Links
// ========================================
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener('click', function(e) {
        // Add a subtle loading state
        this.style.opacity = '0.6';
        setTimeout(() => {
            this.style.opacity = '1';
        }, 300);
    });
});

// ========================================
// Scroll Progress Indicator
// ========================================
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 70px;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #E1306C, #833AB4);
        z-index: 1001;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

createScrollProgress();

// ========================================
// Add Hover Effect to Cards
// ========================================
function addCardHoverEffect() {
    const cards = document.querySelectorAll('.account-card, .result-card, .service-card, .contact-button');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
}

addCardHoverEffect();

// ========================================
// Lazy Loading for Images (if added in future)
// ========================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========================================
// Scroll to Top Button (Optional Enhancement)
// ========================================
function createScrollToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'scroll-to-top';
    button.setAttribute('aria-label', 'トップへ戻る');
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #E1306C, #833AB4);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
        z-index: 999;
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(button);

    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            button.style.display = 'flex';
        } else {
            button.style.display = 'none';
        }
    });

    // Scroll to top on click
    button.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Hover effect
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3)';
    });

    button.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.2)';
    });
}

createScrollToTopButton();

// ========================================
// Performance: Debounce Scroll Events
// ========================================
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

// Apply debounce to scroll-heavy operations if needed
const debouncedScrollHandler = debounce(function() {
    // Additional scroll operations can be added here
}, 100);

window.addEventListener('scroll', debouncedScrollHandler);

// ========================================
// Console Message (Easter Egg)
// ========================================
console.log('%c👋 こんにちは！', 'font-size: 24px; font-weight: bold; color: #E1306C;');
console.log('%cこのサイトに興味を持っていただきありがとうございます！\nSNS運用について相談したいことがあれば、お気軽にご連絡ください 🐰', 'font-size: 14px; color: #833AB4;');

// ========================================
// Accessibility: Focus Management
// ========================================
document.addEventListener('keydown', function(e) {
    // Close mobile menu on Escape key
    if (e.key === 'Escape') {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (navMenu && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// Add focus visible for better keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-nav');
});

// ========================================
// Analytics Event Tracking (Ready for GA/GTM)
// ========================================
function trackEvent(category, action, label) {
    // Ready for Google Analytics implementation
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
    
    console.log('Event tracked:', category, action, label);
}

// Track CTA clicks
document.querySelectorAll('.btn, .contact-button, .account-link, .result-link').forEach(element => {
    element.addEventListener('click', function() {
        const text = this.textContent.trim() || this.getAttribute('aria-label') || 'Unknown';
        trackEvent('User Interaction', 'Click', text);
    });
});

// ========================================
// Page Load Performance
// ========================================
window.addEventListener('load', function() {
    // Log page load time
    if (window.performance) {
        const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
        console.log('Page loaded in:', loadTime + 'ms');
    }

    // Trigger initial animations
    document.querySelectorAll('.fade-in').forEach(element => {
        if (element.getBoundingClientRect().top < window.innerHeight) {
            element.classList.add('visible');
        }
    });
});

// ========================================
// Service Worker Registration (for PWA - Optional)
// ========================================
if ('serviceWorker' in navigator) {
    // Uncomment when service worker is ready
    // navigator.serviceWorker.register('/sw.js').then(function(registration) {
    //     console.log('ServiceWorker registration successful:', registration.scope);
    // }).catch(function(err) {
    //     console.log('ServiceWorker registration failed:', err);
    // });
}

// ========================================
// Add Custom Cursor Effect (Optional Enhancement)
// ========================================
function createCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        width: 20px;
        height: 20px;
        border: 2px solid #E1306C;
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.2s ease;
        display: none;
    `;
    
    // Uncomment to enable custom cursor
    // document.body.appendChild(cursor);
    
    // document.addEventListener('mousemove', function(e) {
    //     cursor.style.left = e.clientX - 10 + 'px';
    //     cursor.style.top = e.clientY - 10 + 'px';
    //     cursor.style.display = 'block';
    // });
    
    // document.querySelectorAll('a, button').forEach(element => {
    //     element.addEventListener('mouseenter', function() {
    //         cursor.style.transform = 'scale(1.5)';
    //     });
    //     element.addEventListener('mouseleave', function() {
    //         cursor.style.transform = 'scale(1)';
    //     });
    // });
}

// createCustomCursor();

// ========================================
// Form Validation (if contact form is added)
// ========================================
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// Ready for contact form implementation
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input[type="email"]');
        if (email && !validateEmail(email.value)) {
            alert('正しいメールアドレスを入力してください');
            return;
        }
        
        // Form submission logic here
        console.log('Form submitted');
    });
});

// ========================================
// Initialize All Features
// ========================================
console.log('✨ All scripts loaded successfully!');

// ========================================
// 🔥 FORCE MOBILE LAYOUT - EMERGENCY FIX
// ========================================
function forceMobileLayout() {
    const width = window.innerWidth;
    console.log('📱 Screen width:', width + 'px');
    
    if (width <= 768) {
        console.log('🔧 Forcing mobile layout...');
        
        // Force 1-column grid
        const grids = document.querySelectorAll('.results-grid, .accounts-grid, .services-grid');
        grids.forEach(grid => {
            grid.style.gridTemplateColumns = '1fr';
            grid.style.gap = '24px';
        });
        
        // Force card padding
        const cards = document.querySelectorAll('.result-card, .account-card, .service-card');
        cards.forEach(card => {
            card.style.padding = '32px 16px';
        });
        
        // Force font sizes
        document.querySelectorAll('.result-title').forEach(el => {
            el.style.fontSize = '18px';
        });
        
        document.querySelectorAll('.result-badge').forEach(el => {
            el.style.fontSize = '11px';
            el.style.padding = '5px 14px';
        });
        
        document.querySelectorAll('.metric-number').forEach(el => {
            el.style.fontSize = '22px';
        });
        
        document.querySelectorAll('.result-description').forEach(el => {
            el.style.fontSize = '14px';
            el.style.lineHeight = '1.75';
        });
        
        console.log('✅ Mobile layout applied!');
    }
    
    if (width <= 480) {
        console.log('🔧 Forcing small mobile layout...');
        
        document.querySelectorAll('.result-badge').forEach(el => {
            el.style.fontSize = '10px';
        });
        
        document.querySelectorAll('.result-title').forEach(el => {
            el.style.fontSize = '17px';
        });
        
        document.querySelectorAll('.metric-number').forEach(el => {
            el.style.fontSize = '20px';
        });
        
        document.querySelectorAll('.result-description').forEach(el => {
            el.style.fontSize = '13px';
        });
        
        console.log('✅ Small mobile layout applied!');
    }
}

// Apply on load
window.addEventListener('load', forceMobileLayout);

// Apply on resize (debounced)
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(forceMobileLayout, 250);
});

// Apply immediately
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', forceMobileLayout);
} else {
    forceMobileLayout();
}