import React from "react";
import {
  Box,
  Button as BaseButton,
  Flex,
  Heading,
  Position,
  Provider,
  Text
} from "rebass";
import { render } from "react-dom";
import { Link as BaseLink, Router } from "@reach/router";
import styled, { ThemeProvider } from "styled-components";
import { height, minHeight, space, width } from "styled-system";

// import Home from "./Home";
import theme from "./app_styles/theme";
// import { NavList } from "./SideBar/navList";
import Nav from "./SideBar/Sidebar";
import Home from "./Home/";
import MyMarkdown from "./MyMarkdown";
import DrumMachine from "./DrumMachine";
import NewTimerV2 from "./Timer/NewTimer_v2";
import BarChartWrapper from "./Heatmap/App";
import Treemap from "./Treemap/App";
import SurveyForm from "./SurveyForm";
import ProductLandingPage from "./ProductLandingPage";
import TechnicalDocumentation from "./TechnicalDocumentation";
import Portfolio from "./Portfolio";
import VxChart from "./VxStockMarketExample";

const Button = styled(BaseButton)`
  ${minHeight}
  ${height}
  ${space}
`;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }
  state = { isOpen: false };

  handleClick() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  componentDidMount() {
    // this.setState({ isOpen: !this.state.isOpen });
    // setInterval(() => {
    //   this.setState({ isOpen: !this.state.isOpen });
    // }, 2000);
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        {/* <Flex
          mx={0}
          flexDirection="column"
          width={1}
          style={{ border: "3px dotted green", minWidth: "100%" }}
        > */}
        <Flex
          mx={0}
          flexDirection="row"
          // style={{ border: "3px dotted fuchsia" }}
        >
          {/* <Nav isOpen={this.state.isOpen} /> */}
          <Flex
            flexDirection="column"
            width={1}
            // style={{ border: "3px dotted green" }}
          >
            {/* <NavList /> */}
            <Router>
              <Home path="/" />
              <MyMarkdown path="/markdown" />
              <DrumMachine path="/drummachine" />
              <NewTimerV2 path="/pomodoro" />
              <BarChartWrapper path="/heatmap" />
              <Treemap path="/treemap" />
              <SurveyForm path="/surveyform" />
              <ProductLandingPage path="/productlandingpage" />
              <TechnicalDocumentation path="/technicaldocumentation" />
              <Portfolio path="/portfolio" />
              <VxChart path="/vxchart" />
            </Router>
          </Flex>
        </Flex>
        {/* </Flex> */}
      </ThemeProvider>
    );
  }
}

render(<App />, document.getElementById("root"));

export default App;
