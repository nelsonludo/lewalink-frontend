import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface AuthInputProps {
  type: string;
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  className?: string;
  id?: string;
  autoComplete?: string;
  register?: UseFormRegisterReturn;
  variant?: "default" | "password";
}

const AuthInput: React.FC<AuthInputProps> = ({
  type,
  placeholder,
  value,
  onChange,
  name,
  className = "",
  id,
  autoComplete,
  register,
  variant = "default",
}) => {
  const baseClassName =
    "w-full rounded-full py-4 px-6 text-gray-900 border-2 border-gray-300 placeholder:text-gray-400 focus:outline-none text-sm transition duration-300";
  const variantClassName =
    variant === "password"
      ? "bg-inherit"
      : "bg-inherit focus:border-[#bb29ff] focus:bg-white hover:border-[#bb29ff] hover:bg-white";

  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
      autoComplete={autoComplete}
      className={`${baseClassName} ${variantClassName} ${className}`}
      {...register}
    />
  );
};

export default AuthInput;
