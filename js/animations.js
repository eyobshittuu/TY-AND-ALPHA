// Animation initialization
document.addEventListener('DOMContentLoaded', function() {
    // Welcome page has been moved to welcome.html
    
    // Scroll animation for elements
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .zoom-in');
        
        elements.forEach(function(element) {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('visible');
            }
        });
    };
    
    // Run on page load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Animate service cards on hover
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(function(card) {
        card.addEventListener('mouseenter', function() {
            this.classList.add('card-hover');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('card-hover');
        });
    });
    
    // Animate navigation links
    const navLinks = document.querySelectorAll('.nav-links li');
    navLinks.forEach(function(link, index) {
        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
    });
    
    // Mobile navigation toggle
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    
    if (burger) {
        burger.addEventListener('click', function() {
            // Toggle navigation
            nav.classList.toggle('nav-active');
            
            // Animate links
            navLinks.forEach(function(link, index) {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
            
            // Burger animation
            burger.classList.toggle('toggle');
        });
    }
});