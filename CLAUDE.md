# CLAUDE.md

This file gives Claude (and any developer) the operating context needed to work correctly
in this repository. It reflects the codebase **as actually implemented**, verified by
direct inspection and a clean `npm run build`. Where the codebase does NOT yet have
something (e.g. i18n, linting), that is stated explicitly rather than assumed.

---

## 1. Project Overview & Business Context

- **Brand / Client:** RKC Technology (legal entity: `rkctechnology s. r. o.`)
- **Domain:** advancednavigation.sk
- **Registration:** IČO 57282145 · DIČ 2122652576 · Bratislava, Slovakia (Mrázová 11, Rača, 831 06)
- **Industry:** B2B distribution of navigation, positioning, and autonomy hardware
  (underwater/marine/inertial navigation systems)
- **Business relationship:** RKC Technology is the **authorised dealer** for **Advanced
  Navigation Pty Ltd** (an Australian manufacturer) across Slovakia, the Czech Republic,
  Austria, and Hungary. **RKC Technology is NOT the manufacturer.** This distinction is
  legally and commercially important and must be preserved in all copy, metadata, and legal
  pages — do not blur RKC's identity with Advanced Navigation's.
- **Agency:** DunajMedia (Bratislava, Slovakia) — built and maintains this site. Footer
  carries a "Powered by DunajMedia" credit link.
- **Products currently on the site:** Hydrus (AUV), Subsonus (USBL), Subsonus Tag
  (transponder), GNSS Compass. Content for these was sourced from official Advanced
  Navigation datasheets (see `products content/*.pdf` in the repo root — reference material,
  not part of the deployed app).
- **Known open item (as of last check-in):** the client requested corrections to product
  images (wrong photos were showing on some product pages) and a fifth product page
  (underwater lighting / camera / laser units) — not yet built as of this writing.

---

## 2. Technical Stack & Architecture

### Core stack (verified from `package.json`)
- **Next.js 15.5.19** — App Router, using **Turbopack** for both `dev` and `build`
  (`next dev --turbopack`, `next build --turbopack`)
- **React 19.1.0 / React DOM 19.1.0**
- **TypeScript 5**, `strict: true` (see `tsconfig.json`)
- **Tailwind CSS v4** (`^4`, via `@tailwindcss/postcss`) — **CSS-based config, not a
  `tailwind.config.js` file.** Tokens live in `app/globals.css` under `@theme inline`. There
  is no `tailwind.config.*` in this repo — that's correct for Tailwind v4, not missing.
- **Framer Motion 12.40.0** — used throughout for scroll-reveal and hover animations
- **Lucide React** — icon set
- **react-phone-number-input** (+ `@types/react-phone-number-input`) — contact form phone
  field with searchable country-code picker
- **Resend 6.14.0** — transactional email (contact form notification + autoresponder)
- **clsx** + **tailwind-merge** + **class-variance-authority** — className composition
  utilities (no shadcn/ui component library is actually installed — these are just the
  utility deps, used directly)
- **googleapis** + **tsx** (devDependencies) — used **only** by the standalone
  content-review tooling in `scripts/populate-sheet.ts` (see §7). Not imported anywhere in
  the deployed Next.js app — do not treat these as app-runtime dependencies.
- **@vercel/analytics** — official Vercel Web Analytics. `<Analytics />` (imported from
  `@vercel/analytics/next`) is mounted once in `app/layout.tsx`, inside `<body>` alongside
  `Navbar`/`Footer`/`CookieBanner`. No env vars or config needed — it activates automatically
  when the app is deployed on Vercel and is a no-op elsewhere (safe in local dev).

### NOT present (do not assume these exist)
- **No ESLint config and no `lint` script.** `package.json` scripts are only `dev`, `build`,
  `start`. `next build` runs TypeScript type-checking (strict mode) as part of the build, but
  there is no standalone lint step. If a lint workflow is wanted, it needs to be added
  (`eslint`, `eslint-config-next`, and a `lint` script) — do not write agency rules assuming
  `npm run lint` exists until this is actually added.
- **No i18n / internationalization system.** No `next-intl`, no locale routing, no message
  dictionaries, no language switcher. The entire site is **English-only, single locale**.
  Confirmed by repo-wide search — zero i18n-related files or imports exist. If bilingual
  support (e.g. Slovak) is ever added, it does not exist yet and would be new work, not a
  configuration change.
- **No shadcn/ui component directory** (`components/ui/`) — despite `cva`/`clsx`/
  `tailwind-merge` being present as dependencies, there's no shadcn scaffold. Components are
  hand-built.
- **No test suite, no CI config.**

### Directory layout (actual, root-level — there is no `src/` directory)

```
/
├── app/                          # App Router root
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home route (renders HomeClient)
│   ├── HomeClient.tsx             # Home page client component
│   ├── globals.css                # Tailwind v4 import + design tokens + global overrides
│   ├── icon.png / apple-icon.png  # Favicon (Next App Router auto-detected convention)
│   ├── robots.ts                  # Next-native robots.txt generator
│   ├── sitemap.ts                 # Next-native sitemap.xml generator
│   ├── about/
│   │   ├── page.tsx
│   │   └── AboutClient.tsx
│   ├── contact/
│   │   ├── page.tsx
│   │   └── ContactClient.tsx
│   ├── privacy/page.tsx
│   ├── terms/page.tsx
│   ├── api/
│   │   └── contact/route.ts       # POST handler — Resend integration, see §6
│   └── products/
│       ├── hydrus/{page.tsx, HydrusClient.tsx}
│       ├── subsonus/{page.tsx, SubsonusClient.tsx}
│       ├── subsonus-tag/{page.tsx, SubsonusTagClient.tsx}
│       └── gnss-compass/{page.tsx, GnssCompassClient.tsx}
├── components/                    # Shared, reusable components (flat — no subfolders)
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ContactForm.tsx
│   ├── CookieBanner.tsx
│   ├── FeatureCard.tsx
│   ├── FeatureVideo.tsx           # Hydrus click-to-fullscreen video player
│   ├── ImageWithFallback.tsx      # Crash-safe image wrapper, used site-wide
│   ├── ProductCarousel.tsx        # Homepage auto-advancing product hero carousel
│   ├── ProductGallery.tsx         # Numbered product image gallery + lightbox
│   ├── ProductHero.tsx
│   └── WhatsAppButton.tsx
├── lib/
│   ├── getProductImages.ts        # BUILD-TIME: scans public/images/{slug}/ for gallery images
│   ├── getHeroImage.ts            # BUILD-TIME: scans public/images/{slug}/ for a hero.* file
│   ├── getHydrusVideos.ts         # BUILD-TIME: scans public/videos/hydrus/ for the 2 feature videos
│   ├── content.ts                 # REQUEST-TIME: CSV parser + live Sheet fetcher — see §7
│   ├── config.ts                  # REQUEST-TIME: NEXT_PUBLIC_SHEET_CSV_* env re-exports — see §7
│   └── utils.ts
├── public/
│   ├── images/{hydrus,subsonus,subsonus-tag,gnss-compass}/  # numbered gallery + hero.*
│   ├── videos/hydrus/             # the 2 mp4 feature videos
│   └── logo/{logo.png, favicon.png}
├── content/                        # JSON copy-dictionaries, one per route — see §7
│   ├── home.json, about.json, contact.json, privacy.json, terms.json
│   └── hydrus.json, subsonus.json, subsonus-tag.json, gnss-compass.json
├── scripts/
│   └── populate-sheet.ts           # Pushes content/*.json into a Google Sheet — see §7
├── products content/              # Reference PDFs (official datasheets) — NOT served/deployed
├── google-credentials.json        # Google service-account key — gitignored, see §7. NOT in repo history.
├── next.config.ts                 # Currently empty/default — no custom config set
├── tsconfig.json
├── package.json
└── CLAUDE.md                      # this file
```

> **Also present locally, not part of the app:** `Email for Russ.txt` in the repo root holds
> plaintext mailbox credentials for `info@advancednavigation.sk`. **Standing instruction from
> the client (permanent, do not revisit): leave this file exactly as is.** Do not gitignore
> it, rename it, move it, or otherwise touch it. Do not read its contents into a commit, a
> doc, chat output, or any other file/message that could expose it — never share it, in any
> form, under any circumstances. It stays untracked and unmodified indefinitely.

### Page composition pattern

Every route follows the same pattern: an **`async` Server Component** `page.tsx` that does
build-/request-time work — calling the `lib/get*` file-resolvers (build-time, Node `fs`) and
`fetchContent()` (request-time, live Sheet CSV, see §7) — and passes the results as props into
a **Client Component** (`*Client.tsx`, `"use client"`) that handles animation, interactivity,
and rendering. This split exists specifically so fs-based resolution and network fetching
happen server-side, not in the browser — keep this pattern for any new route.

**Exception:** `/terms` and `/privacy` have no `*Client.tsx` — they're a single `async`
server-component file each. Neither page has any interactivity or Framer Motion, so there was
nothing that needed `"use client"`; the resolved `content` map is consumed directly in the
server component via the same `c(key, fallback)` helper used everywhere else. Don't add a
Client split to these two unless real interactivity is added — it would be pure ceremony.

### Internationalization — explicitly not implemented

There is no i18n setup, no message dictionary structure, and no language switcher routing
logic anywhere in this codebase. Any documentation, prompt, or task description that assumes
one exists is incorrect as of this audit. The site is English-only.

---

## 3. Design System & Tokens

Defined in `app/globals.css`. Tailwind v4's CSS-first config means these are the actual
source of truth — there is no separate JS/TS config file.

### Color tokens (`:root` and `@theme inline`)

| Token | Hex | Usage |
|---|---|---|
| `--primary` / `--color-primary` | `#1E5FBF` | Primary brand blue |
| `--primary-dark` / `--color-primary-dark` | `#163F7A` | Darker blue — footer background, navbar |
| `--primary-light` | `#2D7DD2` | Lighter blue accent |
| `--teal` / `--color-teal` | `#00B89F` | Accent — labels, highlights (also used in RKC wordmark fallback) |
| `--teal-dark` / `--color-teal-dark` | `#009B86` | Teal hover/dark state |
| `--charcoal` / `--color-charcoal` | `#1C2033` | Body text color |
| `--slate` / `--color-slate` | `#64748B` | Secondary text |
| `--white` | `#FFFFFF` | Base background |
| `--light-bg` / `--color-light-bg` | `#F8FAFC` | Light section backgrounds |
| `--border` / `--color-border` | `#E2E8F0` | Borders, dividers, input borders |
| `--whatsapp` | `#25D366` | WhatsApp brand green — used ONLY for WhatsApp CTAs (intentional exception to the palette) |

### Typography

- **Font:** Inter, loaded via Google Fonts `@import` in `globals.css` (weights 300–800),
  with system-font fallback stack (`-apple-system, BlinkMacSystemFont, sans-serif`).
- No italic usage anywhere by design (client requirement: "clear, sharp, not italic").
- No separate heading font — Inter at heavier weights (600–800) is used for headings.

### Motion

- Framer Motion drives scroll-reveal animations: sections generally use `x: ±50` slide-in
  variants combined with `whileInView`. **Important:** these `x: ±50` starting offsets are
  the historical root cause of a mobile horizontal-overflow bug (see §5) — any new
  slide-in animation must be added inside a container that has `overflow-hidden`, consistent
  with the existing fix pattern.
- Hover interactions use Framer Motion `whileHover` (lift + shadow) on cards/buttons.
- No separate "motion tokens" file exists — durations/easings are set inline per-component,
  not centralized. If motion tokens are wanted centrally, that would be new work.

### Component-level styling notes

- `.phone-input-wrapper` and children (`.PhoneInputCountry`, `.PhoneInputCountrySelect`,
  `.PhoneInputInput`) in `globals.css` are hand-written overrides that restyle the
  `react-phone-number-input` library to match the site's input styling (border, focus ring,
  font size) — these are global CSS, not Tailwind utility classes, because the library
  renders its own DOM structure that Tailwind can't reach via className alone.
- No glassmorphism/blur-panel utilities currently exist in the codebase — none were found in
  `globals.css` or component files. If asked to add "glass panel" styling, that is new work,
  not an existing pattern to reuse.

---

## 4. Asset & Image/Video Safety Architecture

This is a deliberately built, load-bearing pattern across the whole site — **preserve it for
any new media feature.**

### The pattern
1. **Never hardcode a filename with a fixed extension.** All product media is resolved at
   **build time** via Node `fs` in the three `lib/get*.ts` helpers, which scan the actual
   `public/` directory and accept whatever extension is present (`.jpg`, `.jpeg`, `.png`,
   `.webp` for images; `.mp4` for the Hydrus videos).
2. **Numeric/natural sort, not string sort** — `getProductImages.ts` extracts the numeric
   portion of each filename so `hydrus-02` sorts before `hydrus-10` (a plain string sort
   would put `10` before `2`).
3. **Every resolver degrades gracefully to an empty/null result if the folder or file is
   missing** — never throws, never crashes the build. `ProductGallery` renders `null` (no
   section) when its image array is empty; `getHeroImage` returns `null` and the hero falls
   back to a text-only banner; `getHydrusVideos` returns `{ autonomous: null, imagery: null }`
   and `FeatureVideo` falls back to a navy gradient placeholder.
4. **`ImageWithFallback` component** wraps runtime (client-side) image rendering with
   `onError` handling for additional safety on top of the build-time resolution.
5. **No external CDN image/video dependencies.** Everything served from `public/` on the
   same Vercel deployment — no fragile third-party asset URLs.

### Naming conventions currently in use (do not change without updating the resolver)
- Gallery images: `public/images/{slug}/{slug}-01.{ext}`, `{slug}-02.{ext}`, … — order in
  the gallery follows the numeric suffix.
- Hero image: `public/images/{slug}/hero.{ext}` — exactly the literal filename `hero`, any
  supported extension.
- Hydrus feature videos: `public/videos/hydrus/*.mp4` — matched by keyword in the filename
  (`autonom|navig|dvl|ins|usbl` → "Truly Autonomous" slot; `imag|camera|4k|video|visual` →
  "Stunning Imagery" slot), falling back to alphabetical order if no keyword matches.
- Logo assets: `public/logo/logo.png` (full lockup, used in Footer) and
  `public/logo/favicon.png` (mark only, used in Navbar — note this is a differently-named
  file from the actual browser favicon, which is `app/icon.png` / `app/apple-icon.png` per
  Next's App Router convention).

### Product slugs (fixed, used across all resolvers and routes)
`hydrus`, `subsonus`, `subsonus-tag`, `gnss-compass`

---

## 5. Known Fixes & Why They Exist (do not regress these)

- **Mobile horizontal overflow fix:** `overflow-x: clip` is set on both `html` and `body` in
  `globals.css`, with an explicit comment explaining why `clip` was chosen over `hidden`
  (`hidden` creates a new block formatting context that can break `position: fixed`/`sticky`
  elements like the navbar and cookie banner; `clip` does not). This is a defensive
  second layer — the root-cause fix is `overflow-hidden` on individual `<section>` elements
  that contain `x: ±50` Framer Motion slide-in animations. **Any new slide-in section must
  follow the same pattern** (wrap in `overflow-hidden`) or the mobile overflow bug can
  reappear.
- **Cookie banner button visibility on mobile:** uses `flex-col-reverse` on small screens so
  the Accept/Reject buttons render first in DOM order and stay closest to the bottom-anchored
  edge of the banner, regardless of how much the message text wraps.
- **Contact form graceful env-var handling:** `app/api/contact/route.ts` reads
  `RESEND_API_KEY` and `CONTACT_EMAIL_TO` from `process.env` and fails with a clean 500 +
  server log if either is missing — it does NOT crash at import/build time. Verified: this
  repo's `npm run build` passes cleanly with zero env vars set.
- **Contact form autoresponder is non-blocking:** the visitor confirmation email is sent in
  its own `try/catch`, after the business notification email succeeds. If the autoresponder
  fails, the API still returns success, because the important email (to the business) already
  went through.
- **Honeypot spam guard:** a hidden field in the contact form; if filled, the API returns a
  200 success without sending any email (silently defeats basic bots without a CAPTCHA).

---

## 6. Contact Form / Email Architecture

- **Route:** `app/api/contact/route.ts` (single POST handler)
- **Fields:** name, email, company (optional), phone (required — full international number
  via `react-phone-number-input`, default country Slovakia), consent (required checkbox,
  unticked by default — GDPR), message, plus a hidden honeypot field.
- **Two emails sent per valid submission, both via Resend:**
  1. Notification → the business inbox (`CONTACT_EMAIL_TO`, currently
     `info@advancednavigation.sk`), `reply_to` set to the visitor's email so the business can
     reply directly.
  2. Autoresponder → the visitor, confirming receipt and including a WhatsApp CTA
     (inline-styled `<a href="https://wa.me/421949225542?...">`, since email clients strip
     JS/external CSS) with a plain-text URL fallback for text-only clients.
- **`.env.local.example`** documents the required env vars — `RESEND_API_KEY` and
  `CONTACT_EMAIL_TO` (placeholders) plus `GOOGLE_SHEET_ID` and the nine
  `NEXT_PUBLIC_SHEET_CSV_*` live-content URLs (real values — none of these are secrets; Sheet
  read access is gated by the Sheet's own sharing setting, not by knowledge of the URL, see
  §7). Real `RESEND_API_KEY`/`CONTACT_EMAIL_TO` values live only in Vercel project settings
  (Production/Preview/Development) and a local `.env.local` (gitignored). The
  `NEXT_PUBLIC_SHEET_CSV_*` vars also need to be set in Vercel project settings for the live
  content layer to work in production — `.env.local` only covers local dev.
- **Sending domain:** `noreply@advancednavigation.sk`, verified in Resend via DNS records on
  a `send.` subdomain (does not conflict with the client's existing root-domain email/SPF
  setup, which is on separate hosting).

---

## 7. Content Pipeline — Google Sheets (two directions, do not conflate them)

There are **two separate, independent mechanisms** here. Keep them mentally distinct:

- **Push** (`scripts/populate-sheet.ts`, manual, one-directional): code → Sheet. Writes
  `content/*.json` into the Sheet so the client has a spreadsheet to review/edit.
- **Pull** (`lib/content.ts`, automatic, live, one-directional the other way): Sheet → rendered
  page. Every page fetches its Sheet tab as CSV at request time and overlays it on the local
  JSON fallback.

**There is no third mechanism that writes Sheet edits back into `content/*.json`.** If the
client edits the Sheet, the *rendered site* reflects it immediately (via Pull), but the
`content/*.json` files on disk stay exactly as they were until someone reruns the extraction
manually. Don't say "the JSON is out of date" as if that's a bug — the JSON is deliberately
just the fallback floor, not a live mirror of the Sheet.

### Push: `scripts/populate-sheet.ts`
- **`content/*.json`** — nine files, one per live route (`home`, `about`, `contact`,
  `privacy`, `terms`, `hydrus`, `subsonus`, `subsonus-tag`, `gnss-compass`). Each is an array
  of rows: `{ key, section, description, text }`. `text` is the **fallback** copy rendered
  when the live Sheet fetch fails or a cell is blank — it is not merely documentation, it is
  live fallback content shipped in the bundle.
- **`scripts/populate-sheet.ts`** — standalone script (`npx tsx scripts/populate-sheet.ts`,
  not part of `npm run build`/`dev`) that authenticates with a Google service account and
  pushes each `content/*.json` file into its own tab of the target Google Sheet, creating tabs
  that don't exist yet and **overwriting** the values in ones that do (`values.clear` then
  `values.update` — any manual formatting/comments added in Sheet cells beyond the header
  styling get wiped on rerun; warn before rerunning if the client has been actively editing).
  Tab names: `Home`, `About`, `Contact`, `Privacy`, `Terms`, `Hydrus`, `Subsonus`,
  `Subsonus Tag`, `GNSS Compass`. Standard columns: `key (do not edit)`, `Section`,
  `What is this text?`, `TEXT — EDIT HERE`. Header row is bolded and frozen.
- Requires **`google-credentials.json`** in the repo root (Google service-account key,
  gitignored — **never commit it**, it contains a private key) and **`GOOGLE_SHEET_ID`** in
  `.env.local`. The script loads `.env.local` itself via a small inline parser — it does not
  depend on Next.js's env-loading, since it runs outside the Next.js process.
- If copy is edited directly in the `.tsx`/JSON files after this was last run, re-extract from
  the current source before rerunning — don't push stale JSON over a Sheet the client has been
  editing.

### Pull: `lib/content.ts` + `lib/config.ts` (the live layer)
- **`lib/config.ts`** — nine `NEXT_PUBLIC_SHEET_CSV_*` constants (`_HOME`, `_ABOUT`,
  `_CONTACT`, `_HYDRUS`, `_SUBSONUS`, `_SUBSONUS_TAG`, `_GNSS_COMPASS`, `_PRIVACY`, `_TERMS`),
  each `process.env.NEXT_PUBLIC_SHEET_CSV_* || ""`. Documented in `.env.local.example` with
  the real working URL pattern for this Sheet:
  `https://docs.google.com/spreadsheets/d/<GOOGLE_SHEET_ID>/gviz/tq?tqx=out:csv&sheet=<Tab Name>`
  (tab name URL-encoded, e.g. `Subsonus%20Tag`).
- **`lib/content.ts`** exports:
  - `parseCsv(csvText)` — dependency-free RFC 4180 parser (quoted fields, escaped `""`,
    commas/newlines inside quotes, both `\n`/`\r\n`).
  - `findColumn(headers, prefix)` — case-insensitive `startsWith` match, so header text like
    `"key (do not edit)"` and `"TEXT — EDIT HERE"` still resolve to `"key"`/`"text"`.
  - `fetchContent(csvUrl?)` — fetches with a `&_t=${Date.now()}` cache-buster and
    `{ next: { revalidate: 60 } }`; returns `{}` on **any** failure (missing URL, network
    error, non-2xx, missing key/text columns) — never throws.
  - `toFallbackMap(rows)` — converts a `content/*.json` row array into `{ key: text }`.
  - `getContent(sheetMap, fallbackMap)` — merges sheet over fallback, **but a blank sheet
    cell does not blank the page**: only non-empty sheet values override the fallback. An
    accidental empty edit in the spreadsheet can't take a section blank.
- **Every `page.tsx` exports `export const revalidate = 60;`** — Next.js ISR re-checks the
  Sheet at most once per 60s per route, in production. In `next build`, this ISR metadata is
  visible in the build's route table as a `Revalidate` column.
- **Wiring pattern in every `page.tsx`:**
  ```tsx
  const sheetContent = await fetchContent(SHEET_CSV_X);
  const content = getContent(sheetContent, toFallbackMap(xContent /* imported JSON */));
  return <XClient ... content={content} />;
  ```
  and in every `*Client.tsx` (or directly in `page.tsx` for `/terms`/`/privacy`):
  ```tsx
  const c = (key: string, fallback = "") => content[key] || fallback;
  ```
  Every hardcoded heading/paragraph/badge/CTA is `c("route.section.field", "original static text")`
  — the second argument is always the exact pre-refactor copy, so if `content` is empty (Sheet
  unreachable, key missing) the page renders **identically** to before this system existed.
- **Multi-value fields are delimited, not separate keys** — some content is stored as one
  cell using a delimiter, split back into parts at render time. This keeps the Sheet from
  having dozens of one-word rows for e.g. every application tag:
  - Comma-delimited simple lists (tags, country pills): `"AUVs, ROVs, Subsea surveying"` →
    split on `,`.
  - `"Label: Value"` pairs, single: spec rows in Hydrus/Subsonus Tag specs
    (`hydrus.specs.spec1` etc.) — split on the **first** `": "`.
  - `"Label: Value | Label: Value | ..."`, pipe-joined: Terms §2 / Privacy §1 company/
    controller detail blocks — split on `|`, then each on `": "`.
  - `"Label — description | Label — description | ..."`, pipe-joined with em dash: Privacy
    §7 (data sharing) and §9 (GDPR rights) bullet lists — split on `|`, then each on `" — "`.
  - `"Purpose — Legal basis"`, single: Privacy §3 table rows — split once on `" — "`.

  These delimiters are a real constraint on the client: if they restructure a cell and remove
  the `:` or `—` separator, that field's rendering degrades to showing the whole string as one
  side of the pair rather than crashing — but it will look wrong. This is a known trade-off,
  not a bug — full per-field granularity would mean 2–3× the row count in the Sheet.
- Two duplicate-looking spec grids (Subsonus's Overview grid, GNSS Compass's Overview grid)
  render slightly different label/value **strings** than their own hero stats block
  (`"0.1 m"` vs `"0.1m"`, `"Position Accuracy (RTK)"` vs `"RTK Position"`, etc. — this
  duplication predates the CMS work). No separate Sheet columns were extracted for these two
  specific grids, so they are intentionally **not** wired to `content` and remain static
  fallback-only text in `SubsonusClient.tsx`/`GnssCompassClient.tsx`. If the client wants
  these editable too, that's a small follow-up: add the missing keys to the JSON/Sheet and
  wire `c()` calls in.

### Known current gap: the Sheet is not publicly readable
`fetchContent()` requires the Sheet tab to be fetchable by an **unauthenticated** GET request.
As of this writing, verified by direct request, the CSV export URL returns **HTTP 401** (a
Google sign-in page, not CSV) — the Sheet is not shared as "Anyone with the link – Viewer" (or
published to web). Until that sharing setting is changed, `fetchContent()` safely returns `{}`
on every request and every page renders from `content/*.json` fallback only — **this is not
broken, it's the designed-in safe state**, but it means the "live" half of this system isn't
actually live yet. Changing a Google Sheet's sharing/visibility is a real access-control
decision on a resource the client owns — don't flip it without asking the client/agency first.
Once sharing is corrected, no code changes are needed; the existing URLs in
`.env.local.example`/`.env.local` will start returning real CSV immediately.

---

## 8. Agency Standing Rules & Development Workflow

### Before every commit
1. Run `npm run build` and confirm it completes with **zero errors**. (There is currently no
   `lint` script — see §2. If one is added later, run it too. Until then, do not reference
   `npm run lint` as a real command.)
2. Manually verify at common mobile widths (320/360/390/414px) that no new horizontal
   overflow was introduced — this codebase has a known history of this bug (§5).
3. Confirm any new media feature follows the crash-safe, extension-agnostic resolver pattern
   (§4) rather than hardcoding a filename+extension.

### Git workflow
```
git add .
git commit -m "<clear, specific message>"
git push
```
(Upstream is already configured — `origin main`. No `--set-upstream` needed for routine
pushes.) Never push a build that fails step 1 above.

### Living documentation rule
Update this `CLAUDE.md` whenever:
- A new route or page is added
- A new shared component or `lib/` helper is added
- A new environment variable is introduced
- An architectural decision changes (e.g. i18n is added, ESLint is added, the design tokens
  change, the contact form flow changes)

Keep this file accurate to what's actually in the repo — verify claims against real files
before writing them here, the same way this version of the file was produced (by cloning and
inspecting the repo directly, not from memory or assumption).

### Brand-accuracy rule (specific to this project)
Every change to copy, metadata, or legal pages must preserve the RKC-Technology-is-the-dealer
/ Advanced-Navigation-is-the-manufacturer distinction. Do not let RKC's own identity blur
into the manufacturer's branding — this was a real correction requested by the client and is
a recurring point of client sensitivity, not a one-time fix.

---

## 9. Verified Build Status (at time of this audit)

```
npm install   → succeeds, 242 packages in package-lock.json (includes googleapis + tsx
                devDependencies added for the §7 push-side tooling — not app-runtime deps;
                lib/content.ts is dependency-free by design, no new packages for the pull side)
npm run build → succeeds, 0 errors, 0 warnings
```

Route output (from actual build, Next.js 15.5.19 + Turbopack): all 9 content routes now carry
ISR metadata — `Revalidate: 1m`, `Expire: 1y` — from `export const revalidate = 60;`:
`/`, `/about`, `/contact`, `/privacy`, `/terms`, `/products/hydrus`,
`/products/subsonus`, `/products/subsonus-tag`, `/products/gnss-compass`,
`/api/contact` (dynamic), `/robots.txt`, `/sitemap.xml`, plus icon routes.
All static (○, prerendered + ISR) except `/api/contact`, which is server-rendered on demand.
Verified in a browser: homepage, `/products/hydrus`, `/terms`, and `/privacy` render correctly
with zero console errors and no mobile overflow at 375px, using the `content/*.json` fallback
path (since the Sheet isn't publicly readable yet — see §7's "Known current gap").

---

## Gaps flagged during this audit (for the agency/client to decide on, not assumed-in)

- No i18n/bilingual system exists — if this is wanted, it's new scope.
- No ESLint/lint script exists — if a lint gate is wanted in the workflow, it needs to be
  added first.
- No test suite or CI pipeline exists.
- Product image corrections and the fifth product page (lighting/camera/laser units) were
  outstanding client requests as of the last conversation on record — check current status
  before assuming either is done.
- The Sheet is not currently shared/published for public read access — the live CSV fetch
  (§7 "Pull") returns HTTP 401 and every page safely falls back to `content/*.json`. Fix
  sharing (or publish to web) to make the live layer actually live; no code change needed
  once that's done. This is a client/agency sharing-settings decision, not something to flip
  unilaterally.
- There is still no automation that writes Sheet edits back into `content/*.json` on disk —
  the rendered site picks up Sheet edits live (once sharing is fixed), but the JSON fallback
  files stay wherever they were last manually extracted to. That's by design (§7), not a gap
  to "fix" unless a genuinely bidirectional sync is explicitly requested as new scope.
