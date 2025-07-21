import { create } from "zustand";

const useNotifsStore = create((set) => ({
  headerHeight: 0,
  setHeaderHeight: (newHeaderHeight) => set({ headerHeight: newHeaderHeight }),
  footerHeight: 0,
  setFooterHeight: (newFooterHeight) => set({ footerHeight: newFooterHeight }),
}));

export default useNotifsStore;
