# Personal Curriculum Tracker

A web app for organizing self-study curriculums (e.g. World History, Art History) and tracking
your progress through them, week by week.

## Features

- **Multiple curriculums** — create as many as you like, each with its own color.
- **Weekly units** — each curriculum is broken into numbered weeks with a title and description.
- **Readings, videos & links** — every unit holds a checklist of items, each optionally linking
  out to the reading or video.
- **Progress tracking** — check items off as you finish them; progress bars roll up per unit and
  per curriculum, and each card shows what's next up.
- **Local & private** — everything is stored in your browser's localStorage. No account, no
  server, no tracking.
- **Export / import** — download all your data as JSON for backup, and restore it on any device.

The app ships with starter World History and Art History curriculums that you can edit or delete.

## Running it

```bash
npm install
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # type-check and build for production into dist/
npm run preview  # serve the production build locally
```

The production build in `dist/` is fully static (built with relative paths), so it can be hosted
anywhere — GitHub Pages, Netlify, or just opened from a local file server.

## Tech

React 18 + TypeScript + Vite, no other runtime dependencies.
