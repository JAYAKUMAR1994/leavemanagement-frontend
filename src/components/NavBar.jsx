import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Avatar,
  Button,
  List,
  ListItem,
} from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import userEvent from "@testing-library/user-event";

const NavBar = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  console.log("render navbar");
  return (
    <Container style={{ height: "18vh", paddingTop: "64px" }}>
      {/* Navbar */}
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Leave Management System
          </Typography>
          {isLoggedIn === true ? null : (
            <Button color="inherit" component={Link} to="/signup">
              Sign Up
            </Button>
          )}

          {isLoggedIn === true ? null : (
            <Button color="inherit" component={Link} to="/signin">
              Sign In
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Container>
  );
};

export default NavBar;
