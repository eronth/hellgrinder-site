---
name: verify
description: Build, launch, and drive the Hellgrinder site to verify UI changes at runtime.
---

# Verifying the Hellgrinder site

Vite + React SPA using **HashRouter** — routes look like
`http://localhost:PORT/#/equipment-and-perks`.

## Launch

```bash
npm run dev -- --port 5199   # run in background; ready in ~1s
```

No test suite; `npx tsc --noEmit` and `npx eslint <files>` for static checks
(CI-equivalent, not verification).

## Drive

Playwright is not a project dependency. Chromium is already cached in
`~/.cache/ms-playwright/`. Install the package into the session scratchpad
(not the repo):

```bash
cd $SCRATCHPAD && npm init -y && npm install playwright --no-audit
node your-script.mjs
```

## Flows worth driving

- `#/equipment-and-perks` — weapon/kit cards with many tags (`.tag`,
  `.tag.special`, `.range-tag`), incl. special tags with numeric values
  (e.g. "Cone: 3").
- `#/how-to-play` — Special Tags rules listing (BasicRules), status-effect
  keywords with popups.
- Rule popups render into a portal as `.rule-popup` (title `.rule-title`,
  category `.rule-category`, body `.rule-summary`).

## Gotchas

- `.rule-popup` has a 0.2s fade-in; wait ~500ms after it appears before
  screenshotting or it looks washed out.
- Popups close on scroll and ~400ms after mouse-out.
- `.tag` pills are inline-flex, so `innerText` puts flex children on
  separate lines — match text with regex, not exact strings.
