/**
 * Footer Component
 * Handles back-to-top functionality
 */

(function() {
  'use strict';

  // Back to top button functionality
  const initBackToTop = () => {
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBackToTop);
  } else {
    initBackToTop();
  }
})();
