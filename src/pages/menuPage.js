import { theme } from "../data/theme.config.js";
import { renderCategoryTabs, setTabsDisabled } from "../components/categoryTabs.js";
import { initSearchBar } from "../components/searchBar.js";
import { renderMenuList, renderEmptyState } from "../components/menuList.js";
import { initLightbox } from "../components/lightbox.js";
import { renderContactActions } from "../components/contactActions.js";

export async function initMenuPage() {
  applyTheme(theme);

  const els = {
    tabs: document.getElementById("tabs"),
    searchInput: document.getElementById("search-input"),
    searchClear: document.getElementById("search-clear"),
    sectionTitle: document.getElementById("section-title"),
    list: document.getElementById("menu-list"),
    lightbox: document.getElementById("lightbox"),
    utilityActions: document.getElementById("utility-actions"),
  };

  renderContactActions(els.utilityActions, theme);
  const lightbox = initLightbox(els.lightbox);

  const state = {
    menuData: null,
    activeCategoryId: null,
    query: "",
  };

  try {
    const response = await fetch("./src/data/menu.json");
    if (!response.ok) throw new Error("Failed to load menu");
    state.menuData = await response.json();
  } catch (err) {
    els.list.innerHTML = "";
    renderEmptyState(els.list, {
      message: "تعذّر تحميل المنيو حالياً. برجاء تحديث الصفحة أو المحاولة لاحقاً.",
    });
    return;
  }

  if (!state.menuData?.categories?.length) {
    renderEmptyState(els.list, { message: "لا توجد أصناف متاحة حالياً." });
    return;
  }

  state.activeCategoryId = state.menuData.categories[0].id;

  renderCategoryTabs(els.tabs, state.menuData.categories, state.activeCategoryId, (id) => {
    state.activeCategoryId = id;
    render();
  });

  initSearchBar(els.searchInput, els.searchClear, (query) => {
    state.query = query;
    setTabsDisabled(els.tabs, query.length > 0);
    render();
  });

  function render() {
    const isSearching = state.query.length > 0;

    if (isSearching) {
      const results = searchItems(state.menuData.categories, state.query);
      els.sectionTitle.textContent = `نتائج البحث عن "${state.query}"`;

      if (results.length === 0) {
        els.list.innerHTML = "";
        renderEmptyState(els.list, {
          message: `لم نجد أصنافاً تطابق "${state.query}".`,
          actionLabel: "مسح البحث",
          onAction: () => {
            els.searchInput.value = "";
            els.searchClear.classList.remove("is-visible");
            state.query = "";
            setTabsDisabled(els.tabs, false);
            render();
          },
        });
        return;
      }

      renderMenuList(els.list, results, {
        currency: theme.currency,
        showCategoryTag: true,
        onImageClick: (src, alt) => lightbox.open(src, alt),
      });
      return;
    }

    const category = state.menuData.categories.find((c) => c.id === state.activeCategoryId);
    if (!category) return;

    els.sectionTitle.textContent = category.name;
    renderCategoryTabs(els.tabs, state.menuData.categories, state.activeCategoryId, (id) => {
      state.activeCategoryId = id;
      render();
    });

    renderMenuList(els.list, category.items, {
      currency: theme.currency,
      onImageClick: (src, alt) => lightbox.open(src, alt),
    });
  }

  render();
}

/** Cross-category search over name + description, case-insensitive. */
function searchItems(categories, query) {
  const q = query.toLowerCase();
  const results = [];

  categories.forEach((category) => {
    category.items.forEach((item) => {
      const haystack = `${item.name} ${item.description ?? ""}`.toLowerCase();
      if (haystack.includes(q)) {
        results.push({ ...item, categoryName: category.name });
      }
    });
  });

  return results;
}

function applyTheme(theme) {
  document.documentElement.dir = theme.dir || "rtl";
  document.title = theme.name;

  Object.entries(theme.colors || {}).forEach(([key, value]) => {
    document.documentElement.style.setProperty(key, value);
  });

  const favicon = document.querySelector('link[rel="icon"]');
  if (favicon && theme.favicon) favicon.href = theme.favicon;

  const logoEl = document.getElementById("cover-logo");
  if (logoEl) {
    if (theme.logo) {
      logoEl.src = theme.logo;
      logoEl.alt = theme.name;
      // If the logo file hasn't been added yet, don't show a broken-image icon.
      logoEl.addEventListener("error", () => logoEl.remove(), { once: true });
    } else {
      logoEl.remove();
    }
  }

  const nameEl = document.getElementById("cover-name");
  if (nameEl) nameEl.textContent = theme.name;

  const taglineEl = document.getElementById("cover-tagline");
  if (taglineEl) {
    if (theme.tagline) taglineEl.textContent = theme.tagline;
    else taglineEl.remove();
  }

  const footerEl = document.getElementById("footer-phone");
  if (footerEl) footerEl.textContent = `${theme.name} — ${theme.phone}`;
}
