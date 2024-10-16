"use client"
import { configureStore } from "@reduxjs/toolkit";
import emailSlice from "@/features/emailSlice";

export const store = configureStore({
  reducer: {
    data: emailSlice,
  },
});

export default store;
