import { create } from 'zustand'

const useAuthStore = create((set) => ({
  footerHeight: 0,
  setFooterHeight: (newFooterHeight) => set({ footerHeight: newFooterHeight })
}))

export default useAuthStore