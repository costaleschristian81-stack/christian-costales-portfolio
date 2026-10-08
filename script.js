/**
 * script.js
 * Contains interactive features for the portfolio website.
 * Features: Mobile Hamburger Menu, Smooth Scrolling.
 */

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initSmoothScrolling();
});

/**
 * Initializes the mobile hamburger menu functionality.
 * Handles opening/closing the menu and updating accessibility attributes.
 */
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!hamburger || !navMenu) return;

    // Toggle menu on hamburger click
    hamburger.addEventListener('click', () => {
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
        
        // Update ARIA state
        hamburger.setAttribute('aria-expanded', !isExpanded);
        
        // Toggle visual classes
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when a navigation link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                hamburger.setAttribute('aria-expanded', 'false');
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });

    // Close menu when clicking outside of it
    document.addEventListener('click', (event) => {
        const isClickInsideNav = navMenu.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);

        if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
            hamburger.setAttribute('aria-expanded', 'false');
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

/**
 * Initializes smooth scrolling for internal anchor links.
 * Provides a better user experience than sudden jumps.
 */
function initSmoothScrolling() {
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

    smoothScrollLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            
            // Ignore if it's just a generic '#' link
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Prevent default jump behavior
                e.preventDefault();

                // Scroll smoothly to the target section
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}
