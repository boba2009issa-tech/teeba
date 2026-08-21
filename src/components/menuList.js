import { fixImageUrl } from "../utils/imageUrl.js";

/**
 * Renders a list of items as rows.
 *
 * @param {HTMLElement} container
 * @param {Array} items - item objects (see menu.json shape)
 * @param {object} options
 * @param {string} options.currency - e.g. "ج.م"
 * @param {boolean} options.showCategoryTag - true during cross-category search results
 * @param {(src: string, alt: string) => void} options.onImageClick
 */
export function renderMenuList(container, items, { currency, showCategoryTag = false, onImageClick }) {
  container.innerHTML = "";

  if (items.length === 0) {
    return; // caller is responsible for showing the empty state instead
  }

  const list = document.createElement("ul");
  list.className = "menu-list";

  items.forEach((item) => {
    const li = document.createElement("li");
    li.className = "menu-item";

    const imgUrl = fixImageUrl(item.image, 400);

    li.innerHTML = `
      <div class="menu-item__thumb" role="button" tabindex="0" aria-label="تكبير صورة ${escapeHtml(item.name)}">
        <img src="${imgUrl}" alt="${escapeHtml(item.name)}" loading="lazy" />
      </div>
      <div class="menu-item__body">
        ${showCategoryTag && item.categoryName ? `<span class="menu-item__category-tag">${escapeHtml(item.categoryName)}</span><br/>` : ""}
        <p class="menu-item__name">${escapeHtml(item.name)}</p>
        ${item.description ? `<p class="menu-item__desc">${escapeHtml(item.description)}</p>` : ""}
        ${renderPrice(item, currency)}
      </div>
    `;

    const thumb = li.querySelector(".menu-item__thumb");
    const openLightbox = () => onImageClick(fixImageUrl(item.image, 1200), item.name);
    thumb.addEventListener("click", openLightbox);
    thumb.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightbox();
      }
    });

    list.appendChild(li);
  });

  container.appendChild(list);
}

function renderPrice(item, currency) {
  if (Array.isArray(item.sizes) && item.sizes.length > 0) {
    const chips = item.sizes
      .map(
        (s) => `
        <span class="size-chip">
          <span class="size-chip__label">${escapeHtml(s.label)}</span>
          <span class="size-chip__price">${s.price} ${currency}</span>
        </span>`
      )
      .join("");
    return `<div class="size-chips">${chips}</div>`;
  }

  return `<p class="menu-item__price">${item.price} ${currency}</p>`;
}

/**
 * Renders the empty/no-results state. Kept separate from renderMenuList so
 * the caller decides when to show it (e.g. only during an active search).
 */
export function renderEmptyState(container, { message, actionLabel, onAction }) {
  container.innerHTML = `
    <div class="empty-state">
      <p class="empty-state__title">لا توجد نتائج</p>
      <p>${escapeHtml(message)}</p>
      ${actionLabel ? `<button type="button" class="empty-state__action">${escapeHtml(actionLabel)}</button>` : ""}
    </div>
  `;

  if (onAction) {
    container.querySelector(".empty-state__action")?.addEventListener("click", onAction);
  }
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str ?? "";
  return div.innerHTML;
}
