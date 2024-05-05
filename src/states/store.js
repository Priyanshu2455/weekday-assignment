// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import jobReducer from "./job/jobSlice"; // Define your jobSlice

export const store = configureStore({
  reducer: {
    jobs: jobReducer,
  },
});
