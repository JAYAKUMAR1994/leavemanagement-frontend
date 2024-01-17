import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import {
  FormHelperText,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextareaAutosize,
  Grid,
} from "@mui/material";
import { applyForLeave } from "../../components/Api/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../Layout";

console.log("render applyform");

const ApplyLeaveForm = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.user);
  const leaveTypes = useSelector((state) => state.leavetype.leaveTypes);

  const formik = useFormik({
    initialValues: {
      fromDate: getCurrentDate(),
      toDate: getCurrentDate(),
      leaveType: "",
      description: "",
    },
    validate: (values) => {
      const errors = {};

      return errors;
    },
    onSubmit: (values) => {
      if (!values.leaveType) {
        toast.error("Please fill in Leave Type field.", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
      if (formik.isValid) {
        let data = { ...values, userid: userId };
        dispatch(applyForLeave(data));
        toast.success("Leave Request Applied", {
          position: toast.POSITION.TOP_CENTER,
        });
        formik.resetForm();
      }
    },
  });

  return (
    <>
      <Layout title="ApplyLeaveForm">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <h2>Apply for Leave</h2>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="date"
              label="From Date"
              name="fromDate"
              value={formik.values.fromDate}
              onChange={(e) => {
                formik.handleChange(e);
                // Enable dates from the selected "From Date" onwards
                formik.setFieldValue("toDate", e.target.value);
              }}
              onBlur={formik.handleBlur}
              error={formik.touched.fromDate && Boolean(formik.errors.fromDate)}
              helperText={formik.touched.fromDate && formik.errors.fromDate}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="date"
              label="To Date"
              name="toDate"
              value={formik.values.toDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.toDate && Boolean(formik.errors.toDate)}
              helperText={formik.touched.toDate && formik.errors.toDate}
              // Disable past dates in "To Date"
              inputProps={{ min: formik.values.fromDate }}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl
              fullWidth
              error={
                formik.touched.leaveType && Boolean(formik.errors.leaveType)
              }
            >
              <InputLabel id="leave-type-label">Leave Type</InputLabel>
              <Select
                labelId="leave-type-label"
                name="leaveType"
                value={formik.values.leaveType}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                style={{ border: "none" }} // Remove border from dropdown box

                // helperText={formik.touched.leaveType && formik.errors.leaveType}
              >
                {leaveTypes.map((leave) => (
                  <MenuItem key={leave.id} value={leave.id}>
                    {leave.leavetype}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                {formik.touched.leaveType && formik.errors.leaveType}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextareaAutosize
              minRows={3}
              placeholder="Description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={
                formik.touched.description && formik.errors.description
                  ? formik.errors.description
                  : " "
              }
              error={formik.errors.description}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={formik.handleSubmit}
            >
              Apply
            </Button>
          </Grid>
        </Grid>
      </Layout>
    </>
  );
};

export default ApplyLeaveForm;

// Helper function to get the current date in the format YYYY-MM-DD
function getCurrentDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const day = today.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}
