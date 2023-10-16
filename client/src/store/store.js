import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import themeReducer from "./themeSlice";
import loadingSlice from "./loadingSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    theme: themeReducer,
    loading: loadingSlice,
  },
});

export default store;
