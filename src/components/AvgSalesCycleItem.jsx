import React, { Component } from "react";

export class AvgSalesCycleItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="avg-sales-item">
        <div className="avg-color-item" style={{background:`${this.props.color}`}}></div>
        <div className="avg-sales-column-t">
          <label className="avg-sales-title">{this.props.stage?this.props.stage:"Opportunities"}</label>
          <label className="avg-sales-title-s">{this.props.avgsalescycle?this.props.avgsalescycle:0} days on average</label>
        </div>
      </div>
    );
  }
}

export default AvgSalesCycleItem;
