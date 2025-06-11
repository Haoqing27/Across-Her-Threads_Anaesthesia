// Global variables
let currentSection = 0;
const totalSections = 3;
let isScrolling = false;
let touchStartY = 0;
let touchEndY = 0;

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    updateActiveStates();
});

// Setup all event listeners
function setupEventListeners() {
    // Mouse wheel event
    document.addEventListener('wheel', handleScroll, { passive: false });
    
    // Keyboard navigation
    document.addEventListener('keydown', handleKeyPress);
    
    // Touch events for mobile
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    // Navigation track clicks
    const navTrack = document.querySelector('.nav-dot-track');
    navTrack.addEventListener('click', handleTrackClick);
    
    // Moving dot drag (optional enhancement)
    const movingDot = document.querySelector('.nav-dot-moving');
    movingDot.addEventListener('mousedown', handleDotDragStart);
    
    // Prevent default scroll behavior
    document.addEventListener('scroll', preventScroll, { passive: false });
}

// Handle mouse wheel scrolling
function handleScroll(e) {
    e.preventDefault();
    
    if (isScrolling) return;
    
    const delta = e.deltaY;
    
    if (delta > 0 && currentSection < totalSections - 1) {
        // Scroll down
        nextSection();
    } else if (delta < 0 && currentSection > 0) {
        // Scroll up
        previousSection();
    }
}

// Handle keyboard navigation
function handleKeyPress(e) {
    if (isScrolling) return;
    
    switch(e.key) {
        case 'ArrowDown':
        case ' ':
            e.preventDefault();
            if (currentSection < totalSections - 1) {
                nextSection();
            }
            break;
        case 'ArrowUp':
            e.preventDefault();
            if (currentSection > 0) {
                previousSection();
            }
            break;
        case 'Home':
            e.preventDefault();
            goToSection(0);
            break;
        case 'End':
            e.preventDefault();
            goToSection(totalSections - 1);
            break;
    }
}

// Handle touch events for mobile
function handleTouchStart(e) {
    touchStartY = e.touches[0].clientY;
}

function handleTouchEnd(e) {
    if (isScrolling) return;
    
    touchEndY = e.changedTouches[0].clientY;
    const deltaY = touchStartY - touchEndY;
    const minSwipeDistance = 50;
    
    if (Math.abs(deltaY) > minSwipeDistance) {
        if (deltaY > 0 && currentSection < totalSections - 1) {
            // Swipe up - go to next section
            nextSection();
        } else if (deltaY < 0 && currentSection > 0) {
            // Swipe down - go to previous section
            previousSection();
        }
    }
}

// Navigation functions
function nextSection() {
    if (currentSection < totalSections - 1) {
        currentSection++;
        updateActiveStates();
    }
}

function previousSection() {
    if (currentSection > 0) {
        currentSection--;
        updateActiveStates();
    }
}

function goToSection(sectionIndex) {
    if (sectionIndex >= 0 && sectionIndex < totalSections && sectionIndex !== currentSection) {
        currentSection = sectionIndex;
        updateActiveStates();
    }
}

// Update active states for sections and navigation
function updateActiveStates() {
    if (isScrolling) return;
    
    isScrolling = true;
    
    // Move sections container horizontally
    const sectionsContainer = document.querySelector('.sections-container');
    const translateX = -currentSection * 100; // Move by 100vw for each section
    sectionsContainer.style.transform = `translateX(${translateX}vw)`;
    
    // Move hemisphere line
    const hemispheLine = document.querySelector('.hemisphere-line');
    const hemisphereTranslateX = -currentSection * 30; // Subtle movement
    hemispheLine.style.transform = `translateX(calc(-50% + ${hemisphereTranslateX}vw))`;
    
    // Move the dot along the hemisphere curve
    updateDotPosition();
    
    // Update hemisphere line color
    updateHemisphereColor();
    
    // Reset scrolling flag after animation
    setTimeout(() => {
        isScrolling = false;
    }, 800);
}

// Move dot along the hemisphere curve
function updateDotPosition() {
    const movingDot = document.querySelector('.nav-dot-moving');
    const navigation = document.querySelector('.navigation');
    
    // Calculate position along the curve
    const progress = currentSection / (totalSections - 1); // 0 to 1
    const angle = Math.PI * progress; // 0 to π (semicircle)
    
    // Get navigation container dimensions
    const navWidth = navigation.offsetWidth;
    const navHeight = navigation.offsetHeight;
    
    // Calculate position on semicircle
    const radius = navWidth / 2;
    const centerX = navWidth / 2;
    const centerY = navHeight;
    
    const x = centerX + radius * Math.cos(Math.PI - angle) - 10; // -10 to center the dot
    const y = centerY + radius * Math.sin(Math.PI - angle) - 10; // -10 to center the dot
    
    movingDot.style.left = `${x}px`;
    movingDot.style.bottom = `${navHeight - y}px`;
    
    // Change dot color based on section
    const colors = [
        'linear-gradient(135deg, #FFB347, #FF8C42)',
        'linear-gradient(135deg, #4ECDC4, #44A08D)', 
        'linear-gradient(135deg, #FF6B6B, #FF8E92)'
    ];
    movingDot.style.background = colors[currentSection];
}

// Handle clicks on the hemisphere track
function handleTrackClick(e) {
    if (isScrolling) return;
    
    const track = e.currentTarget;
    const rect = track.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    
    // Calculate which section based on click position
    const trackWidth = rect.width;
    const sectionWidth = trackWidth / totalSections;
    const clickedSection = Math.floor(clickX / sectionWidth);
    
    // Ensure within bounds
    const targetSection = Math.max(0, Math.min(totalSections - 1, clickedSection));
    
    if (targetSection !== currentSection) {
        goToSection(targetSection);
    }
}

// Handle dot dragging (optional enhancement)
let isDragging = false;

function handleDotDragStart(e) {
    isDragging = true;
    e.preventDefault();
    
    document.addEventListener('mousemove', handleDotDrag);
    document.addEventListener('mouseup', handleDotDragEnd);
}

function handleDotDrag(e) {
    if (!isDragging || isScrolling) return;
    
    const navigation = document.querySelector('.navigation');
    const rect = navigation.getBoundingClientRect();
    const dragX = e.clientX - rect.left;
    
    // Calculate section based on drag position
    const navWidth = rect.width;
    const progress = Math.max(0, Math.min(1, dragX / navWidth));
    const targetSection = Math.round(progress * (totalSections - 1));
    
    if (targetSection !== currentSection) {
        goToSection(targetSection);
    }
}

function handleDotDragEnd() {
    isDragging = false;
    document.removeEventListener('mousemove', handleDotDrag);
    document.removeEventListener('mouseup', handleDotDragEnd);
}

// Add transition effect (simplified for horizontal scroll)
function addSectionTransitionEffect() {
    // Visual feedback is now handled by the transform transitions
    const activeSection = document.querySelector('.sections-container');
    activeSection.style.filter = 'brightness(0.8)';
    
    setTimeout(() => {
        activeSection.style.filter = 'brightness(1)';
    }, 400);
}

// Prevent default scroll behavior
function preventScroll(e) {
    e.preventDefault();
    window.scrollTo(0, 0);
}

// Add smooth color transitions to hemisphere line
function updateHemisphereColor() {
    const hemispheLine = document.querySelector('.hemisphere-line');
    const colors = [
        'rgba(255, 179, 71, 0.4)', // Orange for Instant
        'rgba(78, 205, 196, 0.4)',  // Teal for Accurate
        'rgba(255, 107, 107, 0.4)'  // Red for Personal
    ];
    
    hemispheLine.style.borderColor = colors[currentSection];
    
    // Update the gradient line
    const gradients = [
        'linear-gradient(90deg, transparent 0%, rgba(255, 179, 71, 0.8) 50%, transparent 100%)',
        'linear-gradient(90deg, transparent 0%, rgba(78, 205, 196, 0.8) 50%, transparent 100%)',
        'linear-gradient(90deg, transparent 0%, rgba(255, 107, 107, 0.8) 50%, transparent 100%)'
    ];
    
    const beforeElement = window.getComputedStyle(hemispheLine, '::before');
    hemispheLine.style.setProperty('--gradient', gradients[currentSection]);
}

// Enhanced navigation with visual feedback
function enhanceNavigation() {
    const movingDot = document.querySelector('.nav-dot-moving');
    
    movingDot.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.2)';
        this.style.filter = 'brightness(1.2)';
    });
    
    movingDot.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.filter = 'brightness(1)';
    });
}

// Initialize enhanced features
document.addEventListener('DOMContentLoaded', function() {
    enhanceNavigation();
    updateDotPosition(); // Initialize dot position
    
    // Update hemisphere color on section change
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                updateHemisphereColor();
            }
        });
    });
    
    const sectionsContainer = document.querySelector('.sections-container');
    observer.observe(sectionsContainer, { attributes: true });
});

// Add loading animation
window.addEventListener('load', function() {
    const mainTitle = document.querySelector('.main-title');
    const sectionsContainer = document.querySelector('.sections-container');
    
    mainTitle.style.opacity = '0';
    mainTitle.style.transform = 'translateX(-50px)';
    
    setTimeout(() => {
        mainTitle.style.transition = 'all 1s ease';
        mainTitle.style.opacity = '1';
        mainTitle.style.transform = 'translateX(0)';
    }, 300);
    
    // Initialize the first section and dot position
    sectionsContainer.style.transform = 'translateX(0vw)';
    updateDotPosition();
    updateHemisphereColor();
});
