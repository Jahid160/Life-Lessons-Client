import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaGoogle, FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const { registerUser, updateUserProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleRegistration = async (data) => {
    setServerError("");
    setLoading(true);

    if (data.password.length < 6) {
      setServerError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    try {
      const profileImg = data.photo[0];

      // Register user in Firebase
      await registerUser(data.email, data.password);

      // Upload profile image to imgbb
      const formData = new FormData();
      formData.append("image", profileImg);
      const image_API_URL = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_image_host_key
      }`;

      const imageRes = await axios.post(image_API_URL, formData);
      const photoURL = imageRes.data.data.url;

      // Save user to backend
      const userInfo = { email: data.email, displayName: data.name, photoURL };
      const res = await axiosSecure.post("/users", userInfo);

      if (res.data.insertedId) {
        console.log("User created in the database");
      }

      // Update Firebase user profile
      await updateUserProfile({ displayName: data.name, photoURL });

      navigate(location.state || "/dashboard");
    } catch (error) {
      console.error(error);
      setServerError(error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // Demo autofill
  const handleDemoAdmin = () => {
    setValue("name", "Demo Admin");
    setValue("email", "admin@example.com");
    setValue("password", "admin123");
  };

  const handleDemoUser = () => {
    setValue("name", "Demo User");
    setValue("email", "user@example.com");
    setValue("password", "user123");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1535478044878-3ed83d5456ef')] bg-cover bg-center relative">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-lg"></div>

      <div className="relative z-10 w-full max-w-md px-5">
        <div className="bg-white/15 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-3xl p-10">
          <h1 className="text-5xl font-bold text-center text-white mb-3 tracking-wide">
            Sign Up
          </h1>
          <p className="text-center text-gray-300 mb-4">Create a new account</p>

          {serverError && (
            <p className="text-red-500 text-center mb-4">{serverError}</p>
          )}

          <form
            className="space-y-6"
            onSubmit={handleSubmit(handleRegistration)}
          >
            <div className="relative">
              <FaEnvelope className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 text-lg" />
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                placeholder="Your Name"
                className="div_style"
              />
              {errors.name && (
                <span className="text-red-500 text-sm">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div className="relative">
              <FaEnvelope className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 text-lg" />
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /\S+@\S+\.\S+/, message: "Enter a valid email" },
                })}
                placeholder="Email address"
                className="div_style"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="relative">
              <input
                {...register("photo", { required: "Profile photo is required" })}
                type="file"
                className="file-input w-full text-white"
              />
              {errors.photo && (
                <span className="text-red-500 text-sm">
                  {errors.photo.message}
                </span>
              )}
            </div>

            <div className="relative">
              <FaLock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 text-lg" />
              <input
                {...register("password", { required: "Password is required" })}
                type="password"
                placeholder="Password"
                className="div_style"
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>

            <button
              className="w-full py-4 rounded-full bg-primary text-white font-semibold text-lg shadow-lg hover:scale-[1.02] transition btn border-none"
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </form>

          {/* Demo Buttons */}
          <div className="flex flex-col gap-3 mt-4">
            <button
              onClick={handleDemoAdmin}
              className="w-full py-2 rounded-full bg-red-600 text-white font-semibold hover:bg-red-500 transition"
            >
              Demo Admin
            </button>
            <button
              onClick={handleDemoUser}
              className="w-full py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-500 transition"
            >
              Demo User
            </button>
          </div>

          <div className="divider text-white/50 my-6">OR</div>
          <SocialLogin />

          <p className="text-center text-gray-300 mt-6">
            Already have an account?
            <Link to={"/login"}>
              <span className="text-primary ml-2 font-semibold cursor-pointer hover:underline">
                Log In
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
