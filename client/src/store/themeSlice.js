import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    value: localStorage.getItem("theme") === "true",
  },
  reducers: {
    set: (state) => {
      localStorage.setItem("theme", String(!state.value));
      state.value = !state.value;
    },
  },
});

export const { set } = themeSlice.actions;
export const selectTheme = (state) => state.theme;
export const getTheme = (state) => state.theme.value;

export default themeSlice.reducer;
