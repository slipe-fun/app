import { create } from "zustand";

const useNavigationStore = create((set) => ({
  bottomOffset: 0,
  setBottomOffset: (newBottomOffset) => set({ bottomOffset: newBottomOffset }),
}));

export default useNavigationStore;
