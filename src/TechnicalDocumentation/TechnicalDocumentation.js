import React, { Component } from "react";
import { Box, Button, Flex, Text } from "rebass";
import ReactFCCtest from "react-fcctest";
import styled from "styled-components";
import { color, space, width, minWidth, borders } from "styled-system";

import { Header } from "../Header";

export class TechnicalDocumentation extends Component {
  render() {
    return (
      <Flex flexDirection="column" width={1}>
        <Header />
        <Flex mt="50px">something to see</Flex>
      </Flex>
    );
  }
}
