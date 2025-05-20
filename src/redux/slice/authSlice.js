import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// פעולה אסינכרונית ללוגין
export const loginUser = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://localhost:7245/api/User/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
       
      });

      if (!response.ok) {
        const error = await response.json();  // קבלת השגיאה כ-JSON
        return rejectWithValue(error);  // מחזיר את השגיאה כ-JSON
      }
  
      const data = await response.json();  // קבלת התשובה כ-JSON
      return data;  // מחזיר את ה-JSON
    } catch (error) {
      return rejectWithValue(error.message);  // טיפול בשגיאות
    }
  }
);
export const signUp = createAsyncThunk("auth/signUp", async (userData, { rejectWithValue }) => {
  try {
    const { name, email, password } = userData;
    const url = `https://localhost:7245/api/User/signup?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;

    const response = await fetch(url, {
      method: "POST",
    
    });

    if (!response.ok) {
      const error = await response.json();  // קבלת השגיאה כ-JSON
      return rejectWithValue(error);  // מחזיר את השגיאה כ-JSON
    }

    const data = await response.json();  // קבלת התשובה כ-JSON
    return data;  // מחזיר את ה-JSON
  } catch (error) {
    return rejectWithValue(error.message);  // טיפול בשגיאות
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
         localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});


export default userSlice.reducer;
