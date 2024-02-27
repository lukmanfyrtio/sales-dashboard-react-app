import React, { Component } from "react";
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

export class AdminDashboard extends Component {
  constructor(props) {

    super(props);
    // Don't call this.setState() here!
    this.state = {
      detailDashboard: {
        deals: 0,
        dropped: 0,
        leadsConvertionRate: 0,
        negotiation: 0,
        opportunities: 0,
        proposal: 0,
      },
      openLoad: true,
      filterYear: new Date().getFullYear(),
      dataDepartements: [],
      departements: [],
    };
  }

  fetchDataForDepartment = async (year) => {
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

    var dataDepartementsTemp = [];
    await axios
      .get(apis.server + "/departments/display/top3", {
        params: {
          tahun: year,
        },
        headers: {
          Authorization: `Bearer ${localStorage.token ? localStorage.token : ""
            }`,
        },
      })
      .then((res) => {
        this.setState({
          departements: res.data
        })

        res.data.forEach((dataDepartement, index) => {
          var departmentUUID = dataDepartement.id;
          var departmentName = dataDepartement.name;

          try {
            axios.get(apis.server + "/dashboard/target-actual", {
              params: {
                departementUUID: departmentUUID,
                tahun: year,
              },
              headers: {
                Authorization: `Bearer ${localStorage.token ? localStorage.token : ""}`,
              },
            }).then((res) => {
              const resultActual = res.data.data.actual.map(x => Number(x));
              const resultTarget = res.data.data.target.map(x => Number(x));
              const d = new Date();
              const monthN = d.getMonth();
              var dataDepartement =
              {
                id: departmentUUID,
                name: departmentName,
                resultDataActual: resultActual,
                resultDataTarget: resultTarget,
                dataChart: {
                  labels: [
                    months[Number(monthN)],
                    months[Number(monthN - 1)],
                    months[Number(monthN - 2)],
                  ],
                  datasets: [
                    {
                      label: "Target",
                      data: [
                        resultTarget[Number(monthN)],
                        resultTarget[Number(monthN - 1)],
                        resultTarget[Number(monthN - 2)],
                      ],
                      backgroundColor: "#3b71ca",
                      borderColor: "#3b71ca",
                      borderWidth: 1,
                    },
                    {
                      label: "Actual",
                      data: [
                        resultActual[Number(monthN)],
                        resultActual[Number(monthN - 1)],
                        resultActual[Number(monthN - 2)],
                      ],
                      backgroundColor: "#00b541",
                      borderColor: "#00b541",
                      borderWidth: 1,
                    },
                  ],
                },
              };
              dataDepartementsTemp.push(dataDepartement);;
            })
              .catch((err) => {
                console.error({ err });
              });

          } catch (err) {
            console.error({ err });
          }
        });

        this.setState({
          dataDepartements: dataDepartementsTemp
        })
      })
      .catch((err) => {
        console.error({ err });
      });

  };



  getList = (year) => {
    axios
      .get(apis.server + "/dashboard/target-breakdown-all", {
        params: {
          tahun: year,
        },
        headers: {
          Authorization: `Bearer ${localStorage.token ? localStorage.token : ""
            }`,
        },
      })
      .then((res) => {
        this.setState({ detailDashboard: res.data.data });
      })
      .catch((err) => {
        console.error({ err });
      });
  };

  componentDidMount() {
    this.setState({
      openLoad: true
    })
    this.getList(this.state.filterYear);
    this.fetchDataForDepartment(this.state.filterYear);
    setTimeout(() => {
      // Set openLoad to false to hide the loader when the data is loaded
      this.setState({
        openLoad: false,
      });
    }, 3000); // You can adjust the delay as needed

  }

  render() {
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

    function round(num) {
      var m = Number((Math.abs(num) * 100).toPrecision(15));
      var r = (Math.round(m) / 100) * Math.sign(num);
      return r ? r : 0;
    }

    const d = new Date();
    let monthN = d.getMonth();
    let year = d.getFullYear();
    let monthArray = [];
    for (let i = 0; i <= monthN; i++) {
      monthArray.push(months[i]);
    }

    // Initialize an array to store the calculated sums
    var sums = {
      Target: Array(12).fill(0),
      Actual: Array(12).fill(0)
    };

    // Loop through each item in dataDepartement
    this.state.dataDepartements.forEach((item) => {
      // Loop through each month
      item.resultDataTarget.forEach((value, index) => {
        // Sum the values for Target and Actual
        sums.Target[index] += value;
        sums.Actual[index] += item.resultDataActual[index];
      });
    });


    const data = {
      labels: this.state.filterYear === year ? monthArray : months,
      datasets: [
        {
          label: "Target",
          data: sums.Target.map((value) => round(value)),
          backgroundColor: "#3b71ca",
          borderColor: "#3b71ca",
          borderWidth: 1,
        },
        {
          label: "Actual",
          data: sums.Actual.map((value) => round(value)),
          backgroundColor: "#00b541",
          borderColor: "#00b541",
          borderWidth: 1,
        },
      ],

    };

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
    return (
      <div>
        <Header />
        <div className="right-content">
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={this.state.openLoad}
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
                value={this.state.filterYear}
                onChange={(e) => {
                  this.setState({
                    filterYear: e.target.value,
                  });
                  this.getList(e.target.value);
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
                  {this.state.filterYear} Cash-in Target :{" "}
                  {this.state.detailDashboard.cashInTarget
                    ? this.state.detailDashboard.cashInTarget
                    : 0}{" "}
                  bn
                </span>
                <span style={{ fontSize: "1.2rem" }}>
                  YTD Target : IDR{" "}
                  {this.state.detailDashboard.mtdTarget
                    ? this.state.detailDashboard.mtdTarget
                    : 0}{" "}
                  bn
                </span>
                <span style={{ fontSize: "1.2rem" }}>
                  YTD Cash-in : IDR{" "}
                  {this.state.detailDashboard.mtdCashIn
                    ? this.state.detailDashboard.mtdCashIn
                    : 0}{" "}
                  bn
                </span>
                <Pie
                  fontSize="2rem"
                  r={85}
                  percentage={
                    this.state.detailDashboard.achievement
                      ? this.state.detailDashboard.achievement
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
                tittle={`Target Cash-in vs Actual ${this.state.filterYear} (in billion Rp.)`}
                data={data}
              />
              <div className="margin-3-right">
                <label className="label-tittle">
                  {this.state.filterYear} Cash-in Target Breakdown
                </label>
                <ArrowLabel
                  tittle="Existing Customer"
                  color="#006900"
                  value={
                    this.state.detailDashboard.existingCustomer
                      ? this.state.detailDashboard.existingCustomer
                      : 0
                  }
                />
                <ArrowLabel
                  tittle="Sales Funnel"
                  color="#fc7603"
                  value={
                    this.state.detailDashboard.salesFunnel
                      ? this.state.detailDashboard.salesFunnel
                      : 0
                  }
                />
                <ArrowLabel
                  tittle="GAP"
                  color="#d10000"
                  value={
                    this.state.detailDashboard.gap
                      ? this.state.detailDashboard.gap
                      : 0
                  }
                />
              </div>
            </div>
            <div className="row">
              {this.state.dataDepartements.map((departement1, index) => (
                <LabelContainer
                  key={departement1.id}
                  tittle={departement1.name}
                  id={departement1.id}
                  boxColor={index == 0 ? "#00b541" : index === 1 ? "#0070c6" : "#7b24a6"}
                  year={this.state.filterYear}
                />
              ))}
            </div>
            <div className="row">
              {this.state.dataDepartements.map((departement1, index) => (
                <BarChart
                  key={"bar-chart-"+departement1.id}
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
}

export default AdminDashboard;
