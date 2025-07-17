import { create } from "zustand";

const useSearchStore = create((set) => ({
    query: '',
    setQuery: (newQuery) => set({ query: newQuery }),
    type: 'posts',
    setType: (newType) => set({ type: newType }),
    isFocused: false,
    setIsFocused: (newIsFocused) => set({ isFocused: newIsFocused }),
    isSearch: false,
    setIsSearch: (newIsSearch) => set({ isSearch: newIsSearch }),
    headerHeight: 0,
    setHeaderHeight: (newHeaderHeight) => set({ headerHeight: newHeaderHeight })
}))

export default useSearchStore
