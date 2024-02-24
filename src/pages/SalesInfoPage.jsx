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
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

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
function SalesInfoPage() {
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

  const BUPLists = localStorage.bup === "ALL" ? ["SWAMEDIA", "MOTIO", "SWADAMA"] : [localStorage.bup];

  const [BUP, setBUP] = React.useState(
    localStorage.bup === "ALL" ? "" : localStorage.bup
  );
  const [Status, setStatus] = React.useState("");
  const [Denda, setDenda] = React.useState("");
  const [Search, setSearch] = React.useState("");
  const [deletedID, setDeletedID] = React.useState(null);
  const [list, setList] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [totalElements, setTotalElements] = React.useState(0);
  const [openLoad, setOpenLoad] = React.useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  function getStyles() {
    return {
      fontSize: "0.7rem",
      color: "grey",
      fontFamily: "Poppins",
    };
  }

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
    axios
      .delete(apis.server + `/invoice/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.token ? localStorage.token : ""
            }`,
        },
      })
      .then((res) => {
        if (res.data.statusCode == 200) {
          getList();
          setOpenLoad(false);
          setOpen(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [create, setCreate] = React.useState(1);
  const [update, setUpdate] = React.useState(1);
  const [deletePr, setDeletePr] = React.useState(1);


  useEffect(() => {
    getList();
  }, [BUP, Status, Denda, Search, page, rowsPerPage]);

  const getList = () => {
    setOpenLoad(true)
    axios
      .get(apis.server + "/invoice/list", {
        params: {
          bup: BUP ? BUP : null,
          denda: Denda ? Denda : null,
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
        setList(res.data.data.content);
        setTotalElements(res.data.data.totalElements);
        setOpenLoad(false)
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


  /* Fungsi */
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

    rupiah = split[1] != undefined ? rupiah + "," + split[1] : rupiah;
    return prefix == undefined ? rupiah : rupiah ? "Rp. " + rupiah : "";
  }


  const [open, setOpen] = React.useState(false);
  const [modalTittle, setModalTittle] = React.useState("Information");
  const [modalMessage, setModalMessage] = React.useState(
    "Data berhasil disimpan"
  );

  return (
    <div>
      <Header />
      <div className="right-content">
        <div className="tittle-content">Invoice & Cash-In</div>
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
                  if (modalTittle === "Warning - Delete ALL") {
                    if (deletePr == 1) {
                      setOpenLoad(true);
                      axios
                        .delete(apis.server + `/invoice/deleteall`, {
                          headers: {
                            Authorization: `Bearer ${localStorage.token ? localStorage.token : ""
                              }`,
                          },
                        })
                        .then((res) => {
                          if (res.data.statusCode == 200) {
                            getList();
                            setOpenLoad(false);
                            setOpen(false);
                          }
                        })
                        .catch((err) => {
                          console.log(err);
                        });
                    } else {
                      navigate("/403");
                    }
                  } else {
                    handleDelete(deletedID);
                    setOpenLoad(false);
                  }
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
            {localStorage.bup === "ALL" ? (
              <FormControl sx={{ m: 0, width: 200, mt: 0 }}>
                <Select
                  id="BUP"
                  className="input-style"
                  size="small"
                  displayEmpty
                  value={BUP}
                  onChange={(e) => setBUP(e.target.value)}
                  input={<OutlinedInput />}
                  renderValue={(selected) => {
                    if (selected) {
                      return <label style={getStyles()}>{selected}</label>;
                    }
                    return <em style={getStyles()}>Company</em>;
                  }}
                  MenuProps={MenuProps}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem key="1" value="" style={getStyles()}>
                    <em>Pilih Company</em>
                  </MenuItem>
                  {BUPLists.map((name) => (
                    <MenuItem key={name} value={name} style={getStyles()}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : (
              ""
            )}
            <div className="search-bar">
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
                setOpenLoad(true);
                const method = "GET";

                const url = apis.server + "/invoice/download";

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

                    const year = currentDate.getFullYear();
                    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
                    const day = String(currentDate.getDate()).padStart(2, '0');
                    const hours = String(currentDate.getHours()).padStart(2, '0');
                    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
                    const seconds = String(currentDate.getSeconds()).padStart(2, '0');

                    // Create the formatted timestamp
                    const formattedTimestamp = `${year}${month}${day}${hours}${minutes}${seconds}`;

                    // Create the static string with the timestamp
                    const staticString = `Sales_${formattedTimestamp}`;
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
                if (deletePr == 1) {
                  setOpen(true);
                  setModalTittle("Warning - Delete ALL");
                  setModalMessage(
                    "Apakah anda yakin ingin menghapus semua data ?"
                  );
                } else {
                  navigate("/403");
                }
              }}
            >
              <div className="btn-padding">
                <span className="material-icons-sharp">delete</span>
              </div>
              <label style={{ color: "#718292" }}>Delete All Data</label>
            </div>
            <div
              className="button-c"
              onClick={() => {
                if (create == 1) {
                  navigate("/sales/add");
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
                  <StyledTableCell>Company</StyledTableCell>
                  <StyledTableCell align="center">Tenant</StyledTableCell>
                  <StyledTableCell align="center">
                    Invoice Number
                  </StyledTableCell>
                  <StyledTableCell align="center">Invoice Date</StyledTableCell>
                  <StyledTableCell align="center">
                    Tenant's Invoice Received Date
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    Due Date
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    Principal Receipt (Rp)
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    Principal Payment Date
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
                      {row.bup ? row.bup : "-"}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.tenant ? row.tenant : "-"}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.nomerInvoice ? row.nomerInvoice : "-"}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.tglInvoice
                        ? row.tglInvoice
                        : "-"}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.tglInvoiceDiterimaTenant ? row.tglInvoiceDiterimaTenant : "-"}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.tglJatuhTempo ? row.tglJatuhTempo : "-"}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.pokokPenerimaan
                        ? formatRupiah(row.pokokPenerimaan, "RP .")
                        : "-"}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.tglMasukRekeningPokok
                        ? row.tglMasukRekeningPokok
                        : "-"}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.keterangan ? row.keterangan : "-"}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Stack direction="row" spacing={1}>
                        <IconButton
                          aria-label="delete"
                          color="error"
                          onClick={(_) => {
                            if (deletePr == 1) {
                              setOpen(true);
                              setModalTittle("Warning - Delete");
                              setModalMessage(
                                "Apakah anda yakin ingin menghapus data ?"
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
                            if (update == 1) {
                              navigate("/sales/edit", {
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

export default SalesInfoPage;
