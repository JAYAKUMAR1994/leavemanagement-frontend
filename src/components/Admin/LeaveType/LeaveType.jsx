import React, { useState } from "react";
import { Button, Grid, TextField } from "@mui/material";
import { setLeaveTypes } from "../../../store/LeaveTypeSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../../Layout";

const LeaveType = () => {
  const [leaveType, setLeaveType] = useState({
    type: "",
    description: "",
  });
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeaveType((prevDetails) => ({ ...prevDetails, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validateFields = () => {
    const newErrors = {};

    // Validate each field
    if (!leaveType.type.trim()) {
      newErrors.type = "Type is required";
    }

    if (!leaveType.description.trim()) {
      newErrors.description = "Description is required";
    }

    setErrors(newErrors);

    // Return true if there are no errors, false otherwise
    return Object.keys(newErrors).length === 0;
  };

  const MAX_DESCRIPTION_LENGTH = 500;

  const addLeaveType = async () => {
    if (validateFields()) {
      try {
        // Replace the following with your actual API endpoint and update logic
        const response = await fetch("http://localhost:8081/leavetype", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(leaveType),
        });

        if (response.ok) {
          const data = await response.json();
          dispatch(setLeaveTypes(data.leavetypes));

          toast.success("LeaveType Created Successfully!", {
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          // Handle update failure
          console.error("Failed to update LeaveType details");
        }
      } catch (error) {
        console.error("Error updating department details", error);
      }

      // Clear the form fields after adding
      setLeaveType({
        type: "",
        description: "",
      });
    }
  };

  return (
    <>
      <Layout title="addleavetype">
        <Grid item xs={12}>
          <h2>Add Leave Type</h2>
        </Grid>
        <Grid container spacing={2} style={{ padding: "30px" }}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Type"
              name="type"
              value={leaveType.type}
              onChange={handleChange}
              required
              error={!!errors.type}
              helperText={errors.type}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={leaveType.description}
              onChange={handleChange}
              required
              multiline
              rows={4}
              error={!!errors.description}
              //   helperText={errors.description}
              inputProps={{ maxLength: MAX_DESCRIPTION_LENGTH }}
              helperText={`${
                MAX_DESCRIPTION_LENGTH - leaveType.description.length
              } characters left`}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={addLeaveType}
              style={{ marginLeft: "30px" }}
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </Layout>
    </>
  );
};

export default LeaveType;
