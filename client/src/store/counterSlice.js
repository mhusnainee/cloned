import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  
  name: "counter",
  initialState: {
    value: 0,
    counter_name: "My Counter",
  },

  reducers: {
    incremented: (state) => {
      state.value += 1;
    },
    decremented: (state) => {
      state.value -= 1;
    },
    resetCounter: (state) => {
      state.value = 0;
    },
    setCountereName: (state, action) => {
      state.counter_name = action.payload;
    },
  },
});

export const { incremented, decremented, resetCounter } = counterSlice.actions;

export const selectCount = (state) => state.counter;
export default counterSlice.reducer;
