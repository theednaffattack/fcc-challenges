import React from "react";
import { Group } from "@vx/group";
// import { genBins } from "@vx/mock-data";
import { scaleLinear } from "@vx/scale";
import { HeatmapRect } from "@vx/heatmap";

import heatData from "../data/heatmap_data.json";

let data = heatData;

const hot1 = "#77312f";
// const hot2 = "#f33d15";
// const cool1 = "#122549";
const cool2 = "#b4fbde";
const bg = "#28272c";

// const genData = genBins(16, 16);

console.log(data);

// utils
const max = (data, value = d => d) => {
  console.log("data.monthlyVariance");
  console.log(data.length);
  //   return Math.max(data["monthlyVariance"].map(x => x[value]));
};

// const min = (data, value = d => d) => {
//   console.log("data.monthlyVariance min");
//   console.log(data);
//   //   return Math.min(data["monthlyVariance"].map(x => x[value]));
// };

// accessors
// const bins = d => d.bins;
// Example accessors
// const x = d => d.baseTemperature;
const y = d => d.monthlyVariance;
const z = d => d.variance;
// const tempChange = x + z;

// const colorMax = max(data, d => max(bins(d), count));
const colorMax = max(data, d => max(d), z);
// const bucketSizeMax = max(data, d => bins(d).length);
const bucketSizeMax = max(data, d => y(d).length);

// scales
const xScale = scaleLinear({
  domain: [0, data.monthlyVariance.length]
});
const yScale = scaleLinear({
  domain: [0, bucketSizeMax]
});
// const circleColorScale = scaleLinear({
//   range: [hot1, hot2],
//   domain: [0, colorMax]
// });
const rectColorScale = scaleLinear({
  range: [hot1, cool2],
  domain: [0, colorMax]
});
const opacityScale = scaleLinear({
  range: [1, 1],
  domain: [0, colorMax]
});

const width = 1000;
const height = 800;

export default ({
  //   width,
  //   height,
  separation = 0, // 20,
  margin = {
    top: 10,
    left: 20,
    right: 20,
    bottom: 110
  }
}) => {
  // bounds
  let size = width;
  if (size > margin.left + margin.right) {
    size = width - margin.left - margin.right - separation;
  }

  const xMax = size;
  const yMax = height - margin.bottom - margin.top;

  const binWidth = xMax / data.length;
  const binHeight = yMax / bucketSizeMax;
  //   const radius = min([binWidth, binHeight]) / 2;

  xScale.range([0, xMax]);
  yScale.range([yMax, 0]);

  return (
    <svg width={width} height={height}>
      <rect x={0} y={0} width={width} height={height} rx={14} fill={bg} />
      {/* <Group top={margin.top} left={margin.left}>
        <HeatmapCircle
          data={data}
          xScale={xScale}
          yScale={yScale}
          colorScale={circleColorScale}
          opacityScale={opacityScale}
          radius={radius}
          gap={2}
        >
          {heatmap => {
            return heatmap.map(bins => {
              return bins.map(bin => {
                return (
                  <circle
                    key={`heatmap-circle-${bin.row}-${bin.column}`}
                    className="vx-heatmap-circle"
                    cx={bin.cx}
                    cy={bin.cy}
                    r={bin.r}
                    fill={bin.color}
                    fillOpacity={bin.opacity}
                    onClick={event => {
                      const { row, column } = bin;
                      alert(JSON.stringify({ row, column, ...bin.bin }));
                    }}
                  />
                );
              });
            });
          }}
        </HeatmapCircle>
      </Group>
     
      */}
      <Group top={margin.top} left={margin.left + separation}>
        <HeatmapRect
          data={data}
          xScale={xScale}
          yScale={yScale}
          colorScale={rectColorScale}
          opacityScale={opacityScale}
          binWidth={binWidth}
          binHeight={binHeight}
          gap={2}
        >
          {heatmap => {
            return heatmap.map(bin => {
              //   return bins.map(bin => {
              return (
                <rect
                  key={`heatmap-rect-${bin.row}-${bin.column}`}
                  className="vx-heatmap-rect"
                  width={bin.width}
                  height={bin.height}
                  x={bin.x}
                  y={bin.y}
                  fill={bin.color}
                  fillOpacity={bin.opacity}
                  onClick={event => {
                    const { row, column } = bin;
                    alert(JSON.stringify({ row, column, ...bin.bin }));
                  }}
                />
              );
              //   });
            });
          }}
        </HeatmapRect>
      </Group>
    </svg>
  );
};
