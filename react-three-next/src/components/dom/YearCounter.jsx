import useScrollStore from '@/stores/scrollStore';
import useScenarioStore from '@/stores/scenarioStore';

export default function YearCounter() {
  const year = useScrollStore((state) => state.year);
  const scenario = useScenarioStore((state) => state.scenario);
  const seaLevel = useScrollStore((state) => state.seaLevelByScenario[scenario] ?? 0);

  return (
    <div className="text-sm text-cyan-200">
      Year: <span className="text-white">{Math.round(year)}</span> |
      Rise: <span className="text-white">{seaLevel.toFixed(2)}m</span>
    </div>
  );
}
