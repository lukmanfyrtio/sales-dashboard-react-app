import React, { useEffect } from "react";

import Header from "../components/Header";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation, useNavigate } from "react-router-dom";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

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

function SalesTargetAdd() {
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

  const BUPLists = localStorage.bup==="ALL"?["SWAMEDIA", "MOTIO", "SWADAMA"]:[localStorage.bup];

  const [id, setId] = React.useState();
  const [BUP, setBup] = React.useState("");
  const [tahun, setTahun] = React.useState(null);

  const [modalMessage, setModalMessage] = React.useState(
    "Data berhasil disimpan"
  );
  const [isEdit, setIsEdit] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [modalTittle, setModalTittle] = React.useState("Information");
  const [targetJanuari, setTargetJanuari] = React.useState(0);
  const [targetFebruari, setTargetFebruari] = React.useState(0);
  const [targetMaret, setTargetMaret] = React.useState(0);
  const [targetApril, setTargetApril] = React.useState(0);
  const [targetMei, setTargetMei] = React.useState(0);
  const [targetJune, setTargetJune] = React.useState(0);
  const [targetJuly, setTargetJuly] = React.useState(0);
  const [targetAgustus, setTargetAgustus] = React.useState(0);
  const [targetSeptember, setTargetSeptember] = React.useState(0);
  const [targetOctober, setTargetOctober] = React.useState(0);
  const [targetNovember, setTargetNovember] = React.useState(0);
  const [targetDecember, setTargetDecember] = React.useState(0);

  const [existingJanuari, setExistingJanuari] = React.useState(0);
  const [existingFebruari, setExistingFebruari] = React.useState(0);
  const [existingMaret, setExistingMaret] = React.useState(0);
  const [existingApril, setExistingApril] = React.useState(0);
  const [existingMei, setExistingMei] = React.useState(0);
  const [existingJune, setExistingJune] = React.useState(0);
  const [existingJuly, setExistingJuly] = React.useState(0);
  const [existingAgustus, setExistingAgustus] = React.useState(0);
  const [existingSeptember, setExistingSeptember] = React.useState(0);
  const [existingOctober, setExistingOctober] = React.useState(0);
  const [existingNovember, setExistingNovember] = React.useState(0);
  const [existingDecember, setExistingDecember] = React.useState(0);





  const { state } = useLocation();
  useEffect(() => {
    if (state?.sales) {
      var sales =state.sales;
        setIsEdit(true);
        axios
        .get(apis.server + "/sales-target/detail/"+sales.tahun, {
          params: {
            bup: sales.bup ? sales.bup : null,
          },
          headers: {
            Authorization: `Bearer ${
              localStorage.token ? localStorage.token : ""
            }`,
          },
        })
        .then((res) => {
          const data=res.data.data;
          setTahun(data.tahun)
          setBup(data.bup)

          setExistingJanuari(data.existing.january)
          setExistingFebruari(data.existing.february)
          setExistingMaret(data.existing.march)
          setExistingApril(data.existing.april)
          setExistingMei(data.existing.may)
          setExistingJune(data.existing.june)
          setExistingJuly(data.existing.july)
          setExistingAgustus(data.existing.august)
          setExistingSeptember(data.existing.september)
          setExistingOctober(data.existing.october)
          setExistingNovember(data.existing.november)
          setExistingDecember(data.existing.december)


          setTargetJanuari(data.target.january)
          setTargetFebruari(data.target.february)
          setTargetMaret(data.target.march)
          setTargetApril(data.target.april)
          setTargetMei(data.target.may)
          setTargetJune(data.target.june)
          setTargetJuly(data.target.july)
          setTargetAgustus(data.target.august)
          setTargetSeptember(data.target.september)
          setTargetOctober(data.target.october)
          setTargetNovember(data.target.november)
          setTargetDecember(data.target.december)
        })
        .catch((err) => {
          console.error({ err });
        });
    } else {
      setIsEdit(false);
    }
  }, []);

  function submitData() {
    axios({
      method: "post",
      url: `${
        isEdit
          ? `${apis.server}/sales-target/edit`
          : apis.server+"/sales-target/add"
      }`,
      data: {
        tahun:tahun? moment(new Date(tahun)).format("YYYY")  : "",
        bup:BUP,
        "existing": [
          {
              "bulan": "January",
              "value": existingJanuari
          },
          {
              "bulan": "February",
              "value": existingFebruari
          },
          {
              "bulan": "March",
              "value": existingMaret
          },
          {
              "bulan": "April",
              "value": existingApril
          },
          {
              "bulan": "May",
              "value": existingMei
          },
          {
              "bulan": "June",
              "value": existingJune
          },
          {
              "bulan": "July",
              "value": existingJuly
          },
          {
              "bulan": "August",
              "value": existingAgustus
          },
          {
              "bulan": "September",
              "value": existingSeptember
          },
          {
              "bulan": "October",
              "value": existingOctober
          },
          {
              "bulan": "November",
              "value": existingNovember
          },
          {
              "bulan": "December",
              "value": existingDecember
          }
      ],
      "target": [
        {
          "bulan": "January",
          "value": targetJanuari
      },
      {
          "bulan": "February",
          "value": targetFebruari
      },
      {
          "bulan": "March",
          "value": targetMaret
      },
      {
          "bulan": "April",
          "value": targetApril
      },
      {
          "bulan": "May",
          "value": targetMei
      },
      {
          "bulan": "June",
          "value": targetJune
      },
      {
          "bulan": "July",
          "value": targetJuly
      },
      {
          "bulan": "August",
          "value": targetAgustus
      },
      {
          "bulan": "September",
          "value": targetSeptember
      },
      {
          "bulan": "October",
          "value": targetOctober
      },
      {
          "bulan": "November",
          "value": targetNovember
      },
      {
          "bulan": "December",
          "value": targetDecember
      }
      ]
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
            onClick={() => navigate("/sales-target")}
          />{" "}
          <label>{isEdit ? "Edit" : "Add"} Target & Existing</label>
        </div>
        <div className="form-box">
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
                    modalTittle === "Warning"
                      ? setOpen(false)
                      : navigate("/sales-target");
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
                    <label>ID</label>
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
                        disabled={isEdit}
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
              </div>
              <div className="column-form-tittle">
                <div className="input-i-tittle">
                  <label>Target (dalam miliar Rp.)</label>
                </div>
              </div>
              <div className="column-form">
                <div className="input-i">
                  <label>January</label>
                  <input
                    type="number"
                    onChange={(e) => setTargetJanuari(e.target.value)}
                    value={targetJanuari}
                  ></input>
                </div>
                <div className="input-i">
                  <label>February</label>
                  <input
                    type="number"
                    onChange={(e) => setTargetFebruari(e.target.value)}
                    value={targetFebruari}
                  ></input>
                </div>
                <div className="input-i">
                  <label>March</label>
                  <input
                    type="number"
                    onChange={(e) => setTargetMaret(e.target.value)}
                    value={targetMaret}
                  ></input>
                </div>
                <div className="input-i">
                  <label>April</label>
                  <input
                    type="number"
                    onChange={(e) => setTargetApril(e.target.value)}
                    value={targetApril}
                  ></input>
                </div>
                <div className="input-i">
                  <label>May</label>
                  <input
                    type="number"
                    onChange={(e) => setTargetMei(e.target.value)}
                    value={targetMei}
                  ></input>
                </div>
                <div className="input-i">
                  <label>June</label>
                  <input
                    type="number"
                    onChange={(e) => setTargetJune(e.target.value)}
                    value={targetJune}
                  ></input>
                </div>
                <div className="input-i">
                  <label>July</label>
                  <input
                    type="number"
                    onChange={(e) => setTargetJuly(e.target.value)}
                    value={targetJuly}
                  ></input>
                </div>
                <div className="input-i">
                  <label>August</label>
                  <input
                    type="number"
                    onChange={(e) => setTargetAgustus(e.target.value)}
                    value={targetAgustus}
                  ></input>
                </div>
                <div className="input-i">
                  <label>September</label>
                  <input
                    type="number"
                    onChange={(e) => setTargetSeptember(e.target.value)}
                    value={targetSeptember}
                  ></input>
                </div>
                <div className="input-i">
                  <label>October</label>
                  <input
                    type="number"
                    onChange={(e) => setTargetOctober(e.target.value)}
                    value={targetOctober}
                  ></input>
                </div>
                <div className="input-i">
                  <label>November</label>
                  <input
                    type="number"
                    onChange={(e) => setTargetNovember(e.target.value)}
                    value={targetNovember}
                  ></input>
                </div>
                <div className="input-i">
                  <label>December</label>
                  <input
                    type="number"
                    onChange={(e) => setTargetDecember(e.target.value)}
                    value={targetDecember}
                  ></input>
                </div>
              </div>
            </div>
            <div className="row-right">
              <div className="column-form">
                <div className="input-i">
                  <label>Tahun</label>
                  <div>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Stack>
                        <DatePicker
                          disabled={isEdit}
                          format="yyyy"
                          inputFormat="yyyy"
                          openTo="day"
                          views={["year"]}
                          value={tahun}
                          onChange={(newValue) => {
                            setTahun(newValue);
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
              <div className="column-form-tittle">
                <div className="input-i-tittle">
                  <label>Existing (dalam miliar Rp.)</label>
                </div>
              </div>
              <div className="column-form">
                <div className="input-i">
                  <label>January</label>
                  <input
                    type="number"
                    onChange={(e) => setExistingJanuari(e.target.value)}
                    value={existingJanuari}
                  ></input>
                </div>
                <div className="input-i">
                  <label>February</label>
                  <input
                    type="number"
                    onChange={(e) => setExistingFebruari(e.target.value)}
                    value={existingFebruari}
                  ></input>
                </div>
                <div className="input-i">
                  <label>March</label>
                  <input
                    type="number"
                    onChange={(e) => setExistingMaret(e.target.value)}
                    value={existingMaret}
                  ></input>
                </div>
                <div className="input-i">
                  <label>April</label>
                  <input
                    type="number"
                    onChange={(e) => setExistingApril(e.target.value)}
                    value={existingApril}
                  ></input>
                </div>
                <div className="input-i">
                  <label>May</label>
                  <input
                    type="number"
                    onChange={(e) => setExistingMei(e.target.value)}
                    value={existingMei}
                  ></input>
                </div>
                <div className="input-i">
                  <label>June</label>
                  <input
                    type="number"
                    onChange={(e) => setExistingJune(e.target.value)}
                    value={existingJune}
                  ></input>
                </div>
                <div className="input-i">
                  <label>July</label>
                  <input
                    type="number"
                    onChange={(e) => setExistingJuly(e.target.value)}
                    value={existingJuly}
                  ></input>
                </div>
                <div className="input-i">
                  <label>August</label>
                  <input
                    type="number"
                    onChange={(e) => setExistingAgustus(e.target.value)}
                    value={existingAgustus}
                  ></input>
                </div>
                <div className="input-i">
                  <label>September</label>
                  <input
                    type="number"
                    onChange={(e) => setExistingSeptember(e.target.value)}
                    value={existingSeptember}
                  ></input>
                </div>
                <div className="input-i">
                  <label>October</label>
                  <input
                    type="number"
                    onChange={(e) => setExistingOctober(e.target.value)}
                    value={existingOctober}
                  ></input>
                </div>
                <div className="input-i">
                  <label>November</label>
                  <input
                    type="number"
                    onChange={(e) => setExistingNovember(e.target.value)}
                    value={existingNovember}
                  ></input>
                </div>
                <div className="input-i">
                  <label>December</label>
                  <input
                    type="number"
                    onChange={(e) => setExistingDecember(e.target.value)}
                    value={existingDecember}
                  ></input>
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

export default SalesTargetAdd;
