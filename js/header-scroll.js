(function () {
  var header = document.querySelector('.header');
  if (!header) return;
  var THRESHOLD = 80;
  function check() {
    if (window.scrollY > THRESHOLD) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  }
  window.addEventListener('scroll', check, { passive: true });
  check();
})();
