"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import avatar1 from "@/assets/login/avatar1.png";
import avatar2 from "@/assets/login/avatar2.png";
import avatar3 from "@/assets/login/avatar3.png";

// Placeholder avatars
const AvatarGroup = () => (
  <div className="flex -space-x-5">
    {[avatar1, avatar2, avatar3].map((img, i) => (
      <div
        key={i}
        className="relative h-13.5 w-13.5 overflow-hidden rounded-full border-2 border-white bg-gray-200"
      >
        <Image src={img} alt="avatar profile" className="h-full w-full object-cover"/>
      </div>
    ))}
  </div>
);

const testimonials = [
  "“Study resources are very useful and organized.”",
  "“Great discounts on quality fashion wear.”",
  "“Best food discounts for students nearby.”",
  "“ThinkUni keeps fun within my reach.”",
  "“Found affordable stays near my campus.”",
];

const TestimonialCarousel = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const activeIndex = useRef(0);
  

  useGSAP(() => {
    // Initial Setup: Hide all texts except the first one
    // We set them to be "ready to enter" (below and transparent)
    gsap.set(".testimonial-text", { 
      y: 20, 
      x: -10, // Start slightly left
      opacity: 0, 
      display: "none" 
    });

    // Show the first one immediately
    gsap.set(`.testimonial-text-0`, { 
      y: 0, 
      x: 0, 
      opacity: 1, 
      display: "block" 
    });

    // Start the Interval
    const animateSlide = () => {
        const current = activeIndex.current;
        const next = (current + 1) % testimonials.length; // Loop back to 0

        activeIndex.current = next;

        const tl = gsap.timeline({
            onComplete: () => {
                gsap.delayedCall(3, animateSlide); 
            }
        });

        // 1. ANIMATE OUT (Current Item)
        // Move Up, Fade Out, Move slightly Left
        tl.to(`.testimonial-text-${current}`, {
          y: -20,
          x: -10, // Move left as it goes up
          opacity: 0,
          duration: 0.9,
          ease: "power2.in",
          onComplete: () => {
            // Reset position for next time it comes around
            gsap.set(`.testimonial-text-${current}`, { display: "none", y: 20, x: -10 }); 
          }
        });

        // 2. ANIMATE IN (Next Item)
        // It starts from y: 20, x: -10 (set in initial setup or onComplete above)
        tl.set(`.testimonial-text-${next}`, { display: "block" });
        
        tl.to(`.testimonial-text-${next}`, {
          y: 0,
          x: 0, // Settle to center
          opacity: 1,
          duration: 0.9,
          delay: 0.2,
          ease: "power2.out",
        });
    };

    const initialDelay = gsap.delayedCall(3, animateSlide);

    return () => initialDelay.kill();

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="mt-5 xl:mt-6 2xl:mt-8 flex w-full max-w-97 items-center justify-center gap-6">
      
      {/* 1. Avatars */}
      <div className="shrink-0">
        <AvatarGroup />
      </div>

      {/* 2. Text Slider Window */}
      <div className="relative h-12 flex-1 overflow-visible">
        {testimonials.map((text, i) => (
          <p
            key={i}
            className={`testimonial-text testimonial-text-${i} absolute top-1/2 -translate-y-1/2 left-0 w-full text-[16px] font-medium leading-snug text-gray-800 line-clamp-2`}
          >
            {text}
          </p>
        ))}
      </div>
      
    </div>
  );
};

export default TestimonialCarousel;