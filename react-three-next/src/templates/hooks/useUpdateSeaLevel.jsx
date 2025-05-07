import { useEffect } from 'react';
import useScrollStore from '@/stores/scrollStore';
import useScenarioStore from '@/stores/scenarioStore';
import scenarioData from '@/data/sea-level-recife-nested.json';

function useUpdateSeaLevelOnScenarioChange() {
  const { setSeaLevelByScenario } = useScrollStore((state) => state);
  const scenario = useScenarioStore((state) => state.scenario);
  const year = useScrollStore((state) => state.year);

  useEffect(() => {
    if (scenario && year) {
      const seaLevelForScenario = getSeaLevelFromScenario(scenario, year);
      setSeaLevelByScenario(scenario, seaLevelForScenario);
    }
  }, [scenario, year, setSeaLevelByScenario]);
}


function getSeaLevelFromScenario(scenario, year) {
  const scenarioInfo = scenarioData.scenarios[scenario];
  if (!scenarioInfo) return 0;

  if (year === 2020) return 0.0;

  const quantiles = scenarioInfo.confidence.medium.quantiles['50'].data;

  for (let i = 0; i < quantiles.length - 1; i++) {
    const a = quantiles[i];
    const b = quantiles[i + 1];
    if (year >= a.year && year <= b.year) {
      const t = (year - a.year) / (b.year - a.year);
      const interpolated = a.value + t * (b.value - a.value);
      return interpolated;
    }
  }

  if (year < quantiles[0].year) return quantiles[0].value;
  if (year > quantiles[quantiles.length - 1].year) return quantiles[quantiles.length - 1].value;

  return 0;
}


export default useUpdateSeaLevelOnScenarioChange;
