import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const ComplaintChart = ({ charts }) => {
  const [data, setdata] = useState();

  useEffect(() => {
    if (charts) {
      setdata([
        charts.map((chart) => ({
          date: (chart?.date).substring(0, 10),
          Tickets: chart.complaints,
        })),
      ]);
    }
  }, [charts]);

  return (
    <LineChart width={500} height={300} data={data?.[0]}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="Tickets" stroke="#8884d8" />
    </LineChart>
  );
};

export default ComplaintChart;
