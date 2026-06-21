/**
 * chartRender.js
 * ------------------------------------------------------------
 * Turns a gap series into the live line chart. Kept separate from
 * strategy.js (the math) and simPanel.js (the wiring) so each file
 * has exactly one job.
 *
 * This used to be two separate datasets (one for "behind", one for
 * "ahead") so the color could flip at the crossover point. The
 * problem: Chart.js never draws a line connecting two different
 * datasets, so every single crossover left a one-lap gap with
 * nothing drawn at all. Fixed by using ONE dataset and Chart.js's
 * per-segment color callback instead, which colors each tiny
 * segment of the same continuous line based on its endpoints. No
 * second dataset, no gap.
 */

const chartInstances = new Map();

function renderGapChart(canvas, race, result) {
  const labels = result.series.map(p => p.lap);
  const gapData = result.series.map(p => p.gap);
  const zeroLine = labels.map(() => 0);

  if (chartInstances.has(canvas)) {
    chartInstances.get(canvas).destroy();
  }

  const chart = new Chart(canvas, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'gap',
          data: gapData,
          borderWidth: 2.5,
          pointRadius: 0,
          tension: 0.15,
          segment: {
            borderColor: (ctx) => {
                const y0 = ctx.p0.parsed.y;
                const y1 = ctx.p1.parsed.y;
                return (y0 < 0 || y1 < 0) ? race.carB.color : race.carA.color;
    	    }
        }
        },
        {
          label: 'Level',
          data: zeroLine,
          borderColor: '#3A4252',
          borderWidth: 1,
          borderDash: [4, 4],
          pointRadius: 0,
          tension: 0
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 220 },
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#131820',
          borderColor: '#1F2733',
          borderWidth: 1,
          titleColor: '#E8ECF1',
          bodyColor: '#E8ECF1',
          titleFont: { family: "'JetBrains Mono', monospace", size: 12 },
          bodyFont: { family: "'JetBrains Mono', monospace", size: 12 },
          filter: (item) => item.datasetIndex === 0,
          callbacks: {
            title: (items) => `Lap ${items[0].label}`,
            label: (item) => {
              const g = item.raw;
              return g >= 0
                ? `${race.carB.name} trails by ${g.toFixed(2)}s`
                : `${race.carB.name} leads by ${Math.abs(g).toFixed(2)}s`;
            }
          }
        }
      },
      scales: {
        x: {
          title: { display: true, text: 'LAP', color: '#6B7685', font: { family: "'JetBrains Mono', monospace", size: 11 } },
          grid: { color: '#1F2733' },
          ticks: { color: '#6B7685', font: { family: "'JetBrains Mono', monospace", size: 10 }, maxTicksLimit: 10 }
        },
        y: {
          title: { display: true, text: 'GAP (s)', color: '#6B7685', font: { family: "'JetBrains Mono', monospace", size: 11 } },
          grid: { color: '#1F2733' },
          ticks: { color: '#6B7685', font: { family: "'JetBrains Mono', monospace", size: 10 } }
        }
      }
    }
  });

  chartInstances.set(canvas, chart);
  return chart;
}

window.F1Chart = { renderGapChart };
