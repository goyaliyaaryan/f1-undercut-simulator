/**
 * teams.js
 * ------------------------------------------------------------
 * Just names and colors for the "build your own race" sandbox.
 * Nothing performance-related is tied to a team, it's purely so the
 * chart and chips feel like an F1 thing instead of "Car A vs Car B".
 */

window.TEAMS = [
  { name: "Red Bull Racing", color: "#3671C6" },
  { name: "Ferrari", color: "#E8002D" },
  { name: "Mercedes", color: "#27F4D2" },
  { name: "McLaren", color: "#FF8000" },
  { name: "Aston Martin", color: "#229971" },
  { name: "Alpine", color: "#FF87BC" },
  { name: "Williams", color: "#64C4FF" },
  { name: "RB", color: "#6692FF" },
  { name: "Haas", color: "#B6BABD" },
  { name: "Audi", color: "#E4002B" },
  { name: "Cadillac", color: "#003087" }
];

window.CIRCUIT_PRESETS = [
  { id: "monaco",      label: "Monaco",           pitLoss: 32,   degPerLap: 0.03,  defaultLaps: 78 },
  { id: "monza",       label: "Monza",             pitLoss: 24,   degPerLap: 0.078, defaultLaps: 53 },
  { id: "silverstone", label: "Silverstone",       pitLoss: 22,   degPerLap: 0.11,  defaultLaps: 52 },
  { id: "spa",         label: "Spa-Francorchamps", pitLoss: 23,   degPerLap: 0.09,  defaultLaps: 44 },
  { id: "bahrain",     label: "Bahrain",           pitLoss: 21,   degPerLap: 0.13,  defaultLaps: 57 },
  { id: "singapore",   label: "Singapore",         pitLoss: 30,   degPerLap: 0.04,  defaultLaps: 61 },
  { id: "suzuka",      label: "Suzuka",            pitLoss: 22,   degPerLap: 0.10,  defaultLaps: 53 },
  { id: "miami",       label: "Miami",             pitLoss: 20,   degPerLap: 0.085, defaultLaps: 57 }
];

window.TYRE_COMPOUNDS = [
  { id: "soft",   label: "Soft",   degPerLap: 0.14, paceOffset: -0.4 },
  { id: "medium", label: "Medium", degPerLap: 0.08, paceOffset: 0 },
  { id: "hard",   label: "Hard",   degPerLap: 0.04, paceOffset: 0.3 }
];
