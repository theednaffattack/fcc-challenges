import React from "react";
import * as d3 from "d3";

import D3blackbox from "./ChartComponents";

export const Legend = D3blackbox(function() {
  var categories = this.props.root.leaves().map(function(nodes) {
    return nodes.data.category;
  });
  var myColor = this.props.color;

  categories = categories.filter(function(category, index, self) {
    return self.indexOf(category) === index;
  });

  var legend = d3.select(this.refs.anchor);
  var legendWidth = +legend.attr("width");
  const LEGEND_OFFSET = -30;
  const LEGEND_RECT_SIZE = 15;
  const LEGEND_H_SPACING = 150;
  const LEGEND_V_SPACING = 10;
  const LEGEND_TEXT_X_OFFSET = 3;
  const LEGEND_TEXT_Y_OFFSET = -2;
  var legendElemsPerRow = Math.floor(legendWidth / LEGEND_H_SPACING);

  var legendElem = legend
    .append("g")
    .attr("transform", "translate(60, -30)")
    .selectAll("g")
    .data(categories)
    .enter()
    .append("g")
    .attr("transform", "translate(0, 0 )"); // function(d, i) {
  // return "translate(0, 0 )"; // +
  // (i % legendElemsPerRow) * LEGEND_H_SPACING +
  // "," +
  // (Math.floor(i / legendElemsPerRow) * LEGEND_RECT_SIZE +
  //   LEGEND_V_SPACING * Math.floor(i / legendElemsPerRow)) +
  // ")"
  // });

  legendElem
    .append("rect")
    .attr("x", (d, i) => i * LEGEND_H_SPACING)
    .attr("y", 0)
    .attr("width", LEGEND_RECT_SIZE)
    .attr("height", LEGEND_RECT_SIZE)
    .attr("class", "legend-item")
    .attr("key", function(d, i) {
      return "legend-item" + i;
    })
    .attr("fill", function(d) {
      return myColor(d);
    });

  legendElem
    .append("text")
    .attr(
      "x",
      (d, i) => i * LEGEND_H_SPACING + LEGEND_RECT_SIZE + LEGEND_TEXT_X_OFFSET
    )
    .attr("y", LEGEND_RECT_SIZE + LEGEND_TEXT_Y_OFFSET)
    .text(function(d) {
      return d;
    });
});
