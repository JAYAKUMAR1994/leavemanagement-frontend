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
import NavBar from "../../NavBar";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useAuth } from "../../Authentication/AuthContext";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminDashboard = () => {
  const [openEmployees, setOpenEmployees] = useState(false);
  const [openDepartment, setOpenDepartment] = useState(false);
  const [openLeaveType, setOpenLeaveType] = useState(false);
  const [openLeaveManage, setOpenLeaveManage] = useState(false);
  const user = useSelector((state) => state.user.user);

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleEmployeesClick = () => {
    setOpenEmployees(!openEmployees);
  };

  const handleDepartmentsClick = () => {
    setOpenDepartment(!openDepartment);
  };

  const handleLeaveTypeClick = () => {
    setOpenLeaveType(!openLeaveType);
  };

  const handleLeaveManageClick = () => {
    setOpenLeaveManage(!openLeaveManage);
  };

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

  return (
    <Container>
      <Grid container spacing={3}>
        {/* Sidebar */}
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <div style={{ textAlign: "center" }}>
                <Avatar
                  alt="Admin"
                  src="/path/to/profile-picture.jpg"
                  sx={{ width: 100, height: 100, margin: "auto" }}
                />
                <Typography variant="h6">
                  {user ? user.username : "No User"}
                </Typography>
              </div>

              <List component="nav">
                <ListItem button component={Link} to="/admin/dashboard">
                  <ListItemText primary="Dashboard" />
                </ListItem>

                <ListItem
                  button
                  onClick={handleDepartmentsClick}
                  style={{
                    backgroundColor: openDepartment ? "#27374D" : "white",
                  }}
                >
                  <ListItemText
                    primary="Departments"
                    style={{ color: openDepartment ? "white" : "black" }}
                  />

                  {openDepartment ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openDepartment} timeout="auto" unmountOnExit>
                  <List
                    component="div"
                    disablePadding
                    style={{ backgroundColor: "#9DB2BF" }}
                  >
                    <ListItem button component={Link} to="/admin/department">
                      <ListItemText primary="Department" />
                    </ListItem>
                    <ListItem
                      button
                      component={Link}
                      to="/admin/department-management"
                    >
                      <ListItemText primary="Department Management" />
                    </ListItem>
                  </List>
                </Collapse>

                <ListItem
                  button
                  onClick={handleEmployeesClick}
                  style={{
                    backgroundColor: openEmployees ? "#27374D" : "white",
                  }}
                >
                  <ListItemText
                    primary="Employees"
                    style={{ color: openEmployees ? "white" : "black" }}
                  />
                  {openEmployees ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openEmployees} timeout="auto" unmountOnExit>
                  <List
                    component="div"
                    disablePadding
                    style={{ backgroundColor: "#9DB2BF" }}
                  >
                    <ListItem button component={Link} to="/admin/employee">
                      <ListItemText primary="Employee" />
                    </ListItem>
                    <ListItem
                      button
                      component={Link}
                      to="/admin/employee-management"
                    >
                      <ListItemText primary="Employee Management" />
                    </ListItem>
                  </List>
                </Collapse>

                <ListItem
                  button
                  onClick={handleLeaveTypeClick}
                  style={{
                    backgroundColor: openLeaveType ? "#27374D" : "white",
                  }}
                >
                  <ListItemText
                    primary="Leave Type"
                    style={{ color: openLeaveType ? "white" : "black" }}
                  />
                  {openLeaveType ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openLeaveType} timeout="auto" unmountOnExit>
                  <List
                    component="div"
                    disablePadding
                    style={{ backgroundColor: "#9DB2BF" }}
                  >
                    <ListItem button component={Link} to="/admin/leave-type">
                      <ListItemText primary="Add Leave-Type" />
                    </ListItem>
                    <ListItem
                      button
                      component={Link}
                      to="/admin/leave-management"
                    >
                      <ListItemText primary="Manage Leave-Type" />
                    </ListItem>
                  </List>
                </Collapse>

                <ListItem
                  button
                  onClick={handleLeaveManageClick}
                  style={{
                    backgroundColor: openLeaveManage ? "#27374D" : "white",
                  }}
                >
                  <ListItemText
                    primary="Leave Management"
                    style={{ color: openLeaveManage ? "white" : "black" }}
                  />
                  {openLeaveManage ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openLeaveManage} timeout="auto" unmountOnExit>
                  <List
                    component="div"
                    disablePadding
                    style={{ backgroundColor: "#9DB2BF" }}
                  >
                    <ListItem button component={Link} to="/admin/all-leaves">
                      <ListItemText primary="All Leaves" />
                    </ListItem>
                    <ListItem
                      button
                      component={Link}
                      to="/admin/pending-leaves"
                    >
                      <ListItemText primary="Pending Leaves" />
                    </ListItem>
                    <ListItem
                      button
                      component={Link}
                      to="/admin/approved-leaves"
                    >
                      <ListItemText primary="Approved Leaves" />
                    </ListItem>
                    <ListItem
                      button
                      component={Link}
                      to="/admin/rejected-leaves"
                    >
                      <ListItemText primary="Not Approved Leaves" />
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

        <Grid item xs={12} md={9}>
          <Card>
            <CardContent>
              <Outlet />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboard;
