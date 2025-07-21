import { create } from "zustand";

const useNotifsStore = create((set) => ({
  headerHeight: 0,
  setHeaderHeight: (newHeaderHeight) => set({ headerHeight: newHeaderHeight }),
}));

export default useNotifsStore;
