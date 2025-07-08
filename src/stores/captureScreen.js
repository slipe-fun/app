import { create } from 'zustand'

const useCaptureStore = create((set) => ({
  color: '#000000',
  setColor: (newColor) => set({ color: newColor }), 
  format: 1,
  setFormat: (newFormat) => set({ format: newFormat }),
  facing: 'back',
  setFacing: (newFacing) => set({ facing: newFacing }),
  aspect: false,
  setAspect: (newAspect) => set({ aspect: newAspect }),
  recording: false,
  setRecording: (newRecording) => set({ recording: newRecording }),
}))

export default useCaptureStore