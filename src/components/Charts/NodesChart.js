import React from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
} from "recharts";
import { nodesCoordinates, baseNode } from "../../data/data";

const NodesChart = () => {
  return (
    <ScatterChart
      width={800}
      height={400}
      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
    >
      <CartesianGrid />
      <XAxis type="number" dataKey="x" name="X" />
      <YAxis type="number" dataKey="y" name="Y" />
      <Tooltip cursor={{ strokeDasharray: "3 3" }} />
      <Scatter name="Nodes" data={nodesCoordinates} fill="#8884d8">
        <LabelList dataKey="node" position="top" />
      </Scatter>
    </ScatterChart>
  );
};

export default NodesChart;
