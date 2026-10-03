(function () {
  var seats = document.getElementById('seats'),
      out = document.getElementById('seatsOut'),
      m = document.getElementById('m'),
      y = document.getElementById('y'),
      yearly = false;

  function render() {
    var n = Number(seats.value);
    var factor = yearly ? 0.75 : 1;

    out.textContent = n + (n === 1 ? ' seat' : ' seats');
    seats.style.setProperty('--p', ((n - 1) / 49 * 100) + '%');
    m.setAttribute('aria-pressed', String(!yearly));
    y.setAttribute('aria-pressed', String(yearly));

    document.querySelectorAll('[data-base]').forEach(function (el) {
      var base = Number(el.dataset.base);
      var perSeat = base * factor;
      el.textContent = Math.round(perSeat * n).toLocaleString();
      el.closest('.buy').querySelector('.per').textContent =
        '$' + (Math.round(perSeat * 100) / 100) + ' per seat';
    });
  }

  seats.addEventListener('input', render);
  m.onclick = function () { yearly = false; render(); };
  y.onclick = function () { yearly = true; render(); };
  render();
})();