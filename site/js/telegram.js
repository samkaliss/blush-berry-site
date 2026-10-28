// Ссылки в Telegram с готовым текстом.
// Формат по официальной документации: https://core.telegram.org/api/links — t.me/<username>?text=<draft_text>
(function () {
  var config = window.BB_CONFIG;

  function chatUrl(text) {
    if (!config.telegramUsername) return null;
    var url = "https://t.me/" + encodeURIComponent(config.telegramUsername);
    return text ? url + "?text=" + encodeURIComponent(text) : url;
  }

  // Кнопки с data-telegram="<ключ сообщения>" получают ссылку на чат.
  function bindLinks(root) {
    root.querySelectorAll("[data-telegram]").forEach(function (link) {
      var text = config.messages[link.dataset.telegram] || "";
      var url = chatUrl(text);
      if (url) {
        link.href = url;
        link.target = "_blank";
        link.rel = "noopener";
        return;
      }
      // ⚠ Username ещё не указан: не ведём на несуществующий чат.
      link.addEventListener("click", function (event) {
        event.preventDefault();
        console.warn("Blush-Berry: telegramUsername не указан в js/config.js");
      });
    });
  }

  window.BB_TELEGRAM = { chatUrl: chatUrl, bindLinks: bindLinks };
})();
