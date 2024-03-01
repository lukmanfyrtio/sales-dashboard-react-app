import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import apis from "../apis.js";
import Pie from "../components/Circle";
import BarChart from "../components/BarChart";
import ArrowLabel from "../components/ArrowLabel";
import LabelContainer from "../components/LabelContainer";
import Header from "../components/Header";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { set } from "date-fns/esm";

const AdminDashboard = (props) => {
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

  const d = new Date();
  let monthN = d.getMonth();
  let year = d.getFullYear();
  let monthArray = [];
  for (let i = 0; i <= monthN; i++) {
    monthArray.push(months[i]);
  }


  function getStyles() {
    return {
      fontSize: "0.7rem",
      color: "grey",
      fontFamily: "Poppins",
    };
  }
  const ITEM_HEIGHT = 30;
  const ITEM_PADDING_TOP = 8;
  var MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      },
    },
  };

  function round(num) {
    var m = Number((Math.abs(num) * 100).toPrecision(15));
    var r = (Math.round(m) / 100) * Math.sign(num);
    return r ? r : 0;
  }

  const optionHorizontal = {
    options: {
      indexAxis: "y",
      // Elements options apply to all of the options unless overridden in a dataset
      // In this case, we are setting the border of each horizontal bar to be 2px wide
      elements: {
        bar: {
          borderWidth: 2,
        },
      },
      responsive: true,
      plugins: {
        datalabels: {
          align: "end",
          anchor: "end",
          color: "black",
          font: {
            weight: "bold",
          },
        },
        legend: {
          position: "bottom",
        },
      },
    },
  };

  const currentYear = new Date().getFullYear();

  var listYear = [
    Number(currentYear),
    Number(currentYear - 1),
    Number(currentYear - 2),
    Number(currentYear - 3),
    Number(currentYear - 4),
  ];

  const [state, setState] = useState({

    detailDashboard: {
      deals: 0,
      dropped: 0,
      leadsConvertionRate: 0,
      negotiation: 0,
      opportunities: 0,
      proposal: 0,
    },
    departements: [],
  });

  const [filterYear, setFilterYear] = useState(new Date().getFullYear());

  const [openLoad, setOpenLoad] = useState(true);

  const [dataDepartements, setDataDepartements] = useState([]);

  const [data, setData] = useState({
    labels: new Date().getFullYear() === year ? monthArray : months,
    datasets: [
      {
        label: "Target",
        data: Array(12).fill(0).map((value) => round(value)),
        backgroundColor: "#3b71ca",
        borderColor: "#3b71ca",
        borderWidth: 1,
      },
      {
        label: "Actual",
        data: Array(12).fill(0).map((value) => round(value)),
        backgroundColor: "#00b541",
        borderColor: "#00b541",
        borderWidth: 1,
      },
    ],
  });



  const fetchDataForDepartment = async (year) => {
    console.log("fetchDataForDepartment");

    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    try {
      const response = await axios.get(apis.server + "/departments/display/top3", {
        params: { tahun: year },
        headers: { Authorization: `Bearer ${localStorage.token || ""}` },
      });

      setState((prevState) => ({
        ...prevState,
        departements: response.data,
      }));

      const dataDepartementsTemp = await Promise.all(
        response.data.map(async (dataDepartement) => {
          const departmentUUID = dataDepartement.id;
          const departmentName = dataDepartement.name;

          try {
            const res = await axios.get(apis.server + "/dashboard/target-actual", {
              params: { departementUUID: departmentUUID, tahun: year },
              headers: { Authorization: `Bearer ${localStorage.token || ""}` },
            });

            const resultActual = res.data.data.actual.map(Number);
            const resultTarget = res.data.data.target.map(Number);

            const d = new Date();
            const monthN = d.getMonth();

            const dataDepartement = {
              id: departmentUUID,
              name: departmentName,
              resultDataActual: resultActual,
              resultDataTarget: resultTarget,
              dataChart: {
                labels: [months[monthN], months[monthN - 1], months[monthN - 2]],
                datasets: [
                  {
                    label: "Target",
                    data: [resultTarget[monthN], resultTarget[monthN - 1], resultTarget[monthN - 2]],
                    backgroundColor: "#3b71ca",
                    borderColor: "#3b71ca",
                    borderWidth: 1,
                  },
                  {
                    label: "Actual",
                    data: [resultActual[monthN], resultActual[monthN - 1], resultActual[monthN - 2]],
                    backgroundColor: "#00b541",
                    borderColor: "#00b541",
                    borderWidth: 1,
                  },
                ],
              },
            };

            return dataDepartement;
          } catch (err) {
            console.error({ err });
          }
        })
      );

      setDataDepartements(dataDepartementsTemp);
      return dataDepartementsTemp;
    } catch (err) {
      console.error({ err });
    }
  };



  const getList = async () => {
    console.log("getList");
    await axios
      .get(apis.server + "/dashboard/target-breakdown-all", {
        params: {
          tahun: filterYear,
        },
        headers: {
          Authorization: `Bearer ${localStorage.token ? localStorage.token : ""
            }`,
        },
      })
      .then((res) => {
        setState(prevState => ({
          ...prevState,
          detailDashboard: res.data.data,
        }));

      })
      .catch((err) => {
        console.error({ err });
      });
  };

  const calculateSumsAndSetData = async (dataDepartements, year) => {
    const sums = {
      Target: Array(12).fill(0),
      Actual: Array(12).fill(0),
    };

    dataDepartements.forEach((item) => {
      // Loop through each month
      item.resultDataTarget.forEach((value, index) => {
        // Sum the values for Target and Actual
        sums.Target[index] += value;
        sums.Actual[index] += item.resultDataActual[index];
      });
    });

    const target = sums.Target.map((value) => round(value));
    const actual = sums.Actual.map((value) => round(value));

    const newData = {
      labels: new Date().getFullYear() === year ? monthArray : months,
      datasets: [
        {
          label: "Target",
          data: target,
          backgroundColor: "#3b71ca",
          borderColor: "#3b71ca",
          borderWidth: 1,
        },
        {
          label: "Actual",
          data: actual,
          backgroundColor: "#00b541",
          borderColor: "#00b541",
          borderWidth: 1,
        },
      ],
    };

    // Assuming you have a state variable called setDataState to set the data
    setData(newData);
  };



  useEffect(() => {
    const year = filterYear; // You can set the year dynamically or from some state

    const fetchData = async () => {
      setOpenLoad(true);
      await getList();
      const dataDepartements = await fetchDataForDepartment(year);
      await calculateSumsAndSetData(dataDepartements, year);
      setOpenLoad(false);
    };

    fetchData();
  }, [filterYear]); // The empty dependency array ensures that the effect runs only once when the component mounts

  return (
    <div>
      <Header />
      <div className="right-content">
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={openLoad}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <div className="filter-db">
          <FormControl sx={{ m: 0, width: 200, mt: 0 }}>
            <Select
              id="year"
              className="input-style"
              size="small"
              displayEmpty
              value={filterYear}
              onChange={(e) => {
                setFilterYear(e.target.value);
              }}
              input={<OutlinedInput />}
              renderValue={(selected) => {
                if (selected) {
                  return <label style={getStyles()}>{selected}</label>;
                }
                return <em style={getStyles()}>Tahun</em>;
              }}
              MenuProps={MenuProps}
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem key="1" value="" style={getStyles()} disabled>
                <em>Pilih Tahun</em>
              </MenuItem>
              {listYear.map((name) => (
                <MenuItem key={name} value={name} style={getStyles()}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="column">
          <div className="row">
            <div className="label-detail">
              <span style={{ fontSize: "1.2rem" }}>
                {filterYear} Cash-in Target :{" "}
                {state.detailDashboard.cashInTarget
                  ? state.detailDashboard.cashInTarget
                  : 0}{" "}
                bn
              </span>
              <span style={{ fontSize: "1.2rem" }}>
                YTD Target : IDR{" "}
                {state.detailDashboard.mtdTarget
                  ? state.detailDashboard.mtdTarget
                  : 0}{" "}
                bn
              </span>
              <span style={{ fontSize: "1.2rem" }}>
                YTD Cash-in : IDR{" "}
                {state.detailDashboard.mtdCashIn
                  ? state.detailDashboard.mtdCashIn
                  : 0}{" "}
                bn
              </span>
              <Pie
                fontSize="2rem"
                r={85}
                percentage={
                  state.detailDashboard.achievement
                    ? state.detailDashboard.achievement
                    : 0
                }
                colour="red"
                tittle="Achievement vs Target"
              />
            </div>
            <BarChart
              options={{
                layout: {
                  padding: {
                    left: 0,
                    right: 0,
                    top: 30,
                    bottom: 0,
                  },
                },
                plugins: {
                  datalabels: {
                    align: "end",
                    anchor: "end",
                    color: "black",
                    font: {
                      weight: "bold",
                    },
                  },
                  legend: {
                    position: "bottom",
                  },
                },
              }}
              tittle={`Target Cash-in vs Actual ${filterYear} (in billion Rp.)`}
              data={data}
            />
            <div className="margin-3-right">
              <label className="label-tittle">
                {filterYear} Cash-in Target Breakdown
              </label>
              <ArrowLabel
                tittle="Existing Customer"
                color="#006900"
                value={
                  state.detailDashboard.existingCustomer
                    ? state.detailDashboard.existingCustomer
                    : 0
                }
              />
              <ArrowLabel
                tittle="Sales Funnel"
                color="#fc7603"
                value={
                  state.detailDashboard.salesFunnel
                    ? state.detailDashboard.salesFunnel
                    : 0
                }
              />
              <ArrowLabel
                tittle="GAP"
                color="#d10000"
                value={
                  state.detailDashboard.gap
                    ? state.detailDashboard.gap
                    : 0
                }
              />
            </div>
          </div>
          <div className="row">
            {dataDepartements.map((departement1, index) => (
              <LabelContainer
                key={departement1.id}
                tittle={departement1.name}
                id={departement1.id}
                boxColor={index == 0 ? "#00b541" : index === 1 ? "#0070c6" : "#7b24a6"}
                year={filterYear}
              />
            ))}
          </div>
          <div className="row">
            {dataDepartements.map((departement1, index) => (
              <BarChart
                key={"bar-chart-" + departement1.id}
                options={optionHorizontal.options}
                className="width-30"
                tittle={departement1.name + " - Achievements of the Last 3 Months (in billion Rp.)"}
                data={departement1.dataChart}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


export default AdminDashboard;
