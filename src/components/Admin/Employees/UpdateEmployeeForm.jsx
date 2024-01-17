import React, { useEffect } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  Grid,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { updateEmployee } from "../../../components/Api/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateEmployeeForm = () => {
  const user = useSelector((state) => state.user.user);
  console.log('user',user)
  const employee = useSelector((state) => state.employee.employees);
  console.log('employee',employee)
  const employeeData = employee.find((item) => item.user_id === user.user_id);
  const dispatch = useDispatch();
console.log('employeeData',employeeData)

  const formik = useFormik({
    initialValues: {
      empCode: "",
      gender: "male",
      userName: "",
      email: "",
      phoneNumber: "",
      department: "",
      country: "",
      city: "",
      town: "",
      userid: null,
    },
    validate: (values) => {
      const errors = {};

      if (!values.department) {
        errors.department = "Required";
      }

      if (!values.gender) {
        errors.gender = "Required";
      }

      if (!values.userName) {
        errors.userName = "Required";
      }

      if (!values.phoneNumber) {
        errors.phoneNumber = "Required";
      }

      if (!values.country) {
        errors.country = "Required";
      }

      if (!values.city) {
        errors.city = "Required";
      }

      if (!values.town) {
        errors.town = "Required";
      }
      // Add validations for other fields

      return errors;
    },
    onSubmit: async (values) => {
      dispatch(updateEmployee(values));
      toast.success("Updated Employees successfully!", {
        position: toast.POSITION.TOP_CENTER,
      });
    },
  });

  useEffect(() => {
    if (employeeData && employeeData) {
      formik.setValues({
        empCode: employeeData.empCode || "",
        gender: employeeData.gender || "male",
        userName: employeeData.user_name || "",
        email: employeeData.email || "",
        phoneNumber: employeeData.phone_number || "",
        department: employeeData.department || "",
        country: employeeData.country || "",
        city: employeeData.city || "",
        town: employeeData.town || "",
        userid: employeeData.user_id || "",
      });
    }
  }, []);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2} style={{ padding: "30px" }}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Employee Code"
            name="empCode"
            value={formik.values.empCode}
            onChange={formik.handleChange}
            required
            disabled
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            required
            disabled
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Department"
            name="department"
            value={formik.values.department}
            onChange={formik.handleChange}
            required
            disabled
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <Select
              name="gender"
              value={formik.values.gender}
              onChange={formik.handleChange}
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
            label="First Name"
            name="userName"
            value={formik.values.userName}
            onChange={formik.handleChange}
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Phone Number"
            type="tel"
            name="phoneNumber"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Country"
            name="country"
            value={formik.values.country}
            onChange={formik.handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="City"
            name="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Town"
            name="town"
            value={formik.values.town}
            onChange={formik.handleChange}
            required
          />
        </Grid>
      </Grid>
      <Button
        variant="contained"
        color="primary"
        type="submit"
        style={{ marginLeft: "30px" }}
      >
        Update
      </Button>
    </form>
  );
};

export default UpdateEmployeeForm;
