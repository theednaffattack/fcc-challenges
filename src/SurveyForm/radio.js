import React, { Component } from "react";

export class Input extends Component {
  handleChange = event => {};
  render() {
    return (
      <input
        type="radio"
        name="tvOptions"
        value={this.props.tvOptions}
        options={[
          { label: "The Wire", value: "the wire" },
          { label: "The Simpsons", value: "the simpsons" },
          { label: "Martin", value: "martin" }
        ]}
        onChange={this.handleChange}
      />
    );
  }
}
