/**
 * CreatorTools Hub — main.js
 * Global logic: mobile menu toggle, FAQ accordion,
 * active nav highlighting, smooth scroll, utility helpers.
 *
 * Vanilla JS only. No frameworks. No dependencies.
 */

'use strict';

/* ============================================================
   UTILITY HELPERS
   ============================================================ */

/**
 * Shorthand querySelector
 * @param {string} selector
 * @param {Document|Element} [ctx=document]
 * @returns {Element|null}
 */
const $ = (selector, ctx = document) => ctx.querySelector(selector);

/**
 * Shorthand querySelectorAll (returns real Array)
 * @param {string} selector
 * @param {Document|Element} [ctx=document]
 * @returns {Element[]}
 */
const $$ = (selector, ctx = document) => [...ctx.querySelectorAll(selector)];

/**
 * Copy text to clipboard, returns Promise<boolean>
 * @param {string} text
 * @returns {Promise<boolean>}
 */
async function copyToClipboard(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    // Fallback for non-secure contexts
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.cssText = 'position:fixed;left:-9999px;top:-9999px;opacity:0;';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    const success = document.execCommand('copy');
    document.body.removeChild(textarea);
    return success;
  } catch (err) {
    console.error('Clipboard error:', err);
    return false;
  }
}

/**
 * Animate a button to show "Copied!" feedback, then revert.
 * @param {HTMLElement} btn
 * @param {number} [duration=2000] ms
 */
function showCopiedFeedback(btn, duration = 2000) {
  const originalHTML = btn.innerHTML;
  btn.innerHTML = `
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
    Copied!
  `;
  btn.classList.add('copied');
  btn.disabled = true;

  setTimeout(() => {
    btn.innerHTML = originalHTML;
    btn.classList.remove('copied');
    btn.disabled = false;
  }, duration);
}

/**
 * Debounce a function call
 * @param {Function} fn
 * @param {number} wait
 * @returns {Function}
 */
function debounce(fn, wait) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), wait);
  };
}

/* ============================================================
   MOBILE MENU
   ============================================================ */

function initMobileMenu() {
  const toggle = $('#menu-toggle');
  const mobileNav = $('#mobile-nav');

  if (!toggle || !mobileNav) return;

  // Toggle open/close
  toggle.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', isOpen);
    toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');

    // Swap icon
    toggle.innerHTML = isOpen ? getCloseIcon() : getHamburgerIcon();
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!toggle.contains(e.target) && !mobileNav.contains(e.target)) {
      closeMobileMenu();
    }
  });

  // Close on nav link click
  $$('.nav-link', mobileNav).forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMobileMenu();
  });

  function closeMobileMenu() {
    mobileNav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
    toggle.innerHTML = getHamburgerIcon();
  }
}

function getHamburgerIcon() {
  return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true">
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>`;
}

function getCloseIcon() {
  return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>`;
}

/* ============================================================
   ACTIVE NAV LINK
   ============================================================ */

function initActiveNav() {
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/';

  $$('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;

    // Normalize href
    const linkPath = href.replace(/\/$/, '') || '/';

    if (
      linkPath === currentPath ||
      (linkPath !== '/' && currentPath.startsWith(linkPath))
    ) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
}

/* ============================================================
   FAQ ACCORDION
   ============================================================ */

function initFAQAccordion() {
  const faqItems = $$('.faq-item');

  faqItems.forEach(item => {
    const btn = $('.faq-question', item);
    const answer = $('.faq-answer', item);

    if (!btn || !answer) return;

    // Set initial ARIA
    const isExpanded = btn.getAttribute('aria-expanded') === 'true';
    if (isExpanded) answer.classList.add('is-open');

    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';

      // Close all others (accordion behavior)
      faqItems.forEach(otherItem => {
        const otherBtn = $('.faq-question', otherItem);
        const otherAnswer = $('.faq-answer', otherItem);
        if (otherBtn && otherAnswer && otherBtn !== btn) {
          otherBtn.setAttribute('aria-expanded', 'false');
          otherAnswer.classList.remove('is-open');
        }
      });

      // Toggle current
      btn.setAttribute('aria-expanded', !expanded);
      answer.classList.toggle('is-open', !expanded);
    });
  });
}

/* ============================================================
   SMOOTH SCROLL (for anchor links)
   ============================================================ */

function initSmoothScroll() {
  $$('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);

      if (target) {
        e.preventDefault();
        const headerOffset = parseInt(
          getComputedStyle(document.documentElement)
            .getPropertyValue('--header-height')
        ) || 68;

        const top = target.getBoundingClientRect().top + window.scrollY - headerOffset - 16;
        window.scrollTo({ top, behavior: 'smooth' });
        target.focus({ preventScroll: true });
      }
    });
  });
}

/* ============================================================
   SCROLL REVEAL (lightweight, CSS-class based)
   Uses IntersectionObserver to add .is-visible on scroll
   ============================================================ */

function initScrollReveal() {
  // Only if elements exist
  const revealEls = $$('[data-reveal]');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach(el => observer.observe(el));
}

/* ============================================================
   COPY BUTTON — Global delegation
   Handles any .copy-btn with [data-copy] attribute
   ============================================================ */

function initGlobalCopyButtons() {
  document.addEventListener('click', async (e) => {
    const btn = e.target.closest('.copy-btn[data-copy]');
    if (!btn) return;

    const textToCopy = btn.getAttribute('data-copy');
    if (!textToCopy) return;

    const success = await copyToClipboard(textToCopy);
    if (success) showCopiedFeedback(btn);
  });
}

/* ============================================================
   TOOL GENERATE BUTTON — loading state helper
   ============================================================ */

/**
 * Set a generate button into loading state.
 * @param {HTMLButtonElement} btn
 */
function setButtonLoading(btn) {
  btn.dataset.originalText = btn.textContent.trim();
  btn.innerHTML = `<span class="spinner" aria-hidden="true"></span> Generating...`;
  btn.disabled = true;
  btn.setAttribute('aria-busy', 'true');
}

/**
 * Reset a generate button from loading state.
 * @param {HTMLButtonElement} btn
 */
function resetButtonLoading(btn) {
  btn.textContent = btn.dataset.originalText || 'Generate';
  btn.disabled = false;
  btn.removeAttribute('aria-busy');
}

/* ============================================================
   TOAST NOTIFICATION (lightweight)
   ============================================================ */

let toastTimer;

/**
 * Show a brief toast notification
 * @param {string} message
 * @param {'success'|'error'|'info'} [type='success']
 * @param {number} [duration=3000]
 */
function showToast(message, type = 'success', duration = 3000) {
  let toast = $('#site-toast');

  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'site-toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.style.cssText = `
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%) translateY(80px);
      background: var(--color-text-heading);
      color: #fff;
      padding: 12px 24px;
      border-radius: var(--radius-full);
      font-family: var(--font-heading);
      font-size: var(--fs-sm);
      font-weight: var(--fw-semi);
      box-shadow: var(--shadow-xl);
      z-index: 9999;
      transition: transform 300ms ease, opacity 300ms ease;
      opacity: 0;
      white-space: nowrap;
      pointer-events: none;
    `;
    document.body.appendChild(toast);
  }

  // Style by type
  const colors = {
    success: '#27AE60',
    error:   '#E74C3C',
    info:    '#6C63FF'
  };
  toast.style.background = colors[type] || colors.info;
  toast.textContent = message;

  // Show
  clearTimeout(toastTimer);
  requestAnimationFrame(() => {
    toast.style.transform = 'translateX(-50%) translateY(0)';
    toast.style.opacity = '1';
  });

  // Hide after duration
  toastTimer = setTimeout(() => {
    toast.style.transform = 'translateX(-50%) translateY(80px)';
    toast.style.opacity = '0';
  }, duration);
}

/* ============================================================
   HEADER SHADOW on scroll
   ============================================================ */

function initHeaderScroll() {
  const header = $('.site-header');
  if (!header) return;

  const updateHeader = () => {
    if (window.scrollY > 10) {
      header.style.boxShadow = 'var(--shadow-md)';
    } else {
      header.style.boxShadow = 'none';
    }
  };

  window.addEventListener('scroll', debounce(updateHeader, 50), { passive: true });
  updateHeader();
}

/* ============================================================
   CHARACTER COUNTER for inputs
   ============================================================ */

function initCharCounters() {
  $$('[data-maxlength]').forEach(input => {
    const max = parseInt(input.dataset.maxlength);
    const counterId = input.dataset.counter;
    const counter = counterId ? document.getElementById(counterId) : null;

    if (!counter) return;

    const update = () => {
      const len = input.value.length;
      counter.textContent = `${len}/${max}`;
      counter.style.color = len > max * 0.9
        ? 'var(--color-error)'
        : 'var(--color-text-muted)';
    };

    input.addEventListener('input', update);
    update();
  });
}

/* ============================================================
   INIT — Run on DOMContentLoaded
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initActiveNav();
  initFAQAccordion();
  initSmoothScroll();
  initScrollReveal();
  initGlobalCopyButtons();
  initHeaderScroll();
  initCharCounters();
});

/* ============================================================
   EXPORTS (for use in tools.js / inline scripts)
   ============================================================ */

window.CTH = {
  copyToClipboard,
  showCopiedFeedback,
  showToast,
  setButtonLoading,
  resetButtonLoading,
  debounce,
  $,
  $$
};
