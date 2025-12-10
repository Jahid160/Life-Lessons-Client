import { useForm } from "react-hook-form";
import { FaGoogle, FaGithub, FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../Hooks/useAuth";

const Login = () => {
const { register, handleSubmit, formState: { errors } } = useForm();
    const { signInUser,signInGoogle } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogin = (data) => {
        console.log('form data', data);
        signInUser(data.email, data.password)
            .then(result => {
                console.log(result.user)
                navigate(location?.state || '/')
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleGoogleLogin = () =>{
      signInGoogle()
      .then(result => {
                console.log(result.user)
                navigate(location?.state || '/')
            })
            .catch(error => {
                console.log(error)
            })
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1535478044878-3ed83d5456ef')] bg-cover bg-center relative">

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-lg"></div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md px-5">
        <div className="bg-white/15 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-3xl p-10">

          {/* Heading */}
          <h1 className="text-5xl font-bold text-center text-white mb-3 tracking-wide">
            Login
          </h1>

          <p className="text-center text-gray-300 mb-8">
            Welcome back! Please enter your details
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">

            {/* Email */}
            <div className="relative">
              <FaEnvelope className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 text-lg" />
              <input
              {...register('email', {required: true})}
                type="email"
                placeholder="Email address"
                className="div_style"
              />
              {
                errors.email?.type === 'required' && <p className="text-red-500">Email is Required</p>
              }
            </div>

            {/* Password */}
            <div className="relative">
              <FaLock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 text-lg" />
              <input
              {...register('password', {required: true, minLength: 6})}                type="password"
                placeholder="Password"
                className="div_style"
              />
              {
                errors.password?.type === 'minLength' && <p>Password minimum 6 characters</p>
              }
            </div>

            {/* Options */}
            <div className="flex justify-between items-center text-sm text-gray-300">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="checkbox checkbox-sm" />
                Remember me
              </label>
              <a className="hover:text-primary transition">
                Forgot?
              </a>
            </div>

            {/* Button */}
            <button type="submit" className="w-full py-4 rounded-full bg-primary text-white font-semibold text-lg shadow-lg hover:scale-[1.02] transition btn border-none">
              Sign in
            </button>

          </form>

          {/* Divider */}
          <div className="divider text-white/50 my-8">OR</div>

          {/* Social */}
          <div className="flex gap-4">
            <button onClick={handleGoogleLogin} className="w-full py-3 rounded-full bg-white text-black font-medium flex items-center justify-center gap-2 hover:scale-105 transition">
              <FaGoogle /> Google
            </button>

            
          </div>

          {/* Footer */}
          <p className="text-center text-gray-300 mt-8">
            Don’t have an account?
            <Link to={'/register'}>
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
