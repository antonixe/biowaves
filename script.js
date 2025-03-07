// Initialize AOS animations
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
  });
  
  // DOM Elements
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const header = document.querySelector('.header-wrapper');
  const backToTop = document.getElementById('back-to-top');
  const preloader = document.querySelector('.preloader');
  
  // Toggle mobile menu
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('show');
  });
  
  // Close mobile menu when clicking a nav link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMenu.classList.remove('show');
    });
  });
  
  // Sticky header & Back to top button visibility
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      header.classList.add('sticky');
      backToTop.classList.add('visible');
    } else {
      header.classList.remove('sticky');
      backToTop.classList.remove('visible');
    }
  });
  
  // Back to top functionality
  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Active link highlighting based on scroll position
  window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        document.querySelector(`.nav-link[href*=${sectionId}]`).classList.add('active');
      } else {
        document.querySelector(`.nav-link[href*=${sectionId}]`).classList.remove('active');
      }
    });
  });
  
  // Remove preloader when page is loaded
  window.addEventListener('load', () => {
    preloader.style.opacity = '0';
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500);
  });