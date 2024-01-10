import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import departmentReducer from "./departmentSlice";
import leavetypeReducer from "./LeaveTypeSlice";
import employeeReducer from "./EmployeeSlice";
import leaveReducer from "./TotalLeaveSlice";

const Store = configureStore({
  reducer: {
    user: userReducer,
    department: departmentReducer,
    employee: employeeReducer,
    leavetype: leavetypeReducer,
    leaves: leaveReducer,
  },
});

export default Store;
