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
      openLoad:true,
      resultDataTargetMotio: [],
      resultDataTargetSwamedia: [],
      resultDataTargetSwadama: [],
      resultDataActualMotio: [],
      resultDataActualSwamedia: [],
      resultDataActualSwadama: [],
      dataChartMotio: {
        labels: [months[1], months[2], months[3]],
        datasets: [
          {
            label: "Target",
            data: [0, 0, 0, 0, 0, 0, 0],
            backgroundColor: "#3b71ca",
            borderColor: "#3b71ca",
            borderWidth: 1,
          },
          {
            label: "Actual",
            data: [0, 0, 0, 0, 0, 0, 0],
            backgroundColor: "#00b541",
            borderColor: "#00b541",
            borderWidth: 1,
          },
        ],
      },
      filterYear: new Date().getFullYear(),
      dataChartSwadama: {
        labels: [months[1], months[2], months[3]],
        datasets: [
          {
            label: "Target",
            data: [0, 0, 0, 0, 0, 0, 0],
            backgroundColor: "#3b71ca",
            borderColor: "#3b71ca",
            borderWidth: 1,
          },
          {
            label: "Actual",
            data: [0, 0, 0, 0, 0, 0, 0],
            backgroundColor: "#00b541",
            borderColor: "#00b541",
            borderWidth: 1,
          },
        ],
      },
      dataChartSwamedia: {
        labels: [months[1], months[2], months[3]],
        datasets: [
          {
            label: "Target",
            data: [0, 0, 0, 0, 0, 0, 0],
            backgroundColor: "#3b71ca",
            borderColor: "#3b71ca",
            borderWidth: 1,
          },
          {
            label: "Actual",
            data: [0, 0, 0, 0, 0, 0, 0],
            backgroundColor: "#00b541",
            borderColor: "#00b541",
            borderWidth: 1,
          },
        ],
      },
    };
  }


  getList = (year) => {
    this.setState({
      openLoad:true
    })
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
    axios
      .get(apis.server + "/dashboard/target-actual", {
        params: {
          bup: "SWADAMA",
          tahun: year,
        },
        headers: {
          Authorization: `Bearer ${
            localStorage.token ? localStorage.token : ""
          }`,
        },
      })
      .then((res) => {
        var resultActual = res.data.data.actual.map(function (x) {
          return Number(x);
        });

        var resultTarget = res.data.data.target.map(function (x) {
          return Number(x);
        });

        const d = new Date();
        let monthN = d.getMonth();
        this.setState({
          resultDataActualSwadama: resultActual,
          resultDataTargetSwadama: resultTarget,
          dataChartSwadama: {
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
        });
      })
      .catch((err) => {
        console.error({ err });
      });

    axios
      .get(apis.server + "/dashboard/target-breakdown-all", {
        params: {
          tahun: year,
        },
        headers: {
          Authorization: `Bearer ${
            localStorage.token ? localStorage.token : ""
          }`,
        },
      })
      .then((res) => {
        this.setState({ detailDashboard: res.data.data });
      })
      .catch((err) => {
        console.error({ err });
      });

    axios
      .get(apis.server + "/dashboard/target-actual", {
        params: {
          bup: "MOTIO",
          tahun: year,
        },
        headers: {
          Authorization: `Bearer ${
            localStorage.token ? localStorage.token : ""
          }`,
        },
      })
      .then((res) => {
        var resultActual = res.data.data.actual.map(function (x) {
          return Number(x);
        });

        var resultTarget = res.data.data.target.map(function (x) {
          return Number(x);
        });

        const d = new Date();
        let monthN = d.getMonth();
        this.setState({
          resultDataActualMotio: resultActual,
          resultDataTargetMotio: resultTarget,
          dataChartMotio: {
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
        });
      })
      .catch((err) => {
        console.error({ err });
      });

    axios
      .get(apis.server + "/dashboard/target-actual", {
        params: {
          bup: "SWAMEDIA",
          tahun: year,
        },
        headers: {
          Authorization: `Bearer ${
            localStorage.token ? localStorage.token : ""
          }`,
        },
      })
      .then((res) => {
        var resultActual = res.data.data.actual.map(function (x) {
          return Number(x);
        });

        var resultTarget = res.data.data.target.map(function (x) {
          return Number(x);
        });

        const d = new Date();
        let monthN = d.getMonth();
        this.setState({
          resultDataActualSwamedia: resultActual,
          resultDataTargetSwamedia: resultTarget,
          dataChartSwamedia: {
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
        });
      })
      .catch((err) => {
        console.error({ err });
      });
      setTimeout(() => {
        // Set openLoad to false to hide the loader when the data is loaded
        this.setState({
          openLoad: false,
        });
      }, 2000); // You can adjust the delay as needed
  };

  componentDidMount() {
    this.getList(this.state.filterYear);
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
    let monthArray=[];
    for (let i = 0; i <= monthN; i++) {
      monthArray.push(months[i]);
    }
    const data = {
      labels:this.state.filterYear===year?monthArray:months,
      datasets: [
        {
          label: "Target",
          data: [
            round(
              Number(
                this.state.resultDataTargetSwadama[0] +
                  this.state.resultDataTargetSwamedia[0] +
                  this.state.resultDataTargetMotio[0]
              )
            ),
            round(
              Number(
                this.state.resultDataTargetSwadama[1] +
                  this.state.resultDataTargetSwamedia[1] +
                  this.state.resultDataTargetMotio[1]
              )
            ),
            round(
              Number(
                this.state.resultDataTargetSwadama[2] +
                  this.state.resultDataTargetSwamedia[2] +
                  this.state.resultDataTargetMotio[2]
              )
            ),
            round(
              Number(
                this.state.resultDataTargetSwadama[3] +
                  this.state.resultDataTargetSwamedia[3] +
                  this.state.resultDataTargetMotio[3]
              )
            ),
            round(
              Number(
                this.state.resultDataTargetSwadama[4] +
                  this.state.resultDataTargetSwamedia[4] +
                  this.state.resultDataTargetMotio[4]
              )
            ),
            round(
              Number(
                this.state.resultDataTargetSwadama[5] +
                  this.state.resultDataTargetSwamedia[5] +
                  this.state.resultDataTargetMotio[5]
              )
            ),
            round(
              Number(
                this.state.resultDataTargetSwadama[6] +
                  this.state.resultDataTargetSwamedia[6] +
                  this.state.resultDataTargetMotio[6]
              )
            ),
            round(
              Number(
                this.state.resultDataTargetSwadama[7] +
                  this.state.resultDataTargetSwamedia[7] +
                  this.state.resultDataTargetMotio[7]
              )
            ),
            round(
              Number(
                this.state.resultDataTargetSwadama[8] +
                  this.state.resultDataTargetSwamedia[8] +
                  this.state.resultDataTargetMotio[8]
              )
            ),
            round(
              Number(
                this.state.resultDataTargetSwadama[9] +
                  this.state.resultDataTargetSwamedia[9] +
                  this.state.resultDataTargetMotio[9]
              )
            ),
            round(
              Number(
                this.state.resultDataTargetSwadama[10] +
                  this.state.resultDataTargetSwamedia[10] +
                  this.state.resultDataTargetMotio[10]
              )
            ),
            round(
              Number(
                this.state.resultDataTargetSwadama[11] +
                  this.state.resultDataTargetSwamedia[11] +
                  this.state.resultDataTargetMotio[11]
              )
            ),
          ],
          backgroundColor: "#3b71ca",
          borderColor: "#3b71ca",
          borderWidth: 1,
        },
        {
          label: "Actual",
          data: [
            round(
              Number(
                this.state.resultDataActualSwadama[0] +
                  this.state.resultDataActualSwamedia[0] +
                  this.state.resultDataActualMotio[0]
              )
            ),
            round(
              Number(
                this.state.resultDataActualSwadama[1] +
                  this.state.resultDataActualSwamedia[1] +
                  this.state.resultDataActualMotio[1]
              )
            ),
            round(
              Number(
                this.state.resultDataActualSwadama[2] +
                  this.state.resultDataActualSwamedia[2] +
                  this.state.resultDataActualMotio[2]
              )
            ),
            round(
              Number(
                this.state.resultDataActualSwadama[3] +
                  this.state.resultDataActualSwamedia[3] +
                  this.state.resultDataActualMotio[3]
              )
            ),
            round(
              Number(
                this.state.resultDataActualSwadama[4] +
                  this.state.resultDataActualSwamedia[4] +
                  this.state.resultDataActualMotio[4]
              )
            ),
            round(
              Number(
                this.state.resultDataActualSwadama[5] +
                  this.state.resultDataActualSwamedia[5] +
                  this.state.resultDataActualMotio[5]
              )
            ),
            round(
              Number(
                this.state.resultDataActualSwadama[6] +
                  this.state.resultDataActualSwamedia[6] +
                  this.state.resultDataActualMotio[6]
              )
            ),
            round(
              Number(
                this.state.resultDataActualSwadama[7] +
                  this.state.resultDataActualSwamedia[7] +
                  this.state.resultDataActualMotio[7]
              )
            ),
            round(
              Number(
                this.state.resultDataActualSwadama[8] +
                  this.state.resultDataActualSwamedia[8] +
                  this.state.resultDataActualMotio[8]
              )
            ),
            round(
              Number(
                this.state.resultDataActualSwadama[9] +
                  this.state.resultDataActualSwamedia[9] +
                  this.state.resultDataActualMotio[9]
              )
            ),
            round(
              Number(
                this.state.resultDataActualSwadama[10] +
                  this.state.resultDataActualSwamedia[10] +
                  this.state.resultDataActualMotio[10]
              )
            ),
            round(
              Number(
                this.state.resultDataActualSwadama[11] +
                  this.state.resultDataActualSwamedia[11] +
                  this.state.resultDataActualMotio[11]
              )
            ),
          ],
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
                <MenuItem key="1" value="" style={getStyles()}>
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
                tittle={`Target Cash-in vs Actual ${this.state.filterYear} (dalam miliar Rp.)`}
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
            <LabelContainer
                tittle={"SWADAMA"}
                boxColor="#00b541"
                year={this.state.filterYear}
              />
              <LabelContainer
                tittle={"MOTIO"}
                boxColor="#0070c6"
                year={this.state.filterYear}
              />
              <LabelContainer
                tittle={"SWAMEDIA"}
                boxColor="#7b24a6"
                year={this.state.filterYear}
              />
            </div>
            <div className="row">
              <BarChart
                options={optionHorizontal.options}
                className="width-30"
                tittle="SWADAMA - Pencapaian 3 Bulan Terakhir (dalam miliar Rp.)"
                data={this.state.dataChartSwadama}
              />
              <BarChart
                options={optionHorizontal.options}
                className="width-30"
                tittle="MOTIO - Pencapaian 3 Bulan Terakhir (dalam miliar Rp.)"
                data={this.state.dataChartMotio}
              />
              <BarChart
                options={optionHorizontal.options}
                className="width-30"
                tittle="SWAMEDIA - Pencapaian 3 Bulan Terakhir (dalam miliar Rp.)"
                data={this.state.dataChartSwamedia}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminDashboard;
