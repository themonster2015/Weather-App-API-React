import React, { Component } from "react";
import Wind from "./Wind";
import Humidity from "./Humidity";
import AirPressure from "./AirPressure";
import Temp from "./Temp";

class WeatherInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wind: null,
      humidity: null,
      pressure: null,
      temp: null,
      tempC: null,
      loaded: false,
      error: false
    };
    this.submitHandler = this.submitHandler.bind(this);
  }
  fetchData(city) {
    const APIKEY = "3df4d45774f543d9e93f625e71e98991";
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${APIKEY}`,
      {mode: 'cors'}
    )
      .then(res => {
        return res.json();
      })
      .then(res => {
        console.log(res);
        let tempc = this.toCelcius(res.main.temp);
        if (res.cod === 200) {
          this.setState({
            wind: res.wind.speed,
            humidity: res.main.humidity,
            pressure: res.main.pressure,
            temp: res.main.temp,
            tempC: tempc,
            loaded: true,
            error: false
          });
        } else {
          this.setState({
            error: true,
            loaded: false
          });
        }
      });
  }
  submitHandler(e) {
    e.preventDefault();
    const city = document.querySelector("#city");
    let value = city.value;
    value = this.capitalize(value);
    console.log(value);
    this.fetchData(value);
  }
  capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
  toCelcius(temp) {
    return Math.round((5 / 9) * (temp - 32));
  }
  render() {
    return (
      <>
        <section className="d-flex flex-column justify-content-center align-items-center">
          <form onSubmit={this.submitHandler} className="d-flex ">
            <input id="city" name="city" placeholder="Enter a city" />
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </form>
          {this.state.loaded && <Wind wind={this.state.wind} />}
          {this.state.loaded && <Humidity humidity={this.state.humidity} />}
          {this.state.loaded && <AirPressure pressure={this.state.pressure} />}
          {this.state.loaded && (
            <Temp temp={this.state.temp} tempC={this.state.tempC} />
          )}
          {this.state.error && <h1>City Not Found!</h1>}
        </section>
      </>
    );
  }
}

export default WeatherInfo;
