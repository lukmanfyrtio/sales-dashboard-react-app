import React, { useCallback, useMemo, useRef } from "react";
import Header from "../components/Header";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { useDropzone } from "react-dropzone";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import axios from "axios";
import DoneIcon from "@mui/icons-material/Done";
import RemoveDoneIcon from "@mui/icons-material/RemoveDone";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import apis from "../apis.js"

function CustomerUpload() {
  const [file, setFile] = React.useState(null);
  const [dataExcel, setDataExcel] = React.useState([]);

  const [openLoad, setOpenLoad] = React.useState(false);

  const activeStyle = {
    borderColor: "#2196f3",
  };

  const acceptStyle = {
    borderColor: "#00e676",
  };

  const rejectStyle = {
    borderColor: "#ff1744",
  };
  const navigate = useNavigate();

  const tableActive = useRef(null);

  //react dropzone
  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0]);
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel",
    multiple: false,
  });

  const style = useMemo(
    () => ({
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

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

  function createData(
    BUP,
    namaSales,
    calonPelanggan,
    area,
    produk,
    leadsCategory,
    stage,
    status
  ) {
    return {
      BUP,
      namaSales,
      calonPelanggan,
      area,
      produk,
      leadsCategory,
      stage,
      status,
    };
  }

  const rows = [
    createData(
      "SWAMEDIA",
      "Jenny",
      "PT REJO MULYO SOLUTION",
      "PAPUA",
      "Capacity",
      "High",
      "Proposal",
      "Open"
    ),
    createData(
      "SWAMEDIA",
      "Jenny",
      "PT REJO MULYO SOLUTION",
      "PAPUA",
      "Capacity",
      "High",
      "Proposal",
      "Open"
    ),
    createData(
      "SWAMEDIA",
      "Jenny",
      "PT REJO MULYO SOLUTION",
      "PAPUA",
      "Capacity",
      "High",
      "Proposal",
      "Open"
    ),
    createData(
      "SWAMEDIA",
      "Jenny",
      "PT REJO MULYO SOLUTION",
      "PAPUA",
      "Capacity",
      "High",
      "Proposal",
      "Open"
    ),
  ];

  return (
    <div>
      <Header />
      <div className="right-content">
        <div className="tittle-content">
          <ArrowBackIcon
            className="back-arrow"
            onClick={() => navigate("/customer")}
          />{" "}
          <label>Upload Data Prospect/Leads</label>
        </div>
        <div className="form-box">
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={openLoad}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          <div className="form-upload" {...getRootProps({ style })}>
            <input {...getInputProps()} />
            <FileUploadOutlinedIcon sx={{ fontSize: "10rem" }} />
            {file ? (
              <>
                <span>Data berhasil di upload</span>
                <span>{file.name}</span>
              </>
            ) : (
              <>
                {" "}
                <span>Drag and drop here your files here</span>
                <span>or</span>
                <span>Click to browse files</span>
              </>
            )}
          </div>
          <div className="submit-form">
            <div
              className="btn-cancel"
              onClick={() => {
                setFile(null);
                setDataExcel([]);
              }}
            >
              Reset
            </div>
            <div
              className="btn-half"
              onClick={() => {
                setOpenLoad(true);
                var formData = new FormData();
                formData.append("file", file);
                axios
                  .post(
                    apis.server+"/dashboard/upload/excel2",
                    formData,
                    {
                      headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${
                          localStorage.token ? localStorage.token : ""
                        }`,
                      },
                    }
                  )
                  .then((res) => {
                    setDataExcel(res.data.data);
                    if (tableActive.current) {
                      tableActive.current.scrollIntoView({
                        behavior: "smooth",
                      });
                    }
                    setOpenLoad(false);
                  })
                  .catch((err) => {
                    console.error({ err });
                    setOpenLoad(false);
                  });
              }}
            >
              Submit
            </div>
          </div>
        </div>
        {dataExcel.length !== 0 ? (
          <div className="row-style" ref={tableActive}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>BUP</StyledTableCell>
                    <StyledTableCell align="center">Nama Sales</StyledTableCell>
                    <StyledTableCell align="center">
                      Calon Pelanggan
                    </StyledTableCell>
                    <StyledTableCell align="center">Project</StyledTableCell>
                    <StyledTableCell align="center">Product</StyledTableCell>
                    <StyledTableCell align="center">
                      Current Stage
                    </StyledTableCell>
                    <StyledTableCell align="center">Status</StyledTableCell>
                    <StyledTableCell align="center">Keterangan</StyledTableCell>
                    <StyledTableCell align="center">Validation</StyledTableCell>
                    <StyledTableCell align="center">
                      Validation Message
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataExcel.map((row) => (
                    <StyledTableRow key={row.name}>
                      <StyledTableCell component="th" scope="row">
                        {row.customerInfo.bup ? row.customerInfo.bup : "-"}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.customerInfo.salesName
                          ? row.customerInfo.salesName
                          : "-"}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.customerInfo.calonPelanggan
                          ? row.customerInfo.calonPelanggan
                          : "-"}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.customerInfo.project
                          ? row.customerInfo.project
                          : "-"}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.customerInfo.produk
                          ? row.customerInfo.produk
                          : "-"}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.customerInfo.currentStage
                          ? row.customerInfo.currentStage
                          : "-"}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.customerInfo.leadsStatus
                          ? row.customerInfo.leadsStatus
                          : "-"}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.customerInfo.keterangan
                          ? row.customerInfo.keterangan
                          : "-"}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.valid == true ? (
                          <DoneIcon style={{ color: "green" }} />
                        ) : (
                          <RemoveDoneIcon style={{ color: "red" }} />
                        )}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.validationMessage}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default CustomerUpload;
