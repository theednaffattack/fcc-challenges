import React from "react";
import * as d3 from "d3";

import { Legend } from "./Legend";
import "./treemap.css";
// import data from "./flare2.json";
import data from "./movie_data.json";
// import data from "./globalTemperature.json";

import Tooltip from "../TooltipV2/tooltip";
import "../TooltipV2/styles.css";

// const Pree = styled.pre`
//   font-size: 1.5em;
//   ${minHeight}
//   ${minWidth}
//   ${space}
// `;

// const color = d3.scaleOrdinal().range(d3.schemeCategory20c);

export class Treemap extends React.Component {
  constructor(props) {
    super(props);
    this.color = this.color.bind(this);
    // this.hideTooltip = this.hideTooltip.bind(this);
    // this.showTooltip = this.showTooltip.bind(this);

    this.state = {
      hoveredBar: null,
      tooltipXPos: null,
      tooltipYPos: null
    };
  }

  hideTooltip() {
    this.setState({ displayTooltip: false });
  }
  showTooltip() {
    this.setState({ displayTooltip: true });
  }

  // updateScale(props) {
  //   const data = props.data;

  //   const xScale = d3.scaleBand();
  //   const yScale = d3.scaleLinear().nice();

  //   const xDomain = data.map(props.xFn);
  //   const yDomain = [0, d3.max(data, d => props.yFn(d))];

  //   xScale
  //     .domain(xDomain)
  //     .range([0, props.width - (props.margin.left + props.margin.right)])
  //     .paddingInner(props.paddingInner)
  //     .paddingOuter(props.paddingOuter);

  //   yScale
  //     .domain(yDomain)
  //     .range([props.height - (props.margin.top + props.margin.bottom), 0]);

  //   return { xScale, yScale };
  // }

  // updatePlotSize(props) {
  //   const plotWidth = props.width - (props.margin.left + props.margin.right);
  //   const plotHeight = props.height - (props.margin.top + props.margin.bottom);

  //   return { plotWidth, plotHeight };
  // }

  color = d3.scaleOrdinal(d3.schemeCategory10); // category20c()

  render() {
    // const { xScale, yScale } = this.updateScale(this.props);

    // const { plotWidth, plotHeight } = this.updatePlotSize(this.props);

    const width = 960;
    const height = 600;

    // const margin = {
    //   left: "40",
    //   top: "40",
    //   right: "40",
    //   bottom: "40"
    // };

    const treemap = d3.treemap().size([width, height]);
    // .padding(1);
    // .round(true);

    const root = d3
      .hierarchy(data, d => d.children) // .hierarchy(data)
      .sum(d => d.value)
      .sort((a, b) => b.height - a.height || b.value - a.value);

    const tree = treemap(root);

    // const metaData = {
    //   // xScale: xScale,
    //   // yScale: yScale,
    //   plotWidth: plotWidth,
    //   plotHeight: plotHeight
    // };
    // const plotData = {
    //   plotData: this.props.data.leaves().map((item, i) => {
    //     return {
    //       id: i,
    //       class: "tile",
    //       dataName: "flerg",
    //       dataValue: "blerg",
    //       dataCategory: "wahhsakdfss",
    //       data: item,
    //       x: item.x0,
    //       y: item.y0,
    //       fill: "rgba(237,20,61,0.3)",
    //       width: Math.max(0, item.x1 - item.x0),
    //       height: Math.max(0, item.y1 - item.y0)
    //     };
    //   })
    // };
    return (
      <div>
        <div>
          <h1 id="title">Movie Sales</h1>
        </div>
        <div>
          <p id="description">
            Top 100 Highest Grossing Movies Grouped By Genre
          </p>
        </div>
        {/* <div>
          <pre>{JSON.stringify(this.state, null, 2)}</pre>
        </div> */}

        <svg width={width} height={height}>
          {/* OLD LEGEND
          <g
            transform={`translate(${this.props.margin.left},${
              this.props.margin.top
            })`}
          >
            <rect width="17" height="17" fill="blue" y="-27" />
            <text
              textAnchor="start"
              dominantBaseline="central"
              y="-18"
              x="1.1em"
            >
              Enter
            </text>
          </g> */}

          {/* <g
            className="axisLayer"
            width={plotWidth}
            height={plotHeight}
            transform={`translate(${this.props.margin.left}, ${
              this.props.margin.top
            })`}
          > */}
          {/* <YGrid {...metaData} /> */}
          {/* <XAxis {...metaData} transform={`translate(0,${plotHeight})`} />
            <YAxis {...metaData} /> */}
          {/* </g> */}
          {/* <g
            className="plotLayer"
            width={plotWidth}
            height={plotHeight}
            transform={`translate(${this.props.margin.left}, ${
              this.props.margin.top
            })`}
          >*/}
          {/* <Bars {...metaData} {...plotData} /> */}
          {/*</g> */}
          {tree.leaves().map((item, i) => (
            <g
              key={i}
              className="node"
              transform={`translate(${this.props.margin.left}, ${
                this.props.margin.top
              })`}
              // style={{
              //   background: item.children
              //     ? Treemap.color(item.data.value)
              //     : "rgba(237,20,61,0.3)", //
              // left: `${item.x0}px`,
              // top: `${item.y0}px`,
              // width: `${Math.max(0, item.x1 - item.x0)}px`,
              // height: `${Math.max(0, item.y1 - item.y0)}px`
              // opacity: "0.3"
              // }}
            >
              <rect
                data-name={item.data.name}
                data-value={item.data.value}
                data-category={item.data.category}
                className="tile"
                x={item.x0}
                y={item.y0}
                width={Math.max(0, item.x1 - item.x0)}
                height={Math.max(0, item.y1 - item.y0)}
                fill={this.color(item.data.category)}
                onMouseOver={datum => {
                  datum.preventDefault();
                  let { pageX, pageY } = datum;
                  this.setState({
                    hoveredBar: {
                      value: item.data.value,
                      name: item.data.name,
                      category: item.data.category
                    },
                    tooltipXPos: pageX,
                    tooltipYPos: pageY
                  });
                }}
                onMouseOut={datum => this.setState({ hoveredBar: null })}
              />
              <text
                textAnchor="start"
                dominantBaseline="central"
                fill="white"
                y={item.y0}
                x={item.x0}
                dy="1.2em"
                fontSize="1.2em"
                fontWeight="bold"
                key={i + item.name + item.size}
              >
                {item.data.name}
              </text>
            </g>
          ))}

          <g
            id="legend"
            transform={`translate(${this.props.margin.left}, ${
              this.props.margin.top
            })`}
          >
            <Legend id="legend" root={root} color={this.color} />
          </g>
        </svg>

        {this.state.hoveredBar ? (
          <Tooltip
            hoveredBar={this.state.hoveredBar}
            xpos={this.state.tooltipXPos}
            ypos={this.state.tooltipYPos}
          />
        ) : null}
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
