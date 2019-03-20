import * as d3 from "d3";
import React, { Component } from "react";

export default function D3blackbox(d3render) {
  return class Blackbox extends Component {
    componentDidMount() {
      d3render.call(this);
    }
    componentDidUpdate() {
      d3render.call(this);
    }

    render() {
      const transform = this.props.transform || "";
      return <g transform={transform} ref="anchor" />;
    }
  };
}

export const XAxis = D3blackbox(function() {
  const axis = d3
    .axisBottom()
    // .tickValues(d => {
    //   console.log("this.props.xDomain");
    //   console.log(this.props.xDomain);
    //   return d % 10 === 0 ? d : null;
    // })
    // .tickFormat(d => (d % 10 === 0 ? d : null))
    .tickValues(
      this.props.xDomain.filter(function(d, i) {
        return !(d % 10);
      })
    )
    // .ticks(20)
    .scale(this.props.xScale);

  d3.select(this.refs.anchor)
    .classed("xAxis", true)
    .attr("id", "x-axis")
    .transition()
    .call(axis);
});

export const YAxis = D3blackbox(function() {
  const months = [
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
  ];

  const axis = d3
    .axisLeft()
    .tickFormat(d => {
      return months[d - 1];
    })
    .scale(this.props.yScale);

  d3.select(this.refs.anchor)
    .classed("yAxis", true)
    .attr("id", "y-axis")
    .transition()
    .call(axis);
});

export const YGrid = D3blackbox(function() {
  const formatMonth = d3.timeFormat("%B");
  const axis = d3
    .axisRight()
    .tickFormat(d => formatMonth(d.month))
    .scale(this.props.yScale)
    .tickSizeOuter(0)
    .tickSizeInner(0); // (this.props.plotWidth);

  d3.select(this.refs.anchor)
    .classed("yGrid", true)
    .call(axis);
});

export const Bars = D3blackbox(function() {
  const parent = d3.select(this.refs.anchor).datum(this.props.plotData);

  const color = d3
    .scaleLinear()
    .domain([0, 40, 50, 60, 100])
    .range(["#6A01CF", "#68D1FF", "white", "#FED801", "#FC1F04"]);

  // function createColor(percent) {
  //   return color(percent);
  // }

  // const varianceToPercent = d3
  //   .scaleLinear()
  //   .domain(this.props.xDomain)
  //   .range([0, 100]);

  const current = parent.selectAll(".bar").data(d => d);

  current.interrupt(); //.selectAll("*");

  current.transition().attr("fill", (d, i) => {
    // console.log("varianceToPercent");
    // console.log(varianceToPercent(this.props));
    // console.log(varianceToPercent(d.data.baseTemp - d.data.variance));
    return color(d.data.baseTemp - d.data.variance) || null;
  });

  const enter = current
    .enter()
    .append("g")
    .classed("bar", true);
  enter.attr("fill", "blue");

  enter
    .append("rect")
    .attr("height", 0)
    .attr("class", "cell")
    .attr("data-temp", (d, i) => d.data.baseTemp - d.data.variance)
    .attr("data-month", (d, i) => d.data.month - 1)
    .attr("data-year", (d, i) => {
      return d.data.year;
    })
    .attr("transform", d => `translate(${d.x}, ${this.props.plotHeight})`);

  const exit = current.exit().classed("bar", false);
  exit
    .attr("fill", "red")
    .attr("opacity", 1)
    .transition()
    .attr("opacity", 0)
    .remove();

  // const rect = current
  //   .merge(enter)
  //   .select("rect")
  //   .attr("width", d => d.width)
  //   .transition()
  //   .duration(1000)
  //   .attr("transform", d => `translate(${d.x}, ${d.y})`)
  //   .attr("height", d => this.props.plotHeight / 12);
});
