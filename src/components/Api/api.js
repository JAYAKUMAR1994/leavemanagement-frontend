import axios from "axios";
import { setEmployees } from "../../store/EmployeeSlice";
import { setLeaveTypes } from "../../store/LeaveTypeSlice";
import { setLeaves } from "../../store/TotalLeaveSlice";
import { setDepartments } from "../../store/departmentSlice";
import { setAllUser, setUser } from "../../store/userReducer";

export const updateEmpPassword = (updatedEmpPassword) => async (dispatch) => {
    try {
      const response = await fetch(
        `http://localhost:8081/updatedEmpPassword/${updatedEmpPassword.empid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedEmpPassword),
        }
      );
  
      

      if (response.ok) {
        const responseData = await response.json();
        const user = responseData.user.find(
          (item) => item.user_id === updatedEmpPassword.empid
        );
  
        dispatch(setUser(user));
        dispatch(setEmployees(responseData.employees));
      } else {
        console.error("Failed to  update EmpPassword");
      }
    } catch (error) {
      console.error("Error updating EmpPassword", error);
    }
  };


  export const updateLeave = (updatedLeave) => async (dispatch) => {
    try {
      const response = await fetch(
        `http://localhost:8081/updateleave/${updatedLeave.leave_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedLeave),
        }
      );
  
      if (response.ok) {
        const responseData = await response.json();
        dispatch(setLeaves(responseData.leaves));
      } else {
        console.error("Failed to update leave");
      }
    } catch (error) {
      console.error("Error updating leave", error);
    }
  };
  
  export const deleteLeaves = (deleteLeave_id) => async (dispatch) => {
    try {
      const response = await fetch(
        `http://localhost:8081/deleteleave/${deleteLeave_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.ok) {
        const responseData = await response.json();
        dispatch(setLeaves(responseData.leaves)); // Assuming the response contains the updated department
      } else {
        console.error("Failed to delete leave");
      }
    } catch (error) {
      console.error("Error delete leave", error);
    }
  };
  
  export const applyForLeave = (LeaveData) => async (dispatch) => {
    try {
      const response = await fetch("http://localhost:8081/submitLeave", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(LeaveData),
      });
  
      if (response.ok) {
        const responseData = await response.json();
  
        dispatch(setLeaves(responseData.leaves));
      } else {
        console.error("Failed to applyForLeave");
      }
    } catch (error) {
      console.error("Error applyForLeave", error);
    }
  };
  
  export const adminLeaveStatus = (leaveStatus) => async (dispatch) => {
    try {
      const response = await fetch(
        `http://localhost:8081/leave/status/${leaveStatus.leave_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(leaveStatus),
        }
      );
  
      if (response.ok) {
        const responseData = await response.json();
        dispatch(setLeaves(responseData.leaves));
      } else {
        console.error("Failed to update leaveStatus");
      }
    } catch (error) {
      console.error("Error updating leaveStatus", error);
    }
  };
  

  
export const updateDepartment = (updatedDepartment) => async (dispatch) => {
  try {
    const response = await fetch(
      `http://localhost:8081/updatedepartment/${updatedDepartment.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedDepartment),
      }
    );

    if (response.ok) {
      const responseData = await response.json();
      dispatch(setDepartments(responseData.department)); // Assuming the response contains the updated department
    } else {
      console.error("Failed to update department");
    }
  } catch (error) {
    console.error("Error updating department", error);
  }
};

export const deleteDepartment = (deleteDepartment_id) => async (dispatch) => {
  try {
    const response = await fetch(
      `http://localhost:8081/deletedepartment/${deleteDepartment_id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const responseData = await response.json();
      dispatch(setDepartments(responseData.department)); // Assuming the response contains the updated department
    } else {
      console.error("Failed to update department");
    }
  } catch (error) {
    console.error("Error updating department", error);
  }
};


export const updateEmployee = (updatedEmployee) => async (dispatch) => {
  try {
    const response = await fetch(
      `http://localhost:8081/updateemployee/${updatedEmployee.userid}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedEmployee),
      }
    );

    if (response.ok) {
      const responseData = await response.json();
      dispatch(setEmployees(responseData.employees)); // Assuming the response contains the updated department
    } else {
      console.error("Failed to update employee");
    }
  } catch (error) {
    console.error("Error updating employee", error);
  }
};

export const deleteEmployee = (deleteEmployee_id) => async (dispatch) => {
  try {
    const response = await fetch(
      `http://localhost:8081/deleteemployee/${deleteEmployee_id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const responseData = await response.json();
      dispatch(setEmployees(responseData.employees));
    } else {
      console.error("Failed to update employee");
    }
  } catch (error) {
    console.error("Error updating employee", error);
  }
};


export const updateLeaveType = (updatedLeaveType) => async (dispatch) => {
  try {
    const response = await fetch(
      `http://localhost:8081/updateleavetype/${updatedLeaveType.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedLeaveType),
      }
    );

    if (response.ok) {
      const responseData = await response.json();
      dispatch(setLeaveTypes(responseData.leavetypes));
    } else {
      console.error("Failed to update leavetype");
    }
  } catch (error) {
    console.error("Error updating leavetype", error);
  }
};

export const deleteLeavetype = (deleteLeaveType_id) => async (dispatch) => {
  try {
    const response = await fetch(
      `http://localhost:8081/deleteleavetype/${deleteLeaveType_id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const responseData = await response.json();
      dispatch(setLeaveTypes(responseData.leavetypes)); // Assuming the response contains the updated department
    } else {
      console.error("Failed to delete leavetype");
    }
  } catch (error) {
    console.error("Error delete leavetype", error);
  }
};



export const createDepartment = (departmentDetails) => async (dispatch) => {
  try {
    // Replace the following with your actual API endpoint and update logic
    const response = await fetch("http://localhost:8081/department", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(departmentDetails),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(setDepartments(data.department));

     
    } else {
      // Handle update failure
      console.error("Failed to create department details");
    }
  } catch (error) {
    console.error("Error creating department details", error);
  }
}


export const createEmployee = (employeeDetailsData) => async (dispatch) => {

  try {
     
    // Replace the following with your actual API endpoint and update logic
    const response = await fetch("http://localhost:8081/createemployee", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employeeDetailsData),
    });

    const responseAllUser = await axios.get("http://localhost:8081/user");

    if (response.ok) {
    
      const responseData = await response.json();
      dispatch(setEmployees(responseData.employees));
      dispatch(setAllUser(responseAllUser.data.records));

      
    } else {
      // Handle unexpected response format
      console.error("Unexpected response format:", response);
    }
  } catch (error) {
    // Handle network or HTTP response errors
    console.error("Error creating employee:", error);
  }
}