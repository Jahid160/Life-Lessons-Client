import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  FaUsers,
  FaBook,
  FaFlag,
  FaChartLine,
} from "react-icons/fa";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";



import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../../Component/Loading/Loading";

const AdminDashboardHome = () => {
  const axiosSecure = useAxiosSecure();

  // 🔹 Platform stats
  const { data: stats, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/stats");
      return res.data;
    },
  });

  // 🔹 User growth
  const { data: userGrowth = [] } = useQuery({
    queryKey: ["user-growth"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/growth/users");
      return res.data;
    },
  });



  // 🔹 Top contributors
  const { data: contributors = [] } = useQuery({
    queryKey: ["top-contributors"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/top-contributors");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div className="p-6 space-y-6 text-black">

      <h2 className="text-3xl font-bold">Admin Dashboard </h2>


      {/* ===== Stats Cards ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={<FaUsers />} title="Total Users" value={stats?.totalUsers} />
        <StatCard icon={<FaBook />} title="Public Lessons" value={stats?.publicLessons} />
        <StatCard icon={<FaFlag />} title="Reported Lessons" value={stats?.reportedLessons} />
        <StatCard icon={<FaChartLine />} title="Today's Lessons" value={stats?.todayLessons} />
      </div>

      {/* ===== Charts ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* User Growth */}
        <div className="bg-base-100 shadow-xl rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-4">User Growth</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={userGrowth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#2563eb"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>


      </div>

      {/* ===== Top Contributors ===== */}
      <div className="bg-base-100 shadow-xl rounded-2xl p-6">
        <h3 className="text-xl font-semibold mb-4">
          Most Active Contributors
        </h3>

        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Lessons</th>
              </tr>
            </thead>
            <tbody>
              {contributors.map((user, index) => (
                <tr key={user.email}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.lessonCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

const StatCard = ({ icon, title, value }) => (
  <div className="bg-base-100 shadow-xl rounded-2xl p-6 flex items-center gap-4">
    <div className="text-4xl text-primary">{icon}</div>
    <div>
      <p className="text-gray-500">{title}</p>
      <h3 className="text-2xl font-bold">{value}</h3>
    </div>
  </div>
);

export default AdminDashboardHome;
