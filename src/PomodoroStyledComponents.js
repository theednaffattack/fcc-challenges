import React, { Component } from "react";
import Icon from "react-geomicons";
import { Box as BaseBox, Flex as BaseFlex, Text, Button } from "rebass";
import ReactFCCtest from "react-fcctest";
import styled from "styled-components";
import { minHeight, minWidth, space, flexDirection } from "styled-system";

export const Flex = styled(BaseFlex)`
  ${minHeight}
  ${minWidth}
`;

export const Box = styled(BaseBox)`
  ${minHeight}
  ${minWidth}
`;
