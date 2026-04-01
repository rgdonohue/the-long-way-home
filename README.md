# Long Way Home

**A place-aware routing experiment built first in Santa Fe.**

Long Way Home is a web mapping prototype that compares the **shortest driving route** with a route that might be **more worth taking**.

Set an origin and destination by clicking the map. The app draws the baseline route, reports distance and estimated drive time, checks whether the trip stays within a selected mileage budget, and suggests one nearby stop along the way from a small curated place dataset. If the stop looks worth it, you can reroute through it and see the tradeoff immediately: **how many extra miles and minutes the detour adds, and whether it still fits your budget**.

This project started as a simple network-distance map. It has since evolved into a small spatial UX experiment: **what happens when routing is shaped not only by efficiency, but also by place?**

---

## Why this exists

Most routing interfaces optimize for speed, distance, or convenience. That makes sense, but it leaves out another dimension of movement: **meaning**.

Long Way Home explores a different interaction pattern:

- show the shortest route
- surface one nearby stop with local value
- make the tradeoff explicit
- let the user decide whether the detour is worth it

The current build uses Santa Fe as its first case study because it is compact, visually legible, and culturally rich enough to support this idea with a lightweight curated dataset. The broader concept is extensible beyond Santa Fe.

---

## What the app does

### Current interaction flow

1. **Click once to set an origin**
2. **Click again to set a destination**
3. The app draws the **shortest driving route**
4. The panel shows:
   - route distance
   - estimated drive time
   - whether the trip is within the selected mileage threshold
5. The app looks for **one nearby place** along the route from the current category filter
6. If a suitable stop exists, the app:
   - shows it in the panel
   - previews whether routing through it stays within the selected budget
   - lets you click **Route via this stop**
7. The map then compares:
   - the original shortest route
   - the via-stop route
   - the added distance and time
8. The full state can be shared through the URL

### Current controls

- **Mileage presets:** 1, 3, or 5 miles
- **Stop categories:** Any, History, Art, Scenic, Food, Culture
- **Route toggle:** shortest route or route via suggested stop
- **Reset:** clear the route and start over

---

## What makes it interesting

This is **not** a full trip planner or a live POI search engine.

It is a deliberately small, opinionated prototype that combines:

- **network-aware routing**
- **budget-aware detour logic**
- **curated local place selection**
- **shareable route state**
- **a map-first interaction model**

The goal is not to overwhelm the user with options. The goal is to test whether **one good suggestion with a clear cost** can be more compelling than a cluttered list of “things near your route.”

---

## Tech stack

### Frontend
- **React**
- **TypeScript**
- **Vite**
- **MapLibre GL JS**

### Backend
- **FastAPI**
- **Python 3.11**
- **OpenRouteService API**

### Data / logic
- curated local place dataset for route-adjacent stop suggestions
- frontend route-proximity selection logic
- ORS-backed shortest-path and via-stop routing
- URL-synced app state for shareable map views

### Deployment
- monorepo deployed as two Railway services:
  - `apps/web`
  - `apps/api`

---

## Architecture at a glance

```text
apps/
  web/   -> React + MapLibre frontend
  api/   -> FastAPI backend, ORS integration