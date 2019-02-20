import React from "react";
import { Box, Flex } from "rebass";
import { render } from "react-dom";
import { Link as BaseLink, Router } from "@reach/router";
import styled from "styled-components";
import { space, width } from "styled-system";

import Home from "./Home";
import MyMarkdown from "./MyMarkdown";
import DrumMachine from "./DrumMachine";
import NewTimerV2 from "./Timer/NewTimer_v2";
// import BarChart from "./BarChart/App";
import BarChartWrapper from "./Heatmap/App";
import Treemap from "./Treemap/App";
// import BarChart from "./BarChart/App";
import Tooltip from "./Tooltip/example";

const Link = styled(BaseLink)`
  ${space}
  ${width}
`;

const App = () => (
  <Flex mx={5} flexDirection="column">
    <h1>FCC: Front End Libraries Challenges</h1>
    <nav>
      <Link width={1 / 3} mr={2} to="/">
        Home
      </Link>
      <Link width={1 / 3} mr={2} to="markdown">
        Markdown Previewer_v3
      </Link>
      <Link width={1 / 3} mr={2} to="drummachine">
        Drum machine
      </Link>
      <Link width={1 / 3} mr={2} to="pomodoro">
        Pupper Pomodoro
      </Link>
      {/* <Link width={1 / 3} mr={2} to="barchart">
        Bar Chart
      </Link> */}
      <Link width={1 / 3} mr={2} to="heatmap">
        Heatmap
      </Link>
      <Link width={1 / 3} mr={2} to="treemap">
        Treemap
      </Link>
      <Link width={1 / 3} mr={2} to="tooltip">
        Tooltip
      </Link>
    </nav>
    <Router>
      <Home path="/" />
      <MyMarkdown path="/markdown" />
      <DrumMachine path="/drummachine" />
      {/* <Pomodoro path="/pomodoro_old" />
      <PomodoroNew path="/pomodoro_oldtoo" /> */}
      <NewTimerV2 path="/pomodoro" />
      {/* <BarChart path="/barchart" /> */}
      <BarChartWrapper path="/heatmap" />
      <Treemap path="/treemap" />
      <Tooltip path="/tooltip" />
    </Router>
  </Flex>
);

render(<App />, document.getElementById("root"));

export default App;
