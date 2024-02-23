import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

import { Chart, registerables } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
Chart.register(...registerables,ChartDataLabels);

export class BarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div
        className="chart-container"
        style={this.props.width ? { width: `${this.props.width}` } : {}}
      >
        <label>{this.props.tittle ? this.props.tittle : ""}</label>
        <Bar options={this.props.options} data={this.props.data} />
      </div>
    );
  }
}

export default BarChart;
