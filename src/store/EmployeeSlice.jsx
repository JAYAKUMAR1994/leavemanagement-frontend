import { createSlice } from "@reduxjs/toolkit";

const initialState = { employees: null };

const employeeSlice = createSlice({
  name: "employeeSlice",
  initialState,
  reducers: {
    setEmployees: (state, action) => {
      debugger
      // console.log(action.payload)
      state.employees = action.payload;
      // console.log('store', state.departments);
    },
  },
});


export const { setEmployees } = employeeSlice.actions;
export default employeeSlice.reducer;
