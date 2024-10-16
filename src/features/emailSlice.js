"use client";
import { createSlice } from "@reduxjs/toolkit";

const emailSlice = createSlice({
  name: "email",
  initialState: {
   
    status: "idle",
  },
  reducers: {
  }
});

export const {
 
} = emailSlice.actions;



export default emailSlice.reducer;
