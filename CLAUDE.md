# CLAUDE.md

Shared context for anyone (human or Claude) working on this repo. Two places read and
update this file: Ishaan's local Claude Code sessions, and the "Creative Faces" Claude
project that handles the business side (pricing, policies, client comms, Square and
domain setup).

For how the code works (file layout, Tailwind build, menu generator, domain gotchas),
see `README.md`. This file covers the context around it.

## How to keep this file in sync

Neither side can see the other's conversation, so this file is the whole link. When a
session changes anything that affects the business side, update this file **in the same
change** as the work itself. That covers:

- prices, services offered, or how a service is named
- policies (deposits, cancellations, appointments, consultations)
- address, phone, hours, or anything else a customer uses to reach the salon
- booking setup
- domain or hosting
- open items — what is waiting, and on whom

At the end of a session, run down that list and update anything that moved, including
the date at the bottom.

**This repo is public.** Never put payment or fee details here: no card or bank details,
no processor rates, no merchant or account identifiers, no credentials, and no private
client notes. Anything committed stays in the git history even if deleted later.
Service prices are fine — they are already printed on the public menu page.

**Don't copy prices into this file.** Hair Room prices live in `scripts/build_menu.py`
and render into `menu.html`; a second copy here goes stale the first time one changes.
Link to the live menu instead.

## Client

- **Business:** CreativeFaces Salon and Makeup Bar. This is the name used everywhere now
  — the logo and both printed menus use it. The site said "CREATIVEFACES Hair Salon &
  Boutique" until 2026-09-11, when Kathleen confirmed the change; there is still a
  boutique, it is just no longer part of the name.
- **Owner / contact:** Kathleen
- **Address:** 26 Maple Ave, Windsor, CT 06095 (as on the live site)
- **Phone:** (860) 212-5175
- **Hours:** Tuesday–Friday 9am–6pm, Saturday 9am–2pm (see README for every place
  these appear in the HTML)
- **Developer:** Ishaan (GitHub: gn-Ishaan66), freelance

## Hosting and domain

- Static site on GitHub Pages, deployed from `main` by `.github/workflows/pages.yml`.
- Live at https://creativefaceskathleen.com, set by the `CNAME` file.
- The domain is registered in **Kathleen's** GoDaddy account and stays there.
- DNS (in GoDaddy):
  - 4 A records for the apex: 185.199.108.153, 185.199.109.153, 185.199.110.153,
    185.199.111.153
  - `www` CNAME to `gn-ishaan66.github.io`
  - NS, SOA, `_domainconnect` and `_dmarc` left untouched; don't change them.

## Booking (Square Appointments)

- Booking is real and live, but it is a **link, not an embed**: the "Book Now" buttons in
  `index.html` and `menu.html` open the Square booking page
  (`square.site/appointments/buyer/widget/...`) in a new tab. Nothing Square renders
  inside the page — there is no script or iframe. An earlier draft did include Square's
  embed script, but it injected an unstyled button between two sections and was removed.
  This is also what lets the privacy page say nothing on the site collects data, so
  changing it to a real embed means updating that page too.
- Kathleen manages her own Square account. Services, prices, deposits and policies
  in Square are changed by her (or with her) in the Square dashboard, not in this repo.
- **Deposit:** 20% on any service over $100. Square has no price-threshold rule, so it
  is toggled per service under Appointments > Settings > Payments & cancellations.
- **Cancellation (draft, not yet confirmed by Kathleen):** deposit refundable with 24+
  hours notice, non-refundable for cancellations or no-shows inside 24 hours.
- Square service import: 52 services in 9 categories, prepared as two CSVs of 26 rows
  (Square caps bulk import at 30 per file). Columns: Service Name, Category,
  Description, Price, Duration (minutes). Ranged prices use the low end as the price
  with the full range in Description. The CSVs live in the project's shared files, not
  in this repo.
  - 26 services are priced over $100 and need the deposit; 14 more have ranges that
    start at or under $100 but go above it (Kathleen to decide); Color ("starting
    $95") is borderline.
  - Durations in the CSVs are estimates only; the menu page lists none.
  - Microlocs ($1400–$3200) may need custom pricing in Square.

## What the site shows publicly

- **Social:** instagram.com/creativefacesct and facebook.com/creativefacesct, linked in
  the footer of both pages and listed as `sameAs` in the business-details block.
- **Photos:** four of the salon's own photos — three of hair work in the hero, one of
  three clients in gowns in the Boutique section. The gown photo shows identifiable
  people; it is the salon's promotional shot, but it is now on a public page.
- **Reviews:** shown as paraphrased Google reviews, labelled as such, with the rating as
  plain text. Linking the real Google listing would be safer than paraphrasing.
- **Privacy page** states the site has no forms, no accounts, no analytics and no cookies
  of its own, and that booking data is Square's. **If anything is added that collects
  data — a contact form, analytics, a booking widget rendered in the page itself — that
  page has to be updated to match, or it becomes untrue.**

## Pricing source of truth

- The live menu, https://creativefaceskathleen.com/menu.html, is the source of truth
  for prices. Never reuse older placeholder or demo numbers from earlier drafts.
- In the code, Hair Room prices come from `scripts/build_menu.py`; Makeup and
  Skincare are edited directly in `menu.html` (see README).
- If a price changes on the site, the matching Square service (and the import CSVs,
  if they'll be used again) need the same change, and vice versa.

## Open items

- [ ] Confirm final service durations with Kathleen (CSV values are estimates).
- [ ] Confirm the 24-hour cancellation window with Kathleen.
- [ ] Confirm the GitHub Pages HTTPS certificate is issued and "Enforce HTTPS" is
      checked (repo Settings > Pages).
- [ ] Prices for services shown on the homepage but missing from the menu (see README
      "Still to do").
- [ ] Possibly draft client communications for Kathleen.
- [ ] **Google Business Profile still shows the old Manchester address.** Search and Maps
      route people from that listing, not the website, so until it is updated customers
      are sent to the wrong town. Square's address appears in booking confirmations and
      needs the same check.
- [ ] Confirm the two Microlocs prices (natural $1,400–1,800, with extensions
      $1,900–3,200). They came from an AI-generated table, were published on the
      client's say-so, and sit 4–8× above everything else on the menu.
- [ ] Confirm the people in the boutique photo are happy to appear on the public site.

_Last updated: 2026-09-26_
