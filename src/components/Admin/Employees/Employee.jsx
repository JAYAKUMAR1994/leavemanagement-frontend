import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Input,
  Grid,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setEmployees } from "../../../store/EmployeeSlice";
import axios from "axios";
import Layout from "../../Layout";
import { createEmployee } from "../../Api/api";

const Employee = () => {
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isEmailAvailable, setIsEmailAvailable] = useState(true);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.alluser);
  const employee = useSelector((state) => state.employee.employees);
  const departments = useSelector((state) => state.department.departments);

  console.log('user',user)
  const [employeeDetails, setEmployeeDetails] = useState({
    empCode: "",
    role: "employee",
    gender: "male",
    userName: "",
    email: "",
    phoneNumber: "",
    department: "",
    country: "",
    city: "",
    town: "",
    password: "",
    confirmPassword: "",
    userid: null,
    creationDate: "",
  });

  const [isEmpCodeUnique, setIsEmpCodeUnique] = useState(true);
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);

  useEffect(() => {
    // Check if passwords match
    setIsPasswordMatch(
      employeeDetails.password === employeeDetails.confirmPassword
    );
  }, [employeeDetails.password, employeeDetails.confirmPassword]);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setEmployeeDetails((prevDetails) => ({ ...prevDetails, [name]: value }));

    const isValidEmail = (email) => {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      return emailRegex.test(email);
    };

    const checkEmailAvailability = async (email) => {
      debugger
      const isEmailAvailable =
        Array.isArray(user) &&
        !user.some((user) => user.email.trim() === email.trim());

      return isEmailAvailable;
    };

    if (name === "email") {
      if (value === "") {
        setIsEmailValid(true);
        setIsEmailAvailable(true);
      } else {
        const isValid = isValidEmail(value);
        setIsEmailValid(isValid);

        if (!isValid) {
          // Set error message for invalid email
          setIsEmailAvailable(false);
        } else {
          // Check email availability only if the email is valid and not empty
          const isAvailable = await checkEmailAvailability(value);
          setIsEmailAvailable(isAvailable);
        }
      }
    }

    const checkEmpCodeUniqueness = async (empCode) => {
      const isEmployeeCodeAvailable = !employee.some(
        (user) => user.empCode === empCode
      );

      return isEmployeeCodeAvailable;
    };

    if (name === "empCode") {
      // Check if employeeCode is unique
      const isUnique = await checkEmpCodeUniqueness(value);
      setIsEmpCodeUnique(isUnique);
    }

    if (name === "password" || name === "confirmPassword") {
      // Check if passwords match
      setIsPasswordMatch(
        employeeDetails.password === employeeDetails.confirmPassword
      );
    }
  };

  const areRequiredFieldsFilled = () => {
    for (const key in employeeDetails) {
      if (
        employeeDetails.hasOwnProperty(key) &&
        (employeeDetails[key] === "" || employeeDetails[key] === undefined) &&
        key !== "confirmPassword"
      ) {
        return false;
      }
    }
    return true;
  };

  const addEmployee = async () => {

     // Check if empCode and email are unique/available before adding employee
     if (!isEmpCodeUnique || !isEmailAvailable) {
      console.error("Employee details not unique/available");
      toast.error("Employee details not unique/available", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    // Check if all required fields are filled
    if (!areRequiredFieldsFilled()) {
      console.error("Please fill in all required fields");
      toast.error("Please fill in all the required fields.", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    const employeeDetailsData = { ...employeeDetails, userid: user.user_id };

    dispatch(createEmployee(employeeDetailsData));

    toast.success("Employee Created Successfully!", {
      position: toast.POSITION.TOP_CENTER,
    });

    setEmployeeDetails({
      empCode: "",
      role: "employee",
      gender: "male",
      userName: "",
      email: "",
      phoneNumber: "",
      department: "",
      country: "",
      city: "",
      town: "",
      password: "",
      confirmPassword: "",
      userid: null,
      creationDate: "",
    });
  };

  return (
    <>
      <Layout title="Employee">
        <Grid item xs={12}>
          <h2>Employee</h2>
        </Grid>

        <form>
          <Grid container spacing={2} style={{ padding: "30px" }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Employee Code"
                name="empCode"
                value={employeeDetails.empCode}
                onChange={handleChange}
                required
                error={!isEmpCodeUnique}
                helperText={
                  !isEmpCodeUnique ? "Employee code must be unique" : ""
                }
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Select
                  name="role"
                  value={employeeDetails.role}
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="employee">Employee</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Select
                  name="gender"
                  value={employeeDetails.gender}
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="User Name"
                name="userName"
                value={employeeDetails.userName}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone Number"
                type="tel"
                name="phoneNumber"
                value={employeeDetails.phoneNumber}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Department</InputLabel>
                <Select
                  name="department"
                  value={employeeDetails.department}
                  onChange={handleChange}
                  required
                >
                  {departments.map((department) => (
                    <MenuItem key={department.id} value={department.deptcode}>
                      {department.deptname}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Country"
                name="country"
                value={employeeDetails.country}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="City"
                name="city"
                value={employeeDetails.city}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Town"
                name="town"
                value={employeeDetails.town}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                name="password"
                value={employeeDetails.password}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="date"
                name="creationDate"
                value={employeeDetails.creationDate}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={employeeDetails.confirmPassword}
                onChange={handleChange}
                required
                error={!isPasswordMatch}
                helperText={!isPasswordMatch ? "Passwords do not match" : ""}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                name="email"
                value={employeeDetails.email}
                onChange={handleChange}
                error={!isEmailAvailable || !isEmailValid}
                helperText={
                  !isEmailValid
                    ? "Invalid email format"
                    : isEmailAvailable
                    ? "Email is available"
                    : "Email already used"
                }
                variant="outlined"
                margin="normal"
              />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            onClick={addEmployee}
            style={{ marginLeft: "30px" }}
          >
            ADD
          </Button>
        </form>
      </Layout>
    </>
  );
};

export default Employee;
