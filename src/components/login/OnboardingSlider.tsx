"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import AuraGraphic from "./AuraGraphic";
import StudentOfferGraphic from "./StudentOfferGraphic";
import ProductsGraphic from "./ProductsGraphic";

// Assets
import threadVector from "@/assets/dotted_thread_vector.png";

const OnboardingSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressTimeline = useRef<gsap.core.Timeline | null>(null);

  // Slide transition animation
  useGSAP(() => {
    const xPercent = -(activeIndex * 100) / 3;

    gsap.to(trackRef.current, {
      xPercent: xPercent,
      duration: 1.2,
      ease: "power3.inOut",
    });
  }, {
    scope: containerRef,
    dependencies: [activeIndex]
  });

  // --- PROGRESS BAR ANIMATION (GPU OPTIMIZED) ---
  useEffect(() => {
    if (progressTimeline.current) {
      progressTimeline.current.kill();
    }

    // 1. Reset ALL bars using scaleX
    progressRefs.current.forEach((progress) => {
      if (progress) {
        // Set scaleX to 0 to hide them. 
        // transformOrigin: "left" ensures it grows from left to right.
        gsap.set(progress, { scaleX: 0, transformOrigin: "left" });
      }
    });

    const activeProgress = progressRefs.current[activeIndex];
    if (activeProgress) {
      progressTimeline.current = gsap.timeline();
      
      progressTimeline.current.to(activeProgress, {
        scaleX: 1, // Grow to full size
        duration: 8,
        ease: "none", // Linear = Buttery Smooth
        force3D: true, // Force GPU acceleration
        onComplete: () => {
          setActiveIndex((prev) => (prev === 2 ? 0 : prev + 1));
        }
      });
    }

    return () => {
      if (progressTimeline.current) {
        progressTimeline.current.kill();
      }
    };
  }, [activeIndex]);

  const handleDotClick = (index: number) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative flex h-full w-full max-w-180 laptop:max-w-195 max-h-215 flex-col overflow-hidden bg-[#FF5A2A] text-white"
    >
      {/* --- SLIDING TRACK --- */}
      <div
        ref={trackRef}
        className="relative flex h-full w-[300%]"
      >
        {/* VECTOR BACKGROUND */}
        <div className="absolute inset-0 -top-[60%] left-[17%] xl:left-[14%] xl:scale-100 xl:-top-[58%] laptop:left-[12%] laptop:scale-100 laptop:-top-[65%] laptop-lg:left-[12.5%] laptop-lg:scale-105 laptop-lg:-top-[68%] 2xl:scale-110 2xl:left-[14%] 2xl:-top-[65%] z-0 flex items-center justify-center">
          <Image
            src={threadVector}
            alt="Decoration"
            className="w-480 h-190 laptop:w-450 laptop:h-185 object-contain"
            priority
          />
        </div>

        {/* --- SLIDE 1 --- */}
        <div className="relative z-10 flex h-full w-1/3 flex-col px-12 pt-6">
          <div className="ml-16">
            <h1 className="text-4xl 2xl:text-[38px] font-bold leading-tight">
              Welcome to <span className="text-black">Think</span>Uni
            </h1>
            <p className="mt-0 2xl:mt-1 max-w-md text-[16px] font-semibold">
              Your one-stop platform for smarter learning, growth, and opportunities.
            </p>
          </div>
          <div className="flex items-center mt-6 2xl:mt-8 justify-center w-full">
            <AuraGraphic />
          </div>
        </div>

        {/* --- SLIDE 2 --- */}
        <div className="relative z-10 flex h-full w-1/3 flex-col px-12 pt-6">
          <div className="ml-16">
            <h1 className="text-4xl 2xl:text-[38px] font-bold leading-tight">
              Student <span className="text-black">Offer</span>
            </h1>
            <p className="mt-0 2xl:mt-1 max-w-md text-[16px] font-semibold">
              Get access to tailored offers, learning tools, and career resources designed for your success.
            </p>
          </div>
          <div className="flex w-full flex-1 items-end justify-center pb-3 2xl:pb-6">
            <StudentOfferGraphic isActive={activeIndex === 1} />
          </div>
        </div>

        {/* --- SLIDE 3 --- */}
        <div className="relative z-10 flex h-full w-1/3 flex-col px-12 pt-6 laptop:px-12 laptop:pt-6">
          <div className="ml-16">
            <h1 className="text-4xl 2xl:text-[38px] font-bold leading-tight">
              Products of <span className="text-black">Think</span>Uni
            </h1>
            <p className="mt-0 2xl:mt-1 max-w-md text-[16px] font-semibold">
              From learning resources to exclusive student deals, ThinkUni brings everything together in one place.
            </p>
          </div>

          <div className="flex w-full mt-2 flex-1 pb-6">
            <ProductsGraphic isActive={activeIndex === 2} />
          </div>
        </div>
      </div>

      {/* --- FOOTER --- */}
      <div className="absolute bottom-3 2xl:bottom-5 left-0 z-20 flex w-full flex-col bg-[#FF5A2A] items-center gap-4 2xl:gap-6">
        <p className="text-center text-[14px] 2xl:text-[16px] font-semibold tracking-wide">
          Sign in to explore personalized resources <br /> built for students like you
        </p>

        {/* Pagination Dots */}
        <div className="flex items-center gap-2">
          {[0, 1, 2].map((index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`
                relative h-2 rounded-full overflow-hidden cursor-pointer transition-all duration-500 ease-out
                ${activeIndex === index ? "w-14 bg-white/30" : "w-2 bg-white/50"}
              `}
              aria-label={`Go to slide ${index + 1}`}
            >
              {/* 
                 CHANGE: We give this width="100%" initially.
                 GSAP will control visibility using scaleX(0) -> scaleX(1).
              */}
              <div
                ref={(el) => {
                  progressRefs.current[index] = el;
                }}
                className="absolute top-0 left-0 h-full w-full bg-white will-change-transform"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OnboardingSlider;