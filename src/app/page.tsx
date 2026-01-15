"use client";

import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Components
import LoginForm from "@/components/auth/LoginForm";
import SignupForm from "@/components/auth/SignupForm";
import OnboardingSlider from "@/components/login/OnboardingSlider"; // Your existing slider

export default function AuthPage() {
  // State: true = Login View, false = Signup View
  const [isLoginView, setIsLoginView] = useState(true);
  
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // If Login View: Translate X to 0 (Show Section 1 & 2)
    // If Signup View: Translate X to -33.333% (Show Section 2 & 3)
    // Note: Since width is 150vw (3 sections), moving 1 section means moving 33.33% of the container.
    
    const xPercent = isLoginView ? 0 : -33.3333;

    gsap.to(trackRef.current, {
      xPercent: xPercent,
      duration: 1,
      ease: "power3.inOut",
    });
  }, { scope: containerRef, dependencies: [isLoginView] });

  return (
    <div 
      ref={containerRef} 
      className="relative h-screen w-screen overflow-hidden bg-white"
    >
      
      {/* 
        THE SLIDING TRACK 
        Width = 150vw (150% of viewport) because we have 3 panels of 50vw each.
      */}
      <div 
        ref={trackRef} 
        className="flex h-full w-[150vw] will-change-transform"
      >
        
        {/* SECTION 1: LOGIN FORM (50vw) */}
        <div className="h-full w-[50vw] shrink-0 bg-white">
          <LoginForm onRegisterClick={() => setIsLoginView(false)} />
        </div>

        {/* SECTION 2: ONBOARDING SLIDER (50vw) - The Common Middle */}
        <div className="h-full w-[50vw] shrink-0 relative z-20">
          <OnboardingSlider />
        </div>

        {/* SECTION 3: SIGNUP FORM (50vw) */}
        <div className="h-full w-[50vw] shrink-0 bg-white">
          <SignupForm onLoginClick={() => setIsLoginView(true)} />
        </div>

      </div>

    </div>
  );
}