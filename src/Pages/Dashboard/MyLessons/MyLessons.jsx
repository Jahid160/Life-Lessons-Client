import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaEye, FaEdit, FaTrash, FaHeart, FaBookmark } from "react-icons/fa";

import useAuth from "../../../Hooks/useAuth";
import { Link } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../../Component/Loading/Loading";

const MyLessons = () => {
  const isPremiumUser = true;
  const { user } = useAuth();
 
  const axiosSecure = useAxiosSecure();

  const {
    data: lessons = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["lessons"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/lessons`);
      return res.data;
    },
  });
  console.log(lessons);

  if (isLoading) return <Loading></Loading>;
  if (error) return <p className="text-error">Failed to load lessons</p>;

  const handleDelete = (id) => {
    console.log(id);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/lessons/${id}`).then((res) => {
          console.log(res.data);

          if (res.data.deletedCount) {
            // refresh the data in the ui
            refetch();

            Swal.fire({
              title: "Deleted!",
              text: "Your lesson request has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div className="card bg-base-100 shadow-xl text-black">
      <div className="card-body">
        <h2 className="card-title text-2xl">My Lessons</h2>

        <div className="overflow-x-auto mt-4">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>Lesson</th>
                <th>Visibility</th>
                <th>Access</th>
                <th>Stats</th>
                <th>Date</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {lessons.map((lesson) => (
                <tr key={lesson._id}>
                  {/* Lesson Info */}
                  <td>
                    <div>
                      <p className="font-semibold">{lesson.title}</p>
                      <span className="badge badge-outline badge-sm">
                        {lesson.category}
                      </span>
                    </div>
                  </td>

                  {/* Visibility Toggle */}
                  <td>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <select
                        className="select select-bordered select-sm"
                        defaultValue={lesson.accessLevel}
                      >
                        <option value="free">Public</option>
                        <option value="premium">Privet</option>
                      </select>
                    </label>
                  </td>

                  {/* Access Level */}
                  <td>
                    {isPremiumUser ? (
                      <select
                        className="select select-bordered select-sm"
                        defaultValue={lesson.access}
                      >
                        <option value="free">Free</option>
                        <option value="premium">Premium</option>
                      </select>
                    ) : (
                      <span className="badge badge-neutral">
                        {lesson.access}
                      </span>
                    )}
                  </td>

                  {/* Stats */}
                  <td>
                    <div className="flex flex-col gap-1 text-sm">
                      <span className="flex items-center gap-1">
                        <FaHeart className="text-error" />
                        {lesson.reactions}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaBookmark className="text-info" />
                        {lesson.saves}
                      </span>
                    </div>
                  </td>

                  {/* Created Date */}
                  <td className="text-sm">
                    {new Date(lesson.createdAt).toLocaleDateString()}
                  </td>

                  {/* Actions */}
                  <td>
                    <div className="flex justify-center gap-2">
                      <button
                        className="btn btn-sm btn-ghost tooltip"
                        data-tip="Details"
                      >
                        <FaEye />
                      </button>

                      <Link
                        to={`update-lesson/${lesson._id}`}
                        className="btn btn-sm btn-info tooltip"
                        data-tip="Update"
                      >
                        <FaEdit />
                      </Link>

                      <button
                        onClick={() => handleDelete(lesson._id)}
                        className="btn btn-sm btn-error tooltip"
                        data-tip="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* DaisyUI Delete Modal
      {deleteLesson && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Delete Lesson</h3>
            <p className="py-4">
              Are you sure? This lesson will be permanently removed.
            </p>
            <div className="modal-action">
              <button
                className="btn"
                onClick={() => setDeleteLesson(null)}
              >
                Cancel
              </button>
              <button
                className="btn btn-error"
                onClick={()=>handleDelete(lessons)}
              >
                Delete
              </button>
            </div>
          </div>
        </dialog>
      )} */}
    </div>
  );
};

export default MyLessons;
