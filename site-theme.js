(function () {
  var storageKey = 'preferred-theme';
  var root = document.documentElement;
  var theme = 'light';

  try {
    var savedTheme = localStorage.getItem(storageKey);
    if (savedTheme === 'light' || savedTheme === 'dark') theme = savedTheme;
  } catch (error) {
    // Light mode remains available when browser storage is disabled.
  }
  root.setAttribute('data-theme', theme);

  document.addEventListener('DOMContentLoaded', function () {
    var toggle = document.querySelector('.theme-toggle');

    function applyTheme(nextTheme) {
      root.setAttribute('data-theme', nextTheme);
      toggle.setAttribute('aria-pressed', nextTheme === 'dark' ? 'true' : 'false');
      toggle.setAttribute('aria-label', nextTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }

    if (toggle) {
      applyTheme(theme);
      toggle.addEventListener('click', function () {
        theme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        applyTheme(theme);
        try {
          localStorage.setItem(storageKey, theme);
        } catch (error) {
          // Switching themes still works without persistence.
        }
      });
    }

    document.querySelectorAll('.section-nav a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function () {
        var heading = document.getElementById(link.getAttribute('href').slice(1));
        if (!heading) return;
        heading.setAttribute('tabindex', '-1');
        heading.focus({ preventScroll: true });
      });
    });
  });
}());
