
import Lottie from "lottie-react";
import errorAnimation from '../../../public/error.json'
const Error404Page = () => {

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-80">
        <Lottie animationData={errorAnimation} loop={true} />
      </div>
    </div>
  );
};

export default Error404Page;