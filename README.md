# Dispatch

A small message board UI, built for the frontend challenge. UI only per the brief — data, auth, and actions are mocked, nothing needs to work. All components hand-built, no component library.

## Setup

Requires Node 24+ and pnpm.

```
pnpm install
pnpm dev
```

Open http://localhost:3000

## Screens & states

All built at mobile (390) and desktop (1440) breakpoints, matched against the design frames:

- `/auth/login` — login form with field validation (required fields, email format — error borders and messages); submitting navigates to the feed
- `/` — message feed from mock data (compose with 240-char counter and tag selector, filter bar, message items with author-only EDIT/DELETE, LOAD MORE control)
- Filters — tag chips, user select, and date range, all filtering server-side through a single JSON URL param (`/?filters={"tag":"DESIGN"}`), so any view is bookmarkable — as Ada's mock message promises; on mobile the chips scroll inline and the rest opens from a bottom drawer
- Loading state — skeleton cards stream into the list area while the fake 2s fetch resolves (header, compose, and filters stay interactive); visible on every load and every filter change
- Empty state — reachable naturally at `/?filters={"tag":"RANDOM"}` (no mock messages carry that tag)
- Log out — confirmation dialog, opened from the header button on desktop or the avatar menu on mobile
- Any unknown URL — branded 404 (improvised, no design frame provided)

## Decisions

- Next.js (App Router) + TypeScript + Tailwind v4; mock data drives everything — the feed "fetches" it through a fake 2-second promise so the skeleton state streams through a real Suspense boundary
- Design's base font is Space Grotesk with Space Mono for UI accents (kicker, labels, buttons) — both self-hosted via next/font
- Logo is a generated SVG lockup (real Space Mono glyph outlines), so it never flashes during font load
- The filter bar is one react-hook-form form whose value round-trips through the URL: emit → `?filters=` JSON param → server parse → form re-sync; empty values are stripped from the URL and clear is just `form.reset()` — the one deliberate step past "not functional", since the design's own mock copy describes exactly that behavior
- Compose and filters are parallel route slots (`@compose`, `@filters`) — layout-level regions that still read searchParams and re-render on navigation while the layout itself persists; only the message list suspends during filter changes
- Desktop/mobile DOM variants (filter sidebar vs drawer, header user area) switch through one `AtomBreakpoint` atom — SSR renders both gated by CSS so first paint is always correct, then hydration collapses to a single variant; no flicker, no permanent double DOM
- Light interactivity where it sells the UI: char counter, tag dropdown, password reveal, message chips highlight the active filter tag, body scroll locks under dialogs and drawers
- react-hook-form everywhere, headless (login, compose, filter bar) — it renders nothing, so components stay hand-built
- Feed screens render full-bleed; the design frames' outer border/shadow is treated as artboard chrome
- Ada (@ada_l) is the mock current user: yellow avatar, edit/delete affordances on her message only
- `TODO (out of scope)` comments mark the deliberate boundaries — real auth, message creation, LOAD MORE pagination

## Architecture

Everything in `libs/` is dumb: components render from props (plus their own UI state) and never fetch data or read the URL. All data wiring — URL state, awaited actions — happens in `app/` route files (compose and the filter bar each get their data through a parallel route slot, so even layout-level regions are server-composed at the app level). Seeded data lives exclusively inside `lib-actions` — the fake API is the only place that knows the "database".

| Lib           | Contents                                                                              |
| ------------- | ------------------------------------------------------------------------------------- |
| `lib-atoms`   | Dumb primitives — button, input, field chrome, avatar, tag, menu, drawer, dialog, breakpoint switch, logo, skeleton |
| `lib-icons`   | Hand-drawn SVG icons                                                                   |
| `lib-fields`  | Form controls wired to react-hook-form — email, password (reveal), select, tag picker, date |
| `lib-forms`   | Assembled forms — login (validation rules), compose, feed filter (URL-synced)          |
| `lib-feats`   | Feature components — header (avatar menu, logout), message item, feed states           |
| `lib-dialogs` | Dialog compositions — logout confirmation                                              |
| `lib-pages`   | Route-level views and shells, composed by `app/`                                       |
| `lib-actions` | The fake API — seeded users/messages, fake latency, filters (tag, user, dates), paging |
| `lib-hooks`   | `useMediaQuery`, `useIsHydrated`, `useBodyScrollLock`                                  |
| `lib-maps`    | Query-param serialization — object ⇄ URL query value                                   |
| `lib-formats` | Display formatting — relative dates                                                    |
| `lib-enums`   | Message tags                                                                           |
| `lib-types`   | Shared types                                                                           |
| `lib-consts`  | Shared constants (message max length)                                                  |
| `lib-fonts`   | next/font definitions — Space Grotesk, Space Mono                                      |
| `lib-styles`  | Tailwind theme — colors, breakpoint token                                              |

Dependencies point strictly downward; leaves import nothing:

```
app      → pages, forms, actions, maps, fonts, enums, types
pages    → forms, feats, atoms, icons, enums, consts, types
forms    → fields, atoms, icons, enums, consts, types
feats    → dialogs, atoms, formats, enums, types
dialogs  → atoms, types
fields   → atoms, icons, types
atoms    → hooks, types
actions  → enums, types
types    → enums
maps, formats, hooks, icons, consts, enums, fonts, styles → (leaf)
```
