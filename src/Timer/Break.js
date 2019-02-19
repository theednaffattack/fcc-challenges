import React, { Component } from "react";
import { Box, Flex, Text, Button } from "rebass";
import Icon from "react-geomicons";
import styled from "styled-components";
import { minHeight, minWidth, space, flexDirection } from "styled-system";

export const Break = ({
  breakLength,
  handleBreakLengthIncrement,
  handleBreakLengthDecrement
}) => (
  <Flex alignItems="center" mt={3}>
    <Box id="break-label">
      <Flex flexDirection="row">
        <Flex flexDirection="column" width={1 / 3}>
          <Box>
            <Text id="break-length">{Math.floor(breakLength)}</Text>
          </Box>
          <Box>min</Box>
        </Flex>
      </Flex>
    </Box>
    <Flex flexDirection="column">
      <Button
        onClick={handleBreakLengthIncrement}
        id="break-increment"
        bg="crimson"
      >
        <Icon name="triangleUp" fill="#fff" />
      </Button>
      <Button
        onClick={handleBreakLengthDecrement}
        id="break-decrement"
        bg="crimson"
      >
        <Icon name="triangleDown" fill="#fff" />
      </Button>
    </Flex>
  </Flex>
);
