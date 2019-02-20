// from: https://codepen.io/andrewerrico/pen/OjbvvW

import React, { Component } from "react";
import { Box as Base, Flex as BaseFlex, Text } from "rebass";
import styled from "styled-components";
import { minHeight, minWidth, space } from "styled-system";

import { Tooltip } from "./tooltip";
import "./styles.css";

export default class App extends Component {
  render() {
    return (
      <div className="container">
        <p>
          Here is a{" "}
          <Tooltip
            message={"Hello, I am a super cool tooltip"}
            position={"top"}
          >
            tooltip
          </Tooltip>{" "}
          on top.
        </p>
        <p>
          Here is a{" "}
          <Tooltip
            message={"Hello, I am a super cool tooltip"}
            position={"bottom"}
          >
            tooltip
          </Tooltip>{" "}
          on bottom.
        </p>
        <p>
          Here is a{" "}
          <Tooltip
            message={"Hello, I am a super cool tooltip"}
            position={"left"}
          >
            tooltip
          </Tooltip>{" "}
          on left.
        </p>
        <p>
          Here is a{" "}
          <Tooltip
            message={"Hello, I am a super cool tooltip"}
            position={"right"}
          >
            tooltip
          </Tooltip>{" "}
          on right.
        </p>
      </div>
    );
  }
}
