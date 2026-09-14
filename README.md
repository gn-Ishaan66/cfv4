# CreativeFaces Salon and Makeup Bar — website

Static site. No build step and nothing to install — these files are what gets served.

Live at **https://gn-ishaan66.github.io/cfv4/**

```
index.html           Homepage
menu.html            Menu & prices
privacy.html         Privacy
404.html             Shown for any address that doesn't exist
tailwind.css         COMPILED - do not edit by hand (see "Changing the styling")
site.css             Hand-written styling on top of Tailwind
site.js              Shared behaviour (menu button, photo fallback)
tailwind.config.cjs  Colours and fonts
src/input.css        Input to the Tailwind build
package.json         The build command
scripts/build_menu.py  Every price on the menu page
logo-*.webp/.png     Logo, in the sizes each spot needs
favicon-*, apple-touch-icon.png   Browser tab and phone icons
og-cover.jpg         Preview image shown when the site is shared
robots.txt, sitemap.xml   For search engines
```

Every file sits at the top level of the repository, and the pages expect to find them
there. Don't move them into a subfolder without updating the links inside both pages.

## Turning the site on

If the address above shows "There isn't a GitHub Pages site here", Pages isn't enabled yet:

1. Repository **Settings → Pages**.
2. Under **Source**, choose **Deploy from a branch**.
3. Branch **main**, folder **/ (root)**, then **Save**.
4. Wait a minute and reload the address.

## Still to do

**Add the social links.** Both pages have two `href="#"` placeholders in the footer, marked
with a TODO comment, for Instagram and Facebook.

**Add photos (optional).** Four photo slots look for these files:

```
salon-styling.jpg        prom-dress-fitting.jpg
boutique-gowns.jpg       bridal-accessories.jpg
```

Upload photos with those exact names and they appear automatically. Until then the slots
show a branded gold panel instead of a broken image, so the site still looks finished.
Portrait photos suit the slots best — roughly 3:4, for example 900×1200.

**Prices for the remaining services.** Eyelash extensions, nails, hair restoration, hair
infusions, men's and kids' haircuts, and wedding/event updos appear on the homepage but still
have no prices on the menu page.

## If you move to a custom domain

The web address appears in several tags in both pages (`canonical`, `og:url`, `og:image`, and
the business-details block near the top of `index.html`). Search both files for
`gn-ishaan66.github.io` and replace all of it. `og:image` especially has to be a complete
address starting with `https://`, or the logo preview card won't show when the site is shared.

## Things to know when editing

- **Changing the styling.** The site used to load Tailwind from a CDN, which shipped 407KB of
  JavaScript to every visitor to build the CSS in their browser. It's now compiled ahead of
  time into `tailwind.css` (15KB). **After changing any class in the HTML, run:**

  ```
  npm install     # first time only
  npm run build
  ```

  Without that, a newly added class simply won't do anything. `npm run watch` rebuilds
  automatically while you work. Never edit `tailwind.css` by hand; it is overwritten.
- **Colours and fonts** live in `tailwind.config.cjs`; hand-written styling in `site.css`.
  Every page uses both, so a colour changes in one place, not four.
- **Icons** are an inline SVG sprite at the top of each page's `<body>`, referenced with
  `<use href="#i-name">`. They replaced Font Awesome, which cost 375KB of CSS and webfonts
  for 15 glyphs. To add one, paste another `<symbol>` into the sprite on every page.
- **The header and footer are copied into each page.** Changing a navigation link means
  editing both `index.html` and `menu.html`.
- **Hours appear in four places** in `index.html` (hero, Visit section, footer, and the
  business-details block Google reads) and twice in `menu.html` (Hours box, footer).
  Currently: Tuesday–Friday 9am–6pm, Saturday 9am–2pm.
- **Prices live in `scripts/build_menu.py`**, not in the HTML. That script holds every
  price once and regenerates the Hair Room section of `menu.html`:

  ```
  python scripts/build_menu.py
  ```

  Edit a price there and re-run it. Editing `menu.html` by hand works too, but the next run
  of the script overwrites the Hair Room section. Makeup, Skincare and Hours are still edited
  directly in `menu.html`.
- Braid, twist, loc and crochet prices are shown as ranges; the printed-menu services use a
  `+` starting price. Both styles are supported by the script.
- The star rating and review count on the homepage are deliberately plain text. Google's
  rules don't allow a business to publish its own rating as listing data.
