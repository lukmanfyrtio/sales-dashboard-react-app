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
import { Alert } from "@mui/material";
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

function CustomerAdd(props) {

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

  //option list
  const BUPLists = localStorage.bup==="ALL"?["SWAMEDIA", "MOTIO", "SWADAMA"]:[localStorage.bup];
  const statusList = ["Open", "Close"];


  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  var productList = ["Loccana", "WSO2", "Ordera","Bonefire","APICentrum"];
  var leadsCategoryList = ["High", "Medium", "Low"];
  var projectList = [
    "P1",
    "P2",
    "P3",
    "P4",
    "P5",
    "P6",
    "P7",
    "P8A",
    "P8B",
    "P9",
    "P10",
    "P11",
    "P12",
    "P13",
    "P14",
    "P15A",
    "P15B",
    "P16",
    "P17",
  ];

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
  const [isEdit, setIsEdit] = React.useState(false);
  const { state } = useLocation();
  useEffect(() => {
    if (state?.customer) {
      setIsEdit(true);
      const { customer } = state;
      setMonth(customer.bulan);
      setBUP(customer.bup);
      setNamaSales(customer.salesName);
      setCalonPelanggan(customer.calonPelanggan);
      setNomerTelepon(customer.nomerTelepon);
      setEmail(customer.email);
      setProject(customer.project);
      setProduk(customer.produk);
      setProyeksiNilai(customer.proyeksiNilai);
      setLeadsCategory(customer.leadsCategory);
      setAlamat(customer.alamat);
      setKelurahan(customer.kelurahan);
      setKecamatan(customer.kecamatan);
      setKabupaten(customer.kabupaten);
      setProvinsi(customer.provinsi);
      setKodePos(customer.kodePos);
      setStage(customer.currentStage);
      setKeterangan(customer.keterangan);
      setId(customer.idPelanggan);
      setStatus(customer.leadsStatus);
      setOpOpen(
        customer.opportunitiesOpen
          ? moment(customer.opportunitiesOpen, "DD/MM/YYYY").toDate()
          : null
      );
      setOpClose(
        customer.opportunitiesClose
          ? moment(customer.opportunitiesClose, "DD/MM/YYYY").toDate()
          : null
      );
      setNgOpen(
        customer.negotiationOpen
          ? moment(customer.negotiationOpen, "DD/MM/YYYY").toDate()
          : null
      );
      setNgClose(
        customer.negotiationClose
          ? moment(customer.negotiationClose, "DD/MM/YYYY").toDate()
          : null
      );
      setDlOpen(
        customer.dealsOpen
          ? moment(customer.dealsOpen, "DD/MM/YYYY").toDate()
          : null
      );
      setDlClose(
        customer.dealsClose
          ? moment(customer.dealsClose, "DD/MM/YYYY").toDate()
          : null
      );
      setDrOpen(
        customer.droppedOpen
          ? moment(customer.droppedOpen, "DD/MM/YYYY").toDate()
          : null
      );
      setDrClose(
        customer.droppedClose
          ? moment(customer.droppedClose, "DD/MM/YYYY").toDate()
          : null
      );
      setPrClose(
        customer.proposalClose
          ? moment(customer.proposalClose, "DD/MM/YYYY").toDate()
          : null
      );
      setPrOpen(
        customer.proposalOpen
          ? moment(customer.proposalOpen, "DD/MM/YYYY").toDate()
          : null
      ); // 1st argument - string, 2nd argument - format
    } else {
      setIsEdit(false);
    }
  }, []);

  //getter setter
  const [Month, setMonth] = React.useState("");
  const [BUP, setBUP] = React.useState("");
  const [Status, setStatus] = React.useState("");
  const [namaSales, setNamaSales] = React.useState("");
  const [calonPelanggan, setCalonPelanggan] = React.useState("");
  const [nomerTelepon, setNomerTelepon] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [project, setProject] = React.useState("");
  const [produk, setProduk] = React.useState("");
  const [proyeksiNilai, setProyeksiNilai] = React.useState("");
  const [leadsCategory, setLeadsCategory] = React.useState("");
  const [alamat, setAlamat] = React.useState("");
  const [kelurahan, setKelurahan] = React.useState("");
  const [kecamatan, setKecamatan] = React.useState("");
  const [kabupaten, setKabupaten] = React.useState("");
  const [provinsi, setProvinsi] = React.useState("");
  const [kodePos, setKodePos] = React.useState("");
  const [Stage, setStage] = React.useState("");
  const [keterangan, setKeterangan] = React.useState("");
  const [id, setId] = React.useState(null);

  const [opClose, setOpClose] = React.useState(null);
  const [opOpen, setOpOpen] = React.useState(null);

  const [prOpen, setPrOpen] = React.useState(null);
  const [prClose, setPrClose] = React.useState(null);

  const [ngOpen, setNgOpen] = React.useState(null);
  const [ngClose, setNgClose] = React.useState(null);

  const [dlOpen, setDlOpen] = React.useState(null);
  const [dlClose, setDlClose] = React.useState(null);

  const [drOpen, setDrOpen] = React.useState(null);
  const [drClose, setDrClose] = React.useState(null);

  const [alert, setAlertMessage] = React.useState(null);

  function doReset() {
    setMonth("");
    setBUP("");
    setNamaSales("");
    setCalonPelanggan("");
    setNomerTelepon("");
    setEmail("");
    setProject("");
    setProduk("");
    setProyeksiNilai("");
    setLeadsCategory("");
    setAlamat("");
    setKelurahan("");
    setKecamatan("");
    setKabupaten("");
    setProvinsi("");
    setKodePos("");
    setStage("");
    setKeterangan("");
    // setId("");
    setStatus("");
    setOpOpen("");
    setOpClose("");
    setNgOpen("");
    setNgClose("");
    setDlOpen("");
    setDlClose("");
    setDrOpen("");
    setDrClose("");
    setPrClose("");
    setPrOpen(""); 
  }

  function submitData() {
    if (BUP==="") {
      setAlertMessage("Field BUP is mandatory");
      return;
    } else if (namaSales==="") {
      setAlertMessage("Field Nama Sales is mandatory");
      return;
    } else if (calonPelanggan==="") {
      setAlertMessage("Field Calon Pelanggan is mandatory");
      return;
    } else if (project==="") {
      setAlertMessage("Field Project is mandatory");
      return;
    } else if (produk==="") {
      setAlertMessage("Field Produk is mandatory");
      return;
    } else if (proyeksiNilai==="") {
      setAlertMessage("Field Proyeksi Nilai is mandatory");
      return;
    } else if (Stage==="") {
      setAlertMessage("Field Current Stage is mandatory");
      return;
    } else if (Status==="") {
      setAlertMessage("Field Status is mandatory");
      return;
    } else {
      setAlertMessage(null);
      axios({
        method: "post",
        url: `${
          isEdit
            ? `${apis.server}/dashboard/edit/${id}`
            : apis.server + "/dashboard/add"
        }`,
        data: {
          alamat: alamat,
          // area: area,
          bulan: Month,
          bup: BUP,
          calonPelanggan: calonPelanggan,
          currentStage: Stage,
          dealsClose: dlClose
            ? moment(new Date(dlClose)).format("DD/MM/YYYY")
            : "",
          dealsOpen: dlOpen
            ? moment(new Date(dlOpen)).format("DD/MM/YYYY")
            : "",
          // domain: domain,
          droppedClose: drClose
            ? moment(new Date(drClose)).format("DD/MM/YYYY")
            : "",
          droppedOpen: drOpen
            ? moment(new Date(drOpen)).format("DD/MM/YYYY")
            : "",
          email: email,
          // jenisPerizinan: jenisPerizinan,
          kabupaten: kabupaten,
          kecamatan: kecamatan,
          kelurahan: kelurahan,
          keterangan: keterangan,
          kodePos: kodePos,
          leadsCategory: leadsCategory,
          leadsStatus: Status,
          negotiationClose: ngClose
            ? moment(new Date(ngClose)).format("DD/MM/YYYY")
            : "",
          negotiationOpen: ngOpen
            ? moment(new Date(ngOpen)).format("DD/MM/YYYY")
            : "",
          nomerTelepon: nomerTelepon,
          opportunitiesClose: opClose
            ? moment(new Date(ngOpen)).format("DD/MM/YYYY")
            : "",
          opportunitiesOpen: opOpen
            ? moment(new Date(opOpen)).format("DD/MM/YYYY")
            : "",
          produk: produk,
          project: project,
          proposalClose: prClose
            ? moment(new Date(prClose)).format("DD/MM/YYYY")
            : "",
          proposalOpen: prOpen
            ? moment(new Date(prOpen)).format("DD/MM/YYYY")
            : "",
          provinsi: provinsi,
          proyeksiNilai: proyeksiNilai.replace(/^\Rp. /, "").replace(/\./g, ""),
          salesName: namaSales,
        },
        headers: {
          Authorization: `Bearer ${
            localStorage.token ? localStorage.token : ""
          }`,
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
  }

  const [open, setOpen] = React.useState(false);

  const [modalTittle, setModalTittle] = React.useState("Information");
  const [modalMessage, setModalMessage] = React.useState(
    "Data berhasil disimpan"
  );
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {}, [opClose, opOpen]);

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


  return (
    <div>
      <Header />
      <div className="right-content">
        <div className="tittle-content">
          <ArrowBackIcon
            className="back-arrow"
            onClick={() => navigate("/customer")}
          />{" "}
          <label>{isEdit ? "Edit" : "Add"} Prospect/Leads</label>
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
                      : navigate("/customer");
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
                    <label>ID Pelanggan</label>
                    <div>
                      <label>{id}</label>
                    </div>
                  </div>
                ) : (
                  ""
                )}

                <div className="input-i">
                  <label>Bulan</label>
                  <div>
                    <FormControl sx={{ m: 0, width: 200, mt: 0 }}>
                      <Select
                        id="Month"
                        size="small"
                        displayEmpty
                        value={Month}
                        onChange={(e) => setMonth(e.target.value)}
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
                        <MenuItem
                          key="Current Stage"
                          value="Current Stage"
                          style={getStyles()}
                        >
                          <em>Pilih Bulan</em>
                        </MenuItem>
                        {months.map((name) => (
                          <MenuItem key={name} value={name} style={getStyles()}>
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <label
                      style={{
                        marginLeft: "1rem",
                        color: `${
                          alert ? "red" : "#8697b6"
                        }`,
                        alignSelf: "center",
                      }}
                    >
                      *
                    </label>
                  </div>
                </div>
                <div className="input-i">
                  <label>Company</label>
                  <div className="input-i-txt">
                    <FormControl fullWidth>
                      <Select
                        id="BUP"
                        // className="input-style"
                        size="small"
                        displayEmpty
                        value={BUP}
                        onChange={(e) => setBUP(e.target.value)}
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
                    <label
                      style={{
                        marginLeft: "1rem",
                        color: `${
                          alert ? "red" : "#8697b6"
                        }`,
                        alignSelf: "center",
                      }}
                    >
                      *
                    </label>
                  </div>
                </div>
                <div className="input-i">
                  <label>Nama Sales</label>
                  <div className="input-i-txt">
                    <input
                      onChange={(e) => setNamaSales(e.target.value)}
                      value={namaSales}
                    ></input>
                    <label
                      style={{
                        marginLeft: "1rem",
                        color: `${
                          alert ? "red" : "#8697b6"
                        }`,
                        alignSelf: "center",
                      }}
                    >
                      *
                    </label>
                  </div>
                </div>
                <div className="input-i">
                  <label>Calon Pelanggan</label>
                  <div className="input-i-txt">
                    <input
                      onChange={(e) => setCalonPelanggan(e.target.value)}
                      value={calonPelanggan}
                    ></input>
                    <label
                      style={{
                        marginLeft: "1rem",
                        color: `${
                          alert ? "red" : "#8697b6"
                        }`,
                        alignSelf: "center",
                      }}
                    >
                      *
                    </label>
                  </div>
                </div>


                <div className="input-i">
                  <label>Nomer Telepon</label>
                  <input
                    onChange={(e) => setNomerTelepon(e.target.value)}
                    value={nomerTelepon}
                  ></input>
                </div>
                <div className="input-i">
                  <label>Alamat Email</label>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  ></input>
                </div>
                <div className="input-i">
                  <label>Project</label>
                  <div className="input-i-txt">
                    <FormControl fullWidth>
                      <Select
                        id="Project"
                        // className="input-style"
                        size="small"
                        displayEmpty
                        value={project}
                        onChange={(e) => setProject(e.target.value)}
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
                        <MenuItem
                          key="Project"
                          value="Project"
                          style={getStyles()}
                        >
                          <em>Pilih Project</em>
                        </MenuItem>
                        {projectList.map((name) => (
                          <MenuItem key={name} value={name} style={getStyles()}>
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <label
                      style={{
                        marginLeft: "1rem",
                        color: `${
                          alert ? "red" : "#8697b6"
                        }`,
                        alignSelf: "center",
                      }}
                    >
                      *
                    </label>
                  </div>
                </div>
                <div className="input-i">
                  <label>Produk</label>
                  <div className="input-i-txt">
                    <FormControl fullWidth>
                      <Select
                        id="Produk"
                        // className="input-style"
                        size="small"
                        displayEmpty
                        value={produk}
                        onChange={(e) => setProduk(e.target.value)}
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
                        <MenuItem
                          key="Produk"
                          value="Produk"
                          style={getStyles()}
                        >
                          <em>Pilih Produk</em>
                        </MenuItem>
                        {productList.map((name) => (
                          <MenuItem key={name} value={name} style={getStyles()}>
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <label
                      style={{
                        marginLeft: "1rem",
                        color: `${
                          alert ? "red" : "#8697b6"
                        }`,
                        alignSelf: "center",
                      }}
                    >
                      *
                    </label>
                  </div>
                </div>
                <div className="input-i">
                  <label>Proyeksi Nilai</label>
                  <div className="input-i-txt">
                    <input
                      onChange={(e) => setProyeksiNilai(e.target.value)}
                      value={formatRupiah(proyeksiNilai, "Rp.")}
                    ></input>
                    <label
                      style={{
                        marginLeft: "1rem",
                        color: `${
                          alert ? "red" : "#8697b6"
                        }`,
                        alignSelf: "center",
                      }}
                    >
                      *
                    </label>
                  </div>
                </div>
                <div className="input-i">
                  <label>Leads Category</label>
                  <div className="input-i-txt">
                    <FormControl fullWidth>
                      <Select
                        id="Leads Category"
                        // className="input-style"
                        size="small"
                        displayEmpty
                        value={leadsCategory}
                        onChange={(e) => setLeadsCategory(e.target.value)}
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
                        <MenuItem
                          key="Leads Category"
                          value="Leads Category"
                          style={getStyles()}
                        >
                          <em>Pilih Leads Category</em>
                        </MenuItem>
                        {leadsCategoryList.map((name) => (
                          <MenuItem key={name} value={name} style={getStyles()}>
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <div className="input-i">
                  <label>Current Stage</label>
                  <div className="input-i-txt">
                    <FormControl fullWidth>
                      <Select
                        id="Stage"
                        size="small"
                        displayEmpty
                        value={Stage}
                        onChange={(e) => setStage(e.target.value)}
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
                        <MenuItem
                          key="Current Stage"
                          value="Current Stage"
                          style={getStyles()}
                        >
                          <em>Pilih Current Stage</em>
                        </MenuItem>
                        <MenuItem
                          disabled={!isEdit ? false : true}
                          key="Opportunities"
                          value="Opportunities"
                          style={getStyles()}
                        >
                          Opportunities
                        </MenuItem>

                        <MenuItem
                          disabled={
                            !isEdit
                              ? true
                              : Stage == "Opportunities"
                              ? false
                              : true
                          }
                          key="Proposal"
                          value="Proposal"
                          style={getStyles()}
                        >
                          Proposal
                        </MenuItem>

                        <MenuItem
                          disabled={
                            !isEdit ? true : Stage == "Proposal" ? false : true
                          }
                          key="Negotiation"
                          value="Negotiation"
                          style={getStyles()}
                        >
                          Negotiation
                        </MenuItem>

                        <MenuItem
                          disabled={
                            !isEdit
                              ? true
                              : Stage == "Negotiation"
                              ? false
                              : true
                          }
                          key="Deals"
                          value="Deals"
                          style={getStyles()}
                        >
                          Deals
                        </MenuItem>

                        <MenuItem
                          disabled={!isEdit ? true : false}
                          key="Dropped"
                          value="Dropped"
                          style={getStyles()}
                        >
                          Dropped
                        </MenuItem>
                      </Select>
                    </FormControl>
                    <label
                      style={{
                        marginLeft: "1rem",
                        color: `${
                          alert ? "red" : "#8697b6"
                        }`,
                        alignSelf: "center",
                      }}
                    >
                      *
                    </label>
                  </div>
                </div>
                <div className="input-i">
                  <label>Status</label>
                  <div className="input-i-txt">
                    <FormControl fullWidth>
                      <Select
                        id="status"
                        size="small"
                        displayEmpty
                        value={Status}
                        onChange={(e) => setStatus(e.target.value)}
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
                          <em>Pilih Status</em>
                        </MenuItem>
                        {statusList.map((name) => (
                          <MenuItem key={name} value={name} style={getStyles()}>
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <label
                      style={{
                        marginLeft: "1rem",
                        color: `${
                          alert ? "red" : "#8697b6"
                        }`,
                        alignSelf: "center",
                      }}
                    >
                      *
                    </label>
                  </div>
                </div>

                
                <div className="input-i">
                  <label>Opportunities Open</label>
                  <div>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Stack>
                        <DatePicker
                          disabled
                          inputFormat="dd/MM/yyyy"
                          format="dd/MM/yyyy"
                          openTo="day"
                          views={["year", "month", "day"]}
                          value={opOpen}
                          onChange={(newValue) => {
                            setOpOpen(newValue);
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
                  <label>Opportunities Close</label>
                  <div>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Stack>
                        <DatePicker
                          disabled
                          inputFormat="dd/MM/yyyy"
                          format="dd/MM/yyyy"
                          openTo="day"
                          views={["year", "month", "day"]}
                          value={opClose}
                          onChange={(newValue) => {
                            setOpClose(newValue);
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
                  <label>Proposal Open</label>
                  <div>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Stack>
                        <DatePicker
                          disabled
                          inputFormat="dd/MM/yyyy"
                          format="dd/MM/yyyy"
                          openTo="day"
                          views={["year", "month", "day"]}
                          value={prOpen}
                          onChange={(newValue) => {
                            setPrOpen(newValue);
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
                  <label>Proposal Close</label>
                  <div>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Stack>
                        <DatePicker
                          disabled
                          inputFormat="dd/MM/yyyy"
                          format="dd/MM/yyyy"
                          openTo="day"
                          views={["year", "month", "day"]}
                          value={prClose}
                          onChange={(newValue) => {
                            setPrClose(newValue);
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
                  <label>Negotiation Open</label>
                  <div>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Stack>
                        <DatePicker
                          disabled
                          inputFormat="dd/MM/yyyy"
                          format="dd/MM/yyyy"
                          openTo="day"
                          views={["year", "month", "day"]}
                          value={ngOpen}
                          onChange={(newValue) => {
                            setNgOpen(newValue);
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
                  <label>Negotiation Close</label>
                  <div>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Stack>
                        <DatePicker
                          disabled
                          inputFormat="dd/MM/yyyy"
                          format="dd/MM/yyyy"
                          openTo="day"
                          views={["year", "month", "day"]}
                          value={ngClose}
                          onChange={(newValue) => {
                            setNgClose(newValue);
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
                  <label>Deals Open</label>
                  <div>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Stack>
                        <DatePicker
                          disabled
                          inputFormat="dd/MM/yyyy"
                          format="dd/MM/yyyy"
                          openTo="day"
                          views={["year", "month", "day"]}
                          value={dlOpen}
                          onChange={(newValue) => {
                            setDlOpen(newValue);
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
                  <label>Deals Close</label>
                  <div>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Stack>
                        <DatePicker
                          disabled
                          inputFormat="dd/MM/yyyy"
                          format="dd/MM/yyyy"
                          openTo="day"
                          views={["year", "month", "day"]}
                          value={dlClose}
                          onChange={(newValue) => {
                            setDlClose(newValue);
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
                  <label>Dropped Open</label>
                  <div>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Stack>
                        <DatePicker
                          disabled
                          inputFormat="dd/MM/yyyy"
                          format="dd/MM/yyyy"
                          openTo="day"
                          views={["year", "month", "day"]}
                          value={drOpen}
                          onChange={(newValue) => {
                            setDrOpen(newValue);
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
                  <label>Dropped Close</label>
                  <div>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Stack>
                        <DatePicker
                          disabled
                          inputFormat="dd/MM/yyyy"
                          format="dd/MM/yyyy"
                          openTo="day"
                          views={["year", "month", "day"]}
                          value={drClose}
                          onChange={(newValue) => {
                            setDrClose(newValue);
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
                  <label>Alamat</label>
                  <div>
                    <TextareaAutosize
                      aria-label="minimum height"
                      minRows={5}
                      className="text-area-s"
                      value={alamat}
                      onChange={(e) => setAlamat(e.target.value)}
                    />
                  </div>
                </div>
                <div className="input-i">
                  <label>Kelurahan</label>
                  <input
                    onChange={(e) => setKelurahan(e.target.value)}
                    value={kelurahan}
                  ></input>
                </div>
                <div className="input-i">
                  <label>Kecamatan</label>
                  <input
                    onChange={(e) => setKecamatan(e.target.value)}
                    value={kecamatan}
                  ></input>
                </div>
                <div className="input-i">
                  <label>Kabupaten</label>
                  <input
                    onChange={(e) => setKabupaten(e.target.value)}
                    value={kabupaten}
                  ></input>
                </div>
                <div className="input-i">
                  <label>Provinsi</label>
                  <input
                    onChange={(e) => setProvinsi(e.target.value)}
                    value={provinsi}
                  ></input>
                </div>
                <div className="input-i">
                  <label>Kode Pos</label>
                  <input
                    onChange={(e) => setKodePos(e.target.value)}
                    value={kodePos}
                  ></input>
                </div>
                <div className="input-i">
                  <label>Keterangan</label>
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
          {alert !== null ? <Alert severity="error">{alert}</Alert> : ""}
          <div className="submit-form">
            <div className="btn-cancel" onClick={()=>doReset()}>Reset</div>
            <div className="btn-half" onClick={() => submitData()}>
              Save
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerAdd;
