import useScenarioStore from '@/stores/scenarioStore';

export default function ScenarioSelector() {
  const { scenario, setScenario } = useScenarioStore();

  return (
    <div className="glitch fixed bottom-4 left-4 font-mono text-xl text-green-500">
      <select value={scenario} onChange={(e) => setScenario(e.target.value)}>
        <option value="ssp119">SSP119 - Optimistic</option>
        <option value="ssp245">SSP245 - Middle</option>
        <option value="ssp370">SSP370 - Pessimistic</option>
      </select>
    </div>
  );
}
