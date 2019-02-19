import React from "react";
import Icon from "react-geomicons";
import { Text, Button } from "rebass";

import { Box } from "./PomodoroStyledComponents";

const StartButton = ({ passId, running, startCountDown, value }) => {
  return (
    <Box>
      <Button id={passId} width={1 / 5} onClick={startCountDown}>
        {value}
      </Button>
    </Box>
  );
};

export default StartButton;
