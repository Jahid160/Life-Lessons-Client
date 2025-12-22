import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Loading from "../../../Component/Loading/Loading";
import Swal from "sweetalert2";
import { Link } from "react-router";

const MyFavorites = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [categoryFilter, setCategoryFilter] = useState("");
  const [toneFilter, setToneFilter] = useState("");

  // Fetch saved lessons
  const { data: savedLessons = [], isLoading } = useQuery({
    queryKey: ["saved-lessons", user?.accessToken],
    queryFn: async () => {
      const res = await axiosSecure.get(`/savedLessons/${user?.accessToken}`);
      return res.data; // array of lessons
    },
    enabled: !!user?.accessToken,
  });

  // Remove from favorites
  const removeMutation = useMutation({
    mutationFn: async (lessonId) => {
      const res = await axiosSecure.delete(`/savedLessons/${lessonId}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["saved-lessons", user?.accessToken]);
      Swal.fire({
        icon: "success",
        title: "Removed from favorites",
        showConfirmButton: false,
        timer: 1500,
      });
    },
  });

  if (isLoading) return <Loading />;

  // Apply filters
  const filteredLessons = savedLessons.filter((lesson) => {
    const categoryMatch = categoryFilter
      ? lesson.category === categoryFilter
      : true;
    const toneMatch = toneFilter ? lesson.emotionalTone === toneFilter : true;
    return categoryMatch && toneMatch;
  });

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Saved Lessons</h1>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <select
          className="select select-bordered"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Personal Growth">Personal Growth</option>
          <option value="Career">Career</option>
          <option value="Relationships">Relationships</option>
          <option value="Mindset">Mindset</option>
          <option value="Mistakes Learned">Mistakes Learned</option>
        </select>

        <select
          className="select select-bordered"
          value={toneFilter}
          onChange={(e) => setToneFilter(e.target.value)}
        >
          <option value="">All Emotional Tones</option>
          <option value="Motivational">Motivational</option>
          <option value="Sad">Sad</option>
          <option value="Realization">Realization</option>
          <option value="Gratitude">Gratitude</option>
        </select>
      </div>

      {/* Lessons Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Emotional Tone</th>
              <th>Saved At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLessons.map((lesson) => (
              <tr key={lesson._id}>
                <td>{lesson.title}</td>
                <td>{lesson.category}</td>
                <td>{lesson.emotionalTone}</td>
                <td>{new Date(lesson.savedAt).toLocaleDateString()}</td>
                <td className="flex gap-2">
                  <button
                    className="btn btn-error btn-sm"
                    onClick={() => removeMutation.mutate(lesson._id)}
                    disabled={removeMutation.isPending}
                  >
                    Remove
                  </button>
                  <Link
                    to={`/lesson/details/${lesson.lessonId}`}
                    className="btn btn-primary btn-sm"
                  >
                    Details
                  </Link>
                </td>
              </tr>
            ))}

            {filteredLessons.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  No saved lessons found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyFavorites;
