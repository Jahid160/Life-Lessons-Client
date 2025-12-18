import React, { useState } from "react";
import { FaUserShield, FaCamera } from "react-icons/fa";
import Swal from "sweetalert2";

import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useRole from "../../../Hooks/useRole";
import useAuth from "../../../Hooks/useAuth";

const AdminProfile = () => {
  const { user, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();
  const role = useRole()
  console.log(role);

  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [loading, setLoading] = useState(false);

  // 🔹 Update profile
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 🔸 Update Firebase / Auth profile
      await updateUserProfile(displayName, photoURL);

    
      await axiosSecure.patch("/users/profile", {
        displayName,
        photoURL,
      });

      Swal.fire("Success", "Profile updated successfully!", "success");
    } catch (error) {
      Swal.fire("Error", "Failed to update profile", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-black">
      <h2 className="text-2xl font-bold mb-6">Admin Profile</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {/* 🔹 Profile Card */}
        <div className="bg-base-200 rounded-lg p-6 text-center">
          <div className="relative w-32 h-32 mx-auto mb-4">
            <img
              src={photoURL || user?.photoURL}
              alt="Admin"
              className="w-32 h-32 rounded-full object-cover border"
            />
            <FaCamera className="absolute bottom-2 right-2 bg-base-100 p-2 rounded-full shadow" />
          </div>

          <h3 className="text-xl font-semibold">{user?.displayName}</h3>
          <p className="text-sm text-gray-500">{user?.email}</p>

          <span className="badge badge-primary mt-3 inline-flex items-center gap-1">
            <FaUserShield /> {role.role}
          </span>
        </div>

        {/* 🔹 Profile Settings */}
        <div className="md:col-span-2 bg-base-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Profile Settings</h3>

          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div>
              <label className="label">Display Name</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="label">Photo URL</label>
              <input
                type="text"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                className="input input-bordered w-full"
              />
            </div>

            <button
              type="submit"
              className={`btn btn-primary ${loading && "loading"}`}
              disabled={loading}
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>

      {/* 🔹 Activity Summary (Optional) */}
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <div className="stat bg-base-200 rounded-lg">
          <div className="stat-title">Lessons Moderated</div>
          <div className="stat-value">128</div>
        </div>

        <div className="stat bg-base-200 rounded-lg">
          <div className="stat-title">Reports Resolved</div>
          <div className="stat-value">92</div>
        </div>

        <div className="stat bg-base-200 rounded-lg">
          <div className="stat-title">Actions Taken</div>
          <div className="stat-value">56</div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
