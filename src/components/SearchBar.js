import React, { Component } from "react";
import "./SearchBar.css";

export class SearchBar extends Component {
  state = { query: "" };

  onInputChange = (e) => {
    this.setState({ query: e.target.value }, () => {
      this.props.onInput(this.state.query);
    });
  };

  renderSuggestions = (list) => {
    //Sort suggesdtions alphabetically (city name)
    list.sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      }
    });
    return list.length < 20
      ? list.map((city) => {
          return (
            <div
              className="suggestion"
              id={city.id}
              onMouseDown={this.props.getSuggestionId.bind(this, city.id)}
            >
              {city.name}, {city.country}
            </div>
          );
        })
      : null;
  };

  render() {
    return (
      <React.Fragment>
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Search a city"
            onChange={this.onInputChange}
            className="search-input awesomplete"
            onFocus={() => {
              this.setState(
                {
                  focused: true,
                },
                () => {
                  this.props.checkFocus(this.state.focused);
                }
              );
            }}
            onBlur={(e) => {
              this.setState({ query: "", focused: false }, () => {
                this.props.checkFocus(this.state.focused);
              });
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
