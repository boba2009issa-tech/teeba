# Restaurant QR Menu Template

A reusable, mobile-first digital menu. No build step required — plain HTML,
CSS, and ES modules. Open `index.html` through a local server (see below)
and it works.

## Run it locally

Browsers block `fetch()` on `file://` pages, so serve the folder instead of
double-clicking `index.html`:

```bash
npx serve .
# or
python3 -m http.server 8080
```

Then open the printed local address in your browser.

## Rebrand for a new restaurant

You should only need to touch these, no component code:

1. **`src/data/theme.config.js`** — name, tagline, phone, WhatsApp number,
   and the color tokens (`--color-bg`, `--color-ember`, etc.).
2. **`src/data/menu.json`** — your categories and items. Shape:
   ```json
   {
     "categories": [
       {
         "id": "unique-id",
         "name": "Category name",
         "items": [
           {
             "name": "Item name",
             "description": "Optional one-line description",
             "image": "https://... or ./images/xyz.jpg",
             "price": 100
           },
           {
             "name": "Item with sizes",
             "image": "...",
             "sizes": [
               { "label": "Small", "price": 90 },
               { "label": "Large", "price": 150 }
             ]
           }
         ]
       }
     ]
   }
   ```
   An item has either `price` (single) or `sizes` (any number of them) —
   never both. `description` is always optional.
3. **Logo / favicon** — replace `logo.jpg` (referenced from
   `theme.config.js`) with your own image, any filename.

## Project structure

```
index.html            entry HTML shell
main.js               boots the page
src/
  components/          one file per UI piece (tabs, search, list, lightbox, contact buttons)
  data/                menu.json (content) + theme.config.js (branding)
  pages/               menuPage.js orchestrates data + components
  styles/              main.css (all design tokens + component styles)
  utils/               imageUrl.js (CDN thumbnail fix-up helper)
```

## Notes on behavior

- Search is instant and searches **all categories**, not just the visible
  one, so a guest can find an item without knowing its section. While a
  search is active, category tabs are disabled and results show which
  category each match came from.
- Search has a real empty state with a "clear search" action, not a blank
  screen.
- Images lazy-load and open in a lightbox on click/tap/keyboard.
- All colors, spacing, and radii are CSS custom properties in
  `main.css`/`theme.config.js` — no color values are hardcoded inside
  component files.
