
import React from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => {
      const errors = {};

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
      return errors;
    },
    onSubmit: (values, { setSubmitting, resetForm }) => {
      formik.validateForm().then(async () => {
        if (formik.isValid) {
          try {
            // Assuming login returns a promise
            const check = await login(values.email, values.password);

            if (check) {
              if (check === "admin") {
                toast.success("Login successful", {
                  position: toast.POSITION.TOP_CENTER,
                });
                navigate("/admin/dashboard");
              } else if (check === "employee") {
                toast.success("Login successful", {
                  position: toast.POSITION.TOP_CENTER,
                });
                navigate("/employee/dashboard");
              } else {
                navigate("/signin");
              }
              resetForm();
            } else {
              toast.error("Invalid credentials", {
                position: toast.POSITION.TOP_CENTER,
              });
              resetForm();
            }
          } catch (error) {
            console.error("Login failed:", error);
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
        <Typography variant="h5">Login</Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            variant="outlined"
            margin="normal"
            helperText={formik.errors.email}
            error={formik.touched.email && Boolean(formik.errors.email)}
            autoComplete="email"
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            variant="outlined"
            margin="normal"
            helperText={formik.errors.password}
            error={formik.touched.password && Boolean(formik.errors.password)}
            autoComplete="current-password"
          />
          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default Login;
