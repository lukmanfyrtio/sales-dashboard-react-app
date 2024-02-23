import React, { Component } from "react";

export class ArrowLabel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="target-breakdown">
        <div className="arrow_box" style={{background:`${this.props.color}`,border: `0.1rem solid ${this.props.color}`}}>
          <label>{this.props.tittle}</label>
        </div>
        <label style={{fontSize:"1.5rem"}}>IDR {this.props.value?this.props.value:"0"} Bn</label>
      </div>
    );
  }
}

export default ArrowLabel;
