import { configureStore } from '@reduxjs/toolkit';
import publishReducer from "./reducers/publishScreen"

const store = configureStore({
  reducer: {
    publish: publishReducer,
  },
});

export default store;