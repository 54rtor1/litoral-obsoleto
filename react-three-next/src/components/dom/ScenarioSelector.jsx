import useScenarioStore from '@/stores/scenarioStore';
import { scenarios } from '@/stores/scenarioStore';

export default function ScenarioSelector() {
  const { scenario, metadata, setScenario } = useScenarioStore();

  return (
    <div className="fixed left-4 top-4 space-y-2">
      <div className="flex gap-3">
        {Object.entries(scenarios).map(([key, config]) => (
          <button
            key={key}
            onClick={() => setScenario(key)}
            className='text-cyan-300/80'
          >
            <span className="text-xl">
              {config.icon}
            </span>
          </button>
        ))}
      </div>

      <div className="max-w-xs text-cyan-300/80">
        <h3 className="mb-1 font-serif text-lg">{metadata.title}</h3>
        <p className="text-sm italic opacity-80">{metadata.description}</p>
        <p className="text-sm opacity-100">{metadata.info}</p>

      </div>
    </div >
  );
}
