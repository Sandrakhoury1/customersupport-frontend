import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const ComplaintTypeChart = ({ types }) => {
  // const data = [
  //   { date: "2023-06-01", typeA: 5, typeB: 3, typeC: 2 },
  //   { date: "2023-06-02", typeA: 7, typeB: 2, typeC: 4 },
  //   { date: "2023-06-03", typeA: 3, typeB: 5, typeC: 1 },
  //   { date: "2023-06-04", typeA: 8, typeB: 1, typeC: 2 },
  //   { date: "2023-06-05", typeA: 4, typeB: 4, typeC: 3 },
  //   { date: "2023-06-06", typeA: 6, typeB: 3, typeC: 2 },
  // ];

  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#00C49F"];

  return (
    <>
      {types.length === 0 ? (
        <h1>No Data</h1>
      ) : (
        <BarChart width={500} height={300} data={types}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          {Object.keys(types[0])
            .filter((key) => key !== "date")
            .map((type, index) => (
              <Bar
                key={type}
                dataKey={type}
                fill={colors[index % colors.length]}
                stackId="complaints"
              />
            ))}
        </BarChart>
      )}
    </>
  );
};

export default ComplaintTypeChart;
