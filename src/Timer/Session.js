import React, { Component } from "react";
import { Box, Flex, Text, Button } from "rebass";
import Icon from "react-geomicons";
import styled from "styled-components";
import { minHeight, minWidth, space, flexDirection } from "styled-system";

export const Session = ({
  session,
  handleSessionLengthIncrement,
  handleSessionLengthDecrement
}) => (
  <Flex alignItems="center" mt={3}>
    <Box id="session-label">
      <Flex flexDirection="row">
        <Flex flexDirection="column" width={1 / 3}>
          <Box>
            <Text id="session-length">{session}</Text>
          </Box>
          <Box>min</Box>
        </Flex>
      </Flex>
    </Box>

    <Flex flexDirection="column">
      <Button
        onClick={handleSessionLengthIncrement}
        id="session-increment"
        bg="crimson"
      >
        <Icon name="triangleUp" fill="#fff" />
      </Button>
      <Button
        onClick={handleSessionLengthDecrement}
        id="session-decrement"
        bg="crimson"
      >
        <Icon name="triangleDown" fill="#fff" />
      </Button>
    </Flex>
  </Flex>
);
