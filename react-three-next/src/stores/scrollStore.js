import { create } from 'zustand';

const useScrollStore = create((set, get) => ({
  progress: 0,
  year: 2020,
  seaLevel: 0,
  targetSeaLevel: 0,
  seaLevelByScenario: {},

  setScrollState: (newState) => set(newState),
  setTargetSeaLevel: (value) => set({ targetSeaLevel: value }),

  updateSeaLevel: () => {
    const { seaLevel, targetSeaLevel } = get();
    const lerped = seaLevel + (targetSeaLevel - seaLevel) * 0.05;
    if (Math.abs(lerped - targetSeaLevel) < 0.001) {
      set({ seaLevel: targetSeaLevel });
    } else {
      set({ seaLevel: lerped });
    }
  },

  setSeaLevelByScenario: (scenario, seaLevel) => {
    set((state) => ({
      seaLevelByScenario: {
        ...state.seaLevelByScenario,
        [scenario]: seaLevel,
      },
    }));
  },
}));

export default useScrollStore;
