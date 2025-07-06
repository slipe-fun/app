import { create } from 'zustand'

const useCaptureStore = create((set) => ({
  color: '#000000',
  setColor: (newColor) => set({ color: newColor }), 
  format: 'photo',
  setFormat: (newFormat) => set({ format: newFormat }),
  facing: 'back',
  setFacing: (newFacing) => set({ facing: newFacing }),
  aspect: '16:9',
  setAspect: (newAspect) => set({ aspect: newAspect }),
}))

export default useCaptureStore