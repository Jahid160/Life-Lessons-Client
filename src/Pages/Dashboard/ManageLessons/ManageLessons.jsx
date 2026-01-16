import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import { FaTrash, FaStar, FaCheckCircle, FaFilter } from "react-icons/fa";

const ManageLessons = () => {
  const axiosSecure = useAxiosSecure();

  const { user } = useAuth();

  // 🔹 Platform stats
  const { data: stats, isLoading: LoadingData } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/stats");
      return res.data;
    },
  });

  const {
    data: lessons = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["lesson"],
    queryFn: async () => {
      const result = await axiosSecure.get(`/lessonsAdmin`, user?.email);
      return result.data;
    },
  });

  // 🔹 Stats

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

  // 🔹 Mark reviewed
// const handleReviewed = async (id) => {
//   console.log(id);
//   try {
//     const { data } = await axiosSecure.patch(`/lessons/review/${id}`)

//     if (data.modifiedCount) {
//       Swal.fire("Updated!", "Lesson status is now Approved.", "success");
//       refetch(); 
//     } else {
//       Swal.fire("Error!", "Lesson not found.", "error");
//     }
//   } catch (error) {
//     Swal.fire("Error!", "Something went wrong.", "error");
//     console.error(error);
//   }
// };


  if (isLoading || LoadingData) return <p>Loading lessons...</p>;

  console.log(stats);
  return (
    <div className="p-6 text-black">
      <h2 className="text-2xl font-bold mb-6">Lesson Moderation</h2>

      {/* 📊 Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="stat bg-base-200 rounded">
          <div className="stat-title">Public Lessons</div>
          <div className="stat-value text-success">{stats.publicLessons}</div>
        </div>
        <div className="stat bg-base-200 rounded">
          <div className="stat-title">Private Lessons</div>
          <div className="stat-value text-warning">{stats.privetLessons}</div>
        </div>
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
                  <span
                    className={`badge ${
                      lesson.visibility === "public"
                        ? "badge-success"
                        : "badge-warning"
                    }`}
                  >
                    {lesson.privacy}
                  </span>
                </td>
                

                <td className="flex gap-2 justify-center">
                  {/* <button
                    className="btn btn-xs btn-info"
                    onClick={() => handleReviewed(lesson._id)}
                  >
                    <FaCheckCircle />
                  </button> */}

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
