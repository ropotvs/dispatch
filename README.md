# Dispatch

A small message board, built for the frontend challenge. The brief asks for UI only — mocking is fine, nothing needs to work — but everything here works anyway: real login with sessions, a JSON-file database, posts, edits, and deletes that persist. All components hand-built, no component library.

## Setup

Requires Node 24+ and pnpm.

```
pnpm install
pnpm dev
```

Open http://localhost:3000

## Screens & states

All built at mobile (390) and desktop (1440) breakpoints, matched against the design frames:

- `/auth/login` — real login: credentials are checked against the users table and the session is stored in an httpOnly cookie; the feed redirects here when there is no session; wrong credentials show a form error, field validation covers the rest (required fields, email format). Demo accounts: `ada@dispatch.dev`, `marco@dispatch.dev`, `priya@dispatch.dev` — password `dispatch` for all (stored in plain text in `db/users.json` on purpose, so testing is easy; a real app would hash them)
- `/` — message feed from mock data (compose with 240-char counter and tag selector, filter bar, message items)
- Compose — posting works for real: a server action persists the message, the filters clear, and the feed re-fetches to show it at the top; POST disables whenever the list is loading — initial load, filter changes, load more, or a post in flight — and the form clears
- Message item — author-only affordances that work: inline edit (text and tag, with counter and validation) and delete-with-confirmation both persist through server actions, and the server enforces it too (mutations reject missing sessions and non-author edits/deletes); changes apply to the list instantly, then the loaded window re-syncs from the server in the background (deletions shift the pages, and a tag edit can drop a message out of a filtered view)
- Pagination — LOAD MORE button on desktop appends the next page and hides itself on the last one; on mobile it becomes infinite scroll with a skeleton card while fetching
- Filters — tag chips, user select, and date range, all filtering server-side through a single JSON URL param (`/?filters={"tag":"DESIGN"}`), so any view is bookmarkable — as Ada's mock message promises; on mobile the chips scroll inline and the rest opens from a bottom drawer
- Loading state — skeleton cards fill the list area while the fake 1s fetch resolves (header, compose, and filters stay interactive); visible on every load, every filter change, and every page fetch
- Empty state — reachable naturally at `/?filters={"tag":"RANDOM"}` (no mock messages carry that tag)
- Log out — confirmation dialog, opened from the header button on desktop or the avatar menu on mobile; confirming clears the session cookie
- Any unknown URL — branded 404 (improvised, no design frame provided)

## Decisions

- Next.js (App Router) + TypeScript + Tailwind v4; the feed fetches its data through server actions with a fake 1-second latency, so every load exercises the real skeleton state
- Design's base font is Space Grotesk with Space Mono for UI accents (kicker, labels, buttons) — both self-hosted via next/font
- Logo is a generated SVG lockup (real Space Mono glyph outlines), so it never flashes during font load
- The filter bar is one react-hook-form form whose value round-trips through the URL: emit → `?filters=` JSON param → the feed context parses it back → form re-sync; empty values are stripped from the URL and clear is just `form.reset()` — bookmarkable filters, exactly as the design's own mock copy promises
- Compose and filters are parallel route slots (`@compose`, `@filters`) — layout-level regions server-composed by the app while the layout persists across navigations; the message list re-fetches client-side when the filter in the URL changes
- Desktop/mobile DOM variants (filter sidebar vs drawer, header user area) switch through one `AtomBreakpoint` atom — SSR renders both gated by CSS so first paint is always correct, then hydration collapses to a single variant; no flicker, no permanent double DOM
- Light interactivity where it sells the UI: char counter, tag dropdown, password reveal, message chips highlight the active filter tag, body scroll locks under dialogs and drawers
- Interaction states follow the design's physicality: shadowed buttons press into their offset shadow on hover/press, flat chips and controls lift off the page; overlays fade/slide/pop in at ~150ms (gated behind `prefers-reduced-motion`); Esc closes dialog, drawer, and menus
- More improvisation where the design is silent: the compose textarea auto-grows with content (`field-sizing: content`, fixed-height fallback outside Chromium), the counter warns orange near the 240 limit and turns red at it — surfacing on mobile only once it matters; timestamps show the absolute date on hover; the empty state links straight to clearing filters; date fields draw the hand-drawn calendar icon where the native picker can be restyled (Firefox keeps its own)
- react-hook-form everywhere, headless (login, compose, filter bar) — it renders nothing, so components stay hand-built
- Feed screens render full-bleed; the design frames' outer border/shadow is treated as artboard chrome
- The signed-in user drives the UI: yellow avatar and handle in the header, edit/delete affordances only on own messages — log in as @marco to edit Marco's posts; the feed is session-guarded, so opening it while signed out redirects to the login screen
- Content actually persists: `lib-db` is a tiny JSON-file database — `db/messages.json` and `db/users.json` are committed and hold the data itself, and every read and write goes straight to disk, so the feed survives reloads and restarts; messages store only an `authorId` and the fetch action joins the author from the users table into the DTO
- The message list is deliberately client-rendered — no SSR for the feed content, by choice rather than omission: the feed sits behind a login (nothing to win on SEO or crawlers), and the list is live client state from the first second — pagination, instant edits and deletes, background re-syncs — so a single client data path through the feed context beats a hybrid where the server renders page one and the client owns everything after; a public, content-facing app would stream the first page from the server instead
- Pagination is server-truth: pages come 3 at a time with a total count, and `pageCount * pageSize < count` decides "load more" — the feed context owns the loaded pages (plus the filter, derived straight from the URL, and the loading flag shared by the slots) and refetches the first page whenever the filter in the URL changes
- Deliberate boundaries: the JSON files stand in for a real database, and auth stays demo-grade — plain-text passwords, an unsigned session-snapshot cookie, no hashing or session expiry — so everything is easy to inspect and poke at

## Architecture

Everything in `libs/` is dumb: components render from props (plus their own UI state) and never fetch data or read the URL. All data wiring — URL state, awaited actions — happens in `app/` route files (compose and the filter bar each get their data through a parallel route slot, so even layout-level regions are server-composed at the app level). Data lives behind `lib-actions` — server actions that read and write through `lib-db`, the JSON-file database, which is the only place that knows the tables.

| Lib           | Contents                                                                                                            |
| ------------- |---------------------------------------------------------------------------------------------------------------------|
| `lib-atoms`   | Dumb primitives — button, input, field chrome, avatar, tag, menu, drawer, dialog, breakpoint switch, logo, skeleton |
| `lib-icons`   | Hand-drawn SVG icons                                                                                                |
| `lib-fields`  | Form controls wired to react-hook-form — email, password (reveal), select, tag picker, date                         |
| `lib-forms`   | Assembled forms — login (validation rules), compose, message update, feed filter (URL-synced)                       |
| `lib-feats`   | Feature components — header (avatar menu, logout), message item, feed states                                        |
| `lib-dialogs` | Dialog compositions — logout and message-delete confirmations                                                       |
| `lib-pages`   | Route-level views and shells, composed by `app/`                                                                    |
| `lib-actions` | Server actions — message list (filters, paging, author join, fake latency), create/update/delete, users, auth (cookie session login/logout) |
| `lib-db`      | JSON-file database — `connect(table)` factory returning per-table read/write, straight to disk                      |
| `lib-hooks`   | `useMediaQuery`, `useIsHydrated`, `useBodyScrollLock`, `useKeydown`, `useInView`               |
| `lib-maps`    | Query-param serialization — object ⇄ URL query value                                                                |
| `lib-formats` | Display formatting — relative and absolute dates                                                                    |
| `lib-enums`   | Message tags                                                                                                        |
| `lib-types`   | Shared types                                                                                                        |
| `lib-consts`  | Shared constants (message max length)                                                                               |
| `lib-fonts`   | next/font definitions — Space Grotesk, Space Mono                                                                   |
| `lib-styles`  | Tailwind theme — colors, breakpoint token, motion keyframes                                                         |

Dependencies point strictly downward; leaves import nothing:

```
app      → pages, feats, forms, atoms, actions, hooks, maps, icons, fonts, consts, enums, types
pages    → feats, forms, atoms, icons, enums, consts, types
feats    → forms, dialogs, atoms, formats, hooks, enums, types
forms    → fields, atoms, icons, enums, consts, types
dialogs  → atoms, types
fields   → atoms, icons, types
atoms    → hooks, types
actions  → db, enums, types
db       → enums, types
types    → enums
maps, formats, hooks, icons, consts, enums, fonts, styles → (leaf)
```
