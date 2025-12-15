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
                console.log(result.user);
                

                // create user in the database
                const userInfo = {
                    email: result.user.email,
                    displayName: result.user.displayName,
                    photoURL: result.user.photoURL
                }

                axiosSecure.post('/users', userInfo)
                    .then(res => {
                        console.log('user data has been stored', res.data)
                        navigate(location.state || '/');
                    })

            })
            .catch(error => {
                console.log(error)
            })
    }

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