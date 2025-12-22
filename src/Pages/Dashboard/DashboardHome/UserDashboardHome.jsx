import React from "react";
import { useQuery } from "@tanstack/react-query";

import {
  FaPlus,
  FaBook,
  FaBookmark,
  FaChartLine,
  FaTasks,
} from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";




import { Link } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Loading from "../../../Component/Loading/Loading";

const UserDashboardHome = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // ================= FETCH DASHBOARD DATA =================
  const { data: dashboard = {}, isLoading } = useQuery({
    queryKey: ["user-dashboard", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/dashboard");
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <Loading />;
console.log(dashboard);
  const {
    totalLessons = 0,
    totalSaved = 0,
    recentLessons = [],
    weeklyContributions = [],
  } = dashboard;

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4 text-black">
      <div className="max-w-6xl mx-auto">

        {/* ================= TOP METRICS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card shadow-lg bg-base-100 p-6 flex flex-col items-center">
            <FaBook className="text-4xl text-primary mb-2" />
            <div className="text-xl font-bold">{totalLessons}</div>
            <div className="text-gray-500 text-sm">Lessons Created</div>
          </div>

          <div className="card shadow-lg bg-base-100 p-6 flex flex-col items-center">
            <FaBookmark className="text-4xl text-primary mb-2" />
            <div className="text-xl font-bold">{totalSaved}</div>
            <div className="text-gray-500 text-sm">Saved Lessons</div>
          </div>

          <div className="card shadow-lg bg-base-100 p-6 flex flex-col items-center">
            <FaTasks className="text-4xl text-primary mb-2" />
            <div className="text-xl font-bold">{recentLessons.length}</div>
            <div className="text-gray-500 text-sm">Recently Added</div>
          </div>

          <div className="card shadow-lg bg-base-100 p-6 flex flex-col items-center">
            <FaChartLine className="text-4xl text-primary mb-2" />
            <div className="text-gray-500 text-sm">Weekly Contributions</div>
          </div>
        </div>

        {/* ================= QUICK ACTIONS ================= */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Link to="add-lesson" className="btn btn-primary">
            <FaPlus className="mr-2" /> Add New Lesson
          </Link>
          <Link to="my-favorites" className="btn btn-secondary">
            <FaBookmark className="mr-2" /> View Saved Lessons
          </Link>
          <Link to="my-lessons" className="btn btn-accent">
            <FaTasks className="mr-2" /> Manage Lessons
          </Link>
        </div>

        {/* ================= RECENT LESSONS ================= */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">Recently Added Lessons</h3>
          {recentLessons.length === 0 ? (
            <p className="text-gray-500">No lessons added recently.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentLessons.map((lesson) => (
                <div
                  key={lesson._id}
                  className="rounded-lg border bg-base-100 shadow-sm hover:shadow-lg overflow-hidden"
                >
                  <img
                    src={lesson.image || "https://i.ibb.co/2kRZ1dB/user.png"}
                    alt={lesson.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h4 className="font-semibold text-lg">{lesson.title}</h4>
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {lesson.description}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      {new Date(lesson.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ================= WEEKLY ANALYTICS ================= */}
        <div className="card p-6 bg-base-100 shadow-lg">
          <h3 className="text-xl font-bold mb-4">Weekly Contributions</h3>
          {weeklyContributions.length === 0 ? (
            <p className="text-gray-500">No contributions this week.</p>
          ) : (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={weeklyContributions}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#1E3A8A" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboardHome;
