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

})();
