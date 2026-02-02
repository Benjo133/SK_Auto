import gsap from 'gsap';

export function initHeroAnimation() {
    // Wait for the DOM to be fully loaded just in case, though main.js usually runs deferred
    // But since we are importing it, it should be fine.

    const tl = gsap.timeline({
        defaults: {
            ease: "elastic.out(1, 0.75)", // Spring physics
            duration: 1.8
        }
    });

    // 1. Hero Container Zoom-out + Fade-in (iPhone home screen reveal feel) - REMOVED per user request
    // We target the background/container separately if possible, but targeting .hero works for the whole section.
    /*
    tl.fromTo(".hero",
        {
            scale: 1.1,
            opacity: 0
        },
        {
            scale: 1,
            opacity: 1,
            duration: 1.4,
            ease: "power2.out"
        }
    );
    */

    // 2. Animate Elements (Heading, Paragraph, Button)
    // We select them by the common class we will add: .hero-animate
    const elements = document.querySelectorAll(".hero-animate");

    elements.forEach((el, index) => {
        // Random X/Y offsets between 10px and 40px
        const randomX = (Math.random() * 30 + 10) * (Math.random() < 0.5 ? 1 : -1);
        const randomY = (Math.random() * 30 + 10) * (Math.random() < 0.5 ? 1 : -1);

        tl.from(el, {
            x: randomX,
            y: randomY,
            opacity: 0,
            // We use a negative position parameter to make them overlap with the container animation
            // and stagger them slightly relative to each other
        }, index === 0 ? "-=1.0" : "-=1.6");
    });
}

export function initPreloader() {
    const preloader = document.querySelector('.preloader');
    const clipper = document.querySelector('.clipper');

    if (preloader && clipper) {
        const tl = gsap.timeline({
            onComplete: () => {
                gsap.to(preloader, {
                    opacity: 0,
                    duration: 0.5,
                    onComplete: () => {
                        preloader.style.display = 'none';
                        initHeroAnimation(); // Start hero animation after preloader
                    }
                });
            }
        });

        tl.to(clipper, {
            width: '100%',
            duration: 2, // Adjust duration as needed
            ease: "power2.inOut"
        });
    } else {
        // Fallback if preloader elements are missing
        initHeroAnimation();
    }
}
