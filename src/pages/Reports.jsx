import { use, useContext, useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import { AuthContext } from "../provider/AuthContext";
import {
  Pie,
  PieChart,
  Tooltip,
  Cell,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  Bar,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["green", "red", "blue", "yellow"];

const Reports = () => {
  // convert number to month
  const formatMonth = (ym) => {
    const [year, month] = ym.split("-");
    const date = new Date(year, parseInt(month) - 1); // month index 0-based
    const monthName = date.toLocaleString("default", { month: "short" }); // e.g., "Jun"
    return `${year}-${monthName}`;
  };
  const axiosInstance = useAxios();

  const { user, loading, setLoading } = useContext(AuthContext);
  const [chart, setChart] = useState([]);
  const [barChart, setBarChart] = useState([]);
  useEffect(() => {
    // if (!user?.email) return;

    axiosInstance
      .get(`/reports-summary?email=${user?.email}`)

      .then((data) => {
        console.log("after axios get", data.data.monthly);
        // setTransaction(data.data);
        const pieChart = data.data.category.map((item) => ({
          name: item._id,
          value: item.total,
        }));
        setChart(pieChart);

        setBarChart(
          data.data.monthly.map((item) => ({
            ...item,
            month: formatMonth(item.month),
          }))
        );
      });
  }, [user, axiosInstance]);

  if (loading) return <p>loading</p>;
  return (
    <div className="flex md:flex-row flex-col justify-between w-11/12 mx-auto my-10">
      <ResponsiveContainer width="100%" height={500}>
        <PieChart>
          <Pie
            data={chart}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {chart.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={barChart}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="income" fill="green" />
          <Bar dataKey="expense" fill="red" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
export default Reports;
