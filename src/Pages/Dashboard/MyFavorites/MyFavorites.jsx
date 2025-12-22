import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import useAxiosSecure from "../../../Hooks/useAxiosSecure";

import Loading from "../../../Component/Loading/Loading";
import Swal from "sweetalert2";
import { Link } from "react-router";
import useAuth from "../../../Hooks/useAuth";

const MyFavorites = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [categoryFilter, setCategoryFilter] = useState("");
  const [toneFilter, setToneFilter] = useState("");

  // Fetch saved lessons
  const { data: savedLessons = [], isLoading } = useQuery({
    queryKey: ["saved-lessons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/savedLessons/users");
      return res.data;
    },
    enabled: !!user.uid,
  });
  console.log(savedLessons);
  // console.log(user?.accessToken);
  // Remove from favorites
  const removeMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/savedLessons/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["saved-lessons", user?.uid]);
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
    <div className="max-w-6xl mx-auto p-6 text-black">
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
              <th>lessonId</th>
              <th>userId</th>
              
              <th>createdAt</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLessons.map((lesson) => (
              <tr key={lesson._id}>
                <td>{lesson.lessonId}</td>
                <td>{lesson.userId}</td>
                
                <td>{new Date(lesson.createdAt).toLocaleDateString()}</td>
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
