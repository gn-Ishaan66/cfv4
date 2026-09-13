# CreativeFaces Salon and Makeup Bar — website

Static site. No build step and nothing to install — these files are what gets served.

Live at **https://gn-ishaan66.github.io/cfv4/**

```
index.html          Homepage
menu.html           Menu & prices
site.css            Shared styling for both pages
site.js             Shared behaviour (menu button, scroll reveal)
tailwind.config.js  Shared colours and fonts
logo-*.webp/.png    Logo, in the sizes each spot needs
favicon-*, apple-touch-icon.png   Browser tab and phone icons
og-cover.jpg        Preview image shown when the site is shared
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

**Prices for services not on the printed menus.** Eyelash extensions, nails, crochet braids,
hair restoration, hair infusions, men's and kids' cuts, and updos appear on the homepage but
have no prices on the menu page yet.

## If you move to a custom domain

The web address appears in several tags in both pages (`canonical`, `og:url`, `og:image`, and
the business-details block near the top of `index.html`). Search both files for
`gn-ishaan66.github.io` and replace all of it. `og:image` especially has to be a complete
address starting with `https://`, or the logo preview card won't show when the site is shared.

## Things to know when editing

- **Colours and fonts** live in `tailwind.config.js`; **shared styling** in `site.css`. Both
  pages use them, so a colour changes in one place, not two.
- **The header and footer are copied into each page.** Changing a navigation link means
  editing both `index.html` and `menu.html`.
- **Hours appear in four places** in `index.html` (hero, Visit section, footer, and the
  business-details block Google reads) and twice in `menu.html` (Hours box, footer).
  Currently: Tuesday–Friday 9am–6pm, Saturday 9am–2pm.
- **Prices** are in `menu.html` only.
- The star rating and review count on the homepage are deliberately plain text. Google's
  rules don't allow a business to publish its own rating as listing data.
