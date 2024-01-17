import React from "react";
import { TextField, Button, Grid } from "@mui/material";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateEmpPassword } from "../Api/api";
import Layout from "../Layout";

console.log("render changepassword");

const ChangePasswordForm = ({ onSubmit }) => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validate: (values) => {
      const errors = {};

      if (!values.oldPassword) {
        errors.oldPassword = "Required";
      }

      if (!values.newPassword) {
        errors.newPassword = "Required";
      }

      if (!values.confirmPassword) {
        errors.confirmPassword = "Required";
      } else if (values.confirmPassword !== values.newPassword) {
        errors.confirmPassword = "Passwords do not match";
      }

      return errors;
    },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const checkOldPassword = async (oldPassword) => {
        const isOldPasswordAvailable =
          user.password.trim() === oldPassword.trim();

        return isOldPasswordAvailable;
      };

      // Using async/await to check the old password
      let check = await checkOldPassword(values.oldPassword);

      if (!check) {
        toast.error("Old Password Wrong!", {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        let data = { password: values.newPassword, empid: user.user_id };

        dispatch(updateEmpPassword(data));
        toast.success("Change Password successfully!", {
          position: toast.POSITION.TOP_CENTER,
        });
        resetForm();
        setSubmitting(false);

      }
    },
  });

  return (
    <>
      <Layout title="Change Password">
        <Grid item xs={12}>
          <h2>Change Passoword</h2>
        </Grid>
        <form onSubmit={formik.handleSubmit}>
          {/* <input
            type="hidden"
            name="username"
            value={user.username} // You need to replace this with the actual value of the username
            /> */}

          <Grid container spacing={2} style={{ padding: "30px" }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Old Password"
                type="password"
                name="oldPassword"
                value={formik.values.oldPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.oldPassword &&
                  Boolean(formik.errors.oldPassword)
                }
                helperText={
                  formik.touched.oldPassword && formik.errors.oldPassword
                }
                required
                autoComplete="current-password"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="New Password"
                type="password"
                name="newPassword"
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.newPassword &&
                  Boolean(formik.errors.newPassword)
                }
                helperText={
                  formik.touched.newPassword && formik.errors.newPassword
                }
                required
                autoComplete="new-password"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
                helperText={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
                required
                autoComplete="new-password"
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ marginLeft: "30px" }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Layout>
    </>
  );
};

export default ChangePasswordForm;
