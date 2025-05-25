import React, { useState } from "react";

interface AuthLayoutProps {
  title: string;
  form: React.ReactNode;
  isResetPwd?: boolean;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ title, form, isResetPwd }) => {
  const [isFrench, setIsFrench] = useState(false);

  return (
    <div className="flex flex-row w-full h-screen">
      <div className="w-[70%]">
        <img
          alt=""
          src="/images/loginLeftImage.png"
          className="mx-auto h-full w-full"
        />
      </div>
      <div className="w-full sm:w-[90%] md:w-[70%] lg:w-[45%] h-fit py-10 pr-13">
        <div className="flex justify-end">
          <div className="flex h-10 rounded-full bg-[#DDB6FF]">
            <button
              className={`rounded-full w-30  font-medium ${
                !isFrench ? "bg-[#bb29ff] text-white" : " text-black"
              }`}
              onClick={() => setIsFrench(false)}
            >
              English
            </button>
            <button
              className={`rounded-full w-30  font-medium ${
                isFrench ? "bg-[#bb29ff] text-white" : "text-black"
              }`}
              onClick={() => setIsFrench(true)}
            >
              Français
            </button>
          </div>
        </div>
        <div className={`${isResetPwd && "mt-55"}`}>
          <h2 className="mt-10 text-center text-4xl font-medium tracking-tight text-[#bb29ff]">
            {title}
          </h2>
          <div className={`mt-8 sm:mx-auto sm:w-full sm:max-w-md`}>{form}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
