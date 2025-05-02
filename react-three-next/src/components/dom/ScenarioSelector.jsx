'use client'

import useScenarioStore from '@/stores/scenarioStore';
import { scenarios } from '@/stores/scenarioStore';
import { useState } from 'react';

export default function ScenarioSelector() {
  const { scenario, metadata, setScenario } = useScenarioStore();
  const [hoveredKey, setHoveredKey] = useState(null);

  return (
    <div className="group fixed left-6 top-6 z-50 flex flex-col gap-2">
      <div className="flex gap-3">
        {Object.entries(scenarios).map(([key, config]) => (
          <button
            key={key}
            onClick={() => setScenario(key)}
            className={`text-4xl transition duration-200 ${scenario === key ? 'scale-110 text-white' : 'text-cyan-300'
              }`}
          >
            {config.icon}
          </button>
        ))}
      </div>
    </div>
  );
}
