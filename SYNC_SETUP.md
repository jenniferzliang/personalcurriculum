# Enabling accounts & cross-device sync

The app works locally out of the box. To turn on sign-in and cross-device sync,
connect it to a free [Supabase](https://supabase.com) project (one-time setup,
~10 minutes):

## 1. Create the Supabase project

1. Sign up at [supabase.com](https://supabase.com) (free tier is plenty).
2. Create a new project (any name/region; set a strong database password and
   store it somewhere safe — you won't need it day-to-day).

## 2. Create the database table

1. In the Supabase dashboard, open **SQL Editor**.
2. Paste the contents of [`supabase/schema.sql`](supabase/schema.sql) and run it.

This creates a `user_data` table with row-level security, so each signed-in
user can only read and write their own row.

## 3. Configure allowed sign-in redirect

1. In Supabase: **Authentication → URL Configuration**.
2. Set **Site URL** to your deployed app, e.g.
   `https://jenniferzliang.github.io/personalcurriculum/`.

Magic-link emails work out of the box on the free tier (rate-limited; fine for
personal use).

## 4. Give the app the project credentials

1. In Supabase: **Project Settings → API**. Copy the **Project URL** and the
   **anon (public) key**. The anon key is safe to expose in a browser app —
   row-level security is what protects the data.
2. In GitHub: repo **Settings → Secrets and variables → Actions → New
   repository secret**. Add both:
   - `VITE_SUPABASE_URL` — the Project URL
   - `VITE_SUPABASE_ANON_KEY` — the anon key
3. Re-run the deploy workflow (Actions tab → Deploy to GitHub Pages → Run
   workflow), or just push any commit to `main`.

For local development, create a `.env.local` file (gitignored) with the same
two variables.

## How sync behaves

- **Signed out** — everything stays in the browser's localStorage, as before.
- **First sign-in** — if your account has no data yet, the device's current
  data seeds it. Otherwise the account's data replaces what's on the device.
- **While signed in** — every change saves locally and pushes to your account
  (debounced ~1s). Other devices pick it up next time they load the app.
- **Sync failure** (offline, etc.) — changes still save locally; the account
  bar shows a warning.
