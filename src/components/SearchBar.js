import React, { Component } from "react";
import "./SearchBar.css";

export class SearchBar extends Component {
  state = { query: "", focused: false };

  onInputChange = (e) => {
    this.setState({ query: e.target.value }, () => {
      this.props.onInput(this.state.query);
    });
  };

  renderSuggestions = (list) => {
    return list.length < 10
      ? list.map((city) => {
          return (
            <div
              className="suggestion"
              id={city.geonameid}
              onMouseDown={this.props.getSuggestionId.bind(
                this,
                city.geonameid
              )}
            >
              {city.name}, {city.country}
            </div>
          );
        })
      : null;
  };

  render() {
    console.log(this.state);

    return (
      <React.Fragment>
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Search a city"
            onChange={this.onInputChange}
            className="search-input awesomplete"
            onFocus={() => {
              this.setState({
                focused: true,
              });
            }}
            onBlur={(e) => {
              this.setState({ query: "", focused: false });
              e.target.value = "";
              this.props.onBlur();
            }}
          />
          {/* <button type="submit" className="search-submit">
            <i className="fas fa-search"></i>
          </button> */}
        </div>
        <div className="suggestions">
          {this.state.focused
            ? this.renderSuggestions(this.props.suggestions)
            : null}
        </div>
      </React.Fragment>
    );
  }
}

export default SearchBar;
