/* Site-wide light/dark theme controller for vaazee.net.
   Persists the choice in localStorage['vaazee-theme'] so it carries across
   every page; falls back to the OS preference when unset. Loaded synchronously
   in <head> so the theme is applied before first paint (no flash). */
(function () {
  var KEY = 'vaazee-theme';

  function sysDark() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  function stored() {
    try { var t = localStorage.getItem(KEY); if (t === 'light' || t === 'dark') return t; } catch (e) {}
    return null;
  }
  function current() { return stored() || (sysDark() ? 'dark' : 'light'); }
  function apply(t) { document.documentElement.setAttribute('data-theme', t); }

  // Apply ASAP (this script runs in <head> before <body> is painted).
  apply(current());

  function mountButton() {
    if (document.getElementById('vz-theme-toggle')) return;
    var btn = document.createElement('button');
    btn.id = 'vz-theme-toggle';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Toggle light or dark theme');
    function render() {
      var dark = document.documentElement.getAttribute('data-theme') === 'dark';
      btn.textContent = dark ? '☀️' : '🌙';
      btn.title = dark ? 'Switch to light theme' : 'Switch to dark theme';
    }
    render();
    btn.addEventListener('click', function () {
      var cur = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      var next = cur === 'dark' ? 'light' : 'dark';
      apply(next);
      try { localStorage.setItem(KEY, next); } catch (e) {}
      render();
    });
    document.body.appendChild(btn);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountButton);
  } else {
    mountButton();
  }
})();
