/* Scroll-triggered animation activator.
   Runs on desktop only. Mobile (<=840px) and prefers-reduced-motion users
   get nothing: elements are visible immediately, no transitions.
   Pairs with the [data-animate] CSS rules in css/style.css. */
(function () {
  var MOBILE_BREAKPOINT = 840;
  var prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isNarrow = window.innerWidth <= MOBILE_BREAKPOINT;

  if (prefersReduced || isNarrow) return;

  document.body.classList.add('anim-on');

  var targets = document.querySelectorAll('[data-animate]');
  if (!targets.length) return;

  if (!('IntersectionObserver' in window)) {
    targets.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });

  targets.forEach(function (el) { observer.observe(el); });
})();
