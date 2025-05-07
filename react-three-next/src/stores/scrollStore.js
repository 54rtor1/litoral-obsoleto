import { create } from 'zustand';

const useScrollStore = create((set, get) => ({
  progress: 0,
  year: 2020,
  seaLevel: 0,
  targetSeaLevel: 0,
  seaLevelByScenario: {},
  isTransitioning: false,
  transitionStartValue: 0,
  transitionDuration: 1.0,
  transitionStartTime: 0,

  setScrollState: (newState) => set(newState),
  setTargetSeaLevel: (value) => set({ targetSeaLevel: value }),

  startTransition: (newTarget) => {
    const currentTime = performance.now() / 1000;
    set({
      isTransitioning: true,
      transitionStartValue: get().seaLevel,
      transitionStartTime: currentTime,
      targetSeaLevel: newTarget
    });
  },

  updateSeaLevel: () => {
    const {
      seaLevel,
      targetSeaLevel,
      isTransitioning,
      transitionStartValue,
      transitionStartTime,
      transitionDuration
    } = get();

    const currentTime = performance.now() / 1000;

    if (isTransitioning) {
      const elapsed = currentTime - transitionStartTime;
      const progress = Math.min(elapsed / transitionDuration, 1.0);

      const smoothProgress = progress * progress * (3 - 2 * progress);
      const newSeaLevel = transitionStartValue +
        (targetSeaLevel - transitionStartValue) * smoothProgress;

      set({ seaLevel: newSeaLevel });

      if (progress >= 1.0) {
        set({ isTransitioning: false });
      }
    } else {
      const lerped = seaLevel + (targetSeaLevel - seaLevel) * 0.1;
      if (Math.abs(lerped - targetSeaLevel) < 0.001) {
        set({ seaLevel: targetSeaLevel });
      } else {
        set({ seaLevel: lerped });
      }
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
