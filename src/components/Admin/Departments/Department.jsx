import React, { useState } from "react";
import { Button, Grid, TextField } from "@mui/material";
import { setDepartments } from "../../../store/departmentSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../../Layout";
import { createDepartment } from "../../Api/api";

const Department = () => {
  const [departmentDetails, setDepartmentDetails] = useState({
    slNo: "",
    deptCode: "",
    deptName: "",
    deptShortName: "",
    creationDate: "",
  });

  const dispatch = useDispatch();

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartmentDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validateFields = () => {
    const newErrors = {};

    // Validate each field
    if (!departmentDetails.deptCode.trim()) {
      newErrors.deptCode = "Dept Code is required";
    }

    if (!departmentDetails.deptName.trim()) {
      newErrors.deptName = "Dept Name is required";
    }

    if (!departmentDetails.deptShortName.trim()) {
      newErrors.deptShortName = "Dept Short Name is required";
    }

    if (!departmentDetails.creationDate) {
      newErrors.creationDate = "Creation Date is required";
    }

    setErrors(newErrors);

    // Return true if there are no errors, false otherwise
    return Object.keys(newErrors).length === 0;
  };

  const addDepartment = async () => {
    if (validateFields()) {

      dispatch(createDepartment(departmentDetails));
      toast.success("Department Created Successfully!", {
        position: toast.POSITION.TOP_CENTER,
      });

      setDepartmentDetails({
        slNo: "",
        deptCode: "",
        deptName: "",
        deptShortName: "",
        creationDate: "",
      });
    }
  };

  return (
    <>
      <Layout title="Department">
        <Grid item xs={12}>
          <h2>Department</h2>
        </Grid>

        <Grid container spacing={2} style={{ padding: "30px" }}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Dept Code"
              name="deptCode"
              value={departmentDetails.deptCode}
              onChange={handleChange}
              required
              error={!!errors.deptCode}
              helperText={errors.deptCode}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Dept Name"
              name="deptName"
              value={departmentDetails.deptName}
              onChange={handleChange}
              required
              error={!!errors.deptName}
              helperText={errors.deptName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Dept Short Name"
              name="deptShortName"
              value={departmentDetails.deptShortName}
              onChange={handleChange}
              required
              error={!!errors.deptShortName}
              helperText={errors.deptShortName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              //   label="Creation Date"
              type="date"
              name="creationDate"
              value={departmentDetails.creationDate}
              onChange={handleChange}
              required
              error={!!errors.creationDate}
              helperText={errors.creationDate}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={addDepartment}
              style={{ marginLeft: "30px" }}
            >
              Add Department
            </Button>
          </Grid>
        </Grid>
      </Layout>
    </>
  );
};

export default Department;
