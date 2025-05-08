import { create } from 'zustand'
import useScrollStore from './scrollStore'

export const scenarios = {
  ssp119: {
    description: "SSP119 - Fading Light",
    info: "Global net-zero by 2050. Cooperation reshapes the century. Emissions peak early, and the seas begin to still — though heat lingers, and the reefs remember.",
    icon: "𓆞"
  },
  ssp245: {
    description: "SSP245 - Currents Drift",
    info: "Policies hold back the flood, but not enough. Warming nears 2.5°C. The shoreline creeps inland, slowly.",
    icon: "𓆟"
  },
  ssp370: {
    description: "SSP370 - Uncharted Depths",
    info: "Emissions double by 2100, leading to >3.5°C warming. Ice sheets destabilize, feedback loops accelerate. The tide rises not just in meters, but in uncertainty.",
    icon: "𓆝"
  },
}

const useScenarioStore = create((set) => ({
  scenario: 'ssp245',
  metadata: scenarios.ssp245,
  setScenario: (scenario) => {
    set({
      scenario,
      metadata: scenarios[scenario]
    });
  }
}));

export default useScenarioStore
