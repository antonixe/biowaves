// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        offset: 50,
        once: true
    });

    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    function toggleMenu() {
        navMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    }

    navToggle.addEventListener('click', toggleMenu);

    // Close menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });

    // Active Navigation Link on Scroll
    const sections = document.querySelectorAll('section[id]');

    function highlightNavLink() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                navLink?.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);

    // Header Scroll Effect
    const header = document.querySelector('.header');
    let lastScroll = 0;

    function handleHeaderScroll() {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            header.classList.remove('scroll-up', 'scroll-down');
            return;
        }

        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            // Scrolling down
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            // Scrolling up
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }

        lastScroll = currentScroll;
    }

    window.addEventListener('scroll', handleHeaderScroll);

    // Back to Top Button
    const backToTopBtn = document.getElementById('back-to-top');

    function toggleBackToTop() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = 'flex';
        } else {
            backToTopBtn.style.display = 'none';
        }
    }

    window.addEventListener('scroll', toggleBackToTop);

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Form Validation and Submission
    const contactForm = document.querySelector('.contact__form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form fields
            const name = this.querySelector('#name');
            const email = this.querySelector('#email');
            const phone = this.querySelector('#phone');
            const message = this.querySelector('#message');
            
            // Basic validation
            let isValid = true;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const phoneRegex = /^[0-9]{10,}$/;
            
            // Reset previous error states
            const formGroups = this.querySelectorAll('.form__group');
            formGroups.forEach(group => group.classList.remove('error'));
            
            // Validate name
            if (!name.value.trim()) {
                markFieldAsError(name, 'Name is required');
                isValid = false;
            }
            
            // Validate email
            if (!emailRegex.test(email.value.trim())) {
                markFieldAsError(email, 'Please enter a valid email');
                isValid = false;
            }
            
            // Validate phone
            if (!phoneRegex.test(phone.value.trim())) {
                markFieldAsError(phone, 'Please enter a valid phone number');
                isValid = false;
            }
            
            // Validate message
            if (!message.value.trim()) {
                markFieldAsError(message, 'Message is required');
                isValid = false;
            }
            
            if (isValid) {
                // Show success message
                showFormMessage('Thank you! We will contact you soon.', 'success');
                
                // Reset form
                this.reset();
                
                // Here you would typically send the form data to your server
                // For demo purposes, we're just showing a success message
            }
        });
    }

    function markFieldAsError(field, message) {
        const formGroup = field.closest('.form__group');
        formGroup.classList.add('error');
        
        // Create or update error message
        let errorMessage = formGroup.querySelector('.error-message');
        if (!errorMessage) {
            errorMessage = document.createElement('span');
            errorMessage.className = 'error-message';
            formGroup.appendChild(errorMessage);
        }
        errorMessage.textContent = message;
    }

    function showFormMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.textContent = message;
        
        contactForm.insertBefore(messageDiv, contactForm.firstChild);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Preloader
    const preloader = document.querySelector('.preloader');
    
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 300);
        });
    }
});