import React, { Component } from "react";
import Icon from "react-geomicons";
import ReactFCCtest from "react-fcctest";
import { Box, Flex, Button, Text } from "rebass";
import styled from "styled-components";
import { minHeight, minWidth, space, flexDirection } from "styled-system";

// COMPONENTS:
export default class TimerLengthControlBase extends Component {
  render() {
    return (
      <div className="length-control">
        <div id={this.props.titleID}>{this.props.title}</div>
        <Button
          id={this.props.minID}
          className="btn-level"
          value="-"
          onClick={this.props.onClick}
        >
          <Icon name="chevronUp" />
          <i className="fa fa-arrow-down fa-2x" />
        </Button>
        <div id={this.props.lengthID} className="btn-level">
          {this.props.length}
        </div>
        <Button
          id={this.props.addID}
          className="btn-level"
          value="+"
          onClick={this.props.onClick}
        >
          <Icon name="chevronDown" />
          <i className="fa fa-arrow-up fa-2x" />
        </Button>
      </div>
    );
  }
}
