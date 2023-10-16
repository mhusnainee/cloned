import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({

  name: "auth",
  initialState: {
    isLoggedIn: false,
    userType: "",
    user: {},
  }, 

  reducers: {
    saveUser: (state, action) => {
      state.user = action.payload;
    },

    set_userType: (state, action) => {
      state.userType = action.payload; 
    },
    
    set_islogged_in: (state) => {
      state.isLoggedIn = !state.isLoggedIn;
    },
  },
});

export const { set_islogged_in, saveUser, set_userType } = authSlice.actions;

export const authSelecter = (state) => state.auth;

export default authSlice.reducer;
