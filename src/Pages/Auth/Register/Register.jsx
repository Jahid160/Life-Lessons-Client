import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { FaGoogle, FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";
// import '../../.././index.css'

const Register = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();
    const { registerUser, updateUserProfile } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const handleRegistration = (data) =>{
      const profileImg = data.photo[0]
      registerUser(data.email, data.password)
      .then(()=>{
        const formData = new FormData();
      
      formData.append('image', profileImg);

      const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`
      
      axios.post(image_API_URL,formData)
      .then(res=>{
        const photoURL = res.data.data.url;

        const userInfo = {
          email: data.email,
          displayName: data.name,
          photoURL: photoURL
        }
        axiosSecure.post('/users', userInfo)
        .then(res =>{
          if(res.data.insertedId){
            console.log('user created in the database');
          }
        })
        
      })
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
            SingUp
          </h1>

          <p className="text-center text-gray-300 mb-8">Create new account</p>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit(handleRegistration)}>
            {/* Name */}
            <div className="relative">
              <FaEnvelope className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 text-lg" />
              <input
                type="text"
                {...register('name',{required: true} )}
                placeholder="Your Name"
                className="div_style"
              />
            </div>
            {/* Email */}
            <div className="relative">
              <FaEnvelope className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 text-lg" />
              <input
              {...register('email', {required: true})}
                type="email"
                placeholder="Email address"
                className="div_style"
              />
            </div>
            {/* Photo */}
            <div className="relative">
              
              <input 
              {...register('photo', {required: true})}
              type="file" className="file-input  " />
            </div>

            {/* Password */}
            <div className="relative">
              <FaLock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 text-lg" />
              <input
              {...register('password', {required: true})}
                type="password"
                placeholder="Password"
                className="div_style"
              />
            </div>

            

            {/* Button */}
            <button className="w-full py-4 rounded-full bg-primary text-white font-semibold text-lg shadow-lg hover:scale-[1.02] transition btn border-none">
              Sign up
            </button>
          </form>

          {/* Divider */}
          <div className="divider text-white/50 my-8">OR</div>

          {/* Social */}
          <SocialLogin></SocialLogin>

          {/* Footer */}
          <p className="text-center text-gray-300 mt-8">
          already have an account?
            <Link to={'/login'}>
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
