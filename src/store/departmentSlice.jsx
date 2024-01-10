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

// export const updateDepartment = (updatedDepartment) => async (dispatch) => {
//   try {
//     const response = await fetch(
//       `http://localhost:8081/updatedepartment/${updatedDepartment.id}`,
//       {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(updatedDepartment),
//       }
//     );

//     if (response.ok) {
//       const responseData = await response.json();
//       dispatch(setDepartments(responseData.department)); // Assuming the response contains the updated department
//     } else {
//       console.error("Failed to update department");
//     }
//   } catch (error) {
//     console.error("Error updating department", error);
//   }
// };

// export const deleteDepartment = (deleteDepartment_id) => async (dispatch) => {
//   try {
//     const response = await fetch(
//       `http://localhost:8081/deletedepartment/${deleteDepartment_id}`,
//       {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     if (response.ok) {
//       const responseData = await response.json();
//       dispatch(setDepartments(responseData.department)); // Assuming the response contains the updated department
//     } else {
//       console.error("Failed to update department");
//     }
//   } catch (error) {
//     console.error("Error updating department", error);
//   }
// };

export const { setDepartments } = departmentSlice.actions;
export default departmentSlice.reducer;
