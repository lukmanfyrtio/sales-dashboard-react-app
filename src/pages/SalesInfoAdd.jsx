import React, { useEffect } from "react";
import Header from "../components/Header";
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
import moment from "moment";

import apis from "../apis.js";

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

function SalesInfoAdd(props) {
  const navigate = useNavigate();

  //set select
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

  const BUPLists = localStorage.bup === "ALL" ? ["SWAMEDIA", "MOTIO", "SWADAMA"] : [localStorage.bup];

  const [modalMessage, setModalMessage] = React.useState(
    "Data berhasil disimpan"
  );
  const [isEdit, setIsEdit] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [modalTittle, setModalTittle] = React.useState("Information");

  
  const [id, setId] = React.useState();
  const [customers, setCustomers] = React.useState([]);
  const [BUP, setBup] = React.useState("");
  const [tglMasukRekeningPokok, setTglMasukRekeningPokok] = React.useState(null);
  const [tglInvoiceDiterimaTenant, setTglInvoiceDiterimaTenant] = React.useState(null);
  const [tglJatuhTempo, setTglJatuhTempo] = React.useState(null);
  const [tglInvoice, setTglInvoice] = React.useState(null);
  const [keterangan, setKeterangan] = React.useState("");
  const [noInvoice, setNoInvoice] = React.useState("");
  const [pokokPenerimaan, setPokokPenerimaan] = React.useState("");
  const [tenant, setTenant] = React.useState();

  const { state } = useLocation();
  useEffect(() => {
    axios.get(apis.server + "/dashboard/customers", {
      headers: {
        Authorization: `Bearer ${localStorage.token ? localStorage.token : ""
          }`,
      },
    })
    .then((res) => {
      setCustomers(res.data.data);
    })
    .catch((err) => {
      console.error({ err });
    });
    if (state?.sales) {
      const sales = state.sales;
      setIsEdit(true);
      setId(sales.id);
      setBup(sales.bup);
      setTenant(sales.tenant);
      setTglMasukRekeningPokok(
        sales.tglMasukRekeningPokok
          ? moment(sales.tglMasukRekeningPokok, "DD/MM/YYYY").toDate()
          : null
      );

      setNoInvoice(sales.nomerInvoice);
      setTglInvoice(
        sales.tglInvoice
          ? moment(sales.tglInvoice, "DD/MM/YYYY").toDate()
          : null
      );
      setTglInvoiceDiterimaTenant(
        sales.tglInvoiceDiterimaTenant
          ? moment(sales.tglInvoiceDiterimaTenant, "DD/MM/YYYY").toDate()
          : null
      );
      setTglJatuhTempo(sales.tglJatuhTempo
        ? moment(sales.tglJatuhTempo, "DD/MM/YYYY").toDate()
        : null);
      setPokokPenerimaan(sales.pokokPenerimaan);
      setTglMasukRekeningPokok(sales.tglMasukRekeningPokok
        ? moment(sales.tglMasukRekeningPokok, "DD/MM/YYYY").toDate()
        : null);
      setKeterangan(sales.keterangan);
    } else {
      setIsEdit(false);
    }
  }, []);

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

  function submitData() {
    axios({
      method: "post",
      url: `${isEdit
        ? `${apis.server}/invoice/edit/${id}`
        : apis.server + "/invoice/add"
        }`,
      data: {
        bup: BUP,
        tenant: tenant,
        nomerInvoice: noInvoice,
        tglInvoice: tglInvoice
          ? moment(new Date(tglInvoice)).format("DD/MM/YYYY")
          : "",
        tglInvoiceDiterimaTenant: tglInvoiceDiterimaTenant
          ? moment(new Date(tglInvoiceDiterimaTenant)).format("DD/MM/YYYY")
          : "",

        tglJatuhTempo: tglJatuhTempo
          ? moment(new Date(tglJatuhTempo)).format("DD/MM/YYYY")
          : "",
        pokokPenerimaan: pokokPenerimaan.replace(/^\Rp. /, "").replace(/\./g, ""),
        tglMasukRekeningPokok: tglMasukRekeningPokok
          ? moment(new Date(tglMasukRekeningPokok)).format("DD/MM/YYYY")
          : "",
        keterangan: keterangan,
      },
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
            onClick={() => navigate("/sales")}
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
                      : navigate("/sales");
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
                {id ? (
                  <div className="input-i">
                    <label>ID Sales</label>
                    <div>
                      <label>{id}</label>
                    </div>
                  </div>
                ) : (
                  ""
                )}

                <div className="input-i">
                  <label>Company</label>
                  <div>
                    <FormControl sx={{ m: 0, width: 200, mt: 0 }}>
                      <Select
                        id="BUP"
                        className="input-style"
                        size="small"
                        displayEmpty
                        value={BUP}
                        onChange={(e) => setBup(e.target.value)}
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
                        <MenuItem key="BUP" value="BUP" style={getStyles()}>
                          <em>Pilih Company</em>
                        </MenuItem>
                        {BUPLists.map((name) => (
                          <MenuItem key={name} value={name} style={getStyles()}>
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                </div>

                <div className="input-i">
                  <label>Customer</label>
                  <div>
                    <FormControl sx={{ m: 0, width: 200, mt: 0 }}>
                      <Select
                        id="Tenant"
                        className="input-style"
                        size="small"
                        displayEmpty
                        value={tenant}
                        onChange={(e) => setTenant(e.target.value)}
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
                        <MenuItem key="BUP" value="BUP" style={getStyles()}>
                          <em>Pilih Customer</em>
                        </MenuItem>
                        {customers.map((name) => (
                          <MenuItem key={name} value={name} style={getStyles()}>
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                </div>

                <div className="input-i">
                  <label>Invoice Number </label>
                  <input
                    onChange={(e) => setNoInvoice(e.target.value)}
                    value={noInvoice}
                  ></input>
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
                          value={tglInvoice}
                          onChange={(newValue) => {
                            setTglInvoice(newValue);
                          }}
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
                  </div>
                </div>

                <div className="input-i">
                  <label>Customer's Invoice Received Date</label>
                  <div>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Stack>
                        <DatePicker
                          inputFormat="dd/MM/yyyy"
                          format="dd/MM/yyyy"
                          openTo="day"
                          views={["year", "month", "day"]}
                          value={tglInvoiceDiterimaTenant}
                          onChange={(newValue) => {
                            setTglInvoiceDiterimaTenant(newValue);
                          }}
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
                          value={tglJatuhTempo}
                          onChange={(newValue) => {
                            setTglJatuhTempo(newValue);
                          }}
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
                  </div>
                </div>
              </div>
            </div>
            <div className="row-right">
              <div className="column-form">

                <div className="input-i">
                  <label>Principal Receipt (Rp)</label>
                  <input
                    // type="number"
                    onChange={(e) => setPokokPenerimaan(e.target.value)}
                    value={formatRupiah(pokokPenerimaan ? pokokPenerimaan : "", "RP. ")}
                  ></input>
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
                          value={tglMasukRekeningPokok}
                          onChange={(newValue) => {
                            setTglMasukRekeningPokok(newValue);
                          }}
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
                  </div>
                </div>

                <div className="input-i">
                  <label>Notes</label>
                  <div>
                    <TextareaAutosize
                      aria-label="minimum height"
                      minRows={8}
                      className="text-area-s"
                      value={keterangan}
                      onChange={(e) => setKeterangan(e.target.value)}
                    />
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div className="submit-form">
            <div className="btn-cancel">Reset</div>
            <div className="btn-half" onClick={() => submitData()}>
              Save
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SalesInfoAdd;
