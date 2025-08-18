import { create } from 'zustand'
import { categories } from '@constants/categories'

const useCaptureStore = create((set) => ({
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
  category: categories[0],
  setCategory: (newCategory) => set({ category: newCategory }),
  postName: '',
  setPostName: (newPostName) => set({ postName: newPostName }),
}))

export default useCaptureStore