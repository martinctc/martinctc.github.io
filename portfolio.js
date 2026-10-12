/* Portfolio project rows: arrow-button enhancement for the CSS scroll-snap rows.
   Written as a progressive enhancement - rows scroll natively without this. */
(function () {
  var wraps = document.querySelectorAll('.pf-rowwrap');
  Array.prototype.forEach.call(wraps, function (wrap) {
    var row = wrap.querySelector('.pf-row');
    var left = wrap.querySelector('.pf-arrow--l');
    var right = wrap.querySelector('.pf-arrow--r');
    if (!row || !left || !right) { return; }

    var reduceMotion = window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function step() {
      return Math.max(row.clientWidth * 0.8, 200);
    }
    function update() {
      var max = row.scrollWidth - row.clientWidth - 2;
      left.disabled = row.scrollLeft <= 2;
      right.disabled = row.scrollLeft >= max;
    }

    left.addEventListener('click', function () {
      row.scrollBy({ left: -step(), behavior: reduceMotion ? 'auto' : 'smooth' });
    });
    right.addEventListener('click', function () {
      row.scrollBy({ left: step(), behavior: reduceMotion ? 'auto' : 'smooth' });
    });
    row.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  });
})();
