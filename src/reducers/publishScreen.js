import { createSlice } from "@reduxjs/toolkit";

const initialState = { enableTorch: false, mute: false };

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

export const selectEnableTorch = state => state.publish.enableTorch;
export const selectMute = state => state.publish.mute;
