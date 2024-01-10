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

// export const updateEmpPassword = (updatedEmpPassword) => async (dispatch) => {
//   try {
//     const response = await fetch(
//       `http://localhost:8081/updatedEmpPassword/${updatedEmpPassword.empid}`,
//       {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(updatedEmpPassword),
//       }
//     );

//     if (response.ok) {
//       const responseData = await response.json();
//       const user = responseData.user.find(
//         (item) => item.user_id === updatedEmpPassword.empid
//       );

//       dispatch(setUser(user));
//       dispatch(setEmployees(responseData.employees));
//     } else {
//       console.error("Failed to  update EmpPassword");
//     }
//   } catch (error) {
//     console.error("Error updating EmpPassword", error);
//   }
// };

export default userReducer.reducer;
export const { setUser, setAllUser, setLoggedIn } = userReducer.actions;
