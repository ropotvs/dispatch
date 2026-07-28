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
- `/` — message feed from mock data (compose with 240-char counter and tag selector, filter bar, message items)
- Compose — posting works: the new message lands at the top of the feed with author affordances, and the form clears; a shared client context owns the message list, bridging the compose slot and the list
- Message item — author-only affordances that work: inline edit (text and tag, with counter and validation) applies optimistically, delete asks for confirmation first; creation, edits, and deletes all log the intended mutation and mark persistence as out of scope
- Pagination — LOAD MORE button on desktop appends the next page and hides itself on the last one; on mobile it becomes infinite scroll with a skeleton card while fetching
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
- Interaction states follow the design's physicality: shadowed buttons press into their offset shadow on hover/press, flat chips and controls lift off the page; overlays fade/slide/pop in at ~150ms (gated behind `prefers-reduced-motion`); Esc closes dialog, drawer, and menus
- More improvisation where the design is silent: the compose textarea auto-grows with content (`field-sizing: content`, fixed-height fallback outside Chromium), the counter warns orange near the 240 limit and turns red at it — surfacing on mobile only once it matters; timestamps show the absolute date on hover; the empty state links straight to clearing filters; date fields draw the hand-drawn calendar icon where the native picker can be restyled (Firefox keeps its own)
- react-hook-form everywhere, headless (login, compose, filter bar) — it renders nothing, so components stay hand-built
- Feed screens render full-bleed; the design frames' outer border/shadow is treated as artboard chrome
- Node's gzip buffers streamed responses in Safari, hiding the skeletons until the stream completes — compression is off (`compress: false`) in favor of correct streaming everywhere; a real deployment would compress at the CDN/proxy layer instead
- Ada (@ada_l) is the mock current user: yellow avatar, edit/delete affordances on her message only
- Message create/edit/delete and pagination are optimistic scaffolding: a feed context owns the message array in client state (seeded from each server-fetched page), pages come from the fake API (3 per page, with a total count driving "load more" visibility) — the pieces a real backend would slot into
- `TODO (out of scope)` comments mark the deliberate boundaries — real auth, persisting creations, edits, and deletes

## Architecture

Everything in `libs/` is dumb: components render from props (plus their own UI state) and never fetch data or read the URL. All data wiring — URL state, awaited actions — happens in `app/` route files (compose and the filter bar each get their data through a parallel route slot, so even layout-level regions are server-composed at the app level). Seeded data lives exclusively inside `lib-actions` — the fake API is the only place that knows the "database".

| Lib           | Contents                                                                              |
| ------------- | ------------------------------------------------------------------------------------- |
| `lib-atoms`   | Dumb primitives — button, input, field chrome, avatar, tag, menu, drawer, dialog, breakpoint switch, logo, skeleton |
| `lib-icons`   | Hand-drawn SVG icons                                                                   |
| `lib-fields`  | Form controls wired to react-hook-form — email, password (reveal), select, tag picker, date |
| `lib-forms`   | Assembled forms — login (validation rules), compose, message update, feed filter (URL-synced) |
| `lib-feats`   | Feature components — header (avatar menu, logout), message item, feed states           |
| `lib-dialogs` | Dialog compositions — logout and message-delete confirmations                          |
| `lib-pages`   | Route-level views and shells, composed by `app/`                                       |
| `lib-actions` | The fake API — seeded users/messages, fake latency, filters (tag, user, dates), paging |
| `lib-hooks`   | `useMediaQuery`, `useIsHydrated`, `useBodyScrollLock`, `useKeydown`, `useInView`     |
| `lib-maps`    | Query-param serialization — object ⇄ URL query value                                   |
| `lib-formats` | Display formatting — relative and absolute dates                                       |
| `lib-enums`   | Message tags                                                                           |
| `lib-types`   | Shared types                                                                           |
| `lib-consts`  | Shared constants (message max length)                                                  |
| `lib-fonts`   | next/font definitions — Space Grotesk, Space Mono                                      |
| `lib-styles`  | Tailwind theme — colors, breakpoint token, motion keyframes                            |

Dependencies point strictly downward; leaves import nothing:

```
app      → pages, feats, forms, atoms, actions, hooks, maps, icons, fonts, consts, enums, types
pages    → feats, forms, atoms, icons, enums, consts, types
feats    → forms, dialogs, atoms, formats, hooks, enums, types
forms    → fields, atoms, icons, enums, consts, types
dialogs  → atoms, types
fields   → atoms, icons, types
atoms    → hooks, types
actions  → enums, types
types    → enums
maps, formats, hooks, icons, consts, enums, fonts, styles → (leaf)
```
