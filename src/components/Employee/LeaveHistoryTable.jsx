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
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import {
  Search,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import {
  applyForLeave,
  deleteLeaves,
  updateLeave,
} from "../Api/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../Layout";

const LeaveHistoryTable = () => {
  const [searchText, setSearchText] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  const tableData = useSelector((state) => state.leaves.leaves);
  const leavetypes = useSelector((state) => state.leavetype.leaveTypes);

  const filteredData = tableData
    ? tableData.filter((row) =>
        Object.values(row).some((value) =>
          String(value).toLowerCase().includes(searchText.toLowerCase())
        )
      )
    : [];

  const StyledTableRow = styled(TableRow)({
    "&:hover": {
      backgroundColor: "#86A7FC",
    },
  });

  const StyledTableCell = styled(TableCell)({
    color: "black",
  });

  const formik = useFormik({
    initialValues: {
      searchText: "",
      rowsPerPage: 5,
      page: 0,
      openEditDialog: false,
      editEmployeeData: {
        leave_id: null,
        leave_type_id: "",
        from: new Date(),
        to: new Date(),
        description: "",
        status: "",
        creationdate: new Date(),
      },
    },
    onSubmit: (values) => {
      // Handle form submission here
    },
  });

  const StyledTableHead = styled(TableHead)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    "& .MuiTableCell-root": {
      color: "white",
    },
  }));

  console.log("render leavehistory");

  const handleEditClick = (leaveId) => {
    const selectedLeave = filteredData.find(
      (leave) => leave.leave_id === leaveId
    );
    if (selectedLeave) {
      formik.setValues({
        ...formik.values,
        openEditDialog: true,
        editEmployeeData: {
          leave_id: selectedLeave.leave_id,
          leave_type_id: selectedLeave.leave_type_id,
          from: new Date(selectedLeave.start_date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }),

          to: new Date(selectedLeave.end_date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }),
          description: selectedLeave.comments,
          status: selectedLeave.status,
          creationdate: new Date(
            selectedLeave.submission_date
          ).toLocaleDateString(),
        },
      });
    }
  };

  const handleDeleteClick = (leaveId) => {
    dispatch(deleteLeaves(leaveId));
    toast.success("Leave Deleted SuccessFully", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const handleDialogClose = () => {
    formik.setFieldValue("openEditDialog", false);
  };

  const handleChangePage = (event, newPage) => {
    formik((prevFormik) => ({
      ...prevFormik,
      values: {
        ...prevFormik.values,
        page: newPage,
      },
    }));
    // setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    formik((prevFormik) => ({
      ...prevFormik,
      values: {
        ...prevFormik.values,
        rowsPerPage: newRowsPerPage,
        page: 0, // Reset page when changing rows per page
      },
    }));
  };

  const handleFieldChange = (fieldName, value) => {
    formik.setFieldValue(fieldName, value);
  };

  const handleSaveChanges = () => {
    const { from, to, description } = formik.values.editEmployeeData;

    if (!description) {
      toast.error("Description Empty", { position: toast.POSITION.TOP_CENTER });
      return;
    }

    if (to < from) {
      // Show an error or handle validation failure

      toast.error('To Date" cannot be earlier than "From Date', {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    // Continue with the save changes logic
    dispatch(updateLeave(formik.values.editEmployeeData));
    toast.success("Leave Updated SuccessFully", {
      position: toast.POSITION.TOP_CENTER,
    });
    formik.setFieldValue("openEditDialog", false);
  };

  function formatDateForTextField(dateString) {
    if (typeof dateString === "string") {
      const [day, month, year] = dateString.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    }
    return "";
  }

  return (
    <>
      <Layout title="LeaveHistory">
        <Grid item xs={12}>
          <h2>Leave History</h2>
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
                        <TableCell>
                          {new Date(row.start_date).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            }
                          )}
                        </TableCell>
                        <TableCell>
                          {new Date(row.end_date).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })}
                        </TableCell>

                        <StyledTableCell>{row.status}</StyledTableCell>
                        <TableCell>
                          {new Date(row.submission_date).toLocaleDateString()}
                        </TableCell>
                        <StyledTableCell>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleEditClick(row.leave_id)}
                            startIcon={<EditIcon />}
                          ></Button>
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => handleDeleteClick(row.leave_id)}
                            startIcon={<DeleteIcon />}
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

          <Dialog
            open={formik.values.openEditDialog}
            onClose={handleDialogClose}
          >
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
                <FormControl fullWidth style={{ marginBottom: "10px" }}>
                  <InputLabel>Type of Leave</InputLabel>
                  <Select
                    value={formik.values.editEmployeeData.leave_type_id || ""}
                    onChange={(e) =>
                      handleFieldChange(
                        "editEmployeeData.leave_type_id",
                        e.target.value
                      )
                    }
                    label="Type of Leave"
                  >
                    {leavetypes.map((type) => (
                      <MenuItem key={type.id} value={type.id}>
                        {type.description}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  fullWidth
                  type="date"
                  label="From"
                  value={
                    formatDateForTextField(
                      formik.values.editEmployeeData.from
                    ) || ""
                  }
                  onChange={(e) =>
                    handleFieldChange(
                      "editEmployeeData.from",
                      new Date(e.target.value).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })
                    )
                  }
                  style={{ marginBottom: "10px" }}
                />

                <TextField
                  fullWidth
                  type="date"
                  label="To"
                  value={
                    formatDateForTextField(formik.values.editEmployeeData.to) ||
                    ""
                  }
                  onChange={(e) =>
                    handleFieldChange(
                      "editEmployeeData.to",
                      new Date(e.target.value).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })
                    )
                  }
                  style={{ marginBottom: "10px" }}
                />

                <TextField
                  label="Description"
                  value={formik.values.editEmployeeData.description || ""}
                  onChange={(e) =>
                    handleFieldChange(
                      "editEmployeeData.description",
                      e.target.value
                    )
                  }
                  style={{ marginBottom: "10px" }}
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

export default LeaveHistoryTable;
