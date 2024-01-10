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

// export const updateEmployee = (updatedEmployee) => async (dispatch) => {
//   try {
//     const response = await fetch(
//       `http://localhost:8081/updateemployee/${updatedEmployee.userid}`,
//       {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(updatedEmployee),
//       }
//     );

//     if (response.ok) {
//       const responseData = await response.json();
//       dispatch(setEmployees(responseData.employees)); // Assuming the response contains the updated department
//     } else {
//       console.error("Failed to update employee");
//     }
//   } catch (error) {
//     console.error("Error updating employee", error);
//   }
// };

// export const deleteEmployee = (deleteEmployee_id) => async (dispatch) => {
//   try {
//     const response = await fetch(
//       `http://localhost:8081/deleteemployee/${deleteEmployee_id}`,
//       {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     if (response.ok) {
//       const responseData = await response.json();
//       dispatch(setEmployees(responseData.employees));
//     } else {
//       console.error("Failed to update employee");
//     }
//   } catch (error) {
//     console.error("Error updating employee", error);
//   }
// };

export const { setEmployees } = employeeSlice.actions;
export default employeeSlice.reducer;
