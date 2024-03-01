import React from "react";
import Header from "../components/Header";
import "../assets/css/customer.css";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
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
import { Backdrop, CircularProgress } from "@mui/material";


import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";


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

function SalesLeadsPage() {
  const navigate = useNavigate();
  const ITEM_HEIGHT = 30;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      },
    },
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

  function getStyles() {
    return {
      fontSize: "0.7rem",
      color: "grey",
      fontFamily: "Poppins",
    };
  }

  const statusList = ["Open", "Close"];
  const currentStageList = [
    "Opportunities",
    "Proposal",
    "Negotiation",
    "Deals",
    "Dropped",
  ];

  const [departmentId, setDepartmentId] = React.useState("");

  const [departmentLists, setDepartmentLists] = React.useState([]);
  const [Stage, setStage] = React.useState("");
  const [Status, setStatus] = React.useState("");
  const [Search, setSearch] = React.useState("");

  const [list, setList] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [totalElements, setTotalElements] = React.useState(0);

  const [create, setCreate] = React.useState(1);
  const [update, setUpdate] = React.useState(1);
  const [deletePr, setDeletePr] = React.useState(1);
  const [deletedID, setDeletedID] = React.useState(null);


  const [openLoad, setOpenLoad] = React.useState(false);
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

  const getList = () => {
    axios
      .get(apis.server + "/salesleads/filter", {
        params: {
          departmentId: departmentId ? departmentId : null,
          stage: Stage ? Stage : null,
          status: Status ? Status : null,
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

  const handleDelete = (id) => {
    setOpen(false)
    setOpenLoad(true);
    axios
      .delete(apis.server + `/salesleads/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.token ? localStorage.token : ""
            }`,
        },
      })
      .then((res) => {
        if (res.status === 204) {
          getList();
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setOpenLoad(false);
    setOpen(false)
  };

  function formatRupiah(angka, prefix) {
    var number_string = angka.replace(/[^,\d]/g, "").toString();
    var split = number_string.split(",");
    var sisa = split[0].length % 3;
    var rupiah = split[0].substr(0, sisa);
    var ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    if (ribuan) {
      var separator = sisa ? "." : "";
      rupiah += separator + ribuan.join(".");
    }

    rupiah = split[1] !== undefined ? rupiah + "," + split[1] : rupiah;
    return prefix === undefined ? rupiah : rupiah ? "Rp. " + rupiah : "";
  }

  const fetchUnitData = () => {
    axios
      .get(apis.server + `/departments`, {
        headers: {
          Authorization: `Bearer ${localStorage.token ? localStorage.token : ""
            }`,
        },
      })
      .then((res) => {
        setDepartmentLists(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    setOpenLoad(true)
    getList();
    fetchUnitData();
    setOpenLoad(false)
  }, [departmentId, Stage, Status, Search, page, rowsPerPage]);

  return (
    <div>
      <Modal
        open={open}
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
                if (modalTittle === "Warning - Delete") {
                  if (deletePr === 1) {
                    handleDelete(deletedID);
                  } else {
                    navigate("/403");
                  }
                }
              }}
            >
              OK
            </div>

            <div
              className="btn-half-cancel"
              onClick={() => {
                setOpen(false);
                setOpenLoad(false);
              }}
            >
              Cancel
            </div>
          </div>
        </Box>
      </Modal>
      <Header />
      <div className="right-content">
        <div className="tittle-content">Prospect/Leads</div>
        <div className="row center-row">
          <div className="filter-row">
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={openLoad}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
              <FormControl sx={{ m: 0, width: 200, mt: 0 }}>
                <Select
                  id="unit"
                  className="input-style"
                  size="small"
                  displayEmpty
                  value={departmentLists.find((departement) => departement.id === departmentId)?.name}
                  onChange={(e) => setDepartmentId(departmentLists.find((departement) => departement.name === e.target.value)?.id)}
                  input={<OutlinedInput />}
                  renderValue={(selected) => {
                    if (selected) {
                      return <label style={getStyles()}>{selected}</label>;
                    }
                    return <em style={getStyles()}>Unit</em>;
                  }}
                  MenuProps={MenuProps}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem key="1" value="" style={getStyles()}>
                    <em>Pilih Unit</em>
                  </MenuItem>
                  {departmentLists.map((departement, index) => (
                    <MenuItem key={departement.id} value={departement.name} id={departement.id} style={getStyles()}>
                      {departement.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

            {/* current stage filter */}
            <FormControl sx={{ m: 0, width: 200, mt: 0 }}>
              <Select
                id="Stage"
                className="input-style"
                size="small"
                displayEmpty
                value={Stage}
                onChange={(e) => setStage(e.target.value)}
                input={<OutlinedInput />}
                renderValue={(selected) => {
                  if (selected) {
                    return <label style={getStyles()}>{selected}</label>;
                  }
                  return <em style={getStyles()}>Current Stage</em>;
                }}
                MenuProps={MenuProps}
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem key="2" value="" style={getStyles()}>
                  <em>Pilih Current Stage</em>
                </MenuItem>
                {currentStageList.map((name) => (
                  <MenuItem key={name} value={name} style={getStyles()}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* status filter */}
            <FormControl sx={{ m: 0, width: 200, mt: 0 }}>
              <Select
                id="status"
                className="input-style"
                size="small"
                displayEmpty
                value={Status}
                onChange={(e) => setStatus(e.target.value)}
                input={<OutlinedInput />}
                renderValue={(selected) => {
                  if (selected) {
                    return <label style={getStyles()}>{selected}</label>;
                  }
                  return <em style={getStyles()}>Status</em>;
                }}
                MenuProps={MenuProps}
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem key="3" value="" style={getStyles()}>
                  <em>Pilih Status</em>
                </MenuItem>
                {statusList.map((name) => (
                  <MenuItem key={name} value={name} style={getStyles()}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div className="search-bar input-style">
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
              onClick={() => navigate("/sales-lead/upload")}
            >
              <div className="btn-padding">
                <span className="material-icons-sharp">add</span>
              </div>
              <label style={{ color: "#718292" }}>Upload Data</label>
            </div>

            <div
              className="button-c"
              onClick={() => {
                setOpenLoad(true);
                const method = "GET";

                const url = apis.server + "/salesleads/export";

                axios

                  .request({
                    url,

                    method,
                    headers: {
                      Authorization: `Bearer ${localStorage.token ? localStorage.token : ""
                        }`,
                    },

                    responseType: "blob", //important
                  })

                  .then(({ data }) => {
                    const downloadUrl = window.URL.createObjectURL(
                      new Blob([data])
                    );

                    const link = document.createElement("a");

                    link.href = downloadUrl;

                    const currentDate = new Date();

                    // Get individual components of the date and time
                    const year = currentDate.getFullYear();
                    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
                    const day = String(currentDate.getDate()).padStart(2, '0');
                    const hours = String(currentDate.getHours()).padStart(2, '0');
                    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
                    const seconds = String(currentDate.getSeconds()).padStart(2, '0');

                    // Create the formatted timestamp
                    const formattedTimestamp = `${year}${month}${day}${hours}${minutes}${seconds}`;

                    // Create the static string with the timestamp
                    const staticString = `sales_leads_${formattedTimestamp}`;
                    link.setAttribute("download", staticString + ".xlsx"); //any other extension

                    document.body.appendChild(link);

                    link.click();

                    link.remove();
                    setOpenLoad(false);
                  });
              }}
            >
              <div className="btn-padding">
                <span className="material-icons-sharp">downloading</span>
              </div>
              <label style={{ color: "#718292" }}>Download Data</label>
            </div>
            <div
              className="button-c"
              onClick={() => {
                if (create === 1) {
                  navigate("/sales-lead/add");
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
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell>Company</StyledTableCell>
                  <StyledTableCell>Month</StyledTableCell>
                  <StyledTableCell align="center">Sales Name</StyledTableCell>
                  <StyledTableCell align="center">
                    Potential Customer Name
                  </StyledTableCell>
                  <StyledTableCell align="center">Product</StyledTableCell>
                  <StyledTableCell align="center">Unit/Department</StyledTableCell>
                  <StyledTableCell align="center">
                    Current Stage
                  </StyledTableCell>
                  <StyledTableCell align="center">Aging</StyledTableCell>
                  <StyledTableCell align="center">Status</StyledTableCell>
                  <StyledTableCell align="center">
                    Projected Value
                  </StyledTableCell>
                  <StyledTableCell align="center">Notes</StyledTableCell>
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
                    <StyledTableCell component="th" scope="row">
                      <span
                        cl="dot"
                        style={{
                          backgroundColor: `${row.currentStage == "Opportunities"
                            ? row.countDays > 10
                              ? "red"
                              : row.countDays > 8
                                ? "yellow"
                                : "green"
                            : row.currentStage === "Proposal"
                              ? row.countDays > 20
                                ? "red"
                                : row.countDays > 18
                                  ? "yellow"
                                  : "green"
                              : row.currentStage === "Proposal"
                                ? row.countDays > 20
                                  ? "red"
                                  : row.countDays > 18
                                    ? "yellow"
                                    : "green"
                                : row.currentStage === "Negotiation"
                                  ? row.countDays > 40
                                    ? "red"
                                    : row.countDays > 40 - 2
                                      ? "yellow"
                                      : "green"
                                  : row.currentStage === "Deals"
                                    ? row.countDays > 20
                                      ? "red"
                                      : row.countDays > 20 - 2
                                        ? "yellow"
                                        : "green"
                                    : row.currentStage === "Dropped"
                                      ? row.countDays > 20
                                        ? "red"
                                        : row.countDays > 20 - 2
                                          ? "yellow"
                                          : "green" : ""
                            }`,
                        }}
                      ></span>
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {row.product.department.company.name ? row.product.department.company.name : "-"}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {row.month ? row.month : "-"}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.salesName ? row.salesName : "-"}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.potentialCustomer ? row.potentialCustomer : "-"}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.product.name ? row.product.name : "-"}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.product.department.name ? row.product.department.name : "-"}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.currentStage ? row.currentStage : "-"}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.countDays}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.leadsStatus ? row.leadsStatus : "-"}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.projectedValue
                        ? formatRupiah(row.projectedValue, "RP .")
                        : "-"}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.notes ? row.notes : "-"}
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
                              navigate("/sales-lead/edit", {
                                state: {
                                  customer: row,
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

export default SalesLeadsPage;
