import React from "react";
import Header from "../components/Header.jsx";
import "../assets/css/customer.css";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import TablePagination from "@mui/material/TablePagination";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Stack from "@mui/material/Stack";
import apis from "../apis.js";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Alert, Button, Snackbar } from "@mui/material";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#f8faff",
  border: "1px solid #dfe5f3",
  boxShadow: 24,
  borderRadius: "3px",
  p: 4,
  fontSize: "0.7rem",
  color: "grey",
  fontFamily: "Poppins",
};

function ProductPage() {
  const navigate = useNavigate();

  const [list, setList] = React.useState([]);

  const [Search, setSearch] = React.useState("");
  const [deletedID, setDeletedID] = React.useState(null);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [totalElements, setTotalElements] = React.useState(0);
  const [openLoad, setOpenLoad] = React.useState(false);

  const [create, setCreate] = React.useState(1);
  const [update, setUpdate] = React.useState(1);
  const [deletePr, setDeletePr] = React.useState(1);

  const [open, setOpen] = React.useState(false);
  const [modalTittle, setModalTittle] = React.useState("Information");
  const [modalMessage, setModalMessage] = React.useState(
    "Data berhasil disimpan"
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };


  function getStylesM() {
    return {
      fontSize: "0.9rem",
      color: "grey",
      fontFamily: "Poppins",
    };
  }

  function getStylesH() {
    return {
      fontSize: "1.2rem",
      color: "grey",
      fontFamily: "Poppins",
    };
  }

  const handleDelete = (id) => {
    setOpenLoad(false);
    setOpen(true);
    axios
      .delete(apis.server + `/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.token ? localStorage.token : ""
            }`,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.status === 204) {
          getList();
          setOpenLoad(false);
          setOpen(false);
        } 
      })
      .catch((err) => {
        if (err?.request?.status === 409) {
          setAlertMessage("The data is currently in use and cannot be deleted. \n Please try again later or contact support for assistance.");
          setOpenSnackBar(true);
          setOpenLoad(false);
          setOpen(false);
        }
        console.log(err);
      });
  };

  const getList = () => {
    axios
      .get(apis.server + "/products/filter", {
        params: {
          search: Search ? Search : null,
          page: page,
          size: rowsPerPage,
        },
        headers: {
          Authorization: `Bearer ${localStorage.token ? localStorage.token : ""
            }`,
        },
      })
      .then((res) => {
        setList(res.data.content);
        setTotalElements(res.data.totalElements);
      })
      .catch((err) => {
        console.error({ err });
      });
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#E5EDFF",
      color: "#8697B6",
      fontWeight: "bold",
      fontFamily: "Poppins",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: "small",
      fontFamily: "Poppins",
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({

    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));



  useEffect(() => {
    setOpenLoad(true)
    getList();
    setOpenLoad(false)
  }, [Search, page, rowsPerPage]);


  const [openSnackbar, setOpenSnackBar] = React.useState(false);

  const [alert, setAlertMessage] = React.useState("");


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackBar(false);
  };
  return (
    <div>
        <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}>
          <Alert
            onClose={handleClose}
            severity="warning"
            sx={{ width: '100%' }}
          >
            {alert}
          </Alert>
        </Snackbar>
      <Header />
      <div className="right-content">
        <div className="tittle-content">Product</div>
        <Modal
          open={open}
          // onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              style={getStylesH()}
              id="modal-modal-title"
              variant="h6"
              component="h2"
            >
              {modalTittle}
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2, mb: 4 }}
              style={getStylesM()}
            >
              {modalMessage}
            </Typography>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-end",
                width: "100%",
                justifyContent: "flex-end",
              }}
            >
              <div
                className="btn-half"
                onClick={() => {
                  handleDelete(deletedID);
                  setOpenLoad(false);
                }}
              >
                OK
              </div>

              <div
                className="btn-half-cancel"
                onClick={() => {
                  setOpen(false);
                }}
              >
                Cancel
              </div>
            </div>
          </Box>
        </Modal>
        <div className="row center-row">
          <div className="filter-row">
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={openLoad}
            >
              <CircularProgress color="inherit" />
            </Backdrop>

            <div className="search-bar  input-style">
              <input
                type="search"
                placeholder="Search"
                value={Search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <span className="material-icons-sharp"> search </span>
            </div>
          </div>
          <div className="add-btn-row">
            <div
              className="button-c"
              onClick={() => {
                if (create == 1) {
                  navigate("/product/add");
                } else {
                  navigate("/403");
                }
              }}
            >
              <div className="btn-padding">
                <span className="material-icons-sharp">add</span>
              </div>
              <label style={{ color: "#718292" }}>Add Data</label>
            </div>
          </div>
        </div>
        <div className="row-style">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Id</StyledTableCell>
                  <StyledTableCell align="center">
                    Product
                  </StyledTableCell>
                  <StyledTableCell align="center">Company</StyledTableCell>
                  <StyledTableCell align="center">Department Name</StyledTableCell>
                  <StyledTableCell align="center">
                    Created Date
                  </StyledTableCell>
                  <StyledTableCell align="center">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {list.length === 0 ? (
                  <StyledTableRow align="center" key="not-found">
                    <StyledTableCell align="center" component="th" scope="row">
                      Data Not Found
                    </StyledTableCell>
                  </StyledTableRow>
                ) : (
                  <></>
                )}

                {list.map((row) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell align="center">
                      {row.id
                        ? row.id
                        : "-"}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.name
                        ? row.name
                        : "-"}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.department?.company?.name
                        ? row.department?.company?.name
                        : "-"}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.department?.name
                        ? row.department?.name
                        : "-"}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.createdAt
                        ? row.createdAt
                        : "-"}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Stack direction="row" spacing={1}>
                        <IconButton
                          aria-label="delete"
                          color="error"
                          onClick={(_) => {
                            if (deletePr === 1) {
                              setOpen(true);
                              setModalTittle("Warning - Delete");
                              setModalMessage(
                               "Are you sure you want to delete the data?"
                              );
                              setDeletedID(row.id);
                            } else {
                              navigate("/403");
                            }
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                        <IconButton
                          aria-label="edit"
                          color="primary"
                          onClick={(_) => {
                            if (update === 1) {
                              navigate("/product/edit", {
                                state: {
                                  sales: row,
                                },
                              });
                            } else {
                              navigate("/403");
                            }
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      </Stack>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div>
            <TablePagination
              component="div"
              count={totalElements}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
