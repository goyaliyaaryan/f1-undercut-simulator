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
  const presetGrid = document.getElementById('presetGrid');
  const raceLapsInput = document.getElementById('raceLapsInput');
  const raceLapsOut = document.getElementById('raceLapsOut');
  const initialGapInput = document.getElementById('initialGapInput');
  const initialGapOut = document.getElementById('initialGapOut');
  const rivalPitLapInput = document.getElementById('rivalPitLapInput');
  const rivalPitLapOut = document.getElementById('rivalPitLapOut');
  const tyreCompoundEl = document.getElementById('tyreCompound');



window.TYRE_COMPOUNDS.forEach(compound => {
  const option = document.createElement('option');
  option.value = compound.id;
  option.textContent = compound.label;
  tyreCompoundEl.appendChild(option);
});
  
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

  let activePresetId = window.CIRCUIT_PRESETS[0].id;

  window.CIRCUIT_PRESETS.forEach(preset => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'preset-card';
    card.dataset.presetId = preset.id;
    card.innerHTML = `<p class="preset-card__label">${preset.label}</p><p class="preset-card__blurb">${preset.blurb}</p>`;
    card.addEventListener('click', () => {
      activePresetId = preset.id;
      presetGrid.querySelectorAll('.preset-card').forEach(c => c.classList.toggle('is-active', c === card));
      updateBuilderRace();
    });
    presetGrid.appendChild(card);
  });
  presetGrid.firstElementChild.classList.add('is-active');

  function updateBuilderRace() {
    const preset = window.CIRCUIT_PRESETS.find(p => p.id === activePresetId);
    const selectedCompound = window.TYRE_COMPOUNDS.find(c => c.id === tyreCompoundEl.value);
    const raceLaps = parseInt(raceLapsInput.value, 10);
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
      degPerLap: selectedCompound.degPerLap,
      initialGap,
      rivalPitLap,
      trafficZones: [],
      carA: { name: teamA.name, color: teamA.color },
      carB: { name: teamB.name, color: teamB.color }
    };

    builderPanel.setRace(race);
  }

  [teamAEl, teamBEl, raceLapsInput, initialGapInput, rivalPitLapInput, tyreCompoundEl].forEach(el => {
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
