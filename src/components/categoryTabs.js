/**
 * Renders the horizontal category rail and wires up click handling.
 *
 * @param {HTMLElement} container - element to render into
 * @param {Array<{id:string, name:string}>} categories
 * @param {string} activeId - currently selected category id (ignored while searching)
 * @param {(id:string) => void} onSelect - called when a tab is clicked
 */
export function renderCategoryTabs(container, categories, activeId, onSelect) {
  container.innerHTML = "";
  container.className = "tabs";

  categories.forEach((category) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "tab" + (category.id === activeId ? " is-active" : "");
    btn.textContent = category.name;
    btn.addEventListener("click", () => onSelect(category.id));
    container.appendChild(btn);
  });
}

export function setTabsDisabled(container, disabled) {
  container.classList.toggle("is-disabled", disabled);
}
