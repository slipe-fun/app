import { createSlice } from "@reduxjs/toolkit";

const initialState = { facing: "front" };

const publishScreen = createSlice({
	name: "publish",
	initialState,
	reducers: {
		updateCameraFacing: (state, action) => {
			return { ...state, ...action.payload };
		},
	},
});

export const { updateCameraFacing } = publishScreen.actions;
export default publishScreen.reducer;

export const selectActiveFacing = state => state.publish.facing;
