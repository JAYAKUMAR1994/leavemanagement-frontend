
import React from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
// import { signup } from "./AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signup } from "./authActions";

const Signup = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(false);
  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: (values) => {
      const errors = {};

      if (!values.userName) {
        errors.userName = "Required";
      }

      if (!values.email) {
        errors.email = "Required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }

      if (!values.password) {
        errors.password = "Required";
      }

      if (!values.confirmPassword) {
        errors.confirmPassword = "Required";
      }

      if (!values.confirmPassword) {
        errors.confirmPassword = "Required";
      } else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = "Passwords do not match";
      }
      return errors;
    },
    onSubmit: (values, { setSubmitting, resetForm }) => {
      setIsLoading(true);

      // Asynchronously validate the form
      formik.validateForm().then(() => {
        if (formik.isValid) {
          try {
            debugger
            // Dispatch your async action or API call here
            dispatch(signup(values));
            toast.success("User submitted successfully!", {
              position: toast.POSITION.TOP_CENTER,
            });
            resetForm();
          } catch (error) {
            console.error("Error submitting user:", error);
            toast.error("Failed to submit user.", {
              position: toast.POSITION.TOP_CENTER,
            });
          } finally {
            setIsLoading(false);
            setSubmitting(false);
          }
        } else {
          // Handle validation errors, if any
          toast.error("Please fill in all the required fields.", {
            position: toast.POSITION.TOP_CENTER,
          });
          setSubmitting(false);
        }
      });
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <div>
        <Typography variant="h5">Signup</Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="userName"
            name="userName"
            label="User Name"
            value={formik.values.userName}
            onChange={formik.handleChange}
            error={formik.touched.userName && Boolean(formik.errors.userName)}
            helperText={formik.touched.userName && formik.errors.userName}
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
            variant="outlined"
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary">
            Signup
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default Signup;
