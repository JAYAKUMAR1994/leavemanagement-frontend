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
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import {
  updateDepartment,
  deleteDepartment,
} from "../../../components/Api/api";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material"; // Import the Edit and Delete icons
import Layout from "../../Layout";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DepartmentTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchText, setSearchText] = useState("");
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [editDepartmentData, setEditDepartmentData] = useState({
    id: null,
    deptcode: "",
    deptname: "",
    deptshortname: "",
    creationdate: new Date(), // Assuming 'date' is a variable with the current date
  });
  const dispatch = useDispatch();

  const tableData = useSelector((state) => state.department.departments);

  const filteredData = tableData
    ? tableData.filter((row) =>
        Object.values(row).some((value) =>
          String(value).toLowerCase().includes(searchText.toLowerCase())
        )
      )
    : [];

  const handleEditClick = (departmentId) => {
    const selectedDepartment = tableData.find(
      (department) => department.id === departmentId
    );

    if (selectedDepartment) {
      setEditDepartmentData({
        id: selectedDepartment.id,
        deptcode: selectedDepartment.deptcode,
        deptname: selectedDepartment.deptname,
        deptshortname: selectedDepartment.deptshortname,
        creationdate: selectedDepartment.creationdate,
      });
      setOpenEditDialog(true);
    }
  };

  const handleDeleteClick = (departmentId) => {
    dispatch(deleteDepartment(departmentId));
    toast.success("Department Deleted Successfully!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const handleDialogClose = () => {
    setOpenEditDialog(false);
    // Additional logic for updating data in case of edits
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFieldChange = (fieldName, value) => {
    setEditDepartmentData((prevDepartment) => ({
      ...prevDepartment,
      [fieldName]: value,
    }));
  };

  const handleSaveChanges = () => {
    dispatch(updateDepartment(editDepartmentData));
    toast.success("Department Updated Successfully!", {
      position: toast.POSITION.TOP_CENTER,
    });
    setOpenEditDialog(false);
  };

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

  return (
    <>
      <Layout title="DepartmentManagement">
        <Grid item xs={12}>
          <h2>Department Management</h2>
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
              {/* <TableHead> */}
              <StyledTableHead>
                <StyledTableCell>Sl. No</StyledTableCell>
                <StyledTableCell>Dept Code</StyledTableCell>
                <StyledTableCell>Dept Name</StyledTableCell>
                <StyledTableCell>Dept Short Name</StyledTableCell>
                <StyledTableCell>Creation Date</StyledTableCell>
                <StyledTableCell>Action</StyledTableCell>
              </StyledTableHead>
              {/* </TableHead> */}
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
                        <StyledTableCell>{row.deptcode}</StyledTableCell>
                        <StyledTableCell>{row.deptname}</StyledTableCell>
                        <StyledTableCell>{row.deptshortname}</StyledTableCell>
                        <StyledTableCell>
                          {new Date(row.creationdate).toLocaleDateString()}
                        </StyledTableCell>
                        <StyledTableCell>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleEditClick(row.id)}
                            startIcon={<EditIcon />}
                          ></Button>
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => handleDeleteClick(row.id)}
                            startIcon={<DeleteIcon />}
                            style={{ marginLeft: "5px" }}
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
            <DialogTitle>Edit Department</DialogTitle>
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
                  label="Dept Code"
                  value={editDepartmentData?.deptcode || ""}
                  onChange={(e) =>
                    handleFieldChange("deptcode", e.target.value)
                  }
                  style={{ marginBottom: "10px" }}
                />
                <TextField
                  label="Dept Name"
                  value={editDepartmentData?.deptname || ""}
                  onChange={(e) =>
                    handleFieldChange("deptname", e.target.value)
                  }
                  style={{ marginBottom: "10px" }}
                />
                <TextField
                  label="Dept Short Name"
                  value={editDepartmentData?.deptshortname || ""}
                  onChange={(e) =>
                    handleFieldChange("deptshortname", e.target.value)
                  }
                  style={{ marginBottom: "10px" }}
                />

                {/* Add more fields as needed */}
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

export default DepartmentTable;
