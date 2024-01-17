import { createSlice } from "@reduxjs/toolkit";

const initialState = { leaves: null };

const totalLeaveSlice = createSlice({
  name: "totalLeaveSlice",
  initialState,
  reducers: {
    setLeaves: (state, action) => {
      // console.log('leavetypesaction',action.payload)
      state.leaves = action.payload;
      // console.log('leavetypes', state.leaves);
    },
  },
});


export const { setLeaves } = totalLeaveSlice.actions;
export default totalLeaveSlice.reducer;
