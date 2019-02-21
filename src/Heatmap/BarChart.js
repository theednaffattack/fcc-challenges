import React, { Component } from "react";
import * as d3 from "d3";
import { XAxis, YAxis, YGrid, Bars } from "./ChartComponents.js";

class BarChart extends Component {
  constructor(props) {
    super();
  }

  updateScale(props) {
    const data = props.data;
    const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const yMin = d3.min(data, d => props.yFn(d));
    const yMax = d3.max(data, d => props.yFn(d));

    const xScale = d3.scaleBand();
    const yScale = d3.scaleLinear().nice();

    var scale_y = d3
      .scaleOrdinal()
      .domain([
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ])
      .range(
        Array.from(
          new Array(12),
          (x, i) =>
            i * (props.height / 12) + props.margin.top + props.margin.bottom
        )
      );
    // const yScale = d3.scaleOrdinal();
    const heatScale = d3.scaleLinear();
    // const minYear = d3.min(data, d => d.year);
    const xDomain = data.map(props.xFn);
    const intensityValue = d3.extent(props.xFnToo);
    const yDomain = [yMin, yMax];
    // const yDomain = [...months];
    // const barWidth = props.width / (monthlyVariance.length / months.length);
    const barHeight = props.height / months.length;

    xScale
      .domain(xDomain)
      .range([0, props.width - (props.margin.left + props.margin.right)])
      .paddingInner(props.paddingInner)
      .paddingOuter(props.paddingOuter);

    yScale
      .domain(yDomain)
      // .range(
      //   months.map((month, i) => {
      //     // this is my 'hack', i don't know how to do it properly xD
      //     console.log(i * barHeight + barHeight / 2);
      //     return i * barHeight + barHeight / 2;
      //   })
      // );
      .range([
        props.height - (props.margin.top + props.margin.bottom) - barHeight,
        0
      ]);

    // .range([1, 12]);

    return { xScale, yScale, xDomain };
  }

  updatePlotSize(props) {
    const plotWidth = props.width - (props.margin.left + props.margin.right);
    const plotHeight = props.height - (props.margin.top + props.margin.bottom);

    return { plotWidth, plotHeight };
  }

  render() {
    const { xScale, yScale, xDomain, intensityValue } = this.updateScale(
      this.props
    );

    const { plotWidth, plotHeight } = this.updatePlotSize(this.props);

    const metaData = {
      xScale: xScale,
      yScale: yScale,
      xDomain,
      intensityValue,
      plotWidth: plotWidth,
      plotHeight: plotHeight
    };
    const plotData = {
      plotData: this.props.data.map((d, i) => {
        return {
          id: i,
          data: d,
          x: xScale(this.props.xFn(d)),
          y: yScale(this.props.yFn(d)),
          width: xScale.bandwidth(),
          height: plotHeight - yScale(this.props.yFn(d))
        };
      })
    };

    return (
      <svg width={this.props.width} height={this.props.height}>
        <g
          transform={`translate(${this.props.margin.left},${
            this.props.margin.top
          })`}
        >
          <rect width="17" height="17" fill="blue" y="-27" />
          <text textAnchor="start" dominantBaseline="central" y="-18" x="1.1em">
            Enter
          </text>
        </g>

        <g
          transform={`translate(${this.props.margin.left + 70},${
            this.props.margin.top
          })`}
        >
          <rect width="17" height="17" fill="green" y="-27" />
          <text textAnchor="start" dominantBaseline="central" y="-18" x="1.1em">
            Update
          </text>
        </g>

        <g
          transform={`translate(${this.props.margin.left + 160},${
            this.props.margin.top
          })`}
        >
          <rect width="17" height="17" fill="red" y="-27" />
          <text textAnchor="start" dominantBaseline="central" y="-18" x="1.1em">
            Exit
          </text>
        </g>

        <g
          className="axisLayer"
          width={plotWidth}
          height={plotHeight}
          transform={`translate(${this.props.margin.left}, ${
            this.props.margin.top
          })`}
        >
          {/* <YGrid {...metaData} /> */}
          <XAxis {...metaData} transform={`translate(0,${plotHeight})`} />
          <YAxis {...metaData} />
        </g>
        <g
          className="plotLayer"
          width={plotWidth}
          height={plotHeight}
          transform={`translate(${this.props.margin.left}, ${
            this.props.margin.top
          })`}
        >
          <Bars {...metaData} {...plotData} />
        </g>
      </svg>
    );
  }
}

export default BarChart;
