import { createSlice } from "@reduxjs/toolkit";

const initialState = { departments: null };

const departmentSlice = createSlice({
  name: "departmentSlice",
  initialState,
  reducers: {
    setDepartments: (state, action) => {
      state.departments = action.payload;
    },
  },
});


export const { setDepartments } = departmentSlice.actions;
export default departmentSlice.reducer;
