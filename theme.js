/* Force soft look; clear legacy theme prefs (base/sun/night removed). */
(function () {
  try { localStorage.removeItem('raseekh_theme'); } catch (_) {}
  try {
    document.documentElement.removeAttribute('data-theme');
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', '#E8EDF2');
  } catch (_) {}
  // Remove any leftover theme switch UI if cached HTML still has it.
  function scrub() {
    document.querySelectorAll('.theme-switch, [data-theme-set], [data-theme-toggle]').forEach(function (el) {
      el.remove();
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', scrub);
  else scrub();
})();
