import React, { useRef, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useRole from "../../../Hooks/useRole";
import { useQuery } from "@tanstack/react-query";
import { FaEye } from "react-icons/fa";

const ReportedLessons = () => {
  const role = useRole();
  const modalRef = useRef(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  console.log(selectedLesson);
  const axiosSecure = useAxiosSecure();
  const {
    data: reportLessons = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["reportLessons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/lessonReports");

      return res.data;
    },
  });

  console.log(reportLessons);
  // 🔹 Open modal
  const handleViewReports = (lesson) => {
    setSelectedLesson([lesson]);
    modalRef.current?.showModal();
  };

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
        await axiosSecure.delete(`/lessonReports/${id}`);
        refetch();
        Swal.fire("Deleted!", "Lesson has been removed.", "success");
      }
    });
  };
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 text-black">
      <h2 className="text-2xl font-bold mb-6">🚩 Reported Lessons</h2>

      <div className="overflow-x-auto bg-base-200 rounded-lg">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Lesson Title</th>
              <th>Reports</th>
              <th>Details</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {reportLessons.map((lesson, index) => (
              <tr key={lesson._id}>
                <td>{index + 1}</td>
                <td className="font-medium">{lesson.reportedLessonTitle}</td>
                <td>
                  <span className="badge badge-error">
                    {reportLessons.length}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-outline"
                    onClick={() => handleViewReports(lesson)}
                  >
                    View Reports
                  </button>
                </td>
                <td className="flex gap-2">
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => handleDelete(lesson._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-sm btn-warning"
                    // onClick={() => handleIgnore(lesson._id)}
                  >
                    Ignore
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🔹 Reports Modal */}
      <dialog ref={modalRef} className="modal">
        <div className="modal-box max-w-2xl">
          {selectedLesson?.length ? (
            <div className="space-y-3">
              {selectedLesson.map((report, index) => (
                <div key={index} className="p-3 border rounded-lg bg-base-100">
                  <h3 className="font-bold text-lg mb-4">
                    Reports for: {report?.reportedLessonTitle}
                  </h3>
                  <p>
                    <strong>Reason:</strong> {report.reason}
                  </p>
                  <p>
                    lessonId:
                    {report?.lessonId}
                  </p>
                  <p>reporterUserId :{report?.reporterUserId}</p>
                  <p>status :{report?.status}</p>
                  <p>_id :{report?._id}</p>
                  <p className="text-sm text-gray-500">
                    Reporter: {report?.reportedUserEmail}
                  </p>
                  <p className="text-xs text-gray-400">
                    Date: {report?.createdAt}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p>No reports found.</p>
          )}

          <div className="modal-action">
            <button className="btn" onClick={() => modalRef.current?.close()}>
              Close
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ReportedLessons;
