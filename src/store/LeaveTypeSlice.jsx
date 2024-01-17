import { createSlice } from "@reduxjs/toolkit";

const initialState = { leaveTypes: null };

const leaveTypeSlice = createSlice({
  name: "leaveTypeSlice",
  initialState,
  reducers: {
    setLeaveTypes: (state, action) => {
      state.leaveTypes = action.payload;
    },
  },
});

export const { setLeaveTypes } = leaveTypeSlice.actions;
export default leaveTypeSlice.reducer;
