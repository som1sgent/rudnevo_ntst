function handleImageErrors() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.onerror = function() {
            console.warn(`Failed to load image: ${this.src}`);
            this.style.display = 'none';
        };
    });
}

function addScrollInteractivity() {
    const partnersContainer = document.querySelector('.partners-container');
    
    if (!partnersContainer) return;
    
    // Set transition for smooth scrolling
    partnersContainer.style.transition = `scroll-left ${transitionSpeed}ms ease`;
    
    const partnerLogos = document.querySelectorAll('.partner-logo');
    
    partnerLogos.forEach((logo, index) => {
        logo.addEventListener('click', () => {
            const containerWidth = partnersContainer.offsetWidth;
            const logoWidth = logo.offsetWidth;
            const scrollPosition = logo.offsetLeft - (containerWidth / 2) + (logoWidth / 2);
            
            partnersContainer.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        });
        
        logo.style.cursor = 'pointer';
    });
}

function init() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            handleImageErrors();
            addScrollInteractivity();
        });
    } else {
        handleImageErrors();
        addScrollInteractivity();
    }
}

const scrollSpeed = 5; // Multiplier for wheel scroll speed (higher = faster)
const transitionSpeed = 2000 ; // Smooth scroll transition duration in milliseconds

init();

const partnersContainer = document.querySelector('.partners-container');
if (partnersContainer) {
    partnersContainer.addEventListener('wheel', function(e) {
        // Only handle wheel events when the cursor is over the partners container
        if (e.target.closest('.partners-container') && e.deltaY !== 0) {
            e.preventDefault(); // Prevent default vertical scroll only for carousel
            partnersContainer.scrollLeft += e.deltaY * scrollSpeed;
        }
        // If not over the carousel, do nothing, allowing default vertical scroll
    }, { passive: false });
}