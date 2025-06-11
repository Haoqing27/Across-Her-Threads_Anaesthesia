// MNTN Landing Page JavaScript

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavbar();
    initializeParallax();
    initializeScrollAnimations();
    initializeSmoothScroll();
});

// Navbar functionality
function initializeNavbar() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(11, 20, 38, 0.95)';
            navbar.style.padding = '1rem 0';
        } else {
            navbar.style.background = 'rgba(11, 20, 38, 0.9)';
            navbar.style.padding = '2rem 0';
        }
    });
}

// Parallax effect for hero section
function initializeParallax() {
    const bgImage = document.querySelector('.bg-image');
    const heroContent = document.querySelector('.hero-content');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        
        if (bgImage) {
            bgImage.style.transform = `scale(1.1) translateY(${scrolled * parallaxSpeed}px)`;
        }
        
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
}

// Scroll animations using IntersectionObserver
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe content items
    const contentItems = document.querySelectorAll('.content-item');
    contentItems.forEach(function(item, index) {
        item.style.opacity = '0';
        item.style.transform = 'translateY(50px)';
        item.style.transition = `opacity 0.8s ease ${index * 0.2}s, transform 0.8s ease ${index * 0.2}s`;
        observer.observe(item);
    });
    
    // Observe footer if exists
    const footer = document.querySelector('.footer');
    if (footer) {
        footer.style.opacity = '0';
        footer.style.transform = 'translateY(30px)';
        footer.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(footer);
    }
}

// Smooth scroll functionality for hero and nav links
function initializeSmoothScroll() {
    const heroScroll = document.querySelector('.hero-cta');
    
    if (heroScroll) {
        heroScroll.addEventListener('click', function() {
            const contentSection = document.querySelector('.content-section');
            if (contentSection) {
                contentSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Additional animations and effects
function initializeAdditionalEffects() {
    // Floating animation for social icons
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(function(icon, index) {
        icon.style.animationDelay = `${index * 0.2}s`;
        icon.classList.add('float-animation');
    });
    
    // Hover effects for content images
    const contentImages = document.querySelectorAll('.content-image');
    contentImages.forEach(function(image) {
        image.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        image.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Dynamic number animation on hover
    const contentNumbers = document.querySelectorAll('.content-number');
    contentNumbers.forEach(function(number) {
        number.addEventListener('mouseenter', function() {
            this.style.color = 'rgba(251, 215, 132, 0.1)';
            this.style.transform = 'scale(1.1)';
        });
        
        number.addEventListener('mouseleave', function() {
            this.style.color = 'rgba(255, 255, 255, 0.05)';
            this.style.transform = 'scale(1)';
        });
    });
}

// Mouse movement parallax effect for the hero
function initializeMouseParallax() {
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        const hero = document.querySelector('.hero');
        if (hero) {
            const bgImage = hero.querySelector('.bg-image');
            if (bgImage) {
                const moveX = (mouseX - 0.5) * 20;
                const moveY = (mouseY - 0.5) * 20;
                bgImage.style.transform = `scale(1.1) translate(${moveX}px, ${moveY}px)`;
            }
        }
    });
}

// Loading animation for hero text elements
function initializeLoadingAnimation() {
    const elements = document.querySelectorAll('.hero-text > *');
    elements.forEach(function(element, index) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `opacity 0.8s ease ${index * 0.2 + 0.5}s, transform 0.8s ease ${index * 0.2 + 0.5}s`;
        
        setTimeout(function() {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, (index * 200) + 500);
    });
}

// Scroll progress indicator displayed at the top of the page
function initializeScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #FBD784, #F4A261);
        z-index: 10000;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Initialize additional effects when page loads
window.addEventListener('load', function() {
    initializeAdditionalEffects();
    initializeMouseParallax();
    initializeLoadingAnimation();
    initializeScrollProgress();
});

// Resize handler: recalculate the parallax effect on resize
window.addEventListener('resize', function() {
    initializeParallax();
});

// Performance optimization - throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Apply throttling for scroll-heavy functions (example usage)
window.addEventListener('scroll', throttle(function() {
    // You can add throttled scroll events here if needed.
}, 16)); // ~60fps

// MARQUEE: Scroll-Triggered Animation with Static Display (Reversed Direction)
const marqueeContainer = document.querySelector('.marquee-container');
const marqueeTextPath = document.getElementById('marqueePath');
let marqueeOffset = 0;

if (marqueeContainer) {
  marqueeContainer.addEventListener('wheel', function(e) {
    // Prevent the default page scroll while interacting with the marquee.
    e.preventDefault();

    // Adjust the marquee offset using subtraction to reverse the movement.
    const factor = 0.2; // Adjust the multiplier for sensitivity.
    marqueeOffset = marqueeOffset - e.deltaY * factor;

    // Wrap the offset so that it stays within the 0%-100% range.
    marqueeOffset = ((marqueeOffset % 100) + 100) % 100;

    if (marqueeTextPath) {
      marqueeTextPath.setAttribute('startOffset', marqueeOffset + '%');
    }
  }, { passive: false });
}
// Listen for scroll, resize, and load events to update the marquee position
window.addEventListener('scroll', updateMarqueeOnScroll, { passive: true });
window.addEventListener('resize', updateMarqueeOnScroll);
window.addEventListener('load', updateMarqueeOnScroll);