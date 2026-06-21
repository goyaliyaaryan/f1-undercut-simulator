/**
 * strategy.js
 * ------------------------------------------------------------
 * The actual "physics" of the undercut. No DOM code lives here on
 * purpose - this file just takes numbers in and returns numbers out,
 * so it's trivial to test and impossible to accidentally break the UI
 * while tuning the model.
 *
 * Model (deliberately simplified, see README for the reasoning):
 *
 *  - `gap` = how many seconds Car B is BEHIND Car A. Positive means
 *    B is losing, negative means B has actually gotten ahead.
 *  - Every lap, whichever car is on the older tyre loses
 *    `degPerLap` seconds per lap of tyre age relative to the other car.
 *  - Pitting costs `pitLoss` seconds immediately and resets that
 *    car's tyre age to 0.
 *  - If you pit inside a `trafficZone`, you additionally get bottled
 *    up behind a slower car for `penalty` seconds.
 */

/**
 * Simulate the full race lap by lap for a given strategy.
 * @param {object} race - one entry from races.json
 * @param {number} bPitLap - the lap WE choose to pit Car B on
 * @returns {{lap:number, gap:number}[]} gap evolution, lap 0..raceLaps
 */
function simulateRace(race, bPitLap) {
  const { raceLaps, pitLoss, degPerLap, initialGap, rivalPitLap, trafficZones } = race;

  let gap = initialGap;
  let ageA = 0;
  let ageB = 0;

  const series = [{ lap: 0, gap }];

  for (let lap = 1; lap <= raceLaps; lap++) {
    if (lap === rivalPitLap) {
      gap -= pitLoss;
      ageA = 0;
    } else {
      ageA += 1;
    }

    if (lap === bPitLap) {
      gap += pitLoss;
      ageB = 0;

      const zone = (trafficZones || []).find(z => lap >= z.lapStart && lap <= z.lapEnd);
      if (zone) {
        gap += zone.penalty;
      }
    } else {
      ageB += 1;
    }

    // Tyre age differential: whoever is on the older rubber loses time.
    gap += degPerLap * (ageB - ageA);
    if (lap === 1) {
      gap += race.paceOffset || 0;
    }

    series.push({ lap, gap });
  }

  return series;
}

/**
 * Work out the headline verdict right after both cars have made their stop -
 * that's the moment that actually decides whether the undercut worked.
 */
function evaluateUndercut(race, bPitLap) {
  const series = simulateRace(race, bPitLap);
  const decisionLap = Math.max(race.rivalPitLap, bPitLap);
  const point = series.find(p => p.lap === decisionLap) || series[series.length - 1];
  const finalGap = point.gap;

  const inTraffic = (race.trafficZones || []).find(
    z => bPitLap >= z.lapStart && bPitLap <= z.lapEnd
  );

  return {
    series,
    decisionLap,
    finalGap,
    success: finalGap < 0,
    trafficBlocker: inTraffic ? inTraffic.blocker : null
  };
}

// Exposed as plain globals - no module bundler in this project on purpose.
window.F1Strategy = { simulateRace, evaluateUndercut };
