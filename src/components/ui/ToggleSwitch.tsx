"use client";

interface ToggleSwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  id?: string;
}

const ToggleSwitch = ({ checked, onChange, id }: ToggleSwitchProps) => {
  return (
    <div className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        id={id}
        className="peer sr-only" 
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
      />
      
      {/* The Track (Background) */}
      <div className="
        h-5.25 w-10 rounded-full border-2 border-gray-300 bg-transparent transition-colors duration-300 ease-in-out peer-checked:ring-[#FF5A2A] peer-checked:bg-[#ffe5de] peer-checked:border-[#fccec1]
      "></div>

      {/* The Knob (Circle) */}
      <div className="
        absolute left-[1.5px] top-[1.5px] h-4.5 w-4.5 rounded-full 
        bg-[#9CA3AF] shadow-sm transition-all duration-200 ease-in-out
        peer-checked:translate-x-[110%] peer-checked:bg-[#FF5A2A]
      "></div>
    </div>
  );
};

export default ToggleSwitch;