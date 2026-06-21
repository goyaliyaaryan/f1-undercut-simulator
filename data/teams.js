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
  { id: "monaco", 
    label: "Monaco/Street Circuits", 
    blurb: "Narrow streets, impossible to overtake. Pit loss is brutal.", 
    pitLoss: 32, 
    degPerLap: 0.03 
  },
  {
    id: "power",
    label: "Power circuit",
    blurb: "Long straights, fast in-and-out lap. Pit stops are cheap here.",
    pitLoss: 19,
    degPerLap: 0.08
  },
  {
    id: "abrasive",
    label: "High-degradation track",
    blurb: "Rough surface, hard on tyres. Fresh rubber is a huge advantage.",
    pitLoss: 22,
    degPerLap: 0.16
  },
  {
    id: "easy",
    label: "Easy-on-tyres track",
    blurb: "Smooth surface. Old tyres barely slow down, so the undercut is weak.",
    pitLoss: 22,
    degPerLap: 0.035
  }
];
window.TYRE_COMPOUNDS = [
  { id: "soft",   label: "Soft",   degPerLap: 0.14 },
  { id: "medium", label: "Medium", degPerLap: 0.08 },
  { id: "hard",   label: "Hard",   degPerLap: 0.04 }
];
