import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from 'axios';



// פעולה אסינכרונית לשליפת קבוצות המבחנים
export const fetchTestGroups = createAsyncThunk(
  "testGroups/fetchTestGroups",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://localhost:7245/api/User/${userId}/test-groups`);
      return response.data;
    } catch (error) {
      console.error("Error fetching test groups:", error);
      return rejectWithValue(error.response?.data || "Failed to fetch test groups");
    }
  }
);



const testGroupsSlice = createSlice({
  name: "testGroups",
  initialState:{
    testGroups: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTestGroups.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTestGroups.fulfilled, (state, action) => {
        state.isLoading = false;
        state.testGroups = action.payload;
      })
      .addCase(fetchTestGroups.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default testGroupsSlice.reducer;
