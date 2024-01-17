import logo from "./logo.svg";
import "./App.css";
import Login from "./components/Authentication/Login";
import Signup from "./components/Authentication/Signup";
import AdminDashboard from "./components/Admin/Departments/AdminDashboard";
import { Routes, Route, Outlet } from "react-router-dom";
import { Typography } from "@mui/material";

import NavBar from "./components/NavBar";
import { Provider } from "react-redux";
import Store from "./store/Store";
import DepartmentTable from "./components/Admin/Departments/DepartmentTable";
import EmployeeDashboard from "./components/Employee/EmployeeDashboard";
import UpdateEmployeeForm from "./components/Admin/Employees/UpdateEmployeeForm";
import { AuthProvider } from "./components/Authentication/AuthContext";
import Department from "./components/Admin/Departments/Department";
import Employee from "./components/Admin/Employees/Employee";
import LeaveType from "./components/Admin/LeaveType/LeaveType";
import LeaveTypeTable from "./components/Admin/LeaveType/LeaveTypeTable";
import EmployeeTable from "./components/Admin/Employees/EmployeeTable";
import ApplyLeaveForm from "./components/Employee/ApplyLeaveForm ";
import LeaveHistoryTable from "./components/Employee/LeaveHistoryTable";
import AdminDashBoardTable from "./components/Admin/LeaveManagement/AdminDashBoardTable";
import ChangePasswordForm from "./components/Employee/ChangePasswordForm ";

function App() {
  return (
    <div>
      <Provider store={Store}>
        <AuthProvider>
         
          <NavBar />

        

          <Routes>
            <Route path="/admin" element={<AdminDashboard />}>
              <Route
                path="/admin/dashboard"
                element={<AdminDashBoardTable status="all" dashbord="true" />}
              />
              <Route path="/admin/department" element={<Department />} />
              <Route
                path="/admin/department-management"
                element={<DepartmentTable />}
              />
              <Route path="/admin/employee" element={<Employee />} />
              <Route
                path="/admin/employee-management"
                element={<EmployeeTable />}
              />
              <Route path="/admin/leave-type" element={<LeaveType />} />
              <Route
                path="/admin/leave-management"
                element={<LeaveTypeTable />}
              />
              <Route
                path="/admin/all-leaves"
                element={<AdminDashBoardTable status="all" />}
              />
              <Route
                path="/admin/pending-leaves"
                element={<AdminDashBoardTable status="pending" />}
              />
              <Route
                path="/admin/approved-leaves"
                element={<AdminDashBoardTable status="approved" />}
              />
              <Route
                path="/admin/rejected-leaves"
                element={<AdminDashBoardTable status="rejected" />}
              />
            </Route>

            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/signin" element={<Login />}></Route>

            <Route path="/employee" element={<EmployeeDashboard />}>
              <Route
                path="/employee/dashboard"
                element={<UpdateEmployeeForm />}
              />
              <Route
                path="/employee/leave-apply"
                element={<ApplyLeaveForm />}
              />
              <Route
                path="/employee/leave-history"
                element={<LeaveHistoryTable />}
              />
              <Route
                path="/employee/changepassword"
                element={<ChangePasswordForm />}
              />
            </Route>
          </Routes>
        </AuthProvider>
      </Provider>
    </div>
  );
}

export default App;
