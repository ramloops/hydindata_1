/**
 * Hydindata — Minimal, accessible JavaScript
 * Modern ES6+ approach with improved error handling and accessibility
 */

class HydindataSite {
  constructor() {
    this.init();
  }

  init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setup());
    } else {
      this.setup();
    }
  }

  setup() {
    this.updateFooterYear();
    this.initMobileNav();
    this.initSMSButton();
    this.initCopyButtons();
    this.initKeyboardNav();
  }

  updateFooterYear() {
    const yearElements = document.querySelectorAll('[data-year]');
    const currentYear = new Date().getFullYear();
    yearElements.forEach(el => {
      el.textContent = currentYear;
    });
  }

  initMobileNav() {
    const toggle = document.querySelector('[data-nav-toggle]');
    const menu = document.querySelector('[data-nav-menu]');
    if (!toggle || !menu) return;

    const toggleMenu = () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      const newState = !isOpen;
      toggle.setAttribute('aria-expanded', String(newState));
      menu.setAttribute('data-open', String(newState));
      if (newState) {
        const firstLink = menu.querySelector('a');
        if (firstLink) setTimeout(() => firstLink.focus(), 50);
      }
    };

    toggle.addEventListener('click', toggleMenu);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        toggleMenu();
        toggle.focus();
      }
    });

    document.addEventListener('click', (e) => {
      if (toggle.getAttribute('aria-expanded') === 'true' &&
          !toggle.contains(e.target) && !menu.contains(e.target)) {
        toggleMenu();
      }
    });
  }

  initSMSButton() {
    const smsBtn = document.querySelector('[data-sms-btn]');
    if (!smsBtn) return;

    const phoneNumber = '16173964012';
    const defaultMessage = 'Hi Hydindata — I'm interested in a project. My goal is:';

    smsBtn.addEventListener('click', () => {
      try {
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        const separator = isIOS ? '&' : '?';
        const encodedMessage = encodeURIComponent(defaultMessage);
        window.location.href = `sms:${phoneNumber}${separator}body=${encodedMessage}`;
      } catch (error) {
        console.error('Failed to open SMS:', error);
        this.showFallbackContact(smsBtn);
      }
    });
  }

  showFallbackContact(button) {
    const fallbackMsg = document.createElement('p');
    fallbackMsg.className = 'microcopy';
    fallbackMsg.style.color = 'var(--muted)';
    fallbackMsg.style.marginTop = '8px';
    fallbackMsg.textContent = 'SMS not available. Please email hello@hydindata.com';
    button.parentElement?.appendChild(fallbackMsg);
    setTimeout(() => fallbackMsg.remove(), 5000);
  }

  initCopyButtons() {
    const copyButtons = document.querySelectorAll('[data-copy-btn]');
    copyButtons.forEach(btn => {
      btn.addEventListener('click', async () => {
        const copybox = btn.closest('.copybox');
        if (!copybox) return;

        const codeElement = copybox.querySelector('code');
        const statusElement = copybox.querySelector('[data-copy-status]');
        if (!codeElement) return;

        try {
          const textToCopy = codeElement.innerText;
          if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(textToCopy);
            this.showCopySuccess(btn, statusElement);
          } else {
            this.fallbackCopy(textToCopy, btn, statusElement);
          }
        } catch (error) {
          console.error('Copy failed:', error);
          this.showCopyError(statusElement);
        }
      });
    });
  }

  showCopySuccess(button, statusElement) {
    const originalText = button.textContent;
    button.textContent = 'Copied!';
    if (statusElement) statusElement.textContent = 'Template copied to clipboard';

    setTimeout(() => {
      button.textContent = originalText;
      if (statusElement) statusElement.textContent = '';
    }, 2000);
  }

  showCopyError(statusElement) {
    if (statusElement) {
      statusElement.textContent = 'Failed to copy. Please select and copy manually.';
      setTimeout(() => statusElement.textContent = '', 3000);
    }
  }

  fallbackCopy(text, button, statusElement) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    
    try {
      textarea.select();
      document.execCommand('copy');
      this.showCopySuccess(button, statusElement);
    } catch (error) {
      this.showCopyError(statusElement);
    } finally {
      document.body.removeChild(textarea);
    }
  }

  initKeyboardNav() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') document.body.classList.add('keyboard-nav');
    });

    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-nav');
    });

    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
      skipLink.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(skipLink.getAttribute('href'));
        if (target) {
          target.setAttribute('tabindex', '-1');
          target.focus();
        }
      });
    }
  }
}

new HydindataSite();

/* ============================================
   WORK PREVIEW CAROUSEL
   ============================================ */
document.addEventListener('DOMContentLoaded', function() {
  const track = document.querySelector('[data-carousel-track]');
  const items = document.querySelectorAll('[data-carousel-item]');
  const prevBtn = document.querySelector('[data-carousel-prev]');
  const nextBtn = document.querySelector('[data-carousel-next]');
  const indicators = document.querySelectorAll('[data-carousel-indicator]');
  
  if (!track || items.length === 0) {
    console.log('Carousel elements not found');
    return;
  }
  
  console.log('Carousel initialized with', items.length, 'items');
  
  let currentIndex = 0;
  let autoScrollInterval;
  const AUTO_SCROLL_DELAY = 5000; // 5 seconds
  
  function updateCarousel(index) {
    console.log('Moving to slide', index);
    // Update track position
    track.style.transform = `translateX(-${index * 100}%)`;
    
    // Update indicators
    indicators.forEach((indicator, i) => {
      indicator.classList.toggle('active', i === index);
    });
    
    currentIndex = index;
  }
  
  function nextSlide() {
    const nextIndex = (currentIndex + 1) % items.length;
    updateCarousel(nextIndex);
  }
  
  function prevSlide() {
    const prevIndex = (currentIndex - 1 + items.length) % items.length;
    updateCarousel(prevIndex);
  }
  
  function startAutoScroll() {
    stopAutoScroll();
    autoScrollInterval = setInterval(nextSlide, AUTO_SCROLL_DELAY);
    console.log('Auto-scroll started');
  }
  
  function stopAutoScroll() {
    if (autoScrollInterval) {
      clearInterval(autoScrollInterval);
      console.log('Auto-scroll stopped');
    }
  }
  
  // Next button
  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      nextSlide();
      stopAutoScroll();
      startAutoScroll();
    });
  }
  
  // Previous button
  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      prevSlide();
      stopAutoScroll();
      startAutoScroll();
    });
  }
  
  // Indicator buttons
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      updateCarousel(index);
      stopAutoScroll();
      startAutoScroll();
    });
  });
  
  // Pause on hover
  track.addEventListener('mouseenter', stopAutoScroll);
  track.addEventListener('mouseleave', startAutoScroll);
  
  // Pause on focus (for accessibility)
  track.addEventListener('focusin', stopAutoScroll);
  track.addEventListener('focusout', startAutoScroll);
  
  // Start auto-scrolling
  startAutoScroll();
  
  // Pause when page is not visible
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopAutoScroll();
    } else {
      startAutoScroll();
    }
  });
});