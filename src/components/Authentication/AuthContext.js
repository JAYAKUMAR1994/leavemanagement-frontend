import { createContext, useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { setAllUser, setLoggedIn, setUser } from "../../store/userReducer";
import { setDepartments } from "../../store/departmentSlice";
import axios from "axios";
import { setLeaveTypes } from "../../store/LeaveTypeSlice";
import { setEmployees } from "../../store/EmployeeSlice";
import { setLeaves } from "../../store/TotalLeaveSlice";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // const [isLoggedIn, setLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const dispatch = useDispatch();

  const login = async (email, password) => {
    try {
      const response = await axios.get("http://localhost:8081/user");
      const responseEmployees = await axios.get(
        "http://localhost:8081/employees"
      );
      const responsedepartments = await axios.get(
        "http://localhost:8081/departments"
      );
      const responseleavetypes = await axios.get(
        "http://localhost:8081/getleavetypesdata"
      );
      const responseLeaves = await axios.get("http://localhost:8081/leaves");

      if (response.data) {
        debugger
        dispatch(setEmployees(responseEmployees.data.employees));
        dispatch(setUser(response.data.records));
        dispatch(setDepartments(responsedepartments.data.departments));
        dispatch(setLeaveTypes(responseleavetypes.data.leavetypes));
        dispatch(setLeaves(responseLeaves.data.leaves));
        dispatch(setAllUser(response.data.records));
        const user = response.data.records.find(
          (item) => item.email === email && item.password === password
        );

        if (user) {
          dispatch(setUser(user));
          dispatch(setLoggedIn(true));
          return user.role;
        } else {
          console.error("Invalid credentials");
        }
      } else {
        console.error("Error fetching user data:", response.statusText);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const logout = () => {
    dispatch(setLoggedIn(false));
    return true;
  };

  return (
    <AuthContext.Provider value={{ login, logout, userRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
