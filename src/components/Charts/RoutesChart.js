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

import { routesFormated } from "../../utils/sweepingUtils";

function RoutesChart() {
  // Function to generate data for connecting lines
  const generateLinesData = () => {
    const linesData = routesFormated.map((item, index) => {
      return item.nodes.map((nodeRoute) => {
        return nodesCoordinates.find((node) => node.node === nodeRoute);
      });
    });

    return linesData; // Add this line
  };

  const linesData = generateLinesData();

  // Combine scatter data and base node
  const combinedData = nodesCoordinates;

  const lineColors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#00C49F"];

  return (
    <LineChart
      width={800}
      height={600}
      margin={{
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
      }}
    >
      <CartesianGrid />
      <XAxis type="number" dataKey="x" />
      <YAxis type="number" dataKey="y" />

      <Scatter name="Nodes" data={combinedData} fill="#8884d8" />

      {linesData.map((route, index) => (
        <Line
          key={index}
          type="linear"
          data={route}
          dataKey="y"
          stroke={lineColors[index % lineColors.length]} // Get color based on index
        >
          <LabelList dataKey="node" position="top" data={combinedData} />
        </Line>
      ))}
    </LineChart>
  );
}

export default RoutesChart;
