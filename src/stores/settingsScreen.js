import { create } from "zustand";

export const useSettingsStore = create(set => ({
	headerHeight: 0,
	setHeaderHeight: newHeaderHeight => set({ headerHeight: newHeaderHeight }),
	title: "mainTitle",
	setTitle: newTitle => set({ title: newTitle }),
	scrollY: null,
	setScrollY: newScrollY => set({ scrollY: newScrollY })
}));
