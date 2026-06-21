/**
 * app.js
 * ------------------------------------------------------------
 * UI glue for both tabs. All data is loaded as plain globals from
 * data/teams.js and data/races.js (see those files for why it's not
 * a fetched JSON file), so everything here runs the instant the page
 * loads, no network request involved.
 */

(function () {
  /* ============================================================
     Tabs
  ============================================================= */
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.toggle('is-active', b === btn));
      tabPanels.forEach(p => p.classList.toggle('is-active', p.id === `tab-${btn.dataset.tab}`));
    });
  });

  /* ============================================================
     Tab 1: Build your own race
  ============================================================= */
  const builderPanel = window.createSimPanel(document.getElementById('sim-builder'));

  const teamAEl = document.getElementById('teamA');
  const teamBEl = document.getElementById('teamB');
  const raceLapsOut = document.getElementById('raceLapsOut');
  const circuitSelect = document.getElementById('circuitSelect');
  const initialGapInput = document.getElementById('initialGapInput');
  const initialGapOut = document.getElementById('initialGapOut');
  const rivalPitLapInput = document.getElementById('rivalPitLapInput');
  const rivalPitLapOut = document.getElementById('rivalPitLapOut');
  const tyreGrid = document.getElementById('tyreGrid');
  const weatherGrid = document.getElementById('weatherGrid');
  let selectedTyreId = window.TYRE_COMPOUNDS[0].id;
  let selectedWeatherId = window.WEATHER_CONDITIONS[0].id;


  window.TYRE_COMPOUNDS.forEach(compound => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'preset-card';
    btn.innerHTML = `<p class="preset-card__label">${compound.label}</p>`;
    btn.addEventListener('click', () => {
      selectedTyreId = compound.id;
      tyreGrid.querySelectorAll('.preset-card').forEach(c => c.classList.toggle('is-active', c === btn));
      updateBuilderRace();
    });
    tyreGrid.appendChild(btn);
  });
  tyreGrid.firstElementChild.classList.add('is-active');

  window.WEATHER_CONDITIONS.forEach(condition => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'preset-card';
    btn.innerHTML = `<p class="preset-card__label">${condition.label}</p>`;
    btn.addEventListener('click', () => {
      selectedWeatherId = condition.id;
      weatherGrid.querySelectorAll('.preset-card').forEach(c => c.classList.toggle('is-active', c === btn));
      updateBuilderRace();
    });
    weatherGrid.appendChild(btn);
  });
  weatherGrid.firstElementChild.classList.add('is-active');
  
   window.TEAMS.forEach((team, i) => {
    const optionA = document.createElement('option');
    optionA.value = i;
    optionA.textContent = team.name;
    teamAEl.appendChild(optionA);

    const optionB = document.createElement('option');
    optionB.value = i;
    optionB.textContent = team.name;
    teamBEl.appendChild(optionB);
  });
  teamAEl.value = 2; // Mercedes
  teamBEl.value = 0; // Red Bull

  window.CIRCUIT_PRESETS.forEach(preset => {
    const option = document.createElement('option');
    option.value = preset.id;
    option.textContent = preset.label;
    circuitSelect.appendChild(option);
  });

circuitSelect.addEventListener('change', updateBuilderRace);

  function updateBuilderRace() {
    const preset = window.CIRCUIT_PRESETS.find(p => p.id === circuitSelect.value) || window.CIRCUIT_PRESETS[0];
    const selectedCompound = window.TYRE_COMPOUNDS.find(c => c.id === selectedTyreId);
    const selectedWeather = window.WEATHER_CONDITIONS.find(w => w.id === selectedWeatherId);
    const raceLaps = preset.defaultLaps;
    const initialGap = parseFloat(initialGapInput.value);
    const rivalPitLap = Math.min(parseInt(rivalPitLapInput.value, 10), raceLaps - 3);

    raceLapsOut.textContent = raceLaps;
    initialGapOut.textContent = initialGap.toFixed(1);
    rivalPitLapOut.textContent = rivalPitLap;

    const teamA = window.TEAMS[parseInt(teamAEl.value, 10)];
    const teamB = window.TEAMS[parseInt(teamBEl.value, 10)];

    const race = {
      raceLaps,
      pitLoss: preset.pitLoss,
      degPerLap: selectedCompound.degPerLap * selectedWeather.multiplier,
      paceOffset: selectedCompound.paceOffset,
      initialGap,
      rivalPitLap,
      trafficZones: [],
      carA: { name: teamA.name, color: teamA.color },
      carB: { name: teamB.name, color: teamB.color }
    };

    builderPanel.setRace(race);
  }

  [teamAEl, teamBEl,initialGapInput, rivalPitLapInput ].forEach(el => {
    el.addEventListener('input', updateBuilderRace);
  });

  updateBuilderRace();

  /* ============================================================
     Tab 2: Famous undercuts
  ============================================================= */
  const famousPanel = window.createSimPanel(document.getElementById('sim-famous'));
  const raceSelect = document.getElementById('raceSelect');
  const raceNote = document.getElementById('raceNote');

  window.FAMOUS_RACES.forEach(race => {
    const option = document.createElement('option');
    option.value = race.id;
    option.textContent = `${race.label} — ${race.circuit}`;
    raceSelect.appendChild(option);
  });

  function setFamousRace(raceId) {
    const race = window.FAMOUS_RACES.find(r => r.id === raceId) || window.FAMOUS_RACES[0];
    raceNote.textContent = race.note;
    famousPanel.setRace(race);
  }

  raceSelect.addEventListener('change', e => setFamousRace(e.target.value));
  setFamousRace(window.FAMOUS_RACES[0].id);
})();
