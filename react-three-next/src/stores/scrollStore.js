import { create } from 'zustand'

const useScrollStore = create((set) => ({
  progress: 0,
  year: 2020,
  seaLevel: 0,
  targetSeaLevel: 0,

  setScrollState: (newState) => set(newState),
  setTargetSeaLevel: (value) => set({ targetSeaLevel: value }),
}))

export default useScrollStore
