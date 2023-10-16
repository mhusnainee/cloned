import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
  name: "loading",
  initialState: { value: false },
  reducers: {
    set: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { set } = loadingSlice.actions;
export const selectLoading = (state) => state.loading;
export const getLoading = (state) => state.loading.value;

export default loadingSlice.reducer;
