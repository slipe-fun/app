import { createSlice } from "@reduxjs/toolkit";

const initialState = { image: "" };

const publishScreen = createSlice({
	name: "publish",
	initialState,
	reducers: {
		updateCameraState: (state, action) => {
			return { ...state, ...action.payload };
		},
	},
});

export const { updateCameraState } = publishScreen.actions;
export default publishScreen.reducer;

export const selectImage = state => state.publish.image;