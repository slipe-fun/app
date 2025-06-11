import { createSlice } from "@reduxjs/toolkit";

const initialState = { category: "" };

const search = createSlice({
	name: "search",
	initialState,
	reducers: {
		updateCategory: (state, action) => {
			return { ...state, ...action.payload };
		},
	},
});

export const { updateCategory } = search.actions;
export default search.reducer;

export const selectCategory = state => state.search.category;

