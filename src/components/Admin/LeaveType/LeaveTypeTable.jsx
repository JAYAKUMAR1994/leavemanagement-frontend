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
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material"; // Import the Edit and Delete icons
import {
  deleteLeavetype,
  updateLeaveType,
} from "../../../components/Api/api";
import Layout from "../../Layout";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LeaveTypeTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchText, setSearchText] = useState("");
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editLeavetypeData, setEditLeavetypeData] = useState({
    id: null,
    leavetype: "",
    description: "",
    creationdate: new Date(),
  });
  const dispatch = useDispatch();

  const tableData = useSelector((state) => state.leavetype.leaveTypes);

  console.log('leavetype',tableData)
  const filteredData = tableData
    ? tableData.filter((row) =>
        Object.values(row).some((value) =>
          String(value).toLowerCase().includes(searchText.toLowerCase())
        )
      )
    : [];

  const handleEditClick = (leavetypeId) => {
    const selectedLeavetype = tableData.find(
      (leavetype) => leavetype.id === leavetypeId
    );

    if (selectedLeavetype) {
      setEditLeavetypeData({
        id: selectedLeavetype.id,
        leavetype: selectedLeavetype.leavetype,
        description: selectedLeavetype.description,
        creationdate: selectedLeavetype.creationdate,
      });
      setOpenEditDialog(true);
    }
  };

  const handleDeleteClick = (leavetypeId) => {
    dispatch(deleteLeavetype(leavetypeId));
    toast.success("LeaveType Deleted Successfully!", {
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
    setEditLeavetypeData((prevleavetype) => ({
      ...prevleavetype,
      [fieldName]: value,
    }));
  };

  const handleSaveChanges = () => {
    dispatch(updateLeaveType(editLeavetypeData));
    toast.success("LeaveType Updated Successfully!", {
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
      backgroundColor: "#86A7FC",
    },
  });

  const StyledTableCell = styled(TableCell)({
    color: "black",
  });

  return (
    <>
      <Layout title="manageleavetype">
        <Grid item xs={12}>
          <h2>Manage Leave-Type</h2>
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
                  <StyledTableCell>Leave Type</StyledTableCell>
                  <StyledTableCell>Description</StyledTableCell>
                  <StyledTableCell>Creation Date</StyledTableCell>
                  <StyledTableCell>Action</StyledTableCell>
                </TableRow>
              </StyledTableHead>
              <TableBody>
                {filteredData.length === 0 ? (
                  <TableRow>
                    <StyledTableCell colSpan={8} align="center">
                      No records found
                    </StyledTableCell>
                  </TableRow>
                ) : (
                  filteredData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                      <StyledTableRow key={index}>
                        <StyledTableCell>{index + 1}</StyledTableCell>
                        <StyledTableCell>{row.leavetype}</StyledTableCell>
                        <StyledTableCell>{row.description}</StyledTableCell>
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
                          {/* Add Delete button functionality */}
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
                  label="Leave Type"
                  value={editLeavetypeData?.leavetype || ""}
                  onChange={(e) =>
                    handleFieldChange("leavetype", e.target.value)
                  }
                  style={{ marginBottom: "10px" }}
                />
                <TextField
                  label="Description"
                  value={editLeavetypeData?.description || ""}
                  onChange={(e) =>
                    handleFieldChange("description", e.target.value)
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

export default LeaveTypeTable;
