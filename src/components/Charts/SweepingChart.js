import React from "react";
import {
  LineChart,
  Line,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
} from "recharts";
import { nodesCoordinates } from "../../data/data";

import { sweepingList } from "../../utils/sweepingUtils.js";

function SweepingChart() {
  // Function to generate data for connecting lines
  const generateLinesData = () => {
    const linesData = sweepingList.map((item, index) => {
      return nodesCoordinates.find((node) => node.node === item.node);
    });
    linesData.push(linesData[0]);

    return linesData;
  };

  const linesData = generateLinesData();

  return (
    <LineChart
      width={800}
      height={400}
      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="x" type="number" />
      <YAxis dataKey="y" type="number" />
      <Tooltip />
      <Scatter data={linesData} fill="#8884d8"></Scatter>
      <Line type="linear" data={linesData} dataKey="y" stroke="#82ca9d">
        <LabelList dataKey="node" position="top" data={nodesCoordinates} />
      </Line>
    </LineChart>
  );
}

export default SweepingChart;
