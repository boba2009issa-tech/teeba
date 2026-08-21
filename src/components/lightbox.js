/**
 * Small controller around the lightbox overlay.
 * Call initLightbox() once, then use the returned .open()/.close() methods.
 *
 * @param {HTMLElement} overlay - the .lightbox element
 */
export function initLightbox(overlay) {
  const img = overlay.querySelector("img");
  const closeBtn = overlay.querySelector(".lightbox__close");

  function open(src, alt) {
    img.src = src;
    img.alt = alt || "";
    overlay.classList.add("is-open");
  }

  function close() {
    overlay.classList.remove("is-open");
    img.src = "";
  }

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) close();
  });
  closeBtn.addEventListener("click", close);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });

  return { open, close };
}
