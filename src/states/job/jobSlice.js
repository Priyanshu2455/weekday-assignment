// src/features/jobSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const jobSlice = createSlice({
  name: 'jobs',
  initialState: {
    data: [],
  },
  reducers: {
    appendJobs: (state, action) => {
      state.data.push(...action.payload);
    },
  },
});

export const { appendJobs } = jobSlice.actions;

export default jobSlice.reducer;
