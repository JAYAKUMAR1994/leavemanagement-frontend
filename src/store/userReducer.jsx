import { createSlice } from "@reduxjs/toolkit";
import { setEmployees } from "./EmployeeSlice";

const initialState = { user: null, alluser: null, isLoggedIn: false };

const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    setUser: (state, action) => {
      //  console.log(action.payload.data)
      state.user = action.payload;
    },
    setAllUser: (state, action) => {
      state.alluser = action.payload;
    },
    setLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
});



export default userReducer.reducer;
export const { setUser, setAllUser, setLoggedIn } = userReducer.actions;
