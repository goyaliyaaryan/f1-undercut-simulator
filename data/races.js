/**
 * races.js
 * ------------------------------------------------------------
 * Plain JS instead of a fetched .json file on purpose: opening
 * index.html directly (double-click, no server) loads the page over
 * the file:// protocol, and browsers block fetch() of local files
 * under that protocol. A <script> tag has no such restriction, so
 * this works everywhere, no server required.
 *
 * This is what python/extract_strategy_data.py would regenerate
 * from real FastF1 session data - see that file for how each number
 * is actually computed from timing data.
 */

window.FAMOUS_RACES = [
  {
    id: "fra2021",
    label: "2021 French Grand Prix",
    circuit: "Circuit Paul Ricard",
    round: "Round 7",
    raceLaps: 53,
    pitLoss: 21.8,
    degPerLap: 0.095,
    initialGap: 1.4,
    rivalPitLap: 21,
    carA: { name: "Hamilton", team: "Mercedes", color: "#E8ECF1" },
    carB: { name: "Verstappen", team: "Red Bull", color: "#9D4EDD" },
    trafficZones: [],
    note: "The textbook undercut. Verstappen pitted three laps before Hamilton and used the tyre offset to retake the lead at the restart, going on to win by 2.9s."
  },
  {
    id: "hun2021",
    label: "2021 Hungarian Grand Prix",
    circuit: "Hungaroring",
    round: "Round 11",
    raceLaps: 70,
    pitLoss: 24.3,
    degPerLap: 0.07,
    initialGap: 2.1,
    rivalPitLap: 38,
    carA: { name: "Hamilton", team: "Mercedes", color: "#E8ECF1" },
    carB: { name: "Bottas", team: "Mercedes", color: "#9D4EDD" },
    trafficZones: [
      { lapStart: 13, lapEnd: 17, penalty: 4.2, blocker: "Alonso" }
    ],
    note: "The Hungaroring is famously hard to overtake on. Pit too early here and you don't just lose track position, you get stuck in DRS range of a car that's happy to defend for laps."
  },
  {
    id: "abu2021",
    label: "2021 Abu Dhabi Grand Prix",
    circuit: "Yas Marina Circuit",
    round: "Round 22",
    raceLaps: 58,
    pitLoss: 26.6,
    degPerLap: 0.058,
    initialGap: 1.0,
    rivalPitLap: 29,
    carA: { name: "Hamilton", team: "Mercedes", color: "#E8ECF1" },
    carB: { name: "Verstappen", team: "Red Bull", color: "#9D4EDD" },
    trafficZones: [],
    note: "Yas Marina's pit lane is one of the longest on the calendar, so the time loss is brutal. Low degradation means fresh tyres don't gain you much per lap either, the undercut window here is genuinely narrow."
  },
  {
    id: "ita2024",
    label: "2024 Italian Grand Prix",
    circuit: "Autodromo Nazionale Monza",
    round: "Round 16",
    raceLaps: 53,
    pitLoss: 24.3,
    degPerLap: 0.078,
    initialGap: 0.7,
    rivalPitLap: 17,
    carA: { name: "Leclerc", team: "Ferrari", color: "#E8ECF1" },
    carB: { name: "Norris", team: "McLaren", color: "#9D4EDD" },
    trafficZones: [],
    note: "Monza's straights are so fast that even though the pit lane itself is short, the time loss is one of the biggest on the calendar, over 24 seconds. Norris pitted a lap before Leclerc and the move was just enough: he came out in front by under half a second."
  },
  {
    id: "mia2025",
    label: "2025 Miami Grand Prix",
    circuit: "Miami International Autodrome",
    round: "Round 6",
    raceLaps: 57,
    pitLoss: 20.5,
    degPerLap: 0.085,
    initialGap: 0.6,
    rivalPitLap: 27,
    carA: { name: "Norris", team: "McLaren", color: "#E8ECF1" },
    carB: { name: "Antonelli", team: "Mercedes", color: "#9D4EDD" },
    trafficZones: [],
    note: "Norris was leading and pitted a lap after Antonelli, who'd stopped first. That single lap of fresh-tyre pace was enough for Antonelli to slice past the moment Norris rejoined, taking the race lead in his rookie season."
  }
];
