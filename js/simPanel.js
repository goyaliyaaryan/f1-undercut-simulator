/**
 * simPanel.js
 * ------------------------------------------------------------
 * One reusable "cockpit": the pit-lap slider, the gap ticker, the
 * chart, and the result banner. Both tabs create one of these and
 * feed it a race object - neither tab duplicates this markup or this
 * wiring logic.
 */

function createSimPanel(containerEl) {
  const template = document.getElementById('simTemplate');
  containerEl.appendChild(template.content.cloneNode(true));

  const refs = {};
  containerEl.querySelectorAll('[data-role]').forEach(el => {
    refs[el.dataset.role] = el;
  });

  let race = null;
  let changeCallback = null;

  function setRace(newRace) {
    const prevValue = race ? parseInt(refs.lapSlider.value, 10) : null;
    race = newRace;

    const maxLap = race.raceLaps - 2;
    refs.lapSlider.min = 1;
    refs.lapSlider.max = maxLap;

    let value = prevValue;
    if (value === null || value > maxLap || value < 1) {
      value = Math.max(1, Math.min(race.rivalPitLap - 3, maxLap));
    }
    refs.lapSlider.value = value;

    refs.carBName.textContent = race.carB.name;
    refs.legendA.innerHTML = `<span style="color:${race.carA.color}">●</span> ${race.carA.name}`;
    refs.legendB.innerHTML = `<span style="color:${race.carB.color}">●</span> ${race.carB.name}`;
    refs.rivalTag.textContent =
      `${race.carA.name}'s team decides when they pit, not you. They're going to box on lap ` +
      `${race.rivalPitLap} no matter what you choose. The only lever you control is when ` +
      `${race.carB.name} pits.`;

    render();
  }

  function render() {
    const bPitLap = parseInt(refs.lapSlider.value, 10);
    const result = window.F1Strategy.evaluateUndercut(race, bPitLap);
    const absGap = Math.abs(result.finalGap).toFixed(2);

    refs.lapReadout.textContent = bPitLap;
    refs.gapTickerValue.textContent = (result.finalGap < 0 ? '-' : '+') + absGap;
    refs.gapTickerValue.style.color = result.finalGap < 0 ? '#00D67F' : '#FFD23F';
    refs.gapTickerLabel.textContent = result.finalGap < 0
      ? `${race.carB.name} ahead by`
      : `${race.carB.name} behind by`;
    refs.pitMarkerLabel.textContent = `Pit on lap ${bPitLap}`;

    // The chart only shows up to a few laps past the second pit stop.
    // Beyond that point the model has nothing meaningful left to say -
    // a few laps of tyre-age difference don't keep compounding forever
    // in reality, so extending the line further just produces a long,
    // confusing drift that doesn't represent anything real.
    const displayEnd = Math.min(race.raceLaps, result.decisionLap + 10);
    const chartResult = { ...result, series: result.series.filter(p => p.lap <= displayEnd) };
    window.F1Chart.renderGapChart(refs.chartCanvas, race, chartResult);

    if (displayEnd < race.raceLaps) {
      refs.chartCaption.textContent =
        `Showing laps 0 to ${displayEnd} of this ${race.raceLaps}-lap race, the window around both stops. ` +
        `That's where the undercut is actually decided.`;
    } else {
      refs.chartCaption.textContent = '';
    }


    refs.resultBanner.classList.remove('result--success', 'result--fail', 'result--traffic');

    if (result.trafficBlocker) {
      refs.resultBanner.classList.add('result--traffic');
      refs.resultHeadline.textContent = `Undercut failed, boxed in behind ${result.trafficBlocker}`;
      refs.resultDetail.textContent =
        `Pitting on lap ${bPitLap} puts you straight into traffic. You'd have emerged ` +
        `${absGap}s adrift, stuck behind a car that has no reason to let you through.`;
    } else if (result.success) {
      refs.resultBanner.classList.add('result--success');
      refs.resultHeadline.textContent = `Undercut successful, +${absGap}s`;
      refs.resultDetail.textContent =
        `By boxing on lap ${bPitLap}, ${race.carB.name} emerges ahead of ` +
        `${race.carA.name} once both stops are done. The fresh-tyre pace bought back ` +
        `more than the pit stop cost.`;
    } else {
      refs.resultBanner.classList.add('result--fail');
      refs.resultHeadline.textContent = `Undercut failed, short by ${absGap}s`;
      refs.resultDetail.textContent =
        `Pitting on lap ${bPitLap} doesn't quite get there. ${race.carB.name} comes out ` +
        `${absGap}s behind ${race.carA.name}. Try pitting earlier to bank more laps on ` +
        `fresh tyres before the rival stops.`;
    }

    if (changeCallback) changeCallback(result, bPitLap);
  }

  refs.lapSlider.addEventListener('input', render);

  return {
    setRace,
    rerender: render,
    onChange(cb) { changeCallback = cb; },
    getBPitLap() { return parseInt(refs.lapSlider.value, 10); }
  };
}

window.createSimPanel = createSimPanel;
