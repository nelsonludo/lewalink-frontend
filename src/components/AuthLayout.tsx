import React, { useState } from "react";

interface AuthLayoutProps {
  title: string;
  form: React.ReactNode;
  isResetPwd?: boolean;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ title, form, isResetPwd }) => {
  const [isFrench, setIsFrench] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen">
      {/* Left image section - Hidden on small screens */}
      <div className="hidden lg:block lg:w-[65%] min-h-screen">
        <img
          alt=""
          src="/images/loginLeftImage.png"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Right form section */}
      <div className="w-full lg:w-[45%] px-6 sm:px-10 py-10 flex flex-col justify-center">
        {/* Language Switcher - Centered on mobile, right-aligned on large */}
        <div className="flex justify-center lg:justify-end mb-6">
          <div className="flex rounded-full bg-[#DDB6FF] overflow-hidden">
            <button
              className={`px-4 py-2 font-medium transition-colors ${
                !isFrench ? "bg-[#bb29ff] text-white" : "text-black"
              }`}
              onClick={() => setIsFrench(false)}
            >
              English
            </button>
            <button
              className={`px-4 py-2 font-medium transition-colors ${
                isFrench ? "bg-[#bb29ff] text-white" : "text-black"
              }`}
              onClick={() => setIsFrench(true)}
            >
              Français
            </button>
          </div>
        </div>

        {/* Title and Form */}
        <div className={`${isResetPwd ? "mt-14" : ""}`}>
          <div className="flex lg:hidden justify-center items-center mb-8">
            <img
              src="/images/LewaLinkLogo.png"
              alt="Logo"
              className=" mb-6 w-18 h-18"
            />
            <h2 className="text-2xl sm:text-3xl">
              <strong>Lewa</strong>Link
            </h2>
          </div>
          <h2 className="text-center text-3xl sm:text-4xl font-medium tracking-tight text-[#bb29ff]">
            {title}
          </h2>
          <div className="mt-8 w-full max-w-md mx-auto">{form}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
