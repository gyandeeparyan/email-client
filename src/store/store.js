"use client"
import { configureStore } from "@reduxjs/toolkit";
import emailSlice from "@/features/emailSlice";

export const store = configureStore({
  reducer: {
    email: emailSlice,
  },
});

export default store;
