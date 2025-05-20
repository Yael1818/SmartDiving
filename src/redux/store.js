import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/authSlice";
import studentSlice from "./slice/studentSlice";
import testReducer from './slice/TestSlice';
import testGroupsReducer from "./slice/testGroupsSlice";


export const store = configureStore({
  reducer: {
    user: userReducer,
    student: studentSlice,
    test: testReducer,
    testGroups: testGroupsReducer,
    
  
  },
});


