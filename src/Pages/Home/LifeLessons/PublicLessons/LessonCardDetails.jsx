import React, { useRef, useState } from "react";
import { useNavigate, useParams, Link, data } from "react-router";
import {
  FaBookmark,
  FaEye,
  FaFlag,
  FaHeart,
  FaRegBookmark,
  FaRegHeart,
  FaShareAlt,
  FaLock,
} from "react-icons/fa";
import {
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  TwitterShareButton,
  XIcon,
} from "react-share";
import Swal from "sweetalert2";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

import Loading from "../../../../Component/Loading/Loading";
import useUserByEmail from "../../../../Hooks/useUserByEmail ";

const LessonCardDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const reportRef = useRef(null);
  const shareRef = useRef(null);

  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [views] = useState(Math.floor(Math.random() * 10000));

  /* ===================== USER DATA ===================== */
  const { userData, isLoading: userLoading } = useUserByEmail();

  if(userData?.isPremium == false || userData?.isPremium == "false"){
  navigate('/life-lessons')
  }

  /* ===================== LESSON DATA ===================== */
  const {
    data: lesson,
    isLoading: lessonLoading,
    error,
  } = useQuery({
    queryKey: ["lesson-details", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/lessons/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
  console.log(lesson?.email);

  /* ===================== REPORT MUTATION ===================== */
  const reportMutation = useMutation({
    mutationFn: async (reportData) => {
      const res = await axiosSecure.post("/lessonReports", reportData);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Lesson reported successfully",
        showConfirmButton: false,
        timer: 2000,
      });
    },
  });

 const queryClient = useQueryClient();

const likeMutation = useMutation({
  mutationFn: async () => {
    const res = await axiosSecure.patch(`/lessons/${id}/like`);
    return res.data;
  },
  onSuccess: () => {
    // refresh lesson details
    queryClient.invalidateQueries(["lesson-details", id]);
  },
});

const saveMutation = useMutation({
  mutationFn: async () => {
    const res = await axiosSecure.post("/savedLessons/toggle", {
      lessonId: lesson._id,
    });
    return res.data; // { saved: true | false }
  },

  onSuccess: (data) => {

    queryClient.invalidateQueries(["lesson-details", lesson._id]);


    // queryClient.invalidateQueries(["saved-lessons"]);

  
    if (data.saved) {
      Swal.fire({
        icon: "success",
        title: "Saved to favorites",
        timer: 1200,
        showConfirmButton: false,
      });
    } else {
      Swal.fire({
        icon: "info",
        title: "Removed from favorites",
        timer: 1200,
        showConfirmButton: false,
      });
    }
  },
});


  /* ===================== LOADING & ERROR ===================== */
  if (lessonLoading || userLoading) return <Loading />;
  if (error) return <p className="text-error">Failed to load lesson</p>;


  const isPremiumLocked =
    lesson?.accessLevel === "Premium" && !userData?.isPremium;

   

  const handleLike = () => {
  
     likeMutation.mutate();
  setLiked(prev => !prev);

  };

  const handleSave = () => {
  
    saveMutation.mutate();
  setSaved(prev => !prev);

  };

  const handleReport = () => {
    shareRef.current?.close();
    reportRef.current?.showModal();
  };

  const handleSubmitReport = async () => {
    

    if (!reportReason) {
      reportRef.current?.close();
      return Swal.fire("Warning", "Select a reason", "warning");
    }

    reportRef.current?.close();

    const result = await Swal.fire({
      title: `Report this lesson?`,
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, report it",
    });

    if (!result.isConfirmed) return;

    reportMutation.mutate({
      lessonId: lesson._id,
      reportedLessonTitle: lesson.title,
      reporterUserId: user.uid,
      reportedUserEmail: lesson.email,
      reason: reportReason,
      createdAt: new Date(),
    });
  };

  const handleShare = () => {
    reportRef.current?.close();
    shareRef.current?.showModal();
  };

  /* ===================== UI ===================== */
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 text-black">

      {/* 🔒 PREMIUM LOCK */}
      {isPremiumLocked && (
        <div className="mb-6 p-6 bg-warning/10 rounded-lg text-center">
          <FaLock className="text-3xl text-warning mx-auto mb-2" />
          <h2 className="text-xl font-semibold mb-2">Premium Lesson</h2>
          <p className="mb-4">Upgrade to access this lesson</p>
          <button onClick={() => navigate("/premium-upgrade")} className="btn btn-warning">
            Upgrade Now
          </button>
        </div>
      )}

      <div className={isPremiumLocked ? "blur-md pointer-events-none" : ""}>
        <h1 className="text-3xl font-bold mb-4">{lesson.title}</h1>

        {lesson.image && (
          <img src={lesson.image} alt="" className="w-full h-72 object-cover rounded-lg mb-6" />
        )}

        <p className="mb-6 text-gray-700">{lesson.description}</p>

        <div className="flex gap-3 mb-6">
          <span className="badge badge-outline">{lesson.category}</span>
          <span className="badge badge-outline">{lesson.emotionalTone}</span>
        </div>

        <div className="flex gap-6 mb-6 text-gray-600">
          <span><FaHeart className="mr-0.5"/> {lesson?.likesCount }</span>
          <span><FaBookmark className="mr-0.5"/> {lesson.favoritesCount || 0}</span>
          <span><FaEye className="mr-0.5"/> {views}</span>
          <Link className="text-yellow-700 text-xl underline" to={`/profile/${lesson.email}`}>View all lessons by this author</Link>
        </div>

        <div className="flex gap-4 mb-10">
          <button onClick={handleSave}
          
          className="btn btn-outline">
            {saved ? <FaBookmark /> : <FaRegBookmark />} Save
          </button>

          <button onClick={handleLike} className="btn btn-outline">
            {liked ? <FaHeart className="text-red-500" /> : <FaRegHeart />} Like
          </button>

          <button onClick={handleReport} className="btn btn-outline">
            <FaFlag /> Report
          </button>

          <button onClick={handleShare} className="btn btn-outline">
            <FaShareAlt /> Share
          </button>
        </div>
      </div>

      {/* REPORT MODAL */}
      <dialog ref={reportRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold mb-4">Report Lesson</h3>
          <select
            className="select select-bordered w-full mb-4"
            value={reportReason}
            onChange={(e) => setReportReason(e.target.value)}
          >
            <option value="">Select reason</option>
            <option value="Spam">Spam</option>
            <option value="Hate">Hate Speech</option>
            <option value="Misleading">Misleading</option>
          </select>

          <div className="modal-action">
            <button onClick={handleSubmitReport} className="btn btn-error">
              Submit
            </button>
            <button onClick={() => reportRef.current?.close()} className="btn">
              Cancel
            </button>
          </div>
        </div>
      </dialog>

      {/* SHARE MODAL */}
      <dialog ref={shareRef} className="modal">
        <div className="modal-box flex gap-4 justify-center">
          <FacebookShareButton url={window.location.href}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>

          <FacebookMessengerShareButton appId="521270401588372">
            <FacebookMessengerIcon size={32} round />
          </FacebookMessengerShareButton>

          <TwitterShareButton url={window.location.href}>
            <XIcon size={32} round />
          </TwitterShareButton>

          <button onClick={() => shareRef.current?.close()} className="btn">
            Close
          </button>
        </div>
      </dialog>
    </div>
  );
};

export default LessonCardDetails;
