import { create } from 'zustand';

const useScenarioStore = create((set) => ({
  scenario: 'ssp245',
  setScenario: (scenario) => set({ scenario }),
}));

export default useScenarioStore;
