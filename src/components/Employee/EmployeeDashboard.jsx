import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Container,
  Grid,
  Avatar,
  Button,
  List,
  ListItem,
  ListItemText,
  Collapse,
} from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import NavBar from "../NavBar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Authentication/AuthContext";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [openLeave, setOpenLeave] = useState(false);
  const user = useSelector((state) => state.user.user);

  const handleLogout = async () => {
    // Call the logout function from the AuthContext
    const check = await logout();
    if (check) {
      navigate("/signin");
    }
    toast.success("Logout successfully", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const handleLeaveClick = () => {
    setOpenLeave(!openLeave);
  };

  return (
    <Container>
      <Grid container spacing={3}>
        {/* Sidebar */}
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent style={{ height: "100vh" }}>
              <div style={{ textAlign: "center" }}>
                <Avatar
                  alt="Admin"
                  src="/path/to/profile-picture.jpg"
                  sx={{ width: 100, height: 100, margin: "auto" }}
                />
                <Typography variant="h6">{user.username}</Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  component={Link}
                  to="/employee/dashboard"
                >
                  My Profile
                </Button>
              </div>

              {/* Sidebar Navigation */}
              <List component="nav">
                <ListItem button component={Link} to="/employee/changepassword">
                  Change Password
                </ListItem>

                <ListItem
                  button
                  onClick={handleLeaveClick}
                  style={{ backgroundColor: openLeave ? "#27374D" : "white" }}
                >
                  <ListItemText
                    primary="Leaves"
                    style={{ color: openLeave ? "white" : "black" }}
                  />
                  {openLeave ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openLeave} timeout="auto" unmountOnExit>
                  <List
                    component="div"
                    disablePadding
                    style={{ backgroundColor: "#9DB2BF" }}
                  >
                    <ListItem
                      button
                      component={Link}
                      to="/employee/leave-apply"
                    >
                      <ListItemText primary="Apply Leave" />
                    </ListItem>
                    <ListItem
                      button
                      component={Link}
                      to="/employee/leave-history"
                    >
                      <ListItemText primary="Leave History" />
                    </ListItem>
                  </List>
                </Collapse>

                <Button
                  variant="outlined"
                  color="secondary"
                  style={{ marginTop: "2px", marginLeft: "15px" }}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} md={9}>
          <Card>
            <CardContent>
              <Outlet />
              {/* Main Content */}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EmployeeDashboard;
