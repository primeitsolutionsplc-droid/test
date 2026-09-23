# Prime IT Solutions website

A clean, professional one-page website. Plain HTML, CSS and JavaScript: no frameworks, no build step.

## Files

```
index.html        all page content (English text lives here)
css/style.css     design: colours, fonts, layout (colours at the top, in :root)
js/main.js        Sinhala text (SI list), language switch, menu, POS demo, contact form, tabs, animations
assets/           logo-mark / logo-full (for light backgrounds) and *-light versions (for dark backgrounds)
```

## Open it

Double-click `index.html`. Only the Google Fonts need internet.

## Design

- Colours are taken from the logo: navy `#07203F` and blue `#0373D9`.
  Change them in `:root` at the top of `css/style.css`.
- Fonts: Plus Jakarta Sans (headings), Inter (text), Noto Sans Sinhala (Sinhala).
- Page order: hero -> services -> why Prime IT -> sample work -> live POS demo -> students ->
  process -> FAQ -> call to action -> contact -> footer.

## Editing

- **English text**: edit it in `index.html`.
- **Sinhala text**: the `SI` list at the top of `js/main.js` (same key as the `data-i18n` attribute).
  Headings with a blue highlighted phrase use `<em>…</em>` in both languages.
- **Phone / email / Facebook / WhatsApp**: search for `94765316063`, `primeitsolutionsplc@gmail.com`
  and `facebook.com` in `index.html` and `js/main.js`.
- **POS demo items and prices**: the `ITEMS` list in `js/main.js`.
- **Sample work**: the three tabs are sample designs, clearly labelled "Sample design".
  When you have real client projects, replace them with screenshots of real work.

## Put it online (free)

1. Drag the whole folder onto https://app.netlify.com/drop (or use Vercel / GitHub Pages).
2. Connect your domain (primeitsolutionsplc.com) in the hosting dashboard.
