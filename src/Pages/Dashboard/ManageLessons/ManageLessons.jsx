import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../Hooks/useAuth';
import Swal from "sweetalert2";
import {
  FaTrash,
  FaStar,
  FaCheckCircle,
  FaFilter,
} from "react-icons/fa";
import { useState } from "react";

const ManageLessons = () => {
    const axiosSecure = useAxiosSecure();
    const [filters, setFilters] = useState({
    category: "",
    visibility: "",
    flagged: "",
  });
    const {user} = useAuth()
  const { data: lessons = [], isLoading,refetch } = useQuery({
    queryKey: ["lesson"],
    queryFn: async () => {
      const result = await axiosSecure.get(`/lessons`, user?.email);
      return result.data;
    },
  });


  // 🔹 Stats
  const publicCount = lessons.filter(l => l.visibility === "public").length;
  const privateCount = lessons.filter(l => l.visibility === "private").length;
  const flaggedCount = lessons.filter(l => l.flagged === true).length;

  // 🔹 Delete lesson
  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete lesson?",
      text: "This lesson will be permanently removed!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.delete(`/lessons/${id}`);
        refetch();
        Swal.fire("Deleted!", "Lesson has been removed.", "success");
      }
    });
  };

  // 🔹 Feature lesson
  const handleFeature = async (id) => {
    await axiosSecure.patch(`/lessons/feature/${id}`);
    refetch();
  };

  // 🔹 Mark reviewed
  const handleReviewed = async (id) => {
    await axiosSecure.patch(`/lessons/review/${id}`);
    refetch();
  };

  if (isLoading) return <p>Loading lessons...</p>;

  console.log(lessons);
  return (
<div className="p-6 text-black">
      <h2 className="text-2xl font-bold mb-6">Lesson Moderation</h2>

      {/* 📊 Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="stat bg-base-200 rounded">
          <div className="stat-title">Public Lessons</div>
          <div className="stat-value text-success">{publicCount}</div>
        </div>
        <div className="stat bg-base-200 rounded">
          <div className="stat-title">Private Lessons</div>
          <div className="stat-value text-warning">{privateCount}</div>
        </div>
        <div className="stat bg-base-200 rounded">
          <div className="stat-title">Flagged Content</div>
          <div className="stat-value text-error">{flaggedCount}</div>
        </div>
      </div>

      {/* 🔍 Filters */}
      <div className="flex flex-wrap gap-4 mb-6 items-center">
        <FaFilter />

        <select
          className="select select-bordered"
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        >
          <option value="">All Categories</option>
          <option value="life">Life</option>
          <option value="mental">Mental</option>
          <option value="career">Career</option>
        </select>

        <select
          className="select select-bordered"
          onChange={(e) =>
            setFilters({ ...filters, visibility: e.target.value })
          }
        >
          <option value="">All Visibility</option>
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>

        <select
          className="select select-bordered"
          onChange={(e) =>
            setFilters({ ...filters, flagged: e.target.value })
          }
        >
          <option value="">All Content</option>
          <option value="true">Flagged</option>
        </select>
      </div>

      {/* 📋 Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Title</th>
              <th>Creator</th>
              <th>Category</th>
              <th>Visibility</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {lessons.map((lesson) => (
              <tr key={lesson._id}>
                <td>{lesson.title}</td>
                <td>{lesson.email}</td>
                <td>{lesson.category}</td>
                <td>
                  <span className={`badge ${lesson.visibility === "public" ? "badge-success" : "badge-warning"}`}>
                    {lesson.visibility}
                  </span>
                </td>
                <td>
                  {lesson.reviewed ? (
                    <span className="badge badge-info">Reviewed</span>
                  ) : (
                    <span className="badge badge-error">Pending</span>
                  )}
                </td>
                <td className="flex gap-2 justify-center">
                  <button
                    className="btn btn-xs btn-warning"
                    onClick={() => handleFeature(lesson._id)}
                  >
                    <FaStar />
                  </button>

                  <button
                    className="btn btn-xs btn-info"
                    onClick={() => handleReviewed(lesson._id)}
                  >
                    <FaCheckCircle />
                  </button>

                  <button
                    className="btn btn-xs btn-error"
                    onClick={() => handleDelete(lesson._id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageLessons;