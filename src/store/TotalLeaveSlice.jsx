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

// export const updateLeave = (updatedLeave) => async (dispatch) => {
//   try {
//     const response = await fetch(
//       `http://localhost:8081/updateleave/${updatedLeave.leave_id}`,
//       {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(updatedLeave),
//       }
//     );

//     if (response.ok) {
//       const responseData = await response.json();
//       dispatch(setLeaves(responseData.leaves));
//     } else {
//       console.error("Failed to update leave");
//     }
//   } catch (error) {
//     console.error("Error updating leave", error);
//   }
// };

// export const deleteLeaves = (deleteLeave_id) => async (dispatch) => {
//   try {
//     const response = await fetch(
//       `http://localhost:8081/deleteleave/${deleteLeave_id}`,
//       {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     if (response.ok) {
//       const responseData = await response.json();
//       dispatch(setLeaves(responseData.leaves)); // Assuming the response contains the updated department
//     } else {
//       console.error("Failed to delete leave");
//     }
//   } catch (error) {
//     console.error("Error delete leave", error);
//   }
// };

// export const applyForLeave = (LeaveData) => async (dispatch) => {
//   try {
//     const response = await fetch("http://localhost:8081/submitLeave", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(LeaveData),
//     });

//     if (response.ok) {
//       const responseData = await response.json();

//       dispatch(setLeaves(responseData.leaves));
//     } else {
//       console.error("Failed to applyForLeave");
//     }
//   } catch (error) {
//     console.error("Error applyForLeave", error);
//   }
// };

// export const adminLeaveStatus = (leaveStatus) => async (dispatch) => {
//   try {
//     const response = await fetch(
//       `http://localhost:8081/leave/status/${leaveStatus.leave_id}`,
//       {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(leaveStatus),
//       }
//     );

//     if (response.ok) {
//       const responseData = await response.json();
//       dispatch(setLeaves(responseData.leaves));
//     } else {
//       console.error("Failed to update leaveStatus");
//     }
//   } catch (error) {
//     console.error("Error updating leaveStatus", error);
//   }
// };

export const { setLeaves } = totalLeaveSlice.actions;
export default totalLeaveSlice.reducer;
