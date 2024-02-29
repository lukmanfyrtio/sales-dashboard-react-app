import React, { useEffect } from "react";
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

function SalesLeadsForm(props) {

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

  var leadsCategoryList = ["High", "Medium", "Low"];



  //getter setter
  const [isEdit, setIsEdit] = React.useState(false);
  const { state } = useLocation();
  const [departmentId, setDepartmentId] = React.useState("");
  const [departmentName, setDepartmentName] = React.useState("");
  const [id, setId] = React.useState("");
  const [month, setMonth] = React.useState("");
  const [salesName, setSalesName] = React.useState("");
  const [potentialCustomer, setPotentialCustomer] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [postalCode, setPostalCode] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [product, setProduct] = React.useState({
    name: ""
  });
  const [projectedValue, setProjectedValue] = React.useState("");
  const [leadsCategory, setLeadsCategory] = React.useState("");
  const [opportunitiesOpen, setOpportunitiesOpen] = React.useState("");
  const [opportunitiesClose, setOpportunitiesClose] = React.useState("");
  const [proposalOpen, setProposalOpen] = React.useState("");
  const [proposalClose, setProposalClose] = React.useState("");
  const [negotiationOpen, setNegotiationOpen] = React.useState("");
  const [negotiationClose, setNegotiationClose] = React.useState("");
  const [dealsOpen, setDealsOpen] = React.useState("");
  const [dealsClose, setDealsClose] = React.useState("");
  const [droppedOpen, setDroppedOpen] = React.useState("");
  const [droppedClose, setDroppedClose] = React.useState("");
  const [currentStage, setCurrentStage] = React.useState("");
  const [leadsStatus, setLeadsStatus] = React.useState("");
  const [notes, setNotes] = React.useState("");

  const [stage, setStage] = React.useState("");

  const [alert, setAlertMessage] = React.useState(null);

  const [departmentLists, setDepartmentLists] = React.useState([]);
  const [productList, setProductList] = React.useState([]);

  const [open, setOpen] = React.useState(false);

  const [modalTittle, setModalTittle] = React.useState("Information");
  const [modalMessage, setModalMessage] = React.useState(
    "Data berhasil disimpan"
  );

  function doReset() {
    setId("");
    setMonth("");
    setSalesName("");
    setPotentialCustomer("");
    setAddress("");
    setPostalCode("");
    setPhoneNumber("");
    setEmail("");
    setProduct(null);
    setProjectedValue("");
    setLeadsCategory("");
    setOpportunitiesOpen("");
    setOpportunitiesClose("");
    setProposalOpen("");
    setProposalClose("");
    setNegotiationOpen("");
    setNegotiationClose("");
    setDealsOpen("");
    setDealsClose("");
    setDroppedOpen("");
    setDroppedClose("");
    setCurrentStage("");
    setLeadsStatus("");
    setNotes("");
  }

  function submitData() {
    console.log(month,
      departmentId,
      salesName,
      potentialCustomer,
      phoneNumber,
      email,
      product,
      projectedValue,
      leadsCategory,
      currentStage,
      leadsStatus);
    if (
      !month ||
      !departmentId ||
      !salesName ||
      !potentialCustomer ||
      !phoneNumber ||
      !email ||
      !product ||
      !projectedValue ||
      !leadsCategory ||
      !currentStage ||
      !leadsStatus) {
      setAlertMessage("Please fill in all required fields");
      return;
    } else {
      setAlertMessage(null);

      const formattedOpportunitiesOpen = opportunitiesOpen instanceof Date ? opportunitiesOpen.format("DD/MM/YYYY") : null;
      const formattedOpportunitiesClose = opportunitiesClose instanceof Date ? opportunitiesClose.format("DD/MM/YYYY") : null;
      const formattedProposalOpen = proposalOpen instanceof Date ? proposalOpen.format("DD/MM/YYYY") : null;
      const formattedProposalClose = proposalClose instanceof Date ? proposalClose.format("DD/MM/YYYY") : null;
      const formattedNegotiationOpen = negotiationOpen instanceof Date ? negotiationOpen.format("DD/MM/YYYY") : null;
      const formattedNegotiationClose = negotiationClose instanceof Date ? negotiationClose.format("DD/MM/YYYY") : null;
      const formattedDealsOpen = dealsOpen instanceof Date ? dealsOpen.format("DD/MM/YYYY") : null;
      const formattedDealsClose = dealsClose instanceof Date ? dealsClose.format("DD/MM/YYYY") : null;
      const formattedDroppedOpen = droppedOpen instanceof Date ? droppedOpen.format("DD/MM/YYYY") : null;
      const formattedDroppedClose = droppedClose instanceof Date ? droppedClose.format("DD/MM/YYYY") : null;      

      // Modify projectedValue
      const modifiedProjectedValue = projectedValue.replace(/^\Rp. /, "").replace(/\./g, "");


      axios({
        method: `${isEdit
          ? `put`
          : "post"
          }`,
        url: `${isEdit
          ? `${apis.server}/salesleads/${id}`
          : apis.server + "/salesleads"
          }`,
        data: {
          month,
          salesName,
          potentialCustomer,
          address,
          postalCode,
          phoneNumber,
          email,
          product,
          projectedValue: modifiedProjectedValue,
          leadsCategory,
          opportunitiesOpen: formattedOpportunitiesOpen,
          opportunitiesClose: formattedOpportunitiesClose,
          proposalOpen: formattedProposalOpen,
          proposalClose: formattedProposalClose,
          negotiationOpen: formattedNegotiationOpen,
          negotiationClose: formattedNegotiationClose,
          dealsOpen: formattedDealsOpen,
          dealsClose: formattedDealsClose,
          droppedOpen: formattedDroppedOpen,
          droppedClose: formattedDroppedClose,
          currentStage,
          leadsStatus,
          notes,
        },
        headers: {
          Authorization: `Bearer ${localStorage.token ? localStorage.token : ""
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

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


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

  const fetchProductData = () => {
    if (departmentId) {
      axios
        .get(apis.server + `/products/department/${departmentId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.token ? localStorage.token : ""
              }`,
          },
        })
        .then((res) => {
          setProductList(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }


  useEffect(() => {
    fetchUnitData();
    if (state?.customer) {
      setIsEdit(true);
      const { customer } = state;
      console.log(customer.id);
      setId(customer.id);
      setMonth(customer.month);
      setSalesName(customer.salesName);
      setPotentialCustomer(customer.potentialCustomer);
      setAddress(customer.address);
      setPostalCode(customer.postalCode);
      setPhoneNumber(customer.phoneNumber);
      setEmail(customer.email);
      setProduct(customer.product);
      setDepartmentId(customer?.product.department?.id)

      setDepartmentName(customer?.product.department?.name)

      setProjectedValue(customer.projectedValue);
      setLeadsCategory(customer.leadsCategory);
      setOpportunitiesOpen(customer.opportunitiesOpen);
      setOpportunitiesClose(customer.opportunitiesClose);
      setProposalOpen(customer.proposalOpen);
      setProposalClose(customer.proposalClose);
      setNegotiationOpen(customer.negotiationOpen);
      setNegotiationClose(customer.negotiationClose);
      setDealsOpen(customer.dealsOpen);
      setDealsClose(customer.dealsClose);
      setDroppedOpen(customer.droppedOpen);
      setDroppedClose(customer.droppedClose);
      setCurrentStage(customer.currentStage);
      setStage(customer.currentStage);
      setLeadsStatus(customer.leadsStatus);
      setNotes(customer.notes);
      fetchProductData();
    } else {
      setIsEdit(false);
    }
  }, []);

  useEffect(() => {
    fetchProductData();
  }, [departmentId]);


  return (
    <div>
      <Header />
      <div className="right-content">
        <div className="tittle-content">
          <ArrowBackIcon
            className="back-arrow"
            onClick={() => navigate("/sales-lead")}
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
                      : navigate("/sales-lead");
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
                {/* {id ? (
                  <div className="input-i">
                    <label>Customer ID</label>
                    <div>
                      <label>{id}</label>
                    </div>
                  </div>
                ) : (
                  ""
                )} */}

                <div className="input-i">
                  <label>Month</label>
                  <div>
                    <FormControl sx={{ m: 0, width: 200, mt: 0 }}>
                      <Select
                        id="Month"
                        size="small"
                        displayEmpty
                        value={month}
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
                  <label>Unit/Department</label>
                  <div className="input-i-txt">
                    <FormControl fullWidth>
                      <Select
                        id="departement"
                        // className="input-style"
                        value={departmentName}
                        onChange={(e) => {
                          const found = departmentLists.find((departement) => departement.name === e.target.value);
                          setDepartmentId(found?.id)
                          setDepartmentName(found?.name);
                          setProduct(null);

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
                          return <em style={getStyles()}>Pilih</em>;
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
                  <label>Product</label>
                  <div className="input-i-txt">
                    <FormControl fullWidth>
                      <Select
                        id="Produk"
                        // className="input-style"
                        size="small"
                        displayEmpty
                        value={product?.name}
                        onChange={(e) => {
                          const selectedProduct = productList.find((product) => product.name === e.target.value);
                          setProduct(selectedProduct);
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
                        <MenuItem
                          key="Produk"
                          value="Produk"
                          style={getStyles()}
                        >
                          <em>Pilih Produk</em>
                        </MenuItem>
                        {productList.map((product) => (
                          <MenuItem key={product.id} value={product.name} style={getStyles()}>
                            {product.name}
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
                  <label>Sales Name</label>
                  <div className="input-i-txt">
                    <input
                      onChange={(e) => setSalesName(e.target.value)}
                      value={salesName}
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
                  <label>Potential Customer Name</label>
                  <div className="input-i-txt">
                    <input
                      onChange={(e) => setPotentialCustomer(e.target.value)}
                      value={potentialCustomer}
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
                  <label>Phone Number</label>
                  <div className="input-i-txt">
                    <input
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      value={phoneNumber}
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
                  <label>Email Address</label>
                  <div className="input-i-txt">
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
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
                  <label>Projected Value</label>
                  <div className="input-i-txt">
                    <input
                      onChange={(e) => setProjectedValue(e.target.value)}
                      value={formatRupiah(projectedValue, "Rp.")}
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
                  <label>Current Stage</label>
                  <div className="input-i-txt">
                    <FormControl fullWidth>
                      <Select
                        id="Stage"
                        size="small"
                        displayEmpty
                        value={currentStage}
                        onChange={(e) => setCurrentStage(e.target.value)}
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
                              : stage == "Opportunities"
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
                            !isEdit ? true : stage == "Proposal" ? false : true
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
                              : stage == "Negotiation"
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
                  <label>Status</label>
                  <div className="input-i-txt">
                    <FormControl fullWidth>
                      <Select
                        id="status"
                        size="small"
                        displayEmpty
                        value={leadsStatus}
                        onChange={(e) => setLeadsStatus(e.target.value)}
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
                  <label>Address</label>
                  <div>
                    <TextareaAutosize
                      aria-label="minimum height"
                      minRows={5}
                      className="text-area-s"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                </div>
                <div className="input-i">
                  <label>Postal Code</label>
                  <input
                    onChange={(e) => setPostalCode(e.target.value)}
                    value={postalCode}
                  ></input>
                </div>

              </div>
            </div>
            <div className="row-right">
              <div className="column-form">

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
                          value={opportunitiesOpen}
                          onChange={(newValue) => {
                            setOpportunitiesOpen(newValue);
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
                          value={opportunitiesClose}
                          onChange={(newValue) => {
                            setOpportunitiesClose(newValue);
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
                          value={proposalOpen}
                          onChange={(newValue) => {
                            setProposalOpen(newValue);
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
                          value={proposalClose}
                          onChange={(newValue) => {
                            setProposalClose(newValue);
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
                          value={negotiationOpen}
                          onChange={(newValue) => {
                            setNegotiationOpen(newValue);
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
                          value={negotiationClose}
                          onChange={(newValue) => {
                            setNegotiationClose(newValue);
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
                          value={dealsOpen}
                          onChange={(newValue) => {
                            setDealsOpen(newValue);
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
                          value={dealsClose}
                          onChange={(newValue) => {
                            setDealsClose(newValue);
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
                          value={droppedOpen}
                          onChange={(newValue) => {
                            setDroppedOpen(newValue);
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
                          value={droppedClose}
                          onChange={(newValue) => {
                            setDroppedClose(newValue);
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
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </div>
                </div>

              </div>
            </div>
          </div>
          {alert !== null ? <Alert severity="error">{alert}</Alert> : ""}
          <div className="submit-form">
            <div className="btn-cancel" onClick={() => doReset()}>Reset</div>
            <div className="btn-half" onClick={() => submitData()}>
              Save
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SalesLeadsForm;
