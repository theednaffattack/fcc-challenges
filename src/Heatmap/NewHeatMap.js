import React from "react";
import { Box, Flex, Heading, Text } from "rebass";
import { Group } from "@vx/group";
import { Area, LinePath, Line } from "@vx/shape";
// import { genBins } from "@vx/mock-data";
import { scaleBand, scaleLinear, scaleOrdinal, scaleQuantize } from "@vx/scale";
import { LegendQuantile, LegendItem, LegendLabel } from "@vx/legend";
import { AxisLeft, AxisBottom } from "@vx/axis";
import { HeatmapRect } from "@vx/heatmap";
import { withTooltip, Tooltip } from "@vx/tooltip";
import { timeParse, timeFormat } from "d3-time-format";

import globalTemps from "./globalTemps.json";
// import data from "./globalTempETL.json";
import data from "./ETL2.json";
import { title } from "change-case";

// const cool1 = "#122549";
// const cool2 = "#b4fbde";
const bg = "transparent";

const yAxisWidth = 36;
// const xAxisHeight = 30;

// const data = genBins(16, 16);

let { baseTemperature, monthlyVariance } = globalTemps;

const getUniqueYears = Array.from(
  new Set(monthlyVariance.map(data => data.year))
);

// let newData = monthlyVariance.map(rawData => {
//   return {
//     year: rawData.year,
//     months: monthlyVariance.filter(function(item, index) {
//       return item.year === rawData.year;
//     })
//   };
// });

// let uniqueGoodData = Array.from(new Set(newData));

// console.log(getUniqueYears);

// let goodData = getUniqueYears.map(year => {
//   return {
//     year: year,
//     months: monthlyVariance.filter(function(item, index) {
//       return item.year === year;
//     })
//   };
// });

// let yearIndices = getUniqueYears.map((year, index) => {
//   return monthlyVariance.findIndex(obj => {
//     // console.log("what's going on?");
//     // console.log(obj);
//     // console.log(year);
//     return obj.year === year;
//   });
// });

// console.log("VIEW THE DATA");
// console.log(JSON.stringify(data));
// responsive utils for axis ticks
function numTicksForHeight(height) {
  if (height <= 300) return 3;
  if (300 < height && height <= 600) return 5;
  return 10;
}

function numTicksForWidth(width) {
  if (width <= 300) return 2;
  if (300 < width && width <= 400) return 5;
  return 10;
}

// utils
const max = (data, value = d => d) => {
  return Math.max(...data.map(value));
};
// const min = (data, value = d => d) => Math.min(...data.map(value));

const parseDate = timeParse("%Y%m%d");
const format = timeFormat("%b %d");
const formatDate = date => format(parseDate(date));
// accessors
const bins = d => d.bins;
const count = d => d.count;

const { log } = console;
const yearMax = Math.max(...getUniqueYears);
const yearMin = Math.min(...getUniqueYears);

const monthNames = [
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

const colorMax = max(data, d => max(bins(d), count));
const bucketSizeMax = max(data, d => bins(d).length);

const uniqueRange = getUniqueYears.filter((x, i) => {
  return i % 10 === 0;
});

const uniqueRLength = uniqueRange.length;

// scales
const xScale = scaleLinear({
  //   domain: [0, data.length]
  domain: [0, data.length]
});

const bottomScale = scaleOrdinal({
  domain: [...uniqueRange],
  range: [0, 30]
});

const xMap = getUniqueYears.map(item => xScale(item));

const yScale = scaleLinear({
  domain: [bucketSizeMax, 0]
});
// const circleColorScale = scaleLinear({
//   range: [hot1, hot2],
//   domain: [0, colorMax]
// });
// const oldRectColorScale = scaleLinear({
//   range: [cool1, cool2],
//   domain: [0, colorMax]
// });

// quantileScale
const rectColorScale = scaleQuantize({
  domain: [0, colorMax],
  range: ["#eb4d70", "#f19938", "#6ce18b", "#78f6ef", "#9096f8"]
});

// const opacityScale = scaleLinear({
//   range: [0.1, 1],
//   domain: [0, colorMax]
// });

export default withTooltip(
  ({
    width,
    height,
    separation = 20,
    xtraSpace = {
      title: 80
    },
    margin = {
      top: 10,
      left: 35,
      right: 20,
      bottom: 110
    },
    tooltipOpen,
    tooltipLeft,
    tooltipTop,
    tooltipData,
    hideTooltip,
    showTooltip
  }) => {
    // bounds
    let size = width;
    if (size > margin.left + margin.right) {
      size = width - margin.left - margin.right;
    }

    const xMax = size - margin.right;
    const yMax = height - margin.bottom - margin.top - xtraSpace.title;

    const binWidth = xMax / data.length;
    const binHeight = yMax / bucketSizeMax;

    let tooltipTimeout;
    //   const radius = min([binWidth, binHeight]) / 2;

    //   console.log("WHAT IS THE RADIUS");
    //   console.log(radius);
    //   console.log(size);
    //   console.log("WHAT IS binHeight, buckSizeMax, and yMax");
    //   console.log(binHeight);
    //   console.log(bucketSizeMax);
    //   console.log(yMax);

    xScale.range([0, xMax]);
    yScale.range([yMax, 0]);

    return (
      <Flex flexDirection="column" width="1100px" mx="auto" px={3} bg="white">
        <Heading fontSiz={[3, 4, 5]} mt={3} mx="auto" id="title">
          Monthly Global Land-Surface Temperature
        </Heading>
        <Text mx="auto" id="description">
          1753 - 2015
        </Text>
        <Text mx="auto" id="descrtiption-too">
          base temperature {baseTemperature}°C
        </Text>
        {/* {JSON.stringify(this.props)} */}
        <svg width={width} height={height}>
          <rect x={0} y={0} width={width} height={height} rx={14} fill={bg} />
          <Group
            top={margin.top + xtraSpace.title + 9}
            left={margin.left + yAxisWidth - 1}
          >
            <HeatmapRect
              data={data}
              xScale={xScale}
              yScale={yScale}
              colorScale={rectColorScale}
              //   opacityScale={opacityScale}
              binWidth={binWidth}
              binHeight={binHeight}
              gap={0}
            >
              {heatmap => {
                return heatmap.map(bins => {
                  //   console.log("VIEW BINS (X AXIS POSITIONS)");
                  //   console.log(bins);
                  return bins.map(bin => {
                    // console.log("VIEW BIN (Y AXIS POSITIONS)");
                    // console.log(bin);
                    return (
                      <rect
                        key={`heatmap-rect-${bin.row}-${bin.column}`}
                        className="vx-heatmap-rect cell"
                        data-month={bin.bin.month - 1}
                        data-year={bin.bin.year}
                        data-temp={bin.bin.count}
                        width={bin.width}
                        height={bin.height}
                        x={bin.x}
                        y={bin.y}
                        fill={bin.color}
                        fillOpacity={bin.opacity}
                        onMouseLeave={event => {
                          event.preventDefault();
                          tooltipTimeout = setTimeout(() => {
                            hideTooltip();
                          }, 300);
                        }}
                        onMouseMove={event => {
                          event.preventDefault();

                          if (tooltipTimeout) clearTimeout(tooltipTimeout);
                          const top = bin.y + margin.top + xtraSpace.title + 30;
                          const left =
                            bin.x + bin.width + margin.left + yAxisWidth + 150;
                          showTooltip({
                            tooltipData: bin,
                            tooltipTop: top,
                            tooltipLeft: left
                          });
                        }}
                      />
                    );
                  });
                });
              }}
            </HeatmapRect>
          </Group>
          <Group
            id="y-axis"
            top={margin.top + xtraSpace.title}
            left={margin.left}
          >
            <AxisLeft
              top={margin.top}
              left={margin.left}
              scale={yScale}
              hideZero
              numTicks={numTicksForHeight(height)}
              label="Month"
              labelProps={{
                fill: "crimson",
                textAnchor: "middle",
                fontSize: 18,
                fontFamily: "Arial"
              }}
              stroke="#1b1a1e"
              tickStroke="#8e205f"
              tickLabelProps={(value, index) => ({
                fill: "#8e205f",
                textAnchor: "end",
                fontSize: 12,
                fontFamily: "Arial",
                dx: "-0.25em",
                dy: "0.25em"
              })}
              tickComponent={({ formattedValue, ...tickProps }) => (
                <text {...tickProps}>{monthNames[formattedValue - 1]}</text>
              )}
            />
          </Group>
          <Group
            left={margin.left}
            top={margin.top + xtraSpace.title}
            id="x-axis"
          >
            <AxisBottom
              top={height - margin.bottom - xtraSpace.title}
              left={margin.left}
              hideZero
              id="x-axis"
              stroke="purple"
              scale={xScale}
              hideAxisLine={false}
              numTicks={numTicksForWidth(width)}
              label="Year"
              labelProps={{
                fill: "crimson",
                textAnchor: "middle",
                fontSize: 18,
                fontFamily: "Arial"
              }}
              tickLabelProps={(value, index) => {
                let ogValue = getUniqueYears[value];
                return {
                  ogValue,
                  index: index,
                  fill: "#8e205f",
                  textAnchor: "middle",
                  fontSize: 12,
                  fontFamily: "Arial",
                  dx: "-0.25em",
                  dy: "0.25em"
                };
              }}
              tickComponent={({
                formattedValue,
                ogValue,
                index,
                ...tickProps
              }) => <text {...tickProps}>{ogValue}</text>}
            />
          </Group>
          ;
        </svg>
        <div
          id="legend"
          style={{
            position: "absolute",
            top: margin.top + xtraSpace.title + 20,
            left: 0,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            fontSize: "14px"
          }}
        >
          <LegendQuantile
            scale={rectColorScale}
            direction="row-reverse"
            itemDirection="column"
            labelMargin="0 20px 0 0"
            shapeMargin="1px 0 0"
          >
            {labels => {
              return labels.map((label, i) => {
                const size = 15;
                return (
                  <LegendItem
                    key={`legend-${i}`}
                    onClick={event => {
                      alert(`clicked: ${JSON.stringify(label)}`);
                    }}
                  >
                    <Flex
                      alignItems="center"
                      justifyContent="center"
                      flexDirection="column"
                      m={0}
                    >
                      <svg
                        width={150}
                        height={20}
                        // style={{ margin: "2px 0" }}
                      >
                        <rect
                          fill={label.value}
                          //   r={150 / 2}
                          x={size}
                          y={size / 2}
                          width={120}
                          height={20}
                        />
                      </svg>
                      <LegendLabel align={"left"} margin={"0 4px"}>
                        {label.extent[0].toFixed(2)}{" "}
                        {label.extent[1]
                          ? ` - ${label.extent[1].toFixed(2)}`
                          : ""}
                        {/* {JSON.stringify(label)} */}
                      </LegendLabel>
                    </Flex>
                  </LegendItem>
                );
              });
            }}
          </LegendQuantile>
        </div>
        {tooltipOpen && (
          <Tooltip
            top={tooltipTop}
            id="tooltip"
            data-year={tooltipData.bin.year}
            className="tooltip"
            left={tooltipLeft}
            style={{
              minWidth: 60,
              backgroundColor: "rgba(0,0,0,0.9)",
              color: "white"
            }}
          >
            <Box>
              <strong />
              {/* {JSON.stringify(tooltipData)} */}
              <Text>Year: {tooltipData.bin.year}</Text>
              <Text>Month: {tooltipData.bin.month}</Text>
              <Text>Variance: {tooltipData.bin.count}</Text>
            </Box>
          </Tooltip>
        )}
      </Flex>
    );
  }
);
