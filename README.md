# Undercut Simulator

A pit-wall strategy tool with two tabs:

- **Build your own race** - a plain-English explainer of tyre degradation
  and the undercut, then a sandbox where you pick two teams, a track
  style, race length, and your rival's pit lap, and find the lap where
  the undercut actually works.
- **Famous undercuts** - the same simulator running on five real races
  (2021 France, Hungary, and Abu Dhabi, plus 2024 Italy and 2025 Miami),
  calibrated against what actually happened.

[Live demo idea: host this on GitHub Pages, it's static files only]

## Why this exists

Pitting for fresh tyres costs time. But fresh tyres are faster than worn
ones, so if you pit *before* your rival, you can claw back more time on
out-laps than the pit stop cost you, and come out ahead when they finally
stop too. That's the undercut. Pit too early, though, and you either run
out of fresh-tyre advantage before they stop, or you come out stuck behind
someone slower. This tool lets you feel that trade-off instead of just
reading about it.

## Architecture

```
python/                  <- run this locally, not in the browser
  extract_strategy_data.py
data/
  teams.js                  <- team names/colors + track-style presets for the builder
  races.js                  <- the three famous-race scenarios
js/
  strategy.js                <- the physics, pure functions
  chartRender.js               <- Chart.js wiring, one instance per canvas
  simPanel.js                   <- the reusable slider+chart+result block both tabs use
  app.js                          <- tabs, the builder controls, the race picker
css/
  styles.css
index.html
```

**Why `data/*.js` instead of `data/*.json` fetched at runtime?** Opening
`index.html` by double-clicking it loads the page over the `file://`
protocol, and browsers block `fetch()` of local files under that
protocol for security reasons. A `<script src="...">` tag has no such
restriction, so loading the data as plain JS globals means the site
works the instant you open the file, no local server required.

**Why not just call FastF1 from the browser?** FastF1 needs a Python
environment and downloads multi-megabyte timing files per session -
there's no version of that which runs client-side. So the heavy lifting
happens once, offline, in `extract_strategy_data.py`, which boils a
real race session down to four numbers and writes them into
`data/races.js`. The front end never talks to Python again after that.
Every slider drag is just arithmetic in `strategy.js`, which is why it
feels instant.

**Why one `simPanel.js` instead of writing the slider/chart/banner
markup twice?** Both tabs need an identical cockpit, just fed a
different race object. The `<template id="simTemplate">` in
`index.html` holds the markup once, and `simPanel.js` clones it into
whichever container you point it at, wires its own slider, and exposes
a `setRace(race)` method. `app.js` creates two of these and never
touches their internals directly.

## Running it

No build step, no server required. Just open `index.html` in a browser.
You can also serve it statically if you prefer:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

To regenerate `data/races.js` from real session data instead of the
pre-calibrated numbers included here:

```bash
cd python
pip install -r requirements.txt
python extract_strategy_data.py
```

The first run downloads and caches session data, so it's slow once and
fast after that.

## The model, and where it's simplified

`strategy.js` simulates the race lap by lap. `gap` is how far Car B
trails Car A. Each lap, whichever car is on the older tyre loses
`degPerLap` seconds relative to the other car; pitting costs `pitLoss`
seconds immediately and resets that car's tyre age to zero.

This is a deliberate simplification of real tyre behaviour (real
degradation isn't perfectly linear, fuel load changes the picture too,
and traffic is modelled as a flat time penalty rather than an actual
following-distance simulation). The point of the project isn't to
out-model FastF1's own analysis, it's to make the *shape* of the
undercut/overcut decision tangible and explorable. The numbers in
`data/races.js` are calibrated against the real outcomes of each race
(for example, the 2021 French GP numbers reproduce Verstappen's real
margin over Hamilton to within a few tenths) so the tool's answers line
up with what actually happened on those pit-lap choices.

One consequence of the linear model: a car that's permanently a few
laps younger on tyres than its rival keeps gaining a small, constant
amount every single lap, forever, which isn't realistic over a long
stretch of race. So the chart only displays up to about 10 laps past
the later of the two pit stops, the window where the undercut is
actually decided, rather than projecting that drift out to the end of
the race.

## Adding a race

Add an entry to the `window.FAMOUS_RACES` array in `data/races.js` with
the same shape as the existing ones, or run the Python script with a
new `(year, race name, driver, driver)` tuple added to
`RACES_TO_EXTRACT`. No front-end code changes needed, the race picker
on the "Famous undercuts" tab reads the list dynamically.

To add a team to the builder tab, add an entry to `window.TEAMS` in
`data/teams.js`. To add a track style preset, add one to
`window.CIRCUIT_PRESETS` in the same file.
