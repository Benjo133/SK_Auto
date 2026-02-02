import './style.css'
import Lenis from 'lenis'
import { initPreloader } from './animations.js'
import { initStickyNavbar } from './navbar.js'
import { initServicesCarousel, initTestimonialsCarousel } from './carousel.js'

// Initialize Lenis for smooth scrolling
const lenis = new Lenis({
    autoRaf: true,
});

// Handle anchor links for Lenis
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            lenis.scrollTo(targetElement, {
                offset: 0,
                duration: 1.2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
            });

            // Close mobile menu if open
            document.querySelector('.mobile-menu-btn').classList.remove('active');
            document.querySelector('.nav').classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    });
});

// Initialize preloader which will trigger hero animation
initPreloader()


// Initialize sticky navbar
initStickyNavbar();

// Initialize services carousel
initServicesCarousel();

// Initialize testimonials carousel
initTestimonialsCarousel();

// Contact Modal Logic
const contactModal = document.getElementById('contactModal');
const openModalBtns = document.querySelectorAll('.contact-trigger');
const closeModalBtn = document.querySelector('.modal-close');

// Open modal from any contact button
openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        contactModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// Close modal
closeModalBtn.addEventListener('click', () => {
    contactModal.classList.remove('active');
    document.body.style.overflow = '';
});

// Close modal when clicking outside
contactModal.addEventListener('click', (e) => {
    if (e.target === contactModal) {
        contactModal.classList.remove('active');
        document.body.style.overflow = '';
    }
});
