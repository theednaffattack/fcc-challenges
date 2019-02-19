import React, { Component } from "react";
import * as d3 from "d3";
import { XAxis, YAxis, YGrid, Bars } from "./ChartComponents.js";

class BarChart extends Component {
  constructor(props) {
    super();
  }

  updateScale(props) {
    const data = props.data;

    const xScale = d3.scaleBand();
    const yScale = d3.scaleLinear().nice();

    const xDomain = data.map(props.xFn);
    const yDomain = [0, d3.max(data, d => props.yFn(d))];

    xScale
      .domain(xDomain)
      .range([0, props.width - (props.margin.left + props.margin.right)])
      .paddingInner(props.paddingInner)
      .paddingOuter(props.paddingOuter);

    yScale
      .domain(yDomain)
      .range([props.height - (props.margin.top + props.margin.bottom), 0]);

    return { xScale, yScale };
  }

  updatePlotSize(props) {
    const plotWidth = props.width - (props.margin.left + props.margin.right);
    const plotHeight = props.height - (props.margin.top + props.margin.bottom);

    return { plotWidth, plotHeight };
  }

  render() {
    const { xScale, yScale } = this.updateScale(this.props);

    const { plotWidth, plotHeight } = this.updatePlotSize(this.props);

    const metaData = {
      xScale: xScale,
      yScale: yScale,
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
          className="axisLaeyr"
          width={plotWidth}
          height={plotHeight}
          transform={`translate(${this.props.margin.left}, ${
            this.props.margin.top
          })`}
        >
          <YGrid {...metaData} />
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
