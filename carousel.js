// Services Carousel Navigation
export function initServicesCarousel() {
    const servicesGrid = document.getElementById('servicesGrid');
    const prevBtn = document.getElementById('servicesPrev');
    const nextBtn = document.getElementById('servicesNext');

    if (!servicesGrid || !prevBtn || !nextBtn) return;

    const scrollAmount = 512; // card width (500px) + gap (12px)

    // Scroll to previous card
    prevBtn.addEventListener('click', () => {
        servicesGrid.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });

    // Scroll to next card
    nextBtn.addEventListener('click', () => {
        servicesGrid.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });

    // Update button states based on scroll position
    function updateButtonStates() {
        const scrollLeft = servicesGrid.scrollLeft;
        const maxScroll = servicesGrid.scrollWidth - servicesGrid.clientWidth;

        // Disable prev button at start
        if (scrollLeft <= 0) {
            prevBtn.disabled = true;
        } else {
            prevBtn.disabled = false;
        }

        // Disable next button at end
        if (scrollLeft >= maxScroll - 1) {
            nextBtn.disabled = true;
        } else {
            nextBtn.disabled = false;
        }
    }

    // Listen for scroll events
    servicesGrid.addEventListener('scroll', updateButtonStates);

    // Initial button state
    updateButtonStates();
}

// Testimonials Carousel Navigation
export function initTestimonialsCarousel() {
    const testimonialsGrid = document.getElementById('testimonialsGrid');
    const prevBtn = document.getElementById('testimonialsPrev');
    const nextBtn = document.getElementById('testimonialsNext');

    if (!testimonialsGrid || !prevBtn || !nextBtn) return;

    const scrollAmount = 520; // card width (500px) + gap (20px)

    // Scroll to previous card
    prevBtn.addEventListener('click', () => {
        testimonialsGrid.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });

    // Scroll to next card
    nextBtn.addEventListener('click', () => {
        testimonialsGrid.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });

    // Update button states based on scroll position
    function updateButtonStates() {
        const scrollLeft = testimonialsGrid.scrollLeft;
        const maxScroll = testimonialsGrid.scrollWidth - testimonialsGrid.clientWidth;

        // Disable prev button at start
        if (scrollLeft <= 5) { // tolerance
            prevBtn.disabled = true;
        } else {
            prevBtn.disabled = false;
        }

        // Disable next button at end
        if (scrollLeft >= maxScroll - 5) { // tolerance
            nextBtn.disabled = true;
        } else {
            nextBtn.disabled = false;
        }
    }

    // Listen for scroll events
    testimonialsGrid.addEventListener('scroll', updateButtonStates);

    // Initial button state
    updateButtonStates();
}
