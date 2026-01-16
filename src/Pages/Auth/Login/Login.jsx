import { useForm } from "react-hook-form";
import { FaGoogle, FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import React from "react";

const Login = () => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const { signInUser, signInGoogle } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [serverError, setServerError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleLogin = async (data) => {
    setServerError("");
    setLoading(true);
    try {
      await signInUser(data.email, data.password);
      navigate(location?.state || "/dashboard");
    } catch (error) {
      setServerError(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setServerError("");
    try {
      await signInGoogle();
      navigate(location?.state || "/dashboard");
    } catch (error) {
      setServerError(error.message || "Google login failed");
    }
  };

  // Demo login buttons
  const handleDemoAdmin = async () => {
    setValue("email", "admin@example.com");
    setValue("password", "admin123");
    await handleLogin({ email: "admin@example.com", password: "admin123" });
  };

  const handleDemoUser = async () => {
    setValue("email", "user@example.com");
    setValue("password", "user123");
    await handleLogin({ email: "user@example.com", password: "user123" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1535478044878-3ed83d5456ef')] bg-cover bg-center relative">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-lg"></div>

      <div className="relative z-10 w-full max-w-md px-5">
        <div className="bg-white/15 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-3xl p-10">

          <h1 className="text-5xl font-bold text-center text-white mb-3 tracking-wide">
            Login
          </h1>
          <p className="text-center text-gray-300 mb-4">
            Welcome back! Please enter your details
          </p>

          {serverError && <p className="text-red-500 text-center mb-4">{serverError}</p>}

          <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">

            {/* Email */}
            <div className="relative">
              <FaEnvelope className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 text-lg" />
              <input
                {...register("email", { required: "Email is required" })}
                type="email"
                placeholder="Email address"
                className="div_style"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div className="relative">
              <FaLock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 text-lg" />
              <input
                {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
                type="password"
                placeholder="Password"
                className="div_style"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>

            {/* Options */}
            <div className="flex justify-between items-center text-sm text-gray-300">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="checkbox checkbox-sm" />
                Remember me
              </label>
              <a className="hover:text-primary transition">Forgot?</a>
            </div>

            {/* Sign In Button */}
            <button type="submit"
              className="w-full py-4 rounded-full bg-primary text-white font-semibold text-lg shadow-lg hover:scale-[1.02] transition btn border-none"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
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

          {/* Social login */}
          <div className="flex gap-4">
            <button onClick={handleGoogleLogin} className="w-full py-3 rounded-full bg-white text-black font-medium flex items-center justify-center gap-2 hover:scale-105 transition">
              <FaGoogle /> Google
            </button>
          </div>

          <p className="text-center text-gray-300 mt-6">
            Don’t have an account?
            <Link to={"/register"}>
              <span className="text-primary ml-2 font-semibold cursor-pointer hover:underline">
                Sign up
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
