// Main JavaScript for Tianyuan and Alpha Vet Pharmaceutical website

document.addEventListener('DOMContentLoaded', function() {
    // Header hover effect
    const header = document.querySelector('header');
    if (header) {
        header.addEventListener('mouseenter', function() {
            this.style.opacity = '1';
            this.style.backgroundColor = 'white';
            this.style.transform = 'translateY(0)';
        });
        
        header.addEventListener('mouseleave', function() {
            const nav = document.querySelector('.nav-links');
            const isNavActive = nav && nav.classList.contains('nav-active');
            
            // Only change opacity if mobile menu is not active
            if (!isNavActive) {
                if (window.scrollY > 50) {
                    this.style.opacity = '0.8';
                    this.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                } else {
                    this.style.opacity = '0.2';
                    this.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }
            }
        });
    }
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        const nav = document.querySelector('.nav-links');
        const isNavActive = nav && nav.classList.contains('nav-active');
        
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
            // Keep some opacity when scrolled but not hovered
            if (!header.matches(':hover') && !isNavActive) {
                header.style.opacity = '0.8';
                header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            }
        } else {
            header.classList.remove('scrolled');
            // Return to default opacity when at top and not hovered
            if (!header.matches(':hover') && !isNavActive) {
                header.style.opacity = '0.2';
                header.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            }
        }
    });

    // Testimonial slider functionality
    const testimonials = document.querySelectorAll('.testimonial');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonials.forEach(testimonial => {
            testimonial.style.display = 'none';
        });
        
        testimonials[index].style.display = 'block';
        testimonials[index].classList.add('active');
    }

    // Initialize testimonial display if testimonials exist
    if (testimonials.length > 0) {
        showTestimonial(currentTestimonial);
        
        // Auto-rotate testimonials
        setInterval(function() {
            testimonials[currentTestimonial].classList.remove('active');
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }, 5000);
    }

    // Form validation for contact form
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add form validation and submission logic here
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }

    // Image gallery lightbox (if applicable)
    const galleryImages = document.querySelectorAll('.gallery-image');
    galleryImages.forEach(image => {
        image.addEventListener('click', function() {
            // Create lightbox effect
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            
            const img = document.createElement('img');
            img.src = this.src;
            
            lightbox.appendChild(img);
            document.body.appendChild(lightbox);
            
            lightbox.addEventListener('click', function() {
                this.remove();
            });
        });
    });

    // Add smooth scrolling to all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });
});