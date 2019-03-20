import React, { Component } from "react";
// import ReactDOM from "react-dom";
import ReactFCCtest from "react-fcctest";
import { Flex as BaseFlex, Text } from "rebass";
import styled from "styled-components";
import { minHeight, minWidth } from "styled-system";

// import { loadAllData } from "./DataHandling";
import NewHeatMap from "./NewHeatMap";

const Flex = styled(BaseFlex)`
  ${minWidth}
  ${minHeight}
`;

class HeatMapWrapper extends Component {
  constructor() {
    super();

    this.state = {
      data: null,
      body_width: document.body.clientWidth - 90
    };

    window.addEventListener("resize", this.resize().bind(this));
  }

  // componentWillMount() {
  //   this.load();
  // }

  resize() {
    let t;

    return event => {
      if (t !== false) {
        clearTimeout(t);
      }
      t = setTimeout(() => {
        const state = Object.assign(this.state, {
          body_width: document.body.clientWidth
        });
        this.setState(state);
      }, 100);
    };
  }

  // load() {
  //   loadAllData(this.loaded.bind(this));
  // }

  loaded(data) {
    this.setState({ data: data });
  }

  // clickHandler() {
  //   this.load();
  // }

  render() {
    return (
      <Flex bg="#eee" alignItems="center" flexDirection="column" width={1}>
        <NewHeatMap width="1000" height="900" />
        <ReactFCCtest />
      </Flex>
    );
  }
}

export default HeatMapWrapper;
// ReactDOM.render(<App />, document.getElementById("root"));
