// Advanced Animation System
document.addEventListener('DOMContentLoaded', function() {
    // Split hero title into words for animation
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent.trim();
        const words = text.split(' ').filter(word => word.length > 0);
        heroTitle.innerHTML = '';
        
        words.forEach((word, index) => {
            const span = document.createElement('span');
            span.textContent = word;
            span.style.animationDelay = `${index * 0.1}s`;
            heroTitle.appendChild(span);
            
            // Add space after each word except the last one
            if (index < words.length - 1) {
                const space = document.createTextNode(' ');
                heroTitle.appendChild(space);
            }
        });
    }
    // Initialize Intersection Observer for better performance
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Add stagger effect for multiple elements
                if (entry.target.classList.contains('stagger-animation')) {
                    const siblings = entry.target.parentElement.children;
                    Array.from(siblings).forEach((sibling, index) => {
                        if (sibling.classList.contains('stagger-animation')) {
                            setTimeout(() => {
                                sibling.classList.add('visible');
                            }, index * 100);
                        }
                    });
                }
            }
        });
    }, observerOptions);

    // Observe all animation elements
    const animationElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .zoom-in, .stagger-animation, .text-reveal');
    animationElements.forEach(element => {
        observer.observe(element);
    });

    // Parallax effect for hero section
    const parallaxElements = document.querySelectorAll('.parallax-element');
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach(element => {
            element.style.transform = `translateY(${rate}px)`;
        });
    }

    // Throttled scroll handler for parallax
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
            setTimeout(() => { ticking = false; }, 16);
        }
    }
    
    // Add scroll listener for parallax
    window.addEventListener('scroll', requestTick);
    
    // Text reveal animation for titles
    function initTextReveal() {
        const textElements = document.querySelectorAll('.text-reveal');
        textElements.forEach(element => {
            const text = element.textContent;
            element.innerHTML = '';
            
            // Split text into spans
            text.split('').forEach((char, index) => {
                const span = document.createElement('span');
                span.textContent = char === ' ' ? '\u00A0' : char;
                span.style.transitionDelay = `${index * 0.05}s`;
                element.appendChild(span);
            });
        });
    }
    
    // Initialize text reveal
    initTextReveal();
    
    // Enhanced card hover effects
    function initCardEffects() {
        const cards = document.querySelectorAll('.service-card, .morph-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) rotateX(5deg)';
                this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) rotateX(0)';
                this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
            });
        });
    }
    
    // Initialize card effects
    initCardEffects();
    
    // Smooth page transitions
    function initPageTransitions() {
        const links = document.querySelectorAll('a[href$=".html"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const href = this.getAttribute('href');
                
                // Create transition overlay
                const overlay = document.createElement('div');
                overlay.className = 'page-transition active';
                document.body.appendChild(overlay);
                
                // Navigate after animation
                setTimeout(() => {
                    window.location.href = href;
                }, 500);
            });
        });
    }
    
    // Initialize page transitions
    initPageTransitions();
    
    // Enhanced service card animations with modern effects
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(function(card, index) {
        // Add stagger animation class
        card.classList.add('stagger-animation');
        
        // Enhanced hover effects
        card.addEventListener('mouseenter', function() {
            this.classList.add('card-hover');
            this.style.transform = 'translateY(-15px) scale(1.02)';
            this.style.boxShadow = '0 25px 50px rgba(0,0,0,0.15)';
            
            // Animate icon
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'rotateY(180deg) scale(1.1)';
                icon.style.color = 'var(--primary-color)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('card-hover');
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
            
            // Reset icon
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'rotateY(0deg) scale(1)';
                icon.style.color = '';
            }
        });
        
        // Add loading animation delay
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    // Enhanced navigation animations
    const navLinks = document.querySelectorAll('.nav-links li');
    navLinks.forEach(function(link, index) {
        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        
        // Add hover effect to nav links
        const anchor = link.querySelector('a');
        if (anchor) {
            anchor.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
                this.style.textShadow = '0 2px 4px rgba(0,0,0,0.1)';
            });
            
            anchor.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.textShadow = 'none';
            });
        }
    });
    
    // Add scroll-based header animation
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    let isNavActive = false;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const nav = document.querySelector('.nav-links');
        isNavActive = nav && nav.classList.contains('nav-active');
        
        if (scrollTop > lastScrollTop && scrollTop > 100 && !isNavActive) {
            // Scrolling down and nav is not active
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up or nav is active
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Add hover effect for header
    if (header) {
        header.addEventListener('mouseenter', function() {
            header.style.transform = 'translateY(0)';
        });
    }
    
    // Mobile navigation toggle
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    if (burger) {
        burger.addEventListener('click', function() {
            // Toggle navigation
            nav.classList.toggle('nav-active');
            isNavActive = nav.classList.contains('nav-active');
            
            // Make header fully visible when nav is active
            if (isNavActive) {
                header.style.opacity = '1';
                header.style.backgroundColor = 'white';
            } else {
                // Return to default state if not scrolled
                if (window.pageYOffset < 50) {
                    header.style.opacity = '0.2';
                    header.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }
            }
            
            // Enhanced mobile menu animation
            navLinks.forEach(function(link, index) {
                if (nav.classList.contains('nav-active')) {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                    link.style.transform = 'translateX(0)';
                } else {
                    link.style.animation = '';
                    link.style.transform = 'translateX(50px)';
                }
            });
            
            // Enhanced burger animation
            burger.classList.toggle('toggle');
            
            // Add rotation effect
            if (burger.classList.contains('toggle')) {
                burger.style.transform = 'rotate(90deg)';
            } else {
                burger.style.transform = 'rotate(0deg)';
            }
        });
    }
});