$(function () {
  console.log("jquery & bootstrap are ready");
  
  // Initialize off-canvas menu
  initializeOffcanvasMenu();
  
  // Initialize back to top button
  initializeBackToTop();
});

if (typeof portal_common === "undefined") {
  portal_common = { _namespace: true };
}

portal_common = {};

/**
 * Initialize off-canvas menu functionality
 */
function initializeOffcanvasMenu() {
  const offcanvasElement = document.getElementById('navbarOffcanvas');
  
  if (!offcanvasElement) {
    console.warn('Off-canvas menu element not found');
    return;
  }

  console.log('Initializing off-canvas menu');

  // Handle dropdown toggles within the off-canvas menu
  const dropdownToggles = offcanvasElement.querySelectorAll('.nav-link.dropdown-toggle');
  
  dropdownToggles.forEach(toggle => {
    // Set initial state
    toggle.setAttribute('aria-expanded', 'false');
    
    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const parentLi = this.closest('.dropdown');
      const dropdownMenu = parentLi.querySelector('.dropdown-menu');
      
      if (!dropdownMenu) return;
      
      const isCurrentlyOpen = dropdownMenu.classList.contains('show');
      
      // Close all dropdowns first
      offcanvasElement.querySelectorAll('.dropdown-menu').forEach(menu => {
        menu.classList.remove('show');
      });
      offcanvasElement.querySelectorAll('.dropdown-toggle').forEach(t => {
        t.setAttribute('aria-expanded', 'false');
      });
      
      // Toggle current dropdown
      if (!isCurrentlyOpen) {
        dropdownMenu.classList.add('show');
        this.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Reset all dropdowns when off-canvas is hidden
  offcanvasElement.addEventListener('hidden.bs.offcanvas', function() {
    offcanvasElement.querySelectorAll('.dropdown-menu').forEach(menu => {
      menu.classList.remove('show');
    });
    offcanvasElement.querySelectorAll('.dropdown-toggle').forEach(toggle => {
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  console.log('Off-canvas menu initialized with', dropdownToggles.length, 'dropdown toggles');
}

/**
 * Initialize back to top button functionality
 */
function initializeBackToTop() {
  const backToTopBtn = document.querySelector('.back-to-top');
  
  if (!backToTopBtn) {
    console.warn('Back to top button not found');
    return;
  }

  console.log('Initializing back to top button');

  backToTopBtn.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
