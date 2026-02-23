// Mobile Navigation Toggle
(function() {
  'use strict';
  
  const navToggle = document.querySelector('.nav-toggle');
  const siteNav = document.querySelector('.site-nav');
  const siteHeader = document.querySelector('.site-header');

  function syncHeaderScrollState() {
    if (!siteHeader) {
      return;
    }

    if (window.scrollY > 8) {
      siteHeader.classList.add('is-scrolled');
    } else {
      siteHeader.classList.remove('is-scrolled');
    }
  }

  syncHeaderScrollState();
  window.addEventListener('scroll', syncHeaderScrollState, { passive: true });
  
  if (!navToggle || !siteNav) {
    return; // Elements not found, exit
  }
  
  function closeMenu() {
    siteNav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  function openMenu() {
    siteNav.classList.add('is-open');
    navToggle.setAttribute('aria-expanded', 'true');
  }

  // Toggle menu function
  function toggleMenu() {
    const isOpen = siteNav.classList.contains('is-open');
    
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }
  
  // Toggle menu on button click
  navToggle.addEventListener('click', function(event) {
    event.stopPropagation();
    toggleMenu();
  });
  
  // Close menu when clicking on a nav link (mobile only)
  const navLinks = siteNav.querySelectorAll('.nav-link');
  navLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      // Only close on mobile (check window width)
      if (window.innerWidth <= 768) {
        closeMenu();
      }
    });
  });

  // Close menu when clicking outside navigation panel on mobile
  document.addEventListener('click', function(event) {
    if (window.innerWidth > 768) {
      return;
    }

    if (!siteNav.classList.contains('is-open')) {
      return;
    }

    if (siteNav.contains(event.target) || navToggle.contains(event.target)) {
      return;
    }

    closeMenu();
  });

  // Close on Escape key for better keyboard accessibility
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && siteNav.classList.contains('is-open')) {
      closeMenu();
      navToggle.focus();
    }
  });
  
  // Close menu when window is resized to desktop size
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      if (window.innerWidth > 768) {
        closeMenu();
      }
    }, 250);
  });
})();
