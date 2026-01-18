/**
 * Hydindata — Minimal, accessible JavaScript (single-file, no deps)
 * - Mobile nav toggle works (supports your current HTML/CSS)
 * - Carousel works (buttons, indicators, auto-scroll, pause on hover/focus)
 * - Defensive: avoids silent failures, supports multiple carousels if added later
 *
 * IMPORTANT: In your HTML, use an absolute script path to avoid relative-path issues on subpages:
 *   <script defer src="/assets/js/script.js"></script>
 */

class HydindataSite {
  constructor() {
    this.boot();
  }

  boot() {
    const run = () => {
      try {
        this.setup();
      } catch (err) {
        console.error("[Hydindata] Uncaught init error:", err);
      }
    };

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", run, { once: true });
    } else {
      run();
    }
  }

  setup() {
    this.updateFooterYear();
    this.initMobileNav();
    this.initSMSButton();
    this.initCopyButtons();
    this.initCarousels();     // supports your one carousel; safe if you add more
    this.initKeyboardNav();
  }

  updateFooterYear() {
    const yearElements = document.querySelectorAll("[data-year]");
    if (!yearElements.length) return;
    const y = new Date().getFullYear();
    yearElements.forEach((el) => (el.textContent = String(y)));
  }

  // ---------------------------------------------------------------------------
  // MOBILE NAV
  // ---------------------------------------------------------------------------
  initMobileNav() {
    const toggle = document.querySelector("[data-nav-toggle]");
    const menu = document.querySelector("[data-nav-menu]");
    if (!toggle || !menu) return;

    const setOpen = (open) => {
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      menu.setAttribute("data-open", open ? "true" : "false");
    };

    const isOpen = () => toggle.getAttribute("aria-expanded") === "true";

    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      setOpen(!isOpen());
      if (isOpen()) {
        const firstLink = menu.querySelector("a, button, [tabindex]:not([tabindex='-1'])");
        if (firstLink) setTimeout(() => firstLink.focus(), 50);
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && isOpen()) {
        setOpen(false);
        toggle.focus();
      }
    });

    document.addEventListener("click", (e) => {
      if (!isOpen()) return;
      if (toggle.contains(e.target) || menu.contains(e.target)) return;
      setOpen(false);
    });
  }

  // ---------------------------------------------------------------------------
  // SMS BUTTON (optional; only if you have [data-sms-btn] on some page)
  // ---------------------------------------------------------------------------
  initSMSButton() {
    const smsBtn = document.querySelector("[data-sms-btn]");
    if (!smsBtn) return;

    const phoneNumber = "16173964012";
    const defaultMessage = "Hi Hydindata — I'm interested in a project. My goal is:";

    smsBtn.addEventListener("click", () => {
      try {
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        const separator = isIOS ? "&" : "?";
        const encodedMessage = encodeURIComponent(defaultMessage);
        window.location.href = `sms:${phoneNumber}${separator}body=${encodedMessage}`;
      } catch (error) {
        console.error("Failed to open SMS:", error);
        this.showFallbackContact(smsBtn);
      }
    });
  }

  showFallbackContact(button) {
    const fallbackMsg = document.createElement("p");
    fallbackMsg.className = "microcopy";
    fallbackMsg.style.color = "var(--text-muted)";
    fallbackMsg.style.marginTop = "8px";
    fallbackMsg.textContent = "SMS not available. Please email hello@hydindata.com";
    button.parentElement?.appendChild(fallbackMsg);
    setTimeout(() => fallbackMsg.remove(), 5000);
  }

  // ---------------------------------------------------------------------------
  // COPY BUTTONS (optional; used on pages that have [data-copy-btn])
  // ---------------------------------------------------------------------------
  initCopyButtons() {
    const copyButtons = document.querySelectorAll("[data-copy-btn]");
    if (!copyButtons.length) return;

    copyButtons.forEach((btn) => {
      btn.addEventListener("click", async () => {
        const copybox = btn.closest(".copybox");
        if (!copybox) return;

        const codeElement = copybox.querySelector("code");
        const statusElement = copybox.querySelector("[data-copy-status]");
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
          console.error("Copy failed:", error);
          this.showCopyError(statusElement);
        }
      });
    });
  }

  showCopySuccess(button, statusElement) {
    const originalText = button.textContent;
    button.textContent = "Copied!";
    if (statusElement) statusElement.textContent = "Template copied to clipboard";
    setTimeout(() => {
      button.textContent = originalText;
      if (statusElement) statusElement.textContent = "";
    }, 2000);
  }

  showCopyError(statusElement) {
    if (!statusElement) return;
    statusElement.textContent = "Failed to copy. Please select and copy manually.";
    setTimeout(() => (statusElement.textContent = ""), 3000);
  }

  fallbackCopy(text, button, statusElement) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    try {
      textarea.select();
      document.execCommand("copy");
      this.showCopySuccess(button, statusElement);
    } catch {
      this.showCopyError(statusElement);
    } finally {
      document.body.removeChild(textarea);
    }
  }

  // ---------------------------------------------------------------------------
  // KEYBOARD NAV HELPER
  // ---------------------------------------------------------------------------
  initKeyboardNav() {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Tab") document.body.classList.add("keyboard-nav");
    });
    document.addEventListener("mousedown", () => {
      document.body.classList.remove("keyboard-nav");
    });

    const skipLink = document.querySelector(".skip-link");
    if (!skipLink) return;

    skipLink.addEventListener("click", (e) => {
      e.preventDefault();
      const href = skipLink.getAttribute("href");
      if (!href) return;
      const target = document.querySelector(href);
      if (!target) return;
      target.setAttribute("tabindex", "-1");
      target.focus();
    });
  }

  // ---------------------------------------------------------------------------
  // CAROUSEL (robust + scoped + accessible)
  // ---------------------------------------------------------------------------
  initCarousels() {
    const tracks = document.querySelectorAll("[data-carousel-track]");
    if (!tracks.length) return;
    tracks.forEach((track) => this.initCarousel(track));
  }

  initCarousel(track) {
    // IMPORTANT: scope items/controls to the carousel container
    const container = track.closest(".carousel-container") || track.parentElement;

    const items = track.querySelectorAll("[data-carousel-item]");
    if (!items.length) return;

    const prevBtn = container?.querySelector("[data-carousel-prev]") || null;
    const nextBtn = container?.querySelector("[data-carousel-next]") || null;

    // indicators in your HTML are buttons with data-carousel-indicator="0|1|2"
    const indicators = container
      ? container.querySelectorAll("[data-carousel-indicator]")
      : document.querySelectorAll("[data-carousel-indicator]");

    let currentIndex = 0;
    let timer = null;
    const AUTO_SCROLL_DELAY = 5000;

    const clampIndex = (i) => {
      const n = items.length;
      return ((i % n) + n) % n;
    };

    const setActiveIndicator = (index) => {
      if (!indicators || !indicators.length) return;

      indicators.forEach((btn) => {
        const raw = btn.getAttribute("data-carousel-indicator");
        const btnIndex = raw != null ? Number(raw) : NaN;
        const isActive = Number.isFinite(btnIndex) ? btnIndex === index : false;
        btn.classList.toggle("active", isActive);

        // a11y (optional but helpful)
        if (isActive) btn.setAttribute("aria-current", "true");
        else btn.removeAttribute("aria-current");
      });
    };

    const update = (index, { focus = false } = {}) => {
      const next = clampIndex(index);
      track.style.transform = `translateX(-${next * 100}%)`;
      currentIndex = next;
      setActiveIndicator(next);

      // optional: ensure focus stays inside visible slide for keyboard users
      if (focus) {
        const link = items[next].querySelector("a, button, [tabindex]:not([tabindex='-1'])");
        if (link) link.focus({ preventScroll: true });
      }
    };

    const stop = () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    };

    const start = () => {
      stop();
      // Respect reduced motion: no auto-scroll
      const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;
      timer = setInterval(() => update(currentIndex + 1), AUTO_SCROLL_DELAY);
    };

    const next = () => update(currentIndex + 1);
    const prev = () => update(currentIndex - 1);

    // Buttons
    if (nextBtn) {
      nextBtn.addEventListener("click", (e) => {
        e.preventDefault();
        next();
        start();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", (e) => {
        e.preventDefault();
        prev();
        start();
      });
    }

    // Indicators: use their declared index attribute, not DOM order
    if (indicators && indicators.length) {
      indicators.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          const raw = btn.getAttribute("data-carousel-indicator");
          const idx = raw != null ? Number(raw) : NaN;
          if (!Number.isFinite(idx)) return;
          update(idx);
          start();
        });
      });
    }

    // Pause on hover/focus
    track.addEventListener("mouseenter", stop);
    track.addEventListener("mouseleave", start);
    track.addEventListener("focusin", stop);
    track.addEventListener("focusout", start);

    // Keyboard arrow support when focus is inside container
    if (container) {
      container.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          next();
          start();
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          prev();
          start();
        }
      });
    }

    // Stop when tab hidden
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stop();
      else start();
    });

    // Initial state
    update(0);
    start();
  }
}

new HydindataSite();