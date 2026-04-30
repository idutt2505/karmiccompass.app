# Karmic Compass — marketing site

Next.js 15 (App Router) + Tailwind CSS v4 + Framer Motion. Polished, minimal marketing site for the Karmic Compass app.

## Scripts

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm run lint
```

## Configuration

Update URLs and contact in `src/lib/constants.ts`:

| Constant | Purpose |
|----------|--------|
| `PRIVACY_URL` | Public privacy policy (empty = footer opens “link coming soon”) |
| `TERMS_URL` | Public terms of service (empty = same) |
| `APP_STORE_URL` | App Store product page (empty = CTA opens coming-soon flow) |
| `TESTFLIGHT_URL` | TestFlight / public beta (empty = same) |
| `CONTACT_EMAIL` / `MAILTO_CONTACT` | Support email (always set) |
| `X_SOCIAL_URL` | Social / product updates link |

Set the URL constants when your public pages and store links are live.

A static HTML version of the previous site (if present) is kept in `_legacy/` for reference.

## Design notes

- Section scroll + subtle Framer `whileInView` reveals; respects `prefers-reduced-motion`.
- No background particle or looping gradient animations; hero uses static gradients and a static mandala-like graphic in the phone mock.
- `SmartExternalLink` and `ComingSoonProvider` ensure external CTAs are never `href="#"` when URLs are missing.
- FAQ uses accessible accordion (button + `aria-expanded` + animated panel).

## Deploy

- **Vercel**: connect repo, root = `kc-landing`, `npm run build`, output `.next` (default).
- **Static export** (optional): add `output: "export"` to `next.config.ts` and configure `images` if you add `next/image` later.

## Legal

The copy avoids medical, crisis, and exaggerated spiritual claims. It positions the app as a wellness / reflection / journaling product. Have legal counsel review published copy before launch.
