import React from 'react';
import PaymentCancelAnimation from '../../../../../public/PaymentFailed.json'
import Lottie from 'lottie-react';
const PaymentCancel = () => {
  return (
         <div className="w-full h-screen flex flex-col justify-center items-center mt-[-200px]">
      <h1 className='text-5xl text-black'>Payment Failed</h1>
      <div className="w-80">
        <Lottie animationData={PaymentCancelAnimation} loop={true} />
      </div>
    </div>
  );
};

export default PaymentCancel;