import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await axios.get("https://fakestoreapi.com/products");
  return response.data;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    status: "",
    username: "umair",
    userType: "admin",
  },
  reducers: {
    set: (state, action) => {
      state.username = action.payload;
    },
    reset: (state) => {
      state.value = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state, action) => {
        state.status = "loading";
       
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        const newEntities = {};
        state.entities = newEntities;
        state.status = "idle";
      });
  },
});

export const { set, reset } = userSlice.actions;
export const selectUser = (state) => state.user;
export const getStateStatus = (state) => state.user.status;

export default userSlice.reducer;
