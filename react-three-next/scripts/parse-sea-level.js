const fs = require('fs');

// Load original JSON
const rawData = JSON.parse(fs.readFileSync('./public/data/raw-sea-level.json'));

const nestedData = {
  scenarios: {}
};

// Group by scenario -> confidence -> quantile
rawData.forEach(item => {
  const scenario = item.scenario.toLowerCase(); // e.g., "ssp245"
  const confidence = item.confidence.toLowerCase(); // "medium" or "low"
  const quantile = item.quantile.toString(); // "5", "17", "50", etc.

  // Initialize scenario if missing
  if (!nestedData.scenarios[scenario]) {
    nestedData.scenarios[scenario] = {
      label: `SSP${scenario.replace('ssp', '')} (${getScenarioLabel(scenario)})`,
      confidence: {}
    };
  }

  // Initialize confidence level
  if (!nestedData.scenarios[scenario].confidence[confidence]) {
    nestedData.scenarios[scenario].confidence[confidence] = {
      label: `${confidence.charAt(0).toUpperCase() + confidence.slice(1)} Confidence`,
      quantiles: {}
    };
  }

  // Add quantile data
  nestedData.scenarios[scenario].confidence[confidence].quantiles[quantile] = {
    label: getQuantileLabel(quantile),
    data: Object.keys(item)
      .filter(key => key.match(/^\d{4}$/)) // Extract year keys (2020, 2030...)
      .map(year => ({
        year: parseInt(year),
        value: parseFloat(item[year].replace(',', '.')) // Convert "0,05" → 0.05
      }))
  };
});

// Helper: Map quantile numbers to labels
function getQuantileLabel(q) {
  const labels = {
    '5': '5th Percentile (Very Likely Range)',
    '17': '17th Percentile (Likely Range)',
    '50': 'Median (Central Estimate)',
    '83': '83rd Percentile (Likely Range)',
    '95': '95th Percentile (Very Likely Range)'
  };
  return labels[q] || `Quantile ${q}`;
}

// Helper: Scenario labels (customize as needed)
function getScenarioLabel(scenario) {
  const labels = {
    ssp119: 'Low Emissions',
    ssp245: 'Medium Emissions',
    ssp585: 'High Emissions'
  };
  return labels[scenario] || scenario;
}

// Save nested data
fs.writeFileSync('./public/data/sea-level-recife-nested.json', JSON.stringify(nestedData, null, 2));
