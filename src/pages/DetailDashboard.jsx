import React, { useEffect } from "react";
import { FunnelChart } from "react-funnel-pipeline";
import "react-funnel-pipeline/dist/index.css";
import Pie from "../components/Circle";
import BarChart from "../components/BarChart";
import ArrowLabel from "../components/ArrowLabel";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import apis from "../apis.js";

import TablePagination from "@mui/material/TablePagination";
import AvgSalesCycleItem from "../components/AvgSalesCycleItem";
import SalesItem from "../components/SalesItem";

function DetailDashboard(props) {
  const navigate = useNavigate();
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


  const [page, setPage] = React.useState(0);
  const [totalElements, setTotalElements] = React.useState(0);
  const [dataSales, setDataSales] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(4);

  const [lastUpdateSalesFunnel, setLastUpdateSalesFunnel] = React.useState("-");

  const [avgOp, setAvgOp] = React.useState(0);
  const [avgNg, setAvgNg] = React.useState(0);
  const [avgPr, setAvgPr] = React.useState(0);
  const [avgDl, setAvgDl] = React.useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRows = (event, rows) => {
    setRowsPerPage(rows);
  };

  const [dataTargetvsActual, setDataTargetvsActual] = React.useState({
    labels: months,
    datasets: [
      {
        label: "Target",
        data: [],
        backgroundColor: "#3b71ca",
        borderColor: "#3b71ca",
        borderWidth: 1,
      },
      {
        label: "Actual",
        data: [],
        backgroundColor: "#00b541",
        borderColor: "#00b541",
        borderWidth: 1,
      },
    ],
  });

  const [dataRight, setDataRight] = React.useState({
    labels: months,
    datasets: [
      {
        label: "Existing",
        data: [],
        backgroundColor: "#3b71ca",
        borderColor: "#3b71ca",
        borderWidth: 1,
      },
      {
        label: "Prospek",
        data: [],
        backgroundColor: "#fc7603",
        borderColor: "#fc7603",
        borderWidth: 1,
      },
      {
        label: "Gap",
        data: [],
        backgroundColor: "#a5a5a5",
        borderColor: "#a5a5a5",
        borderWidth: 1,
      },
    ],
  });

  const optionLeftChart = {
    options: {
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 30,
          bottom: 0,
        },
      },
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

  const optionRightChart = {
    options: {
      elements: {
        bar: {
          borderWidth: 2,
        },
      },
      responsive: true,
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
        },
      },
      plugins: {
        datalabels: {
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
  const { state } = useLocation();
  const { tittle, year ,id} = state;

  const [labelDashboard, setLabelDashboard] = React.useState({});

  const [detailDashboard, setDetailDashboard] = React.useState({
    deals: 0,
    dropped: 0,
    leadsConvertionRate: 0,
    negotiation: 0,
    opportunities: 0,
    proposal: 0,
  });

  useEffect(() => {
    axios
      .get(apis.server + "/dashboard/list-sales", {
        params: {
          departementUUID: id ? id : null,
          tahun: year,
          page: page,
          size: 4,
        },
        headers: {
          Authorization: `Bearer ${localStorage.token ? localStorage.token : ""
            }`,
        },
      })
      .then((res) => {
        setDataSales(res.data.data.content);
        setTotalElements(res.data.data.totalElements);
      })
      .catch((err) => {
        console.error({ err });
      });
  }, [page])

  useEffect(() => {
    axios
      .get(apis.server + "/dashboard/target-breakdown", {
        params: {
          departementUUID: id ? id : null,
          year: year,
        },
        headers: {
          Authorization: `Bearer ${localStorage.token ? localStorage.token : ""
            }`,
        },
      })
      .then((res) => {
        setLabelDashboard(res.data.data);
      })
      .catch((err) => {
        console.error({ err });
      });

    axios
      .get(apis.server + "/dashboard/avg-sales", {
        params: {
          departementUUID: id ? id : null,
          tahun: year,
        },
        headers: {
          Authorization: `Bearer ${localStorage.token ? localStorage.token : ""
            }`,
        },
      })
      .then((res) => {
        setAvgDl(res.data.data.deals);
        setAvgPr(res.data.data.proposal);
        setAvgNg(res.data.data.negotiation);
        setAvgOp(res.data.data.opportunities);
      })
      .catch((err) => {
        console.error({ err });
      });

    axios
      .get(apis.server + "/dashboard/target-actual", {
        params: {
          departementUUID: id ? id : null,
          tahun: year,
        },
        headers: {
          Authorization: `Bearer ${localStorage.token ? localStorage.token : ""
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

        setDataTargetvsActual({
          labels: months,
          datasets: [
            {
              label: "Target",
              data: resultTarget,
              backgroundColor: "#3b71ca",
              borderColor: "#3b71ca",
              borderWidth: 1,
            },
            {
              label: "Actual",
              data: resultActual,
              backgroundColor: "#00b541",
              borderColor: "#00b541",
              borderWidth: 1,
            },
          ],
        });
      })
      .catch((err) => {
        console.error({ err });
      });

    axios
      .get(apis.server + "/dashboard/detail", {
        params: {
          departementUUID: id ? id : null,
          tahun: year
        },
        headers: {
          Authorization: `Bearer ${localStorage.token ? localStorage.token : ""
            }`,
        },
      })
      .then((res) => {
        setDetailDashboard(res.data.data);
        setLastUpdateSalesFunnel(res.data.data.lastUpdated);
      })
      .catch((err) => {
        console.error({ err });
      });

    axios
      .get(apis.server + "/dashboard/existing-gap", {
        params: {
          departementUUID: id ? id : null,
          tahun: year,
        },
        headers: {
          Authorization: `Bearer ${localStorage.token ? localStorage.token : ""
            }`,
        },
      })
      .then((res) => {
        var resultGAP = res.data.data.gap.map(function (x) {
          return Number(x);
        });

        var resultExisting = res.data.data.existing.map(function (x) {
          return Number(x);
        });

        var resultProspek = res.data.data.prospek.map(function (x) {
          return Number(x);
        });

        setDataRight({
          labels: months,
          datasets: [
            {
              label: "Existing",
              data: resultExisting,
              backgroundColor: "#3b71ca",
              borderColor: "#3b71ca",
              borderWidth: 1,
            },
            {
              label: "Prospek",
              data: resultProspek,
              backgroundColor: "#fc7603",
              borderColor: "#fc7603",
              borderWidth: 1,
            },
            {
              label: "Gap",
              data: resultGAP,
              backgroundColor: "#a5a5a5",
              borderColor: "#a5a5a5",
              borderWidth: 1,
            },
          ],
        });
      })
      .catch((err) => {
        console.error({ err });
      });
  }, []);

  return (
    <div>
      <Header />
      <div className="right-content">
        <div className="tittle-content">
          <ArrowBackIcon
            className="back-arrow"
            onClick={() => navigate("/dashboard")}
          />{" "}
          <label>Back</label>
        </div>
        <div className="column">
          <div className="row">
            <div className="label-detail">
              <span style={{ fontSize: "1.3rem" }}>
                {year} Cash-in Target :{" "}
                {labelDashboard.cashInTarget ? labelDashboard.cashInTarget : 0}{" "}
                bn
              </span>
              <span style={{ fontSize: "1.3rem" }}>
                YTD Target : IDR{" "}
                {labelDashboard.mtdTarget ? labelDashboard.mtdTarget : 0} bn
              </span>
              <span style={{ fontSize: "1.3rem" }}>
                YTD Cash-in : IDR{" "}
                {labelDashboard.mtdCashIn ? labelDashboard.mtdCashIn : 0} bn
              </span>
              <Pie
                r={90}
                fontSize="2rem"
                percentage={
                  labelDashboard.achievement ? labelDashboard.achievement : 0
                }
                colour="red"
                tittle="Achievement vs Target"
              />
            </div>
            <div className="funnel-content">
              <label className="label-tittle">Sales Funnel Status (Last Update : {lastUpdateSalesFunnel})</label>
              {Number(detailDashboard.dropped) == 0 && Number(detailDashboard.opportunities) == 0
                && Number(detailDashboard.proposal) == 0 && Number(detailDashboard.deals) == 0
                && Number(detailDashboard.negotiation) == 0 ? <label className="no-data-label">No data to display</label> : <FunnelChart
                getRowValueStyle={(row) => {
                  return { color: "white", fontSize: "1.8rem" };
                }}
                chartHeight={100}
                data={[
                  {
                    name: "Opportunities",
                    value: Number(detailDashboard.opportunities),
                  },
                  { name: "Proposal", value: Number(detailDashboard.proposal) },
                  {
                    name: "Negotiation",
                    value: Number(detailDashboard.negotiation),
                  },
                  { name: "Deals", value: Number(detailDashboard.deals) },
                  { name: "Dropped", value: Number(detailDashboard.dropped) },
                ]}
                pallette={[
                  "#3b71ca",
                  "#ff0000",
                  "#fc7603",
                  "#00b541",
                  "#a5a5a5",
                ]}
              />}

              <div className="logo-funnel" >
                {/* <img
                  style={{ background: tittle == "MOTIO" ? "#61CE70" : "", padding: tittle == "MOTIO" ? "4px" : "", borderRadius: tittle == "MOTIO" ? "3px" : "" }}
                  src={
                    tittle == "SWAMEDIA"
                      ? SwamediaLogo
                      : tittle == "MOTIO"
                        ? MotioLogo
                        : SwadamaLogo
                  }
                ></img> */}
              </div>
              <div className="circle-funnel-box">
                <div className="circle-funnel">
                  <label>{detailDashboard.avgSalesCycle}</label>
                  <label>days</label>
                </div>
                <label>Average sales cycle</label>
              </div>
              <div className="circle-funnel-box-2">
                <div className="circle-funnel">
                  <label>{detailDashboard.leadsConvertionRate}%</label>
                </div>
                <label>Leads Conversion Rate</label>
              </div>
            </div>
            <div>
              <label className="label-tittle">
                {year} Cash-in Target Breakdown
              </label>
              <ArrowLabel
                tittle="Existing Customer"
                color="#006900"
                value={
                  labelDashboard.existingCustomer
                    ? labelDashboard.existingCustomer
                    : 0
                }
              />
              <ArrowLabel
                tittle="Sales Funnel"
                color="#fc7603"
                value={
                  labelDashboard.salesFunnel ? labelDashboard.salesFunnel : 0
                }
              />
              <ArrowLabel
                tittle="GAP"
                color="#d10000"
                value={labelDashboard.gap ? labelDashboard.gap : 0}
              />
            </div>
          </div>
          <div className="row">
            <BarChart
              options={optionLeftChart.options}
              tittle={`${tittle} - Target vs Actual (in billion Rp.)`}
              data={dataTargetvsActual}
            />
            <BarChart
              tittle={`${tittle} - Existing / Prospects / Gap (in billion Rp.)`}
              data={dataRight}
              options={optionRightChart.options}
            />
          </div>
          <div className="avg-sales-content">
            <div className="avg-sales-home">
              <div className="avg-sales">
                <label className="label-avg">Avg. Lenght of Sales Stages</label>
                <div className="avg-sales-list">
                  <AvgSalesCycleItem
                    color="#3b71ca"
                    stage="Opportunities"
                    avgsalescycle={avgOp}
                  />
                  <AvgSalesCycleItem
                    color="#ff0000"
                    stage="Proposal"
                    avgsalescycle={avgPr}
                  />
                  <AvgSalesCycleItem
                    color="#fc7603"
                    stage="Negotiation"
                    avgsalescycle={avgNg}
                  />
                  <AvgSalesCycleItem
                    color="#00b541"
                    stage="Deals"
                    avgsalescycle={avgDl}
                  />
                </div>
              </div>

              <div className="avg-sales-2 r-class">
                <label className="label-avg">Sales Performance</label>
                {dataSales == 0 ? <label className="no-data-label">No data to display</label> : ""}
                <div className="avg-sales-list-2">
                {dataSales.map((row, index) => (
                    <SalesItem
                      key={index}
                      op={row.opportunities}
                      pr={row.proposal}
                      ng={row.negotiation}
                      dl={row.deals}
                      salesname={row.salesName}
                      leadConvertionRate={row.leadConvertionRate}
                      avgSales={row.avgSales}
                    />
                  ))}
                </div>
                <div className="bottom-right">
                  <TablePagination
                    component="div"
                    count={totalElements}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPageOptions={[4]}
                    onRowsPerPageChange={handleChangeRows}
                    rowsPerPage={rowsPerPage}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailDashboard;
