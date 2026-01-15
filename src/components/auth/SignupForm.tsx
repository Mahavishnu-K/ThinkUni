"use client";

import Image from "next/image";
import Link from "next/link";

import logo from "@/assets/logo.png"; 
import FloatingInput from "@/components/ui/FloatingInput";
import TestimonialCarousel from "@/components/ui/TestimonialCarousel";

interface SignupFormProps {
  onLoginClick: () => void;
}

const SignupForm = ({ onLoginClick }: SignupFormProps) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-white p-8 md:p-16">
      <div className="w-full max-w-105">
        
        {/* Header */}
        <div className="mb-6 laptop:mb-8 2xl:mb-10 text-center">
          
          <div className="flex justify-center  mb-1 laptop:mb-2 2xl:mb-4">
            <h1 className="text-[38px] laptop:text-[40px] 2xl:text-[48px] font-bold tracking-tighter text-[#FF5A2A] flex items-center gap-2">
              <Image src={logo} alt="Think uni logo" />
              <span>
                <span className="text-[#222222]">THINK</span>UNI
              </span>
            </h1>
          </div>

          <h2 className="text-[20px] laptop:text-[22px] 2xl:text-2xl font-semibold text-[#222222]">
            SIGN UP
          </h2>

          <p className="text-[16px] laptop:text-[16px] 2xl:text-[18px] font-semibold text-[#222222] mt-1">
            One account, endless choices
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4">
          <div className="flex gap-4">
            <div className="w-1/2">
              <FloatingInput id="signup-first" label="First Name" />
            </div>
            <div className="w-1/2">
              <FloatingInput id="signup-last" label="Last Name" />
            </div>
          </div>

          <FloatingInput id="signup-email" label="Email id" type="email" />
          <FloatingInput id="signup-password" label="Password" type="password" />

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 text-[16px] text-[#222222] cursor-pointer select-none">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
              />
              <span className="font-medium">
                Accept{" "}
                <span className="font-medium text-orange-500 underline">
                  Privacy policy
                </span>
              </span>
            </label>

            <Link href="#" className="font-medium text-orange-500 hover:underline">
              Forget Password?
            </Link>
          </div>

          <button
            type="button"
            className="w-full rounded-lg bg-[#FF5A2A] py-3 text-sm font-bold cursor-pointer text-white shadow-md transition-transform hover:scale-[1.01] active:scale-[0.99]"
          >
            Sign Up
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-3 laptop:my-4 2xl:my-6 text-center">
          <span className="bg-white px-2 text-[16px] font-medium text-[#222222]">
            OR
          </span>
          <div className="absolute left-0 top-1/2 -z-10 h-px w-full bg-gray-200" />
        </div>

        {/* Google button */}
        <button className="flex w-full items-center justify-center gap-3 rounded-lg cursor-pointer border border-gray-200 bg-white py-3 text-sm font-semibold text-gray-700 drop-shadow-sm transition-colors hover:bg-gray-50">
          <Image src="/google_logo.png" alt="Google" width={20} height={20} />
          Continue with google
        </button>

        <div className="mt-2.5 text-center text-[16px] font-medium text-[#222222]">
          Already have an account?{" "}
          <button
            onClick={onLoginClick}
            className="text-orange-500 hover:cursor-pointer"
          >
            Sign in
          </button>
        </div>

        <TestimonialCarousel />
      </div>
    </div>
  );
};

export default SignupForm;
