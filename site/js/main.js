(function () {
  var header = document.querySelector(".site-header");
  var hero = document.querySelector(".hero");
  var stickyCta = document.querySelector(".sticky-cta");
  // Калькулятор P01-S04 появится на следующем шаге сборки.
  var calculator = document.getElementById("calculator");

  window.BB_TELEGRAM.bindLinks(document);

  // Панель прозрачна на первом экране и получает фон после прокрутки.
  function updateHeader() {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  // Закреплённая кнопка: видна, когда первый экран ушёл вверх, и скрыта, пока виден калькулятор.
  if (stickyCta && "IntersectionObserver" in window) {
    var heroVisible = true;
    var calculatorVisible = false;

    var updateSticky = function () {
      stickyCta.classList.toggle("is-visible", !heroVisible && !calculatorVisible);
    };

    new IntersectionObserver(function (entries) {
      heroVisible = entries[0].isIntersecting;
      updateSticky();
    }).observe(hero);

    if (calculator) {
      new IntersectionObserver(function (entries) {
        calculatorVisible = entries[0].isIntersecting;
        updateSticky();
      }).observe(calculator);
    }
  }
})();
