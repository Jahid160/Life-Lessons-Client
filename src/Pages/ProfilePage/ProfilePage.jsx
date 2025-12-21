import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FaUserCircle, FaRegSmile, FaTag, FaLock, FaUnlock, FaArrowRight,FaEnvelope, FaCalendarAlt } from "react-icons/fa";

import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Link, useParams } from "react-router";

const ProfilePage = () => {
  // mock user data (replace with real data later)
  const {email} = useParams()
  // console.log(email);
  const axiosSecure = useAxiosSecure()

  // userinfo find call
const {data: userinfo = []} = useQuery({
  queryKey: ['userLessons'],
  queryFn: async()=>{
  const res = await axiosSecure.get(`/users/${email}`)
  return res.data
  }
  
})

console.log(userinfo);
  // data find call
const {data: userLessons = []} = useQuery({
  queryKey: ['userLessons',email],
  queryFn: async()=>{
  const res = await axiosSecure.get(`/profile/user/${email}`)
  return res.data
  }
  
})

console.log(userLessons);

const currentUser = {
  isPremium: false,
};

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4 text-black">
      <div className="max-w-4xl mx-auto">

        {/* Profile Card */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">

            {/* Top Section */}
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <img
                src={userinfo.photoURL
}
                alt="Profile"
                className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 object-cover"
              />

              <div className="text-center sm:text-left">
                <h2 className="text-2xl font-bold">{userinfo.displayName}</h2>
                

                
              </div>
            </div>

            <div className="divider"></div>

            {/* Info Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

              {/* Email */}
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-primary text-xl" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{email}</p>
                </div>
              </div>

              {/* Joined */}
              <div className="flex items-center gap-3">
                <FaCalendarAlt className="text-primary text-xl" />
                <div>
                  <p className="text-sm text-gray-500">Joined</p>
                  <p className="font-medium">{userinfo.createdAt}</p>
                </div>
              </div>
            </div>

            <div className="divider"></div>

            {/* user lessons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {userLessons.map((lesson) => {
        const {
          _id,
          title,
          description, // 👈 use this instead of shortDescription
          category,
          emotionalTone,
          creatorName,
          
          accessLevel,
          createdAt,
          image
        } = lesson;

        const isLocked =
          accessLevel === "Premium" && !currentUser.isPremium;

        return (
          <div
            key={_id}
            className="relative rounded-2xl border border-base-200 bg-base-100 shadow-sm hover:shadow-lg transition-all overflow-hidden"
          >
            {/* 🔒 Premium Overlay */}
            {isLocked && (
              <div className="absolute inset-0 z-20 bg-white/70 backdrop-blur-sm flex flex-col items-center justify-center text-center px-6">
                <FaLock className="text-3xl text-warning mb-3" />
                <h3 className="font-semibold text-lg">
                  Premium Lesson
                </h3>
                <p className="text-sm text-gray-500">
                  Upgrade to view this lesson
                </p>
              </div>
            )}

            {/* Card Content */}
            <div className={`p-6 space-y-4 ${isLocked ? "blur-sm select-none" : ""}`}>

              {/* Header */}
              <div className="flex justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase text-primary">
                    {category}
                  </p>
                  <h2 className="text-lg font-bold line-clamp-2">
                    {title}
                  </h2>
                </div>

                {/* Access Badge */}
                <span
                  className={`badge gap-1 ${
                    accessLevel === "Premium"
                      ? "badge-warning"
                      : "badge-success"
                  }`}
                >
                  {accessLevel === "Premium" ? <FaLock /> : <FaUnlock />}
                  {accessLevel}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-500 line-clamp-3">
                {description}
              </p>

              {/* Emotional Tone */}
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium w-fit">
                <FaRegSmile />
                {emotionalTone}
              </span>

              <div className="divider my-2"></div>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={image || "https://i.ibb.co/2kRZ1dB/user.png"}
                    alt={creatorName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold">
                      {creatorName}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                
              </div>
            </div>
          </div>
        );
      })}
    </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
