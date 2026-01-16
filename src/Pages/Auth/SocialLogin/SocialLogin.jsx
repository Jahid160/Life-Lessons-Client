import React from 'react';

import { useLocation, useNavigate } from 'react-router';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { FcGoogle } from "react-icons/fc";


const SocialLogin = () => {
    const { signInGoogle } = useAuth();
    const axiosSecure = useAxiosSecure();
    const location = useLocation();
    const navigate = useNavigate();


const handleGoogleSignIn = () => {
  signInGoogle()
    .then(result => {
      const user = result.user;

      const userInfo = {
        email: user?.email,
        displayName: user.displayName,
        photoURL: user.photoURL
 };
 console.log(userInfo);

      axiosSecure.post('/users', userInfo)
        .then(() => {
          navigate(location.state || '/dashboard');
        });
    })
    .catch(error => console.log(error));
};


    return (
        <div className='text-center pb-8'>
            
            <button
                onClick={handleGoogleSignIn}
                className="btn w-full rounded-full bg-white text-black border-[#e5e5e5]">
                <FcGoogle size={24}/>
                Login with Google
            </button>
        </div>
    );
};

export default SocialLogin;