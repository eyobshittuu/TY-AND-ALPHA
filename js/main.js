// Main JavaScript for Tianyuan and Alpha Vet Pharmaceutical website

document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
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