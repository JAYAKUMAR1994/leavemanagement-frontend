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

// export const updateLeaveType = (updatedLeaveType) => async (dispatch) => {
//   try {
//     const response = await fetch(
//       `http://localhost:8081/updateleavetype/${updatedLeaveType.id}`,
//       {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(updatedLeaveType),
//       }
//     );

//     if (response.ok) {
//       const responseData = await response.json();
//       dispatch(setLeaveTypes(responseData.leavetypes));
//     } else {
//       console.error("Failed to update leavetype");
//     }
//   } catch (error) {
//     console.error("Error updating leavetype", error);
//   }
// };

// export const deleteLeavetype = (deleteLeaveType_id) => async (dispatch) => {
//   try {
//     const response = await fetch(
//       `http://localhost:8081/deleteleavetype/${deleteLeaveType_id}`,
//       {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     if (response.ok) {
//       const responseData = await response.json();
//       dispatch(setLeaveTypes(responseData.leavetypes)); // Assuming the response contains the updated department
//     } else {
//       console.error("Failed to delete leavetype");
//     }
//   } catch (error) {
//     console.error("Error delete leavetype", error);
//   }
// };

export const { setLeaveTypes } = leaveTypeSlice.actions;
export default leaveTypeSlice.reducer;
