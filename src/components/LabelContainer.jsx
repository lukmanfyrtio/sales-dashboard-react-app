import React, { useEffect } from "react";
import Pie from "./Circle";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import apis from "../apis.js"

function LabelContainer(props) {
  const navigate = useNavigate();
  const { tittle, boxColor,id,year } = props;
  const [labelDashboard, setLabelDashboard] = React.useState({});
  useEffect(() => {

    axios
    .get(apis.server+"/dashboard/target-breakdown", {
      params: {
        departementUUID: id?id:null,
        year: year
      },
      headers: {
        "Authorization" : `Bearer ${localStorage.token?localStorage.token:""}`
      }
    })
    .then((res) => {
      setLabelDashboard(res.data.data)
    })
    .catch((err) => {
      console.error({ err });
    });
  }, [year,tittle])

  return (
    <div
      className="box-content"
      onClick={() => {
          navigate("/dashboard/detail", {
            state: {
              tittle,
              year:year,
              id:id
            },
          });
      }}
    >
      <div
        className="box-conatiner"
        style={{ background: `${boxColor ? boxColor : "#0070c6"}` }}
      >
        <span>{tittle}</span>
        <span>{year} Target : IDR {labelDashboard.cashInTarget?labelDashboard.cashInTarget:0} bn</span>
        <span>YTD Target : IDR {labelDashboard.mtdTarget?labelDashboard.mtdTarget:0} bn</span>
        <span>YTD Cash-in : IDR {labelDashboard.mtdCashIn?labelDashboard.mtdCashIn:0} bn</span>
      </div>
      <Pie
        r={60}
        fontSize="1.8rem"
        percentage={labelDashboard.achievement?labelDashboard.achievement:0}
        colour="red"
        tittle={tittle}
      />
    </div>
  );
}

export default LabelContainer;
