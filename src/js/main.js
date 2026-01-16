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

  // Handle submenu triggers
  const submenuTriggers = document.querySelectorAll('.submenu-trigger');
  
  submenuTriggers.forEach(trigger => {
    trigger.addEventListener('click', function(e) {
      e.preventDefault();
      const submenuId = this.getAttribute('data-submenu');
      const submenuElement = document.getElementById(submenuId);
      
      if (submenuElement) {
        const submenu = new bootstrap.Offcanvas(submenuElement);
        submenu.show();
      }
    });
  });

  // Handle back buttons in submenus
  const backButtons = document.querySelectorAll('.btn-back');
  
  backButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      const currentOffcanvas = this.closest('.offcanvas');
      if (currentOffcanvas) {
        const offcanvasInstance = bootstrap.Offcanvas.getInstance(currentOffcanvas);
        if (offcanvasInstance) {
          offcanvasInstance.hide();
        }
      }
    });
  });

  // Handle close all buttons
  const closeAllButtons = document.querySelectorAll('[data-close-all="true"]');
  
  closeAllButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      // Close all offcanvas menus
      const allOffcanvas = document.querySelectorAll('.offcanvas.show');
      allOffcanvas.forEach(offcanvas => {
        const instance = bootstrap.Offcanvas.getInstance(offcanvas);
        if (instance) {
          instance.hide();
        }
      });
    });
  });

  console.log('Off-canvas menu initialized with submenu support');
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
