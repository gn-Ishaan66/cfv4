/* Shared by every page. Loaded at the end of <body>. */
(function () {
  'use strict';

  /* ---- Mobile menu: state announced, Escape closes, focus returns ---- */
  var menuBtn    = document.getElementById('menuBtn');
  var menuIcon   = document.getElementById('menuIcon');
  var mobileMenu = document.getElementById('mobileMenu');

  function setMenu(open) {
    mobileMenu.style.maxHeight = open ? mobileMenu.scrollHeight + 'px' : '0px';
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menuIcon.className = open ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
  }

  menuBtn.addEventListener('click', function () {
    setMenu(menuBtn.getAttribute('aria-expanded') !== 'true');
  });

  mobileMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () { setMenu(false); });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menuBtn.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      menuBtn.focus();
    }
  });

  /* Recalculate the open menu's height if the viewport changes under it */
  window.addEventListener('resize', function () {
    if (menuBtn.getAttribute('aria-expanded') === 'true') {
      mobileMenu.style.maxHeight = mobileMenu.scrollHeight + 'px';
    }
  });

  /* ---- Photo slots: drop a missing image rather than showing a broken icon.
       Once real files exist at the src paths, this never fires. ---- */
  document.querySelectorAll('.photo img').forEach(function (img) {
    function drop() {
      var slot = img.parentNode;
      if (!slot) return;
      slot.classList.add('is-empty');
      slot.removeChild(img);
    }
    if (img.complete && img.naturalWidth === 0) { drop(); }
    else { img.addEventListener('error', drop); }
  });

  /* ---- Scroll reveal ----
     Deliberately a position sweep rather than an IntersectionObserver. Every
     nav link here is a same-page anchor that jumps over whole sections, and an
     observer can miss an element entirely on a jump that large — leaving that
     content stuck at opacity 0 for good. Comparing absolute position on each
     frame cannot miss, and a page has far too few for it to cost anything. */
  var items = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduced) {
    items.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    items.forEach(function (el, i) {
      el.style.transitionDelay = (Math.min(i % 3, 2) * 70) + 'ms';
    });

    /* Runs synchronously — deliberately not gated behind requestAnimationFrame.
       rAF is frozen while a document is hidden, so a page opened in a
       background tab would queue a sweep that never runs and, with a latch
       flag, never runs again either: every section below the fold stays at
       opacity 0 for the whole visit. Reads are batched ahead of writes so the
       pass costs one layout, not one per element. */
    function sweep() {
      var limit = window.innerHeight * 0.92;
      var due = [];
      for (var i = 0; i < items.length; i++) {
        if (items[i].getBoundingClientRect().top < limit) due.push(items[i]);
      }
      for (var j = 0; j < due.length; j++) {
        due[j].classList.add('is-visible');
      }
      items = items.filter(function (el) { return !el.classList.contains('is-visible'); });
      if (!items.length) unbind();
    }

    var events = ['scroll', 'resize', 'load', 'pageshow', 'hashchange', 'orientationchange'];
    function unbind() {
      events.forEach(function (ev) { window.removeEventListener(ev, sweep); });
      document.removeEventListener('visibilitychange', sweep);
    }

    window.addEventListener('scroll', sweep, { passive: true });
    ['resize', 'load', 'pageshow', 'hashchange', 'orientationchange'].forEach(function (ev) {
      window.addEventListener(ev, sweep);
    });
    /* A tab restored from the background needs a pass of its own: no scroll or
       resize event necessarily follows it. */
    document.addEventListener('visibilitychange', sweep);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(sweep);
    sweep();
  }
})();
