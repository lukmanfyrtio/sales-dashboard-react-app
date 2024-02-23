import React, { Component } from "react";

export default class SalesItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="avg-sales-item-2">
        <div className="avg-sales-column-t-2">
          <label className="avg-sales-title avg-m">{this.props.salesname?this.props.salesname:""}</label>
          <div className="row-around">
            <label className="avg-sales-title-ss avg-m">
              Lead Convertion Rate
            </label>
            <label className="avg-sales-title-ss avg-m">{this.props.leadConvertionRate?this.props.leadConvertionRate:"0"} %</label>
          </div>
          <div className="row-around">
            <label className="avg-sales-title-ss avg-m">
              Sales Cycle Length
            </label>
            <label className="avg-sales-title-ss avg-m">{this.props.avgSales?this.props.avgSales:"0"} Days</label>
          </div>
          <div className="op-sales avg-m">
            <div
              className="op-sales-text-center"
              style={{ background: "#3b71ca" }}
            >
              {this.props.op?this.props.op:"0"}
            </div>
            <div
              className="op-sales-text-center"
              style={{ background: "#ff0000" }}
            >
              {this.props.pr?this.props.pr:"0"}
            </div>
            <div
              className="op-sales-text-center"
              style={{ background: "#fc7603" }}
            >
              {this.props.ng?this.props.ng:"0"}
            </div>
            <div
              className="op-sales-text-center"
              style={{ background: "#00b541" }}
            >
              {this.props.dl?this.props.dl:"0"}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
