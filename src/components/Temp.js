import React, { Component } from "react";

class Temp extends Component {
  render() {
    return (
      <>
        <div>Temperature Celcius: {this.props.temp}</div>
      </>
    );
  }
}

export default Temp;
