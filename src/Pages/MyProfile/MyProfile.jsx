import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  FaEnvelope,
  FaCalendarAlt,
  FaLock,
  FaUnlock,
  FaRegSmile,
} from "react-icons/fa";
import Swal from "sweetalert2";
import { updateProfile } from "firebase/auth";

import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import Loading from "../../Component/Loading/Loading";

const MyProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [name, setName] = useState(user?.displayName || "");
  const [photo, setPhoto] = useState(user?.photoURL || "");
  const [editing, setEditing] = useState(false);


  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ["profile-summary"],
    queryFn: async () => {
      const res = await axiosSecure.get("/profile/summary");
      return res.data;
    },
    enabled: !!user,
  });

  /* ================= USER LESSONS ================= */
  const {data: userLessons = []} = useQuery({
    queryKey: ['userLessons',user?.email],
    queryFn: async()=>{
    const res = await axiosSecure.get(`/profile/user/${user?.email}`)
    return res.data
    }
    
  })

  if (profileLoading ) return <Loading />;

  /* ================= UPDATE PROFILE ================= */
  const handleUpdateProfile = async () => {
    try {
      await updateProfile(user, {
        displayName: name,
        photoURL: photo,
      });

      setEditing(false);
      Swal.fire("Success", "Profile updated successfully", "success");
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4 text-black">
      <div className="max-w-5xl mx-auto">

        {/* ================= PROFILE CARD ================= */}
        <div className="card bg-base-100 shadow-xl mb-8">
          <div className="card-body">

            {/* Header */}
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <img
                src={photo || "https://i.ibb.co/2kRZ1dB/user.png"}
                alt="Profile"
                className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 object-cover"
              />

              <div className="flex-1">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  {user?.displayName}
                  {profile?.isPremium && (
                    <span className="badge badge-warning">Premium ⭐</span>
                  )}
                </h2>

                <div className="mt-2 flex items-center gap-2 text-gray-600">
                  <FaEnvelope />
                  <span>{user?.email}</span>
                </div>
              </div>

              <button
                onClick={() => setEditing(!editing)}
                className="btn btn-outline btn-sm"
              >
                Edit Profile
              </button>
            </div>

            {/* Edit Profile */}
            {editing && (
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  className="input input-bordered"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Display Name"
                />
                <input
                  className="input input-bordered"
                  value={photo}
                  onChange={(e) => setPhoto(e.target.value)}
                  placeholder="Photo URL"
                />

                <button
                  onClick={handleUpdateProfile}
                  className="btn btn-primary col-span-full"
                >
                  Save Changes
                </button>
              </div>
            )}

            <div className="divider"></div>

            {/* Stats */}
            <div className="stats shadow">
              <div className="stat">
                <div className="stat-title">Lessons Created</div>
                <div className="stat-value">{profile?.lessonsCreated}</div>
              </div>

              <div className="stat">
                <div className="stat-title">Lessons Saved</div>
                <div className="stat-value">{profile?.lessonsSaved}</div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= USER LESSONS ================= */}
        <h3 className="text-xl font-bold mb-4">
          My Public Lessons
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {userLessons.map((lesson) => (
            <div
              key={lesson._id}
              className="rounded-2xl border bg-base-100 shadow-sm hover:shadow-lg transition-all overflow-hidden"
            >
              <div className="p-6 space-y-4">
                <div className="flex justify-between">
                  <div>
                    <p className="text-xs font-semibold text-primary uppercase">
                      {lesson.category}
                    </p>
                    <h2 className="text-lg font-bold line-clamp-2">
                      {lesson.title}
                    </h2>
                  </div>

                  <span
                    className={`badge gap-1 ${
                      lesson.accessLevel === "Premium"
                        ? "badge-warning"
                        : "badge-success"
                    }`}
                  >
                    {lesson.accessLevel === "Premium" ? <FaLock /> : <FaUnlock />}
                    {lesson.accessLevel}
                  </span>
                </div>

                <p className="text-sm text-gray-500 line-clamp-3">
                  {lesson.description}
                </p>

                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                  <FaRegSmile />
                  {lesson.emotionalTone}
                </span>

                <p className="text-xs text-gray-400">
                  {new Date(lesson.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}

          {userLessons.length === 0 && (
            <p className="text-center col-span-full text-gray-500">
              You haven’t created any public lessons yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
