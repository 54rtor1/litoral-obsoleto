'use client'

import useScenarioStore from '@/stores/scenarioStore';
import { scenarios } from '@/stores/scenarioStore';
import { useState } from 'react';

export default function ScenarioSelector() {
  const { scenario, metadata, setScenario } = useScenarioStore();
  const [hoveredKey, setHoveredKey] = useState(null);

  return (
    <div className="fixed left-12 top-12 z-50 space-y-3">
      <div className="flex gap-4">
        {Object.entries(scenarios).map(([key, config]) => (
          <div
            key={key}
            className="group relative"
            onMouseEnter={() => setHoveredKey(key)}
            onMouseLeave={() => setHoveredKey(null)}
          >
            <button
              onClick={() => setScenario(key)}
              className={`text-cyan-300/90 transition-transform duration-200 ${scenario === key ? 'scale-110' : 'scale-100'
                }`}
            >
              <span className="text-5xl">{config.icon}</span>
            </button>
          </div>
        ))}
      </div>

      <div className="space-y-1 text-cyan-300/80">
        <p className="text-sm opacity-80">{metadata.description}</p>
        <p className="text-sm opacity-100">{metadata.info}</p>
      </div>
    </div>
  );
}
