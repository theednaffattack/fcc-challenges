import React, { Component } from "react";
// import ReactDOM from "react-dom";
import ReactFCCtest from "react-fcctest";
import { Box as Base, Flex as BaseFlex, Text } from "rebass";
import styled from "styled-components";
import { minHeight, minWidth, space } from "styled-system";
import * as d3 from "d3";

import { loadAllData } from "./DataHandling";
import BarChart from "./BarChart.js";

const Flex = styled(BaseFlex)`
  ${minWidth}
  ${minHeight}
`;

class BarChartWrapper extends Component {
  constructor() {
    super();

    this.state = {
      data: null,
      body_width: document.body.clientWidth - 90
    };

    window.addEventListener("resize", this.resize().bind(this));
  }

  componentWillMount() {
    this.load();
  }

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

  load() {
    loadAllData(this.loaded.bind(this));
  }

  loaded(data) {
    this.setState({ data: data });
  }

  clickHandler() {
    this.load();
  }

  render() {
    return (
      <Flex flexDirection="column" width={1}>
        <ReactFCCtest />
        <Text id="title">Fake Title</Text>
        <Text id="description">Fake Description</Text>
        {this.state.data ? (
          <BarChart
            className="barChartComponent"
            data={this.state.data}
            width={this.state.body_width}
            height={600}
            xFn={d => d.year}
            xFnToo={d => d.variance}
            yFn={d => d.month}
            margin={{ top: 60, left: 60, bottom: 20, right: 20 }}
            paddingInner={0}
            paddingOuter={0}
          />
        ) : (
          <p>No Data found</p>
        )}
        <div className="button">
          <button onClick={this.clickHandler.bind(this)}>Change Data</button>
        </div>
      </Flex>
    );
  }
}

export default BarChartWrapper;
// ReactDOM.render(<App />, document.getElementById("root"));
