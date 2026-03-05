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

// Services Switch - aktivní stav tlačítek
(function() {
  'use strict';
  
  const servicesSwitchLinks = document.querySelectorAll('.services-switch-link');
  
  if (servicesSwitchLinks.length === 0) {
    return;
  }
  
  // Funkce pro aktualizaci aktivního stavu podle hash
  function updateActiveLink() {
    const hash = window.location.hash;
    
    servicesSwitchLinks.forEach(function(link) {
      link.classList.remove('active');
      
      if (hash === '#pro-firmy' && link.getAttribute('href') === '#pro-firmy') {
        link.classList.add('active');
      } else if (hash === '#uchazeci' && link.getAttribute('href') === '#uchazeci') {
        link.classList.add('active');
      }
      // Odstraněno výchozí aktivní - obě tlačítka budou mít stejný vzhled na začátku
    });
  }
  
  // Aktualizace při načtení stránky
  updateActiveLink();
  
  // Aktualizace při změně hash
  window.addEventListener('hashchange', updateActiveLink);
  
  // Kliknutí na tlačítko
  servicesSwitchLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      // Odstranit active ze všech
      servicesSwitchLinks.forEach(function(l) {
        l.classList.remove('active');
      });
      // Přidat active na kliknuté
      this.classList.add('active');
    });
  });
})();

// Main Navigation - aktivní stav podle URL a hash
(function() {
  'use strict';
  
  const navLinks = document.querySelectorAll('.site-nav .nav-link');
  
  if (navLinks.length === 0) {
    return;
  }
  
  // Funkce pro aktualizaci aktivního stavu menu
  function updateActiveNavLink() {
    const currentPath = window.location.pathname;
    const currentHash = window.location.hash;
    let currentPage = currentPath.split('/').pop() || '';
    
    // Normalizace: prázdná stránka nebo root = index.html
    if (!currentPage || currentPage === '' || currentPage === '/') {
      currentPage = 'index.html';
    }
    
    // Odstranit active ze všech odkazů
    navLinks.forEach(function(link) {
      link.classList.remove('active');
    });
    
    let activeLinkFound = false;
    
    // Nejprve zkontroluj odkazy s hash (mají prioritu)
    navLinks.forEach(function(link) {
      const linkHref = link.getAttribute('href');
      const linkPath = linkHref.split('#')[0];
      const linkHash = linkHref.split('#')[1];
      
      // Pokud má odkaz hash, porovnej celou URL včetně hash
      if (linkHash) {
        if (currentPage === linkPath && currentHash === '#' + linkHash) {
          link.classList.add('active');
          activeLinkFound = true;
        }
      }
    });
    
    // Pokud nebyl nalezen aktivní odkaz s hash, zkontroluj odkazy bez hash
    if (!activeLinkFound) {
      navLinks.forEach(function(link) {
        const linkHref = link.getAttribute('href');
        const linkPath = linkHref.split('#')[0];
        const linkHash = linkHref.split('#')[1];
        
        // Zpracuj pouze odkazy bez hash
        if (!linkHash) {
          // Pokud jsme na services.html s hash, neaktivuj "Služby"
          if (currentPage === 'services.html' && currentHash) {
            return; // Pokračuj na další odkaz
          }
          
          // Pro ostatní případy porovnej cestu
          if (currentPage === linkPath && !currentHash) {
            link.classList.add('active');
          }
        }
      });
    }
  }
  
  // Aktualizace při načtení stránky
  updateActiveNavLink();
  
  // Aktualizace při změně hash (např. při kliknutí na anchor)
  window.addEventListener('hashchange', updateActiveNavLink);
  
  // Aktualizace při kliknutí na odkaz v menu
  navLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      // Po malém zpoždění aktualizuj (aby se stihla změnit URL)
      setTimeout(updateActiveNavLink, 10);
    });
  });
})();

// Nastavení URL stránky do formulářů Web3Forms
document.addEventListener("DOMContentLoaded", function() {
  const contactPageField = document.getElementById("contact-form-page");
  const cvPageField = document.getElementById("cv-form-page");
  
  if (contactPageField) {
    contactPageField.value = window.location.href;
  }
  
  if (cvPageField) {
    cvPageField.value = window.location.href;
  }
});

// Fade-in scroll animations
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add("visible");
      }
    });
  });

  document.querySelectorAll(".fade-in").forEach(el=>{
    observer.observe(el);
  });
} else {
  // Fallback for browsers without IntersectionObserver support
  document.querySelectorAll(".fade-in").forEach(el=>{
    el.classList.add("visible");
  });
}
