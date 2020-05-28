import React from "react";
import SearchBar from "./SearchBar";
import "./App.css";
import DisplayData from "./DisplayData";
import Axios from "axios";
import UnitSwitch from "./UnitSwitch";

//TODO: Search by country.

export class App extends React.Component {
  state = {
    term: "",
    cityList: [],
    filteredList: [],
    currentCity: {},
    currentID: null,
    cityData: null,
    system: "metric",
    searchFocus: false,
  };

  getCities = () => {
    Axios.get(`./current.city.list.json`).then((res) => {
      this.setState({ cityList: res.data });
    });
  };

  //Get user Location
  getUserLocation = () => {
    navigator.geolocation.getCurrentPosition((data) => {
      let { latitude, longitude } = data.coords;

      const KEY = `cbd584de8315da2675f82b2e428ce111`;
      //METRIC SYSTEM
      const system = this.state.system;
      //FETCH USER WEATHER BASED ON LONG & LAT PROVIDED BY GEOLOCATION API
      Axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${system}&appid=${KEY}`
      ).then((res) => {
        //Set state of cityData to fetched data
        this.setState({ cityData: res.data });
      });
    });
  };

  //Get country ID
  // getID = (cityName, countryName) => {
  //   let filtered = this.state.cityList.filter((city) => {
  //     if (city.name === cityName && city.country === countryName) {
  //       return city;
  //     }
  //   });

  //   return filtered[0].geonameid;
  // };

  //On load, get list of all cities and user's location
  componentDidMount() {
    this.getCities();
    this.getUserLocation();
  }

  onInput = (term) => {
    this.setState({
      filteredList: this.state.cityList.filter((city) => {
        return city.name.toLowerCase().includes(term.toLowerCase().trim())
          ? city
          : null;
      }),
    });
  };

  //Get weather on click of suggestion and fetch weather of it.
  getSuggestionId = (id) => {
    this.setState({ currentID: id }, () => {
      this.fetchWeather(this.state.currentID);
    });
  };

  //Fetch weather with geographical ID
  fetchWeather = (id) => {
    const KEY = `cbd584de8315da2675f82b2e428ce111`;
    const system = this.state.system;
    Axios.get(
      `https://api.openweathermap.org/data/2.5/weather?id=${id}&units=${system}&appid=${KEY}`
    ).then((res) => {
      this.setState({ cityData: res.data });
    });
  };

  clearSuggestions = () => {
    this.setState({ filteredList: [] });
  };

  //Get units
  getUnit = (e) => {
    if (e.target.checked) {
      this.setState({ system: "imperial" });
    } else {
      this.setState({ system: "metric" });
    }
  };

  checkSearchFocus = (status) => {
    this.setState({ searchFocus: status });
  };

  render() {
    console.log(this.state.searchFocus);

    return (
      <div className="app">
        {this.state.searchFocus ? (
          <div
            className="dim-bg"
            style={{
              animation: "fadeIn .5s forwards",
            }}
          ></div>
        ) : (
          <div
            className="dim-bg"
            style={{
              animation: "fadeOut 0.5s",
            }}
          ></div>
        )}

        <div className="search-container ">
          <SearchBar
            onSearchSubmit={this.onSearchSubmit}
            onInput={this.onInput}
            suggestions={this.state.filteredList}
            getSuggestionId={this.getSuggestionId}
            onBlur={this.clearSuggestions}
            checkFocus={this.checkSearchFocus}
          />
        </div>

        <DisplayData cityData={this.state.cityData} units={this.state.system} />
        <UnitSwitch onChange={this.getUnit} />
      </div>
    );
  }
}

export default App;
