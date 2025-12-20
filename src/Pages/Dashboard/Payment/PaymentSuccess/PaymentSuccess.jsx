import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import useAuth from '../../../../Hooks/useAuth';
import successAnimation from '../../../../../public/successfullyPayment.json'


import Lottie from 'lottie-react';

// import successAnimation from './successfullyPayment.json'


const PaymentSuccess = () => {
  const [searchParams] = useSearchParams()
  const axiosSecure = useAxiosSecure()
  const {user} = useAuth()
  const email = user?.email
  const sessionId = searchParams.get('session_id')
  console.log(email);
  
  useEffect(()=>{
    if (sessionId){
    axiosSecure.post(`/payment-success`,{
      sessionId,
      email:email
    })
    }
  },[email,sessionId,axiosSecure])

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center mt-[-200px]">
      <h1 className='text-5xl text-black'>Payment Successful</h1>
      <div className="w-80">
        <Lottie animationData={successAnimation} loop={true} />
      </div>
    </div>
  );
};

export default PaymentSuccess;