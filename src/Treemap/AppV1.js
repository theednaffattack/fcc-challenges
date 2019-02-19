import React, { Component } from "react";
import ReactFCCtest from "react-fcctest";
import { Box as Base, Flex as BaseFlex, Text } from "rebass";
import styled from "styled-components";
import { minHeight, minWidth, space } from "styled-system";
import * as d3 from "d3";

import "./treemap.css";
import data from "./flare2.json";

const Pree = styled.pre`
  font-size: 1.5em;
`;

// const color = d3.scaleOrdinal().range(d3.schemeCategory20c);

export class Treemap1 extends React.Component {
  static color = d3.scaleOrdinal(d3.schemeCategory10); // category20c()

  render() {
    // const treemap = d3
    //   .treemap()
    //   .size([960, 500])
    //   .sticky(true)
    //   .value(d => d.size)(data);

    const width = 960;
    const height = 600;

    const treemap = d3
      .treemap()
      .size([width, height])
      .padding(1)
      .round(true);

    const root = d3
      .hierarchy(data, d => d.children) // .hierarchy(data)
      .sum(d => d.size)
      .sort((a, b) => b.height - a.height || b.size - a.size);

    const tree = treemap(root);

    // const {"data","height","depth","parent","value","x0","x1","y0","y1"} = root.leaves
    return (
      <div>
        <div>
          <h1 id="title">Title</h1>
        </div>
        <div>
          <p id="description">Description</p>
        </div>
        <div
          style={{
            position: "relative",
            width: "960px",
            height: "500px",
            left: "10px",
            top: "10px"
          }}
        >
          <ReactFCCtest />
          {tree.leaves().map(item => (
            <div
              className="node"
              style={{
                background: "rgba(237,20,61,0.3)", // item.children ? Treemap.color(item.name) : null,
                left: `${item.x0}px`,
                top: `${item.y0}px`,
                width: `${Math.max(0, item.x1 - item.x0)}px`,
                height: `${Math.max(0, item.y1 - item.y0)}px`
                // opacity: "0.3"
              }}
            >
              <Text>{item.data.name}</Text>
              <Text classname="tile">{item.data.size}</Text>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

//   d3.json("https://gist.githubusercontent.com/mbostock/1093025/raw/490fffd1ae637d3275aa9eaa8b0487147717dd40/flare.json",
//           function(error, root) {
// //   ReactDOM.render(
// //     <Treemap root={root} />,
// //     document.getElementById('container')
// //     );
//   })
