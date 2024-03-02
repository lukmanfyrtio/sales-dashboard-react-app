import React, { useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation, useNavigate } from "react-router-dom";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextareaAutosize from "@mui/material/TextareaAutosize";

import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Stack from "@mui/material/Stack";
import axios from "axios";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import apis from "../apis.js";
import { Alert } from "@mui/material";
import moment from "moment/moment.js";

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

const initialSalesRevenueState = {
  id: '',
  invoiceNumber: '',
  invoiceDate: null,
  dueDate: null,
  principalReceipt: '',
  principalReceiptEntryDate: null,
  notes: '',
  // dueDateStatus: '',
  // agingSinceReceived: '',
  // penalty: '',
  // agingInvoiceDescription: '',
  // paymentAging: '',
  department: null,
  salesLeads: null,
};

const ITEM_HEIGHT = 30;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

function SalesRevenueForm(props) {
  const navigate = useNavigate();
  const { state } = useLocation();

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

  const [modalMessage, setModalMessage] = React.useState(
    "Data berhasil disimpan"
  );
  const [isEdit, setIsEdit] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [modalTittle, setModalTittle] = React.useState("Information");

  const [alert, setAlertMessage] = React.useState(null);

  const [salesRevenue, setSalesRevenue] = useState(initialSalesRevenueState);
  const [departmentLists, setDepartmentLists] = React.useState([]);
  const [departmentId, setDepartmentId] = React.useState("");
  const [departmentName, setDepartmentName] = React.useState("");

  const [salesLeadLists, setSalesLeadLists] = React.useState([]);
  const [salesLeadsId, setSalesLeadsId] = React.useState("");
  const [salesLeadsName, setSalesLeadsName] = React.useState("");

  const resetSalesRevenue = () => {
    setSalesRevenue(initialSalesRevenueState);
  };

  const updateDepartment = (departement) => {
    setSalesRevenue((prevSalesRevenue) => ({
      ...prevSalesRevenue,
      department: departement,
    }));
  };

  const updateSalesLeads = (salesLeads) => {
    setSalesRevenue((prevSalesRevenue) => ({
      ...prevSalesRevenue,
      salesLeads: salesLeads
    }));
  };

  const setKeyValue = (key, value) => {
    setSalesRevenue((prevState) => ({
      ...prevState,
      [key]:  value instanceof Date ? moment(value).format('YYYY/MM/DD') : value
    }));
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

  const fetchLeads = () => {
    axios
      .get(apis.server + `/salesleads`, {
        headers: {
          Authorization: `Bearer ${localStorage.token ? localStorage.token : ""
            }`,
        },
      })
      .then((res) => {
        setSalesLeadLists(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetchLeads();
    fetchUnitData();
    if (state?.sales) {
      console.log(state.sales);
      setIsEdit(true);
      const salesRevenue = state.sales;
      setSalesRevenue(salesRevenue);
      setSalesLeadsId(salesRevenue?.id)
      setSalesLeadsName(salesRevenue?.salesLeads?.potentialCustomer+"@"+salesRevenue?.salesLeads?.id);
      setDepartmentId(salesRevenue?.department?.id);
      setDepartmentName(salesRevenue?.department?.name);
      updateDepartment(salesRevenue?.department);
      updateSalesLeads(salesRevenue?.salesLeads);
    } else {
      setIsEdit(false);
    }
  }, []);

  useEffect(() => {
    console.log(salesRevenue);
  }, [salesRevenue]);
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

    rupiah = split[1] !== undefined ? rupiah + "," + split[1] : rupiah;
    return prefix === undefined ? rupiah : rupiah ? "Rp. " + rupiah : "";
  }

  function submitData() {

    if (
      salesRevenue.invoiceNumber === '' ||
      salesRevenue.invoiceDate === null ||
      salesRevenue.dueDate === null ||
      salesRevenue.principalReceipt === '' ||
      salesRevenue.principalReceiptEntryDate === null ||
      salesRevenue.salesLeads === null
    ) {
      setAlertMessage("Please fill in all required fields");
      return;
    }
    const modifiedSalesRevenue = {
      ...salesRevenue,
      principalReceipt: salesRevenue.principalReceipt.replace(/^\Rp\. /, "").replace(/\./g, ""),
    };
    console.log(modifiedSalesRevenue);
    axios({
      method: `${isEdit
        ? `put`
        : "post"
        }`,
      url: `${isEdit
        ? `${apis.server}/sales-revenue/${salesRevenue.id}`
        : apis.server + "/sales-revenue"
        }`,
      data: modifiedSalesRevenue,
      headers: {
        Authorization: `Bearer ${localStorage.token ? localStorage.token : ""}`,
      },
    })
      .then((res) => {
        if (res.data.success === "false") {
          setModalMessage(res.data.message);
          setModalTittle("Warning");
        } else {
          setModalMessage("Data berhasil disimpan");
          setModalTittle("Information");
        }
        setOpen(true);
      })
      .catch((err) => {
        console.error({ err });
      });
  }

  return (
    <div>
      <Header />
      <div className="right-content">
        <div className="tittle-content">
          <ArrowBackIcon
            className="back-arrow"
            onClick={() => navigate("/sales-revenue")}
          />{" "}
          <label>{isEdit ? "Edit" : "Add"} Invoice & Cash-In</label>
        </div>
        <div className="form-box">
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
                    modalTittle === "Warning"
                      ? setOpen(false)
                      : navigate("/sales-revenue");
                  }}
                >
                  OK
                </div>
              </div>
            </Box>
          </Modal>
          <div className="row-form">
            <div className="row-left">
              <div className="column-form">

                <div className="input-i">
                  <label>Leads</label>
                  <div>
                    <FormControl sx={{ m: 0, width: 200, mt: 0 }}>
                      <Select
                        id="sales-leads"
                        className="input-style"
                        size="small"
                        displayEmpty
                        value={salesLeadsName.split("@")[0]}
                        onChange={(e) => {
                          console.log(e.target);
                          console.log(e.dataset);
                          const found = salesLeadLists.find((leads) => leads.potentialCustomer+"@"+leads.id === e.target.value);
                          setSalesLeadsId(found?.id)
                          setSalesLeadsName(found?.potentialCustomer+"@"+found?.id);
                          setDepartmentId(found?.product?.department?.id);
                          setDepartmentName(found?.product?.department?.name)
                          updateSalesLeads(found);
                          updateDepartment(found?.product?.department);
                        }}
                        input={<OutlinedInput />}
                        renderValue={(selected) => {
                          if (selected) {
                            return (
                              <label style={getStyles()}>{selected}</label>
                            );
                          }
                          return <em style={getStyles()}>Pilih</em>;
                        }}
                        MenuProps={MenuProps}
                        inputProps={{ "aria-label": "Without label" }}
                      >
                       <MenuItem key="unit data" value="unit data" style={getStyles()}>
                          <em>Pilih Sales Leads</em>
                        </MenuItem>
                        {salesLeadLists.map((lead) => (
                          <MenuItem key={lead.id} data-value="250" value={lead.potentialCustomer+"@"+lead.id} name="koyo" style={getStyles()}>
                            {lead.potentialCustomer}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <div className="input-i">
                  <label>Unit/Department</label>
                  <div className="input-i-txt">
                    <FormControl fullWidth>
                      <Select
                        disabled
                        id="departement"
                        // className="input-style"
                        value={departmentName}
                        onChange={(e) => {
                          const found = departmentLists.find((departement) => departement.name === e.target.value);
                          setDepartmentId(found?.id)
                          setDepartmentName(found?.name);
                        }}
                        size="small"
                        displayEmpty
                        input={<OutlinedInput />}
                        renderValue={(selected) => {
                          if (selected) {
                            return (
                              <label style={getStyles()}>{selected}</label>
                            );
                          }
                          return <em style={getStyles()}>-</em>;
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
                    <label
                      style={{
                        marginLeft: "1rem",
                        color: `${alert ? "red" : "#8697b6"
                          }`,
                        alignSelf: "center",
                      }}
                    >
                      *
                    </label>
                  </div>
                </div>

                <div className="input-i">
                  <label>Invoice Number </label>
                  <div className="input-i-txt">
                    <input
                      onChange={(e) => setKeyValue('invoiceNumber', e.target.value.toUpperCase())}
                      value={salesRevenue.invoiceNumber}
                    ></input>
                    <label
                      style={{
                        marginLeft: "1rem",
                        color: `${alert ? "red" : "#8697b6"
                          }`,
                        alignSelf: "center",
                      }}
                    >
                      *
                    </label>
                  </div>
                </div>

                <div className="input-i">
                  <label>Invoice Date</label>
                  <div>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Stack>
                        <DatePicker
                          inputFormat="dd/MM/yyyy"
                          format="dd/MM/yyyy"
                          openTo="day"
                          views={["year", "month", "day"]}
                          value={salesRevenue.invoiceDate}
                          onChange={(e) => setKeyValue('invoiceDate', e)}
                          renderInput={(params) => (
                            <TextField
                              inputProps={{ style: { fontSize: "5rem" } }}
                              size="small"
                              {...params}
                            />
                          )}
                        />
                      </Stack>
                    </LocalizationProvider>
                    <label
                      style={{
                        marginLeft: "1rem",
                        color: `${alert ? "red" : "#8697b6"
                          }`,
                        alignSelf: "center",
                      }}
                    >
                      *
                    </label>
                  </div>
                </div>

                <div className="input-i">
                  <label>Due Date</label>
                  <div>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Stack>
                        <DatePicker
                          inputFormat="dd/MM/yyyy"
                          format="dd/MM/yyyy"
                          openTo="day"
                          views={["year", "month", "day"]}
                          value={salesRevenue?.dueDate}
                          onChange={(e) => setKeyValue('dueDate', e)}
                          renderInput={(params) => (
                            <TextField
                              inputProps={{ style: { fontSize: "5rem" } }}
                              size="small"
                              {...params}
                            />
                          )}
                        />
                      </Stack>
                    </LocalizationProvider>
                    <label
                      style={{
                        marginLeft: "1rem",
                        color: `${alert ? "red" : "#8697b6"
                          }`,
                        alignSelf: "center",
                      }}
                    >
                      *
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="row-right">
              <div className="column-form">

                <div className="input-i">
                  <label>Principal Receipt (Rp)</label>
                  <div className="input-i-txt">
                    <input
                      // type="number"
                      onChange={(e) => setKeyValue('principalReceipt', e.target.value)}
                      value={formatRupiah(salesRevenue.principalReceipt ? salesRevenue.principalReceipt : "", "RP. ")}
                    ></input>
                    <label
                      style={{
                        marginLeft: "1rem",
                        color: `${alert ? "red" : "#8697b6"
                          }`,
                        alignSelf: "center",
                      }}
                    >
                      *
                    </label>
                  </div>
                </div>

                <div className="input-i">
                  <label>Principal Payment Date</label>
                  <div>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Stack>
                        <DatePicker
                          inputFormat="dd/MM/yyyy"
                          format="dd/MM/yyyy"
                          openTo="day"
                          views={["year", "month", "day"]}
                          value={salesRevenue.principalReceiptEntryDate}
                          onChange={(e) => setKeyValue('principalReceiptEntryDate', e)}
                          renderInput={(params) => (
                            <TextField
                              inputProps={{ style: { fontSize: "5rem" } }}
                              size="small"
                              {...params}
                            />
                          )}
                        />
                      </Stack>
                    </LocalizationProvider>
                    <label
                      style={{
                        marginLeft: "1rem",
                        color: `${alert ? "red" : "#8697b6"
                          }`,
                        alignSelf: "center",
                      }}
                    >
                      *
                    </label>
                  </div>
                </div>

                <div className="input-i">
                  <label>Notes</label>
                  <div>
                    <TextareaAutosize
                      aria-label="minimum height"
                      minRows={8}
                      className="text-area-s"
                      value={salesRevenue.notes}
                      onChange={(e) => setKeyValue('notes', e.target.value)}
                    />
                  </div>
                </div>

              </div>
            </div>
          </div>
          {alert !== null ? <Alert severity="error">{alert}</Alert> : ""}
          <div className="submit-form">
            <div className="btn-cancel" onClick={() => resetSalesRevenue()}>Reset</div>
            <div className="btn-half" onClick={() => submitData()}>
              Save
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SalesRevenueForm;
