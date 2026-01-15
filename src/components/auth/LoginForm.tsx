"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import logo from "@/assets/logo.png";

import ToggleSwitch from "@/components/ui/ToggleSwitch";
import FloatingInput from "@/components/ui/FloatingInput";
import TestimonialCarousel from "@/components/ui/TestimonialCarousel";

interface LoginFormProps {
  onRegisterClick: () => void;
}

const LoginForm = ({ onRegisterClick }: LoginFormProps) => {
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-white p-8 md:p-17">
      <div className="w-full max-w-100">
        {/* Header */}
        <div className="mb-6 laptop:mb-8 2xl:mb-10 text-center">
           {/* Replace with your logo Image */}
           <div className="flex justify-center mb-1 laptop:mb-2 2xl:mb-4">
              <h1 className="text-[38px] laptop:text-[40px] 2xl:text-[48px] font-bold tracking-tighter text-[#FF5A2A] flex items-center gap-2">
                 <Image src={logo} alt="Think uni logo"/> <span><span className="text-[#222222]">THINK</span>UNI</span>
              </h1>
           </div>
          <h2 className="text-[20px] laptop:text-[22px] 2xl:text-2xl  font-semibold text-[#222222]">SIGN IN</h2>
          <p className="text-[16px] laptop:text-[16px] 2xl:text-[18px] font-semibold text-[#222222] mt-1">
            One account, endless choices
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5">
          <FloatingInput 
            id="login-email" 
            label="Email id" 
            type="email" 
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />

          <FloatingInput 
            id="login-password" 
            label="Password" 
            type="password" 
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
          />

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-[16px] text-[#222222] cursor-pointer select-none">
              <ToggleSwitch 
                id="remember-toggle"
                checked={rememberMe}
                onChange={setRememberMe}
              />
              <span className="font-medium">Remember me</span>
            </label>
            <Link href="#" className="font-medium text-orange-500 hover:underline">
              Forget Password?
            </Link>
          </div>

          <button
            type="button"
            className="w-full rounded-lg bg-[#FF5A2A] py-3 text-sm font-bold cursor-pointer text-white shadow-md transition-transform hover:scale-[1.01] active:scale-[0.99]"
          >
            Sign In
          </button>
        </form>

        <div className="relative my-3 laptop:my-4 2xl:my-6 text-center">
          <span className="bg-white px-2 text-[16px] font-medium text-[#222222]">OR</span>
          <div className="absolute left-0 top-1/2 -z-10 h-px w-full bg-gray-200"></div>
        </div>

        <button className="flex w-full items-center justify-center gap-3 rounded-lg cursor-pointer border border-gray-200 bg-white py-3 text-sm font-semibold text-gray-700 drop-shadow-sm transition-colors hover:bg-gray-50">
          <Image src="/google_logo.png" alt="Google" width={20} height={20} />
          Continue with google
        </button>

        <div className="mt-2.5 pb-2 text-center text-[16px] font-medium text-[#222222]">
          New to ThinkUni? {" "}
          <button onClick={onRegisterClick} className="text-orange-500 hover:cursor-pointer">
            Register now
          </button>
        </div>

        <TestimonialCarousel />
      </div>
    </div>
  );
};

export default LoginForm;