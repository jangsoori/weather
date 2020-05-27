import "./UnitSwitch.css";

import React, { Component } from "react";

export class UnitSwitch extends Component {
  render() {
    return (
      <div class="button r" id="button-1">
        <input
          type="checkbox"
          class="checkbox"
          onChange={this.props.onChange}
        />
        <div class="knobs"></div>
        <div class="layer"></div>
      </div>
    );
  }
}

export default UnitSwitch;
