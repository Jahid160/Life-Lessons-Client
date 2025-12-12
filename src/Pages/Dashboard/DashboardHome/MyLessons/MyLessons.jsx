import React, { useState } from 'react';
import {
  FiEye,
  FiEyeOff,
  FiEdit,
  FiTrash2,
  FiStar,
  FiHeart,
} from "react-icons/fi";
const MyLessons = () => {
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [deleteLesson, setDeleteLesson] = useState(null);

  // Dummy data — replace with your API data
  const lessons = [
    {
      id: 1,
      title: "How to Stay Motivated",
      visibility: "public",
      access: "free",
      createdAt: "2025-01-10",
      reactions: 23,
      favorites: 12,
    },
    {
      id: 2,
      title: "Mastering Focus in Life",
      visibility: "private",
      access: "premium",
      createdAt: "2025-01-08",
      reactions: 40,
      favorites: 19,
    },
  ];
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Lessons</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr className="text-base text-gray-600">
              <th>Lesson</th>
              <th>Visibility</th>
              <th>Access</th>
              <th>Stats</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {lessons.map((lesson) => (
              <tr key={lesson.id}>
                {/* LESSON TITLE */}
                <td className="font-semibold">{lesson.title}</td>

                {/* PUBLIC / PRIVATE TOGGLE */}
                <td>
                  <div
                    className="cursor-pointer flex items-center gap-2"
                    onClick={() =>
                      alert("Toggle visibility API call here...")
                    }
                  >
                    {lesson.visibility === "public" ? (
                      <FiEye className="text-blue-500" />
                    ) : (
                      <FiEyeOff className="text-orange-500" />
                    )}
                    <span className="capitalize">{lesson.visibility}</span>
                  </div>
                </td>

                {/* FREE / PREMIUM */}
                <td>
                  <button className="badge badge-secondary capitalize">
                    {lesson.access}
                  </button>
                </td>

                {/* STATS */}
                <td className="flex items-center gap-4">
                  <div className="text-sm text-gray-500">
                    <p>📅 {lesson.createdAt}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiHeart /> {lesson.reactions}
                  </div>
                  <div className="flex items-center gap-2">
                    <FiStar /> {lesson.favorites}
                  </div>
                </td>

                {/* ACTION BUTTONS */}
                <td className="flex gap-3">

                  {/* DETAILS BUTTON */}
                  <button className="btn btn-sm btn-outline">
                    Details
                  </button>

                  {/* EDIT BUTTON */}
                  <button
                    className="btn btn-sm btn-info text-white"
                    onClick={() => setSelectedLesson(lesson)}
                  >
                    <FiEdit />
                  </button>

                  {/* DELETE BUTTON */}
                  <button
                    className="btn btn-sm btn-error text-white"
                    onClick={() => setDeleteLesson(lesson)}
                  >
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* UPDATE LESSON MODAL */}
      {selectedLesson && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              Update: {selectedLesson.title}
            </h3>

            <input
              type="text"
              className="input input-bordered w-full mt-3"
              defaultValue={selectedLesson.title}
            />

            <div className="modal-action">
              <button
                className="btn"
                onClick={() => setSelectedLesson(null)}
              >
                Close
              </button>
              <button className="btn btn-primary">Save</button>
            </div>
          </div>
        </dialog>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteLesson && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="text-lg font-semibold text-red-500">
              Delete Lesson?
            </h3>
            <p className="py-3">
              Are you sure you want to permanently delete "
              <strong>{deleteLesson.title}</strong>"?
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
                onClick={() => {
                  alert("Delete API call here...");
                  setDeleteLesson(null);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default MyLessons;