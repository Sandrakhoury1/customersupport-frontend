import React, { useEffect, useState } from "react";
import { PieChart, Pie, Legend, Tooltip, Cell } from "recharts";

const UserComparisonChart = ({ userdata }) => {
  const [data, setdata] = useState([]);
  useEffect(() => {
    if (userdata.length != 0) {
      setdata([
        { name: "Users", value: userdata.totalUsers - userdata.totalVipUsers },
        { name: "VIPs", value: userdata.totalVipUsers },
      ]);
    }
  }, [userdata]);
  // const data = [
  //   { name: "Users", value: 100 },
  //   { name: "VIPs", value: 20 },
  // ];

  const colors = ["#8884d8", "#82ca9d"];

  return (
    <PieChart width={400} height={300}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={80}
        fill="#8884d8"
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default UserComparisonChart;
