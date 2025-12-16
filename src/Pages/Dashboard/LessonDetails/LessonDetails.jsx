import { useEffect, useState } from "react";

import {
  FaHeart,
  FaRegHeart,
  FaBookmark,
  FaRegBookmark,
  FaFlag,
  FaShareAlt,
  FaEye,
} from "react-icons/fa";

import { useNavigate, useParams, Link } from "react-router";
import useAuth from "../../../Hooks/useAuth";

const LessonDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [lesson, setLesson] = useState(null);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [views] = useState(Math.floor(Math.random() * 10000));

  // 🔹 Fetch lesson
  useEffect(() => {
    fetch(`http://localhost:3000/lessons/${id}`)
      .then(res => res.json())
      .then(data => setLesson(data));
  }, [id]);

  if (!lesson) return <p className="text-center mt-10">Loading...</p>;

  const isPremiumLocked =
    lesson.accessLevel === "premium" && user?.membership !== "premium";

  // 🔹 Like handler
  const handleLike = () => {
    if (!user) {
      return navigate("/login");
    }
    setLiked(!liked);
  };

  // 🔹 Save handler
  const handleSave = () => {
    if (!user) {
      return navigate("/login");
    }
    setSaved(!saved);
  };

  // 🔹 Report handler
  const handleReport = () => {
    document.getElementById("report_modal").showModal();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* 🔒 Premium Lock */}
      {isPremiumLocked && (
        <div className="mb-6 p-6 rounded-lg bg-warning/10 text-center">
          <h2 className="text-xl font-semibold mb-2">
            Premium Lesson 🔒
          </h2>
          <p className="mb-4 text-gray-600">
            Upgrade to premium to unlock full content
          </p>
          <button
            onClick={() => navigate("/pricing")}
            className="btn btn-warning"
          >
            Upgrade Now
          </button>
        </div>
      )}

      {/* 🔹 Lesson Information */}
      <div className={`${isPremiumLocked ? "blur-md pointer-events-none" : ""}`}>
        <h1 className="text-3xl font-bold mb-4">{lesson.title}</h1>

        {lesson.image && (
          <img
            src={lesson.image}
            alt="Lesson"
            className="w-full h-72 object-cover rounded-lg mb-6"
          />
        )}

        <p className="text-gray-700 leading-relaxed mb-6">
          {lesson.description}
        </p>

        <div className="flex flex-wrap gap-3 mb-6">
          <span className="badge badge-outline">{lesson.category}</span>
          <span className="badge badge-outline">{lesson.emotionalTone}</span>
        </div>

        {/* 🔹 Metadata */}
        <div className="bg-base-200 rounded-lg p-4 mb-8 text-sm">
          <p>📅 Created: {lesson.createdAt}</p>
          <p>🔄 Updated: {lesson.updatedAt || "N/A"}</p>
          <p>🌍 Visibility: Public</p>
          <p>⏱ Reading Time: {lesson.readTime || "3 min"}</p>
        </div>

        {/* 🔹 Author Section */}
        <div className="flex items-center gap-4 p-4 bg-base-200 rounded-lg mb-8">
          <img
            src={lesson.creatorPhoto}
            className="w-16 h-16 rounded-full object-cover"
            alt=""
          />
          <div>
            <h3 className="font-semibold">{lesson.creatorName}</h3>
            <p className="text-sm text-gray-500">
              {lesson.totalLessons} lessons published
            </p>
            <Link
              to={`/profile/${lesson.creatorEmail}`}
              className="btn btn-link px-0"
            >
              View all lessons →
            </Link>
          </div>
        </div>

        {/* 🔹 Stats */}
        <div className="flex gap-6 mb-6 text-gray-600">
          <span className="flex items-center gap-1">
            <FaHeart /> {lesson.likesCount || 0} Likes
          </span>
          <span className="flex items-center gap-1">
            <FaBookmark /> {lesson.favoritesCount || 0} Saves
          </span>
          <span className="flex items-center gap-1">
            <FaEye /> {views} Views
          </span>
        </div>

        {/* 🔹 Interaction Buttons */}
        <div className="flex flex-wrap gap-4 mb-10">
          <button onClick={handleSave} className="btn btn-outline">
            {saved ? <FaBookmark /> : <FaRegBookmark />} Save
          </button>

          <button onClick={handleLike} className="btn btn-outline">
            {liked ? <FaHeart className="text-red-500" /> : <FaRegHeart />} Like
          </button>

          <button onClick={handleReport} className="btn btn-outline">
            <FaFlag /> Report
          </button>

          <button className="btn btn-outline">
            <FaShareAlt /> Share
          </button>
        </div>

        {/* 🔹 Comments */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-4">Comments</h3>
          {user ? (
            <textarea
              className="textarea textarea-bordered w-full mb-3"
              placeholder="Write a comment..."
            ></textarea>
          ) : (
            <p className="text-sm text-gray-500">
              Please login to comment
            </p>
          )}
        </div>

        {/* 🔹 Similar Lessons */}
        <div>
          <h3 className="text-xl font-semibold mb-4">
            Similar Lessons
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {/* map similar lessons here */}
          </div>
        </div>
      </div>

      {/* 🔴 Report Modal */}
      <dialog id="report_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold mb-4">Report Lesson</h3>
          <select className="select select-bordered w-full mb-4">
            <option>Inappropriate Content</option>
            <option>Hate Speech or Harassment</option>
            <option>Misleading or False Information</option>
            <option>Spam or Promotional Content</option>
            <option>Sensitive or Disturbing Content</option>
            <option>Other</option>
          </select>
          <div className="modal-action">
            <button className="btn btn-error">Submit</button>
            <button
              className="btn"
              onClick={() =>
                document.getElementById("report_modal").close()
              }
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default LessonDetails;
