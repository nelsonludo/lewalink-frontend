import React from "react";
import { FcGoogle } from "react-icons/fc";

interface AuthButtonProps {
  type: "submit" | "button";
  loading: boolean;
  onClick?: () => void;
  variant: "primary" | "google";
  children: React.ReactNode;
}

const AuthButton: React.FC<AuthButtonProps> = ({
  type,
  loading,
  onClick,
  variant,
  children,
}) => {
  const baseClasses =
    "w-full flex justify-center py-4 text-md font-semibold rounded-full transition duration-300 hover:scale-105 items-center";
  const primaryClasses = "bg-[#bb29ff] text-white";
  const googleClasses =
    "border-2 border-gray-300 bg-inherit text-[#bb29ff] items-center";

  return (
    <button
      type={type}
      disabled={loading}
      onClick={onClick}
      className={`${baseClasses} ${
        variant === "primary" ? primaryClasses : googleClasses
      }`}
    >
      {variant === "google" && <FcGoogle className="mr-2 text-lg" />}
      {children}
    </button>
  );
};

export default AuthButton;
