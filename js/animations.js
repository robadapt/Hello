// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Hero section animations
gsap.from('.hero-content', {
    opacity: 0,
    y: 100,
    duration: 1.5,
    ease: 'power4.out'
});

// Floating shape animation
gsap.to('.floating-shape', {
    rotation: 360,
    duration: 20,
    repeat: -1,
    ease: 'none'
});

gsap.to('.floating-shape', {
    borderRadius: '70% 30% 30% 70% / 60% 40% 60% 40%',
    duration: 8,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
});

// Section title animations
gsap.utils.toArray('.section-title').forEach(title => {
    gsap.from(title, {
        scrollTrigger: {
            trigger: title,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out'
    });
});

// About section animations
gsap.from('.about-text', {
    scrollTrigger: {
        trigger: '.about-text',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
    },
    opacity: 0,
    x: -50,
    duration: 1,
    ease: 'power3.out'
});

gsap.from('.floating-shape', {
    scrollTrigger: {
        trigger: '.floating-shape',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
    },
    opacity: 0,
    scale: 0,
    duration: 1.5,
    ease: 'elastic.out(1, 0.5)'
});

// Project card animations
gsap.utils.toArray('.project-card').forEach((card, index) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        delay: index * 0.2,
        ease: 'power3.out'
    });
});

// Contact form animation
gsap.from('.contact-form', {
    scrollTrigger: {
        trigger: '.contact-form',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
    },
    opacity: 0,
    y: 30,
    duration: 1,
    ease: 'power3.out'
});

// Navbar scroll animation
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'transparent';
        navbar.style.boxShadow = 'none';
    }
}); 