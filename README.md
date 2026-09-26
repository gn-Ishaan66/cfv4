# CreativeFaces Salon and Makeup Bar — website

Static site — no framework, and the files here are what gets served. The CSS is compiled
though, so there is one build step: see "Changing the styling" below.

Live at **https://creativefaceskathleen.com/**

Business context (prices, policies, contact details, open items) lives in
[CLAUDE.md](CLAUDE.md), which is shared with the separate project handling the business
side. Update it in the same change whenever something there moves.

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
CNAME                The custom domain
.github/workflows/pages.yml   Deploys the site on every push to main
scripts/build_menu.py  Every price on the menu page
logo-*.webp/.png     Logo, in the sizes each spot needs
favicon-*, apple-touch-icon.png   Browser tab and phone icons
og-cover.jpg         Preview image shown when the site is shared
robots.txt, sitemap.xml   For search engines
```

Every file sits at the top level of the repository, and the pages expect to find them
there. Don't move them into a subfolder without updating the links inside both pages.

## How it deploys

Push to `main` and the site rebuilds itself. `.github/workflows/pages.yml` publishes the
repository root to GitHub Pages, and the change is live in roughly 20–30 seconds. Pages
is served from that workflow, not from a branch setting, and the workflow switched Pages
on by itself the first time it ran.

Returning visitors can lag a change by up to 10 minutes: GitHub serves these files with
`max-age=600`, so a browser may hold the old CSS or JS that long. A hard refresh
(Ctrl+F5) shows it immediately.

## Still to do

**Photos.** The homepage uses four real photos of the salon's work:

```
hair-balayage.webp      hair-blue-ombre.webp
hair-locs-color.webp    boutique-gowns.webp
```

The first three form the hero collage; the gown photo sits in the Boutique
section. To swap one, keep the same filename and shape (the hair photos are 3:4,
the gown photo 4:5), and re-export it as WebP at roughly 700px wide (900 for the
gown). The originals were 4.3MB of phone JPEGs; at that size they total ~500KB.
Strip EXIF when exporting, since phone photos can carry GPS coordinates.

If a photo file is ever missing, its slot falls back to a branded gold panel
rather than a broken image.

**Prices for the remaining services.** Eyelash extensions, nails, hair restoration, hair
infusions, men's and kids' haircuts, and wedding/event updos appear on the homepage but still
have no prices on the menu page.

## The domain

The site is served from **https://creativefaceskathleen.com**, set by the `CNAME`
file in this repo. The old `gn-ishaan66.github.io/cfv4` address redirects to it.

If the domain ever changes, the address is written into several places and all of
them have to move together: `canonical`, `og:url` and `og:image` in each page, the
business-details block near the top of `index.html`, `robots.txt`, `sitemap.xml`,
and the `<base href="/">` in `404.html`. That last one is easy to miss — the 404
page is served for any missing path, so without a correct base its links and
styling break, which is exactly what happened when the custom domain was added.

`og:image` has to be a complete address starting with `https://`, or the logo
preview card will not show when the site is shared.

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
