import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
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
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
  Card,
  CardContent,
  styled,
} from "@mui/material";
import {
  Search,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { adminLeaveStatus } from "../../../components/Api/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../../Layout";

const AdminDashBoardTable = ({ status, dashbord }) => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const leaves = useSelector((state) => state.leaves.leaves);
  const leavetypes = useSelector((state) => state.leavetype.leaveTypes);
  const Employees = useSelector((state) => state.employee.employees);
  const Departments = useSelector((state) => state.department.departments);

  let tableData;

  if (status === "all") {
    tableData = leaves;
  } else {
    tableData = leaves && leaves.filter((item) => item.status === status);
  }

  // Local state for managing form and dialog
  const [formik, setFormik] = useState({
    values: {
      searchText: "",
      rowsPerPage: 5,
      page: 0,
      openEditDialog: false,
      editEmployeeData: {
        leave_id: "",
        leave_type_id: "",
        from: "",
        to: "",
        description: "",
        status: "",
      },
    },
  });

  // Function to handle changes in the form fields
  const handleFieldChange = (field, value) => {
    setFormik((prevFormik) => ({
      ...prevFormik,
      values: {
        ...prevFormik.values,
        searchText: value,
        editEmployeeData: {
          ...prevFormik.values.editEmployeeData,
          [field]: value,
        },
      },
    }));
  };

  // Function to close the dialog
  const handleDialogClose = () => {
    setFormik((prevFormik) => ({
      ...prevFormik,
      values: {
        ...prevFormik.values,
        openEditDialog: false,
      },
    }));
  };

  
  const handleSaveChanges = () => {
    dispatch(adminLeaveStatus(formik.values.editEmployeeData));
    toast.success(
      `Successfully ${formik.values.editEmployeeData.status} status`,
      { position: toast.POSITION.TOP_CENTER }
    );
    
    handleDialogClose();
  };

  const handleEditClick = (leaveId) => {
    const selectedLeave = tableData.find((leave) => leave.leave_id === leaveId);

    setFormik((prevFormik) => ({
      ...prevFormik,
      values: {
        ...prevFormik.values,
        openEditDialog: true,
        editEmployeeData: {
          ...prevFormik.values.editEmployeeData,
          status: selectedLeave.status,
          leave_id: selectedLeave.leave_id,
          leave_type_id: selectedLeave.leave_type_id,
        },
      },
    }));
  };

  const formatDateForTextField = (dateString) => {
    if (!dateString) {
      return "";
    }

    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      console.error("Invalid date string:", dateString);
      return "";
    }

    // Get day, month, and year components
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getUTCFullYear();

    return `${day}/${month}/${year}`;
  };

  
  const handleChangePage = (event, newPage) => {
    setFormik((prevFormik) => ({
      ...prevFormik,
      values: {
        ...prevFormik.values,
        page: newPage,
      },
    }));
  };

  
  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setFormik((prevFormik) => ({
      ...prevFormik,
      values: {
        ...prevFormik.values,
        rowsPerPage: newRowsPerPage,
        page: 0, 
      },
    }));
  };

 
  const filteredData = tableData
    ? tableData.filter((row) =>
        Object.values(row).some((value) =>
          String(value).toLowerCase().includes(searchText.toLowerCase())
        )
      )
    : [];

 

  const StyledTableHead = styled(TableHead)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    "& .MuiTableCell-root": {
      color: "white",
    },
  }));

  const StyledTableRow = styled(TableRow)({
    "&:hover": {
      backgroundColor: "#86A7FC",
    },
  });

  const StyledTableCell = styled(TableCell)({
    color: "black",
  });

  let title;
  if (status === "all") {
    if (dashbord === "true") {
      title = "DashBoard";
    } else {
      title = "All Leaves";
    }
  } else if (status === "pending") {
    title = "Pending Leaves";
  } else if (status === "") {
    title = "Pending Leaves";
  } else if (status === "approved") {
    title = "Approved Leaves";
  } else if (status === "rejected") {
    title = "Rejected Leaves";
  }

  return (
    <div>
      <Layout title={dashbord ? "DashBoard" : "LeaveManagement"}>
        <Grid item xs={12}>
          <h2>{title}</h2>
        </Grid>

        {dashbord === "true" ? (
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <Card>
                <CardContent style={{ textAlign: "center" }}>
                  <Typography variant="h6">Total Employees</Typography>
                  <Typography variant="h4">
                    {Employees && Employees.length}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Card>
                <CardContent style={{ textAlign: "center" }}>
                  <Typography variant="h6">Pending Leaves</Typography>
                  <Typography variant="h4">
                    {leaves &&
                      leaves.filter((item) => item.status === "pending").length}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Card>
                <CardContent style={{ textAlign: "center" }}>
                  <Typography variant="h6">Total Departments</Typography>
                  <Typography variant="h4">
                    {Departments && Departments.length}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        ) : null}
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          InputProps={{
            endAdornment: <Search />,
          }}
          style={{
            marginBottom: "10px",
            marginRight: "10px",
            marginTop: "10px",
          }}
        />

        <TableContainer component={Paper}>
          <Table>
            <StyledTableHead>
              <TableRow>
                <StyledTableCell>Sl. No</StyledTableCell>
                <StyledTableCell>Type of Leave</StyledTableCell>
                <StyledTableCell>Description</StyledTableCell>
                <StyledTableCell>From</StyledTableCell>
                <StyledTableCell>To</StyledTableCell>

                <StyledTableCell>Status</StyledTableCell>
                <StyledTableCell>Posting Date</StyledTableCell>
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
                    
                      <StyledTableCell>
                        {
                          leavetypes.find(
                            (type) => type.id === row.leave_type_id
                          )?.description
                        }
                      </StyledTableCell>
                      <StyledTableCell>{row.comments}</StyledTableCell>
                      <StyledTableCell>
                        {new Date(row.start_date).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </StyledTableCell>
                     
                      <StyledTableCell>
                        {new Date(row.end_date).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </StyledTableCell>

                      <StyledTableCell>{row.status}</StyledTableCell>
                      <StyledTableCell>
                        {formatDateForTextField(row.submission_date)}
                      </StyledTableCell>
                      <StyledTableCell>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleEditClick(row.leave_id)}
                          startIcon={<EditIcon />}
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
            rowsPerPage={formik.values.rowsPerPage}
            page={formik.values.page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelDisplayedRows={({ from, to, count }) =>
              `showing ${from} to ${to} of ${count} entries`
            }
          />
        </div>

        <Dialog open={formik.values.openEditDialog} onClose={handleDialogClose}>
          <DialogTitle>Edit Leave Details</DialogTitle>
          <DialogContent>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "20px",
                marginTop: "20px",
              }}
            >
              <InputLabel>Status</InputLabel>
              <Select
                label="Status"
                value={formik.values.editEmployeeData.status}
                onChange={(e) => handleFieldChange("status", e.target.value)}
                style={{ marginBottom: "10px" }}
              >
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="approved">Approved</MenuItem>
                <MenuItem value="rejected">Rejected</MenuItem>
              </Select>
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
      </Layout>
    </div>
  );
};

export default AdminDashBoardTable;
