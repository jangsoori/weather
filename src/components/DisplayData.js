import React, { Component } from "react";
import "./DisplayData.css";
import "./Loading.css";

import Loading from "./Loading";

const icon_config = {
  Thunderstorm: { icon: <i className="fas fa-poo-storm"></i> },
  Drizzle: { icon: <i className="fas fa-cloud-rain"></i> },
  Rain: { icon: <i className="fas fa-cloud-rain"></i> },
  Snow: { icon: <i className="fas fa-snowflake"></i> },
  Clear: { icon: <i className="fas fa-sun"></i> },
  Clouds: { icon: <i className="fas fa-cloud"></i> },

  Mist: { icon: <i className="fas fa-smog"></i> },
  // cloudsun: <i class="fas fa-cloud-sun"></i>,
};

export class DisplayData extends Component {
  render() {
    if (!this.props.cityData) {
      return <Loading />;
    }
    const { name, sys, weather, main, object } = this.props.cityData;
    const desc = weather[0].main;
    const { icon } = icon_config[desc];

    return (
      <div className="city-data-container">
        <div className="weather-name">
          <span>
            {name}, {sys.country}
          </span>
        </div>

        <div className="weather-img">{icon}</div>
        <div className="weather-temp">
          <span> {Math.round(main.temp)}°C</span>
          <span className="real-temp">
            Real feel: {main.feels_like.toFixed(1)}°C
          </span>
        </div>

        <div className="detailed-info">
          <span className="weather-description">
            <p>Sky: {weather[0].description}</p>
          </span>

          <span className="pressure">Pressure: {main.pressure} hPa</span>
          <span className="humidity">Humidity: {main.humidity}%</span>
        </div>
      </div>
    );
  }
}

export default DisplayData;
