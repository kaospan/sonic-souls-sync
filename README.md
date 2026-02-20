# CladeSync

A demo music‑social frontend built with Vite + React + TypeScript, styled with Tailwind CSS and shadcn/ui. It ships with a deterministic mock backend and seed data to power the feed and investor dashboard.

## Tech Stack
- Vite 5 + React 18 + TypeScript
- Tailwind CSS + shadcn/ui + Radix UI
- TanStack Query + React Router

## Quick Start
```sh
npm install
npm run dev
```
Open http://localhost:8080 (Vite dev server runs on port 8080).

## Scripts
```sh
npm run dev       # start dev server (mock API enabled)
npm run build     # production build
npm run build:dev # development-mode build
npm run preview   # preview production build
npm run lint      # eslint
npm run seed      # generate seed data (400 users) to scripts/seeds.json
npm run seed:400  # same as seed, explicit
node scripts/seed.js --count=10  # smoke test seed generation
```

## Mock API (dev only)
In dev mode, the app patches `fetch` and serves `/api/demo/*` from in‑memory data loaded from `scripts/seeds.json`.
To enable the mock server in non‑dev builds: `VITE_USE_MOCK=true npm run build`.

Endpoints:
- `GET /api/demo/users` (page, limit)
- `GET /api/demo/users/:id`
- `GET /api/demo/users/:id/posts`
- `GET /api/demo/posts` (page, limit)
- `GET /api/demo/stats`
- `POST /api/demo/users/:id/follow` `{ followerId }`
- `POST /api/demo/users/:id/unfollow` `{ followerId }`
- `POST /api/demo/posts/:id/like`
- `POST /api/demo/posts/:id/comment` `{ userId, text }`

## Demo Routes
- `/demo-feed` — paginated music feed with likes/comments
- `/investor` — aggregate metrics dashboard

## Project Layout
- `src/main.tsx` bootstraps the app and mock server
- `src/App.tsx` routes
- `src/pages/` page-level views
- `src/components/` shared UI + feature components
- `src/lib/mockServer.ts` mock backend implementation
- `scripts/seed.js` deterministic seed generator

## CI
GitHub Actions (Node 18) runs on every push/PR:
1. `npm ci`
2. `npm run lint`
3. `npm run build`
4. `node scripts/seed.js --count=10`
Deploys `dist/` to GitHub Pages on `main`.
