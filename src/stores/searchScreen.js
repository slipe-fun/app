import { create } from "zustand";

const useSearchStore = create((set) => ({
    query: '',
    setQuery: (newQuery) => set({ query: newQuery }),
    type: 'post',
    setType: (newType) => set({ type: newType }),
    isFocused: false,
    setIsFocused: (newIsFocused) => set({ isFocused: newIsFocused }),
}))

export default useSearchStore
