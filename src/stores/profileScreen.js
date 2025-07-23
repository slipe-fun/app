import { create } from "zustand";

export const useProfileStore = create((set) => ({
    user: null,
    setUser: (newUser) => set({ user: newUser }),
}));
