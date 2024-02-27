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

function CompanyTargetPage() {
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

  function getStyles() {
    return {
      fontSize: "0.7rem",
      color: "grey",
      fontFamily: "Poppins",
    };
  }

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

  const [departmentLists, setDepartmentLists] = React.useState([]);
  const [departmentId, setDepartmentId] = React.useState("");
  const [Search, setSearch] = React.useState("");


  const [list, setList] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [totalElements, setTotalElements] = React.useState(0);

  const [create, setCreate] = React.useState(1);
  const [update, setUpdate] = React.useState(1);
  const [deletePr, setDeletePr] = React.useState(1);

  const handleDelete = (year,id) => {
    axios
      .delete(apis.server + `/company-targets/${id}/${year}`, {
        headers: {
          Authorization: `Bearer ${localStorage.token ? localStorage.token : ""
            }`,
        },
      })
      .then((res) => {
          getList();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getList = () => {
    axios
      .get(apis.server + "/company-targets/filter", {
        params: {
          departmentId: departmentId ? departmentId : null,
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

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
    getList();
    fetchUnitData();
  }, [departmentId, Search, page, rowsPerPage]);

  return (
    <div>
      <Header />
      <div className="right-content">
        <div className="tittle-content">Target & Existing</div>
        <div className="row center-row">
          <div className="filter-row">
            {localStorage.bup === "ALL" ?
              <FormControl sx={{ m: 0, width: 200, mt: 0 }}>
                <Select
                  id="BUP"
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
              : ""}

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
                  navigate("/sales-target/add")
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
                  <StyledTableCell>Unit/Department</StyledTableCell>
                  <StyledTableCell align="center">Year</StyledTableCell>
                  <StyledTableCell align="center">Target</StyledTableCell>
                  <StyledTableCell align="center">Existing</StyledTableCell>
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
                      {row.department.name ? row.department.name: "-"}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.year ? row.year : "-"}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.target ? row.target : "-"}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.existing ? row.existing : "-"}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Stack direction="row" justifyContent="center">
                        <IconButton
                          aria-label="delete"
                          color="error"
                          onClick={(_) => {
                            if (deletePr == 1) {
                              handleDelete(row.year, row.department.id);
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
                              navigate("/sales-target/edit", {
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

export default CompanyTargetPage;
