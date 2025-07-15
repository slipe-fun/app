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
  content: '',
  setContent: (newContent) => set({ content: newContent }),
  category: 'food',
  setCategory: (newCategory) => set({ category: newCategory }),
  postName: '',
  setPostName: (newPostName) => set({ postName: newPostName }),
}))

export default useCaptureStore