import React, { useState } from "react";
import {
  Grid,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
  TablePagination,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  styled,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";

import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { deleteEmployee, updateEmployee } from "../../../components/Api/api";
import Layout from "../../Layout";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmployeeTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchText, setSearchText] = useState("");
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const [editEmployeeData, setEditEmployeeData] = useState({
    empCode: "",
    role: "employee",
    gender: "male",
    userName: "",
    email: "",
    phoneNumber: "",
    department: "",
    country: "",
    city: "",
    town: "",
    password: "",
    confirmPassword: "",
    userid: null,
    creationdate: new Date(),
  });

  const StyledTableHead = styled(TableHead)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    "& .MuiTableCell-root": {
      color: "white",
    },
  }));

  const StyledTableRow = styled(TableRow)({
    "&:hover": {
      backgroundColor: "#3887BE",
    },
  });

  const StyledTableCell = styled(TableCell)({
    color: "black",
  });

  const departments = useSelector((state) => state.department.departments);
  const dispatch = useDispatch();

  const tableData = useSelector((state) => state.employee.employees);

  const filteredData = tableData
    ? tableData.filter((row) =>
        Object.values(row).some((value) =>
          String(value).toLowerCase().includes(searchText.toLowerCase())
        )
      )
    : [];

  const handleEditClick = (employeeId) => {
    const selectedEmployee = tableData.find(
      (employee) => employee.user_id === employeeId
    );

    if (selectedEmployee) {
      setEditEmployeeData({
        empCode: selectedEmployee.empCode,
        role: selectedEmployee.role,
        gender: selectedEmployee.gender,
        userName: selectedEmployee.user_name,
        email: selectedEmployee.email,
        phoneNumber: selectedEmployee.phone_number,
        department: selectedEmployee.department,
        country: selectedEmployee.country,
        city: selectedEmployee.city,
        town: selectedEmployee.town,
        password: selectedEmployee.password,
        confirmPassword: selectedEmployee.confirmPassword,
        userid: selectedEmployee.user_id,
        creationdate: selectedEmployee.creationdate,
      });
      setOpenEditDialog(true);
    }
  };

  const handleDeleteClick = (employeeId) => {
    dispatch(deleteEmployee(employeeId));
    toast.success("Employee Deleted Successfully!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const handleDialogClose = () => {
    setOpenEditDialog(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFieldChange = (fieldName, value) => {
    setEditEmployeeData((prevEmployee) => ({
      ...prevEmployee,
      [fieldName]: value,
    }));
  };

  const handleSaveChanges = () => {
    dispatch(updateEmployee(editEmployeeData));
    toast.success("Employee Updated Successfully!", {
      position: toast.POSITION.TOP_CENTER,
    });
    setOpenEditDialog(false);
  };

  return (
    <>
      <Layout title="EmployeeManagement">
        <Grid item xs={12}>
          <h2>Employee Management</h2>
        </Grid>
        <div>
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            InputProps={{
              endAdornment: <Search />,
            }}
            style={{ marginBottom: "10px", marginRight: "10px" }}
          />

          <TableContainer component={Paper}>
            <Table>
              <StyledTableHead>
                <TableRow>
                  <StyledTableCell>Sl. No</StyledTableCell>
                  <StyledTableCell>Emp Code</StyledTableCell>
                  <StyledTableCell>Emp Name</StyledTableCell>
                  <StyledTableCell>Department</StyledTableCell>
                  <StyledTableCell>Creation Date</StyledTableCell>
                  <StyledTableCell>Actions</StyledTableCell>
                </TableRow>
              </StyledTableHead>

              <TableBody>
                {filteredData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} align="center">
                      No records found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                      <StyledTableRow key={index}>
                        <StyledTableCell>{index + 1}</StyledTableCell>
                        <StyledTableCell>{row.empCode}</StyledTableCell>
                        <StyledTableCell>{row.user_name}</StyledTableCell>
                        <StyledTableCell>{row.department}</StyledTableCell>
                        <TableCell>
                          {new Date(row.creationdate).toLocaleDateString()}
                        </TableCell>
                        <StyledTableCell>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleEditClick(row.user_id)}
                            startIcon={<EditIcon />}
                          ></Button>
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => handleDeleteClick(row.user_id)}
                            startIcon={<DeleteIcon />}
                            // style={{ marginLeft: '5px' }}
                          ></Button>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              marginTop: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              paddingRight: "10px",
            }}
          >
            <Typography
              variant="caption"
              style={{ borderRight: "1px solid #ccc", padding: "8px" }}
            >
              Shows:
            </Typography>
            <TablePagination
              labelRowsPerPage=""
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelDisplayedRows={({ from, to, count }) =>
                `showing ${from} to ${to} of ${count} entries`
              }
            />
          </div>

          <Dialog open={openEditDialog} onClose={handleDialogClose}>
            <DialogTitle>Edit Employee</DialogTitle>
            <DialogContent>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "20px",
                  marginTop: "20px",
                }}
              >
                <TextField
                  label="Emp Code"
                  value={editEmployeeData?.empCode || ""}
                  onChange={(e) => handleFieldChange("empCode", e.target.value)}
                  style={{ marginBottom: "10px" }}
                  disabled
                />

                <TextField
                  label="Emp Name"
                  value={editEmployeeData?.userName || ""}
                  onChange={(e) =>
                    handleFieldChange("userName", e.target.value)
                  }
                  style={{ marginBottom: "10px" }}
                />

                {/* Use a Select component for the Department field */}
                <FormControl fullWidth style={{ marginBottom: "10px" }}>
                  <InputLabel>Department</InputLabel>
                  <Select
                    name="department"
                    value={editEmployeeData?.department || ""}
                    onChange={(e) =>
                      handleFieldChange("department", e.target.value)
                    }
                  >
                    {departments.map((department) => (
                      <MenuItem key={department.id} value={department.deptcode}>
                        {department.deptname}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  label="Email"
                  value={editEmployeeData?.email || ""}
                  onChange={(e) => handleFieldChange("email", e.target.value)}
                  style={{ marginBottom: "10px" }}
                  disabled
                />
              </div>
            </DialogContent>

            <DialogActions>
              <Button
                variant="contained"
                onClick={handleDialogClose}
                color="primary"
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleSaveChanges}
                color="primary"
              >
                Save Changes
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </Layout>
    </>
  );
};

export default EmployeeTable;
