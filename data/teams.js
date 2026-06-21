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
  { id: "melbourne",   label: "Australia (Melbourne)",       pitLoss: 23,  degPerLap: 0.07,  defaultLaps: 58 },
  { id: "china",       label: "China (Shanghai)",            pitLoss: 23,  degPerLap: 0.08,  defaultLaps: 56 },
  { id: "japan",       label: "Japan (Suzuka)",              pitLoss: 22,  degPerLap: 0.10,  defaultLaps: 53 },
  { id: "bahrain",     label: "Bahrain (Sakhir)",            pitLoss: 21,  degPerLap: 0.13,  defaultLaps: 57 },
  { id: "jeddah",      label: "Saudi Arabia (Jeddah)",       pitLoss: 22,  degPerLap: 0.08,  defaultLaps: 50 },
  { id: "miami",       label: "Miami",                       pitLoss: 20,  degPerLap: 0.085, defaultLaps: 57 },
  { id: "canada",      label: "Canada (Montreal)",           pitLoss: 23,  degPerLap: 0.08,  defaultLaps: 70 },
  { id: "monaco",      label: "Monaco",                      pitLoss: 32,  degPerLap: 0.03,  defaultLaps: 78 },
  { id: "barcelona",   label: "Spain (Barcelona)",           pitLoss: 22,  degPerLap: 0.11,  defaultLaps: 66 },
  { id: "austria",     label: "Austria (Red Bull Ring)",     pitLoss: 20,  degPerLap: 0.10,  defaultLaps: 71 },
  { id: "silverstone", label: "Great Britain (Silverstone)", pitLoss: 22,  degPerLap: 0.11,  defaultLaps: 52 },
  { id: "spa",         label: "Belgium (Spa)",               pitLoss: 23,  degPerLap: 0.09,  defaultLaps: 44 },
  { id: "zandvoort",   label: "Netherlands (Zandvoort)",     pitLoss: 21,  degPerLap: 0.10,  defaultLaps: 72 },
  { id: "monza",       label: "Italy (Monza)",               pitLoss: 24,  degPerLap: 0.078, defaultLaps: 53 },
  { id: "madrid",      label: "Spain (Madrid)",              pitLoss: 26,  degPerLap: 0.07,  defaultLaps: 55 },
  { id: "hungary",     label: "Hungary (Hungaroring)",       pitLoss: 24,  degPerLap: 0.07,  defaultLaps: 70 },
  { id: "baku",        label: "Azerbaijan (Baku)",           pitLoss: 28,  degPerLap: 0.06,  defaultLaps: 51 },
  { id: "singapore",   label: "Singapore",                   pitLoss: 30,  degPerLap: 0.04,  defaultLaps: 61 },
  { id: "cota",        label: "United States (COTA)",        pitLoss: 22,  degPerLap: 0.10,  defaultLaps: 56 },
  { id: "mexico",      label: "Mexico City",                 pitLoss: 23,  degPerLap: 0.07,  defaultLaps: 71 },
  { id: "brazil",      label: "Brazil (Interlagos)",         pitLoss: 22,  degPerLap: 0.11,  defaultLaps: 71 },
  { id: "lasvegas",    label: "Las Vegas",                   pitLoss: 21,  degPerLap: 0.06,  defaultLaps: 50 },
  { id: "qatar",       label: "Qatar (Lusail)",              pitLoss: 22,  degPerLap: 0.14,  defaultLaps: 57 },
  { id: "abudhabi",    label: "Abu Dhabi (Yas Marina)",      pitLoss: 27,  degPerLap: 0.058, defaultLaps: 58 }
];

window.TYRE_COMPOUNDS = [
  { id: "soft",   label: "Soft",   degPerLap: 0.14, paceOffset: -0.4 },
  { id: "medium", label: "Medium", degPerLap: 0.08, paceOffset: 0 },
  { id: "hard",   label: "Hard",   degPerLap: 0.04, paceOffset: 0.3 }
];
