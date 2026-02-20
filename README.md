# Sonic Souls Sync

A music-social platform built with Vite, React, TypeScript, shadcn/ui, and Tailwind CSS.

## Quick Start

```sh
git clone https://github.com/kaospan/cladesync.git
cd cladesync
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Seed Data

Generate deterministic fake users & posts (no external dependencies):

```sh
npm run seed          # 400 users (60% Israeli), writes scripts/seeds.json
npm run seed:400      # explicit 400
node scripts/seed.js --count=10  # smoke test
```

The seed script uses a seeded PRNG (seed=42) so output is reproducible.
`scripts/seeds_sample_preview.json` contains the first 20 users for quick review.

## Mock Social Backend (dev only)

In development (`npm run dev`) the app automatically patches `fetch` to intercept
`/api/demo/*` requests and serve in-memory data from `scripts/seeds.json`.

Available endpoints:

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/demo/users` | Paginated user list (`?page=&limit=`) |
| GET | `/api/demo/users/:id` | Single user |
| GET | `/api/demo/users/:id/posts` | Posts by user |
| GET | `/api/demo/posts` | Paginated global feed |
| GET | `/api/demo/stats` | Aggregate metrics (investor dashboard) |
| POST | `/api/demo/users/:id/follow` | Follow a user (`{ followerId }`) |
| POST | `/api/demo/users/:id/unfollow` | Unfollow a user |
| POST | `/api/demo/posts/:id/like` | Increment like count |
| POST | `/api/demo/posts/:id/comment` | Add a comment |

To enable in non-dev builds: `VITE_USE_MOCK=true npm run build`.

## Demo Pages

Navigate to these routes in development:

- `/demo-feed` — paginated music post feed with like/comment support
- `/investor` — aggregate metrics dashboard (users, posts, likes, follow graph)

A small floating nav appears in the bottom-right corner in dev mode.

## CI & GitHub Pages

GitHub Actions runs on every push and PR:

1. **Setup** — `npm ci` with Node 18
2. **Lint** — `npm run lint`
3. **Build** — `npm run build`
4. **Seed smoke test** — `node scripts/seed.js --count=10`
5. **Deploy** (main branch only) — publishes `dist/` to GitHub Pages via `peaceiris/actions-gh-pages`

## Tech Stack

- [Vite](https://vitejs.dev/) + [React 18](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [shadcn/ui](https://ui.shadcn.com/) component library
- [Tailwind CSS](https://tailwindcss.com/)
- [TanStack Query](https://tanstack.com/query)
- [React Router v6](https://reactrouter.com/)
- [DiceBear](https://www.dicebear.com/) avatar URLs (no binary images committed)

## Next Steps

- [ ] **Supabase integration** — replace mock server with real Postgres + Auth
- [ ] **E2E tests** — Playwright/Cypress covering feed, follow, like flows
- [ ] **Analytics** — PostHog or Mixpanel event tracking
- [ ] **Audio playback** — integrate Web Audio API or HLS player
- [ ] **Notifications** — real-time follow/like alerts via Supabase Realtime

