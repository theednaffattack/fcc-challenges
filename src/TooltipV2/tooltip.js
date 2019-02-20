import React, { Component } from "react";
import ReactFCCtest from "react-fcctest";
import { Box as Base, Flex as BaseFlex, Text } from "rebass";
import styled from "styled-components";
import { minHeight, minWidth, space } from "styled-system";

export default ({ hoveredBar, scales, xpos, ypos }) => {
  //   const { xScale, yScale } = scales;
  const styles = {
    left: `${xpos - 220}px`,
    top: `${ypos - 30}px`
  };

  return (
    <div
      className="Tooltip"
      id="tooltip"
      data-value={hoveredBar.value}
      style={styles}
    >
      {hoveredBar.value}
    </div>
  );
};
