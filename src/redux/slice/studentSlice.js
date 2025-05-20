import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
// 1. יצירת פעולה אסינכרונית שמבצעת את הבקשה ל-API
export const addStudent = createAsyncThunk(
  "user/addStudent",
  async ({ userId, name, tz }, { rejectWithValue }) => {
    try {
      if (!userId || !name || !tz) {
        throw new Error("userId, name, and tz are required");
      }
  
      const response = await fetch(`https://localhost:7245/api/User/${userId}/addStudent?name=${encodeURIComponent(name)}&tz=${encodeURIComponent(tz)}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      return await response.text();

     
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const fetchStudentByTz = createAsyncThunk(
    "student/fetchStudentByTz",
    async (tz, { rejectWithValue }) => {
      try {
        const response = await axios.get(`https://localhost:7245/api/Student/byTz/${tz}`);
        return response.data;
      } catch (error) {
        console.error("Error fetching student:", error);
  console.log("Full error response:", error.response);
        return rejectWithValue(error.response?.data || "Failed to fetch student");
      }
    }
  );

// 2. יצירת ה-slice עם reducers ו-extraReducers
const studentSlice = createSlice({
  name: "student",
  initialState: {
    student: null,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addStudent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.student = action.payload;
      })
      .addCase(addStudent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchStudentByTz.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchStudentByTz.fulfilled, (state, action) => {
        state.isLoading = false;
        state.student = action.payload;
      })
      .addCase(fetchStudentByTz.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default studentSlice.reducer;
