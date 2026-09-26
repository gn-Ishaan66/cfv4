# CLAUDE.md

Shared context for anyone (human or Claude) working on this repo. Two places read and
update this file: Ishaan's local Claude Code sessions, and the "Creative Faces" Claude
project that handles the business side (pricing, policies, client comms, Square and
domain setup).

**Keep it current.** When a policy, price, setting, or open item changes, update this
file in the same change (or right after), so the other side doesn't work from stale
facts. This repo is public: never put payment details, credentials, or private client
notes here.

For how the code works (file layout, Tailwind build, menu generator, domain gotchas),
see `README.md`. This file covers the context around it.

## Client

- **Business:** CREATIVEFACES Hair Salon & Boutique (site name: CreativeFaces Salon and
  Makeup Bar)
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

- Booking is a real Square Appointments widget embedded in `index.html` and
  `menu.html` (`square.site/appointments/buyer/widget/...`). It is live, not simulated.
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

_Last updated: 2026-09-26_
