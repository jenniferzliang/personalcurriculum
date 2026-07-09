---
name: verify
description: Build, launch, and drive the curriculum tracker app to verify changes end-to-end.
---

# Verifying the curriculum tracker

Single-package Vite + React + TypeScript SPA. No backend; state lives in
localStorage under the key `personalcurriculum.v1`.

## Build & launch

```bash
npm install
npm run build                          # tsc type-check + vite build
npm run dev -- --port 5173 --strictPort   # dev server (background it)
```

## Drive it (headless)

Playwright with the pre-installed Chromium works well:

```js
import { chromium } from 'playwright-core';  // install playwright-core in scratchpad
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
```

Gotchas:

- Delete buttons use `window.confirm` — register `page.on('dialog', d => d.accept())`.
- Button names collide in modals: the header button is `+ Add unit`, the form
  submit is `Add unit` — use `exact: true` on the submit locators.
- First launch (fresh profile) seeds World History + Art History curriculums.

## Flows worth driving

1. Dashboard renders both seed cards with progress bars and "next up" hints.
2. Open a curriculum, check a resource checkbox → unit count and overall
   progress bar update; row gets strikethrough.
3. Reload the page → the check persists (localStorage).
4. Create a curriculum via the modal → lands on its detail page; add a unit
   (week defaults to max+1) and a resource with a URL → renders as a link.
5. Probes: week `0` in the unit form is rejected (modal stays open); Escape
   closes modals; corrupting the storage key then reloading falls back to
   seed data instead of crashing.
6. Sync (optional): without `VITE_SUPABASE_URL`/`VITE_SUPABASE_ANON_KEY` the
   account bar must NOT render and the app is purely local. With dummy values
   (`VITE_SUPABASE_URL=https://dummy-project.supabase.co
   VITE_SUPABASE_ANON_KEY=x npm run dev -- --port 5174`), the account bar and
   sign-in modal render, and a failed magic-link send shows `.form-error`
   instead of crashing. A real end-to-end sync needs live Supabase
   credentials in `.env.local`.
