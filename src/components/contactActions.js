/**
 * Renders the fixed WhatsApp + back-to-top buttons.
 *
 * @param {HTMLElement} container
 * @param {{ whatsapp: string, phone: string }} theme
 */
export function renderContactActions(container, theme) {
  container.className = "utility-actions";
  container.innerHTML = `
    <a
      class="utility-btn utility-btn--ember"
      href="https://wa.me/${theme.whatsapp}"
      target="_blank"
      rel="noopener"
      aria-label="تواصل عبر واتساب"
    >💬</a>
    <a class="utility-btn" href="#top" aria-label="العودة لأعلى الصفحة">↑</a>
  `;
}
