import React, { Component } from "react";

class Temp extends Component {
  render() {
    return (
      <>
        <div>Temperature Farenheit: {this.props.temp}</div>
        <div>Temperature Celcius: {this.props.tempC}</div>
      </>
    );
  }
}

export default Temp;
