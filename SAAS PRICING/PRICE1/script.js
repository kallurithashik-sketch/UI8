(function(){
  var m = document.getElementById('m'),
      y = document.getElementById('y');

  function set(yearly){
    m.setAttribute('aria-pressed', String(!yearly));
    y.setAttribute('aria-pressed', String(yearly));

    // Swap prices
    document.querySelectorAll('[data-m]').forEach(function(el){
      el.textContent = yearly ? el.dataset.y : el.dataset.m;
    });

    // Swap billing notes
    document.querySelectorAll('[data-bm]').forEach(function(el){
      el.textContent = yearly ? el.dataset.by : el.dataset.bm;
    });
  }

  m.onclick = function(){ set(false); };
  y.onclick = function(){ set(true); };
})();