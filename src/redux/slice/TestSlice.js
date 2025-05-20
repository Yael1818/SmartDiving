import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// אקשן אסינכרוני שמבצע קריאה ל-API להוספת מבחן
export const UserAddTest = createAsyncThunk(
  'test/UserAddTest',
  async ({ userId, subject }, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://localhost:7245/api/User/${userId}/addTest?subject=${encodeURIComponent(subject)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
       
        const error = await response.text();
        return rejectWithValue(error);
      }
      alert("המבחן נוסף בהצלחה")
      const data = await response.text();
      return data;  // החזרת המידע המתקבל
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const addTestToStudent = createAsyncThunk(
    'test/addTestToStudent', 
    async ({ studentId, testId }, thunkAPI) => {
      try {
        const response = await fetch(`https://localhost:7245/api/Student/${studentId}/addTest/${testId}`, {
          method: 'POST',
        });
  
        if (response.ok) {
       
          return { studentId, testId }; // הצלחה
        } else {
          return thunkAPI.rejectWithValue('Failed to add test to student');
        }
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );
  export const fetchTestsByUserId = createAsyncThunk(
    'test/fetchTestsByUserId',
    async (userId, thunkAPI) => {
      try {
        const response = await fetch(`https://localhost:7245/api/Test/getByuser/${userId}`);
        if (!response.ok) {
          return thunkAPI.rejectWithValue('No tests found');
        }
        const data = await response.json();
        return data;  // מחזירים את המבחנים שהתקבלו
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );

// יצירת ה-slice
const TestSlice = createSlice({
  name: 'test',
  initialState: {
    isLoading: false,
    error: null,
    message: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(UserAddTest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(UserAddTest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(UserAddTest.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addTestToStudent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addTestToStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        // עדכון המצב (אפשר להוסיף את המבחן לרשימה או כל פעולה אחרת שצריך)
        state.tests.$values.push(action.payload);
      })
      .addCase(addTestToStudent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to add test';
      })
      .addCase(fetchTestsByUserId.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTestsByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tests = action.payload;  // עדכון המבחנים במצב
      })
      .addCase(fetchTestsByUserId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to fetch tests';
      });
  },
});
export default TestSlice.reducer;
