"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface FloatingInputProps {
  id: string;
  label: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FloatingInput = ({ id, label, type = "text", value, onChange }: FloatingInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  
  // Determine the actual input type (handle password toggle)
  const inputType = type === "password" ? (showPassword ? "text" : "password") : type;

  return (
    <div className="relative w-full">
      {/* 
        1. THE INPUT 
        - 'peer': Allows the label to react to this input's state.
        - 'placeholder-transparent': Hides the native placeholder so our custom label shows instead.
        - 'placeholder=" "': Required for the :placeholder-shown pseudo-class to work.
      */}
      <input
        type={inputType}
        id={id}
        value={value}
        onChange={onChange}
        className="
          peer block w-full rounded-lg border border-[#999999]
          bg-transparent px-4 py-3 text-gray-900 
          placeholder-transparent 
          focus:border-[#FF5A2A] focus:outline-none focus:ring-0
        "
        placeholder=" " 
      />

      {/* 
        2. THE FLOATING LABEL 
        - Default state (Floating): Sits on top border, small text, orange color (if focused).
        - Peer-Placeholder-Shown (Idle): Sits in center, normal text, gray color.
      */}
      <label
        htmlFor={id}
        className="
          absolute left-3 top-0 z-10 origin-left -translate-y-1/2 scale-75 
          bg-white px-1 text-sm text-gray-500 duration-300 
          
          peer-placeholder-shown:top-1/2 
          peer-placeholder-shown:-translate-y-1/2 
          peer-placeholder-shown:scale-100 
          
          peer-focus:top-0 
          peer-focus:-translate-y-1/2 
          peer-focus:scale-75 
          peer-focus:text-[#FF5A2A]
          
          cursor-text
        "
      >
        {label}
      </label>

      {/* 
        3. PASSWORD TOGGLE (Optional)
        - Only renders if the original type was 'password'
      */}
      {type === "password" && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      )}
    </div>
  );
};

export default FloatingInput;