import { create } from 'zustand';


export const scenarios = {
  ssp119: {
    title: "Fading Light",
    description: "Where promises dissolve like sea foam at dawn.",
    info: "Net-zero by 2050. A world that chose radical cooperation, phasing out fossil fuels, with emissions peaking before 2030. The ocean sighs with relief, but the scars remain.",
    icon: "𓍯"
  },
  ssp245: {
    title: "Currents Drift",
    description: "Following the pull of half-kept vows.",
    info: "Moderate progress. Policies help reduce emissions, but ambition falls short. Warming reaches ~2.5°C by 2100. A familiar coastline slowly transforms, caught between caution and complacency.",
    icon: "𓂃"
  },
  ssp370: {
    title: "Uncharted Depths",
    description: "Where shadows of what could be linger.",
    info: "Business-as-usual. Emissions double by 2100, leading to >3.5°C warming. Ice sheets destabilize, feedback loops accelerate. The tide rises not just in meters, but in uncertainty.",
    icon: "𓍼"
  },
}

const useScenarioStore = create((set) => ({
  scenario: 'ssp245',
  metadata: scenarios.ssp245,
  setScenario: (scenario) => set({
    scenario,
    metadata: scenarios[scenario]
  }),
}));

export default useScenarioStore;
