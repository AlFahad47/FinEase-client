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
import NoData from "./NoData";
import Loading from "./Loading";

const COLORS = ["green", "red", "blue", "#EEA121 "];

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

  if (loading) return <Loading></Loading>;
  if (!barChart.length && !chart.length) return <NoData></NoData>;
  return (
    <div>
      <h2 className="text-center font-semibold md:text-4xl text-2xl mt-15">
        My Reports
      </h2>
      <div className="flex md:flex-row flex-col justify-between w-11/12 mx-auto my-10">
        <div className="flex w-full flex-col items-center">
          <ResponsiveContainer width="100%" height={400}>
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
                fill="#FF8C00"
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
          <h2 className="font-semibold text-lg md:mt-5  mb-15">Categories</h2>
        </div>

        <div className="flex w-full flex-col items-center">
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
          <h2 className="font-semibold text-lg md:mt-5 mb-15">
            {" "}
            Monthly totals
          </h2>
        </div>
      </div>
    </div>
  );
};
export default Reports;
