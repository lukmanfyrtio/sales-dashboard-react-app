import React, { useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation, useNavigate } from "react-router-dom";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import apis from "../apis.js";
import { Alert, Switch } from "@mui/material";
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

const initialState = {
  id: '',
  name: '',
  department: {
    name:''
  },
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

function ProductForm(props) {
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

  const [stateProduct, setStateProduct] = useState(initialState);
  const [departmentLists, setDepartmentLists] = React.useState([]);

  const reset = () => {
    setStateProduct(initialState);
  };


  const setKeyValue = (key, value) => {
    setStateProduct((prevState) => ({
      ...prevState,
      [key]: value instanceof Date ? moment(value).format('YYYY/MM/DD') : value
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

  useEffect(() => {
    fetchUnitData();
    if (state?.sales) {
      setIsEdit(true);
      const product = state.sales;
      setStateProduct(product);
    } else {
      setIsEdit(false);
    }
  }, []);


  function submitData() {

    if (
      !stateProduct.name ||
      !stateProduct.department.name){
      setAlertMessage("Please fill in all required fields");
      return;
    }
    setAlertMessage(null);
    axios({
      method: `${isEdit
        ? `put`
        : "post"
        }`,
      url: `${isEdit
        ? `${apis.server}/products/${stateProduct.id}`
        : apis.server + "/products"
        }`,
      data: stateProduct,
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
        setAlertMessage(err.response.data.message);
        return;
      });
  }

  return (
    <div>
      <Header />
      <div className="right-content">
        <div className="tittle-content">
          <ArrowBackIcon
            className="back-arrow"
            onClick={() => navigate("/product")}
          />{" "}
          <label>{isEdit ? "Edit" : "Add"} Product</label>
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
                      : navigate("/product");
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
                  <label>Unit / Department</label>
                  <div className="input-i-txt">
                    <FormControl fullWidth>
                      <Select
                        id="company"
                        // className="input-style"
                        value={stateProduct?.department?.name}
                        onChange={(e) => {
                          const found = departmentLists.find((department) => department?.name === e.target.value);
                          setKeyValue('department', found);
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
                          <MenuItem key={departement.id} name={departement.id} value={departement.name} id={departement.id} style={getStyles()}>
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
                  <label>Product Name </label>
                  <div className="input-i-txt">
                    <input
                      onChange={(e) => setKeyValue('name', e.target.value)}
                      value={stateProduct.name}
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

              </div>
            </div>


            <div className="row-right">
            </div>


          </div>
          {alert !== null ? <Alert severity="error">{alert}</Alert> : ""}
          <div className="submit-form">
            <div className="btn-cancel" onClick={() => reset()}>Reset</div>
            <div className="btn-half" onClick={() => submitData()}>
              Save
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductForm;
