/**
 * theme.config.js
 * ----------------
 * Everything that changes when you reuse this template for a DIFFERENT
 * restaurant lives in this one file. You should not need to touch any
 * component, page, or CSS file to rebrand the menu.
 *
 * - name / tagline / phone / whatsapp: shown in the header and footer.
 * - logo / favicon: paths to image files you provide (put them in /public
 *   or next to index.html and update the paths below).
 * - colors: CSS custom properties applied at runtime. Keep the same
 *   variable names; change only the values.
 * - dir: "rtl" for Arabic/Hebrew menus, "ltr" for others.
 */
export const theme = {
  name: " أطياب طيبة",
  tagline: "الطعم الأصيل",
  logo: "./logo.jpg",
  favicon: "./logo.jpg",
  phone: "01122557111",
  whatsapp: "201122557111", // international format, no + or spaces
  dir: "rtl",
  currency: "ج.م",

  colors: {
    // Charcoal-and-embers palette, grounded in the grill: warm charcoal
    // surfaces, bone-colored text, an ember accent for price/active state,
    // and a muted brass accent for dividers and secondary marks.
    "--color-bg": "#1B1613",
    "--color-surface": "#241E19",
    "--color-surface-raised": "#2C2521",
    "--color-text": "#EDE6DC",
    "--color-text-soft": "#A89A8C",
    "--color-ember": "#C1502E",
    "--color-ember-soft": "#8C3B22",
    "--color-brass": "#9C7A3C",
    "--color-border": "#3A322B",
  },
};
