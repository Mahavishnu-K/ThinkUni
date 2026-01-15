"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Imports (Keep exactly as yours)
import offerBadge from "@/assets/login/slide2/student_offer.png";
import handsBottom from "@/assets/login/slide2/Bottom illustration.png";
import hat0 from "@/assets/login/slide2/Graduation Hat.png";
import hat1 from "@/assets/login/slide2/Graduation Hat-1.png";
import hat2 from "@/assets/login/slide2/Graduation Hat-2.png";
import hat3 from "@/assets/login/slide2/Graduation Hat-3.png";
import hat4 from "@/assets/login/slide2/Graduation Hat-4.png";
import hat5 from "@/assets/login/slide2/Graduation Hat-5.png";

const hats = [
  { src: hat1, className: "w-[112px] top-[20%] right-[13%]" },
  { src: hat0, className: "w-[160px] top-[1%] left-[40%]" },
  { src: hat4, className: "w-[146px] bottom-[30%] right-[5%]" },
  { src: hat2, className: "w-[96px] top-[40%] left-[10%]" },
  { src: hat3, className: "w-[123px] bottom-[22%] left-[28%]" },
  { src: hat5, className: "w-[122px] top-[15%] left-[12%]" },
];

interface StudentOfferProps {
  isActive: boolean;
}

const StudentOfferGraphic = ({ isActive }: StudentOfferProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 2. Ref to store the timeline so we can control it later
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(() => {
    // Master Timeline for the Intro Sequence
    const tl = gsap.timeline({ paused: true });

    // 1. Hands rise up from below
    tl.from(".hands-illustration", {
      y: 200, // Move down 200px initially
      opacity: 0,
      duration: 3,
      ease: "power3.out",
    });

    // 2. Hats "Pop" into position quickly
    // We use scale: 0 and back.out easing to make them "pop" like bubbles
    tl.from(".floating-hat", {
      scale: 0, 
      opacity: 0,
      y: 30, // Slightly move up while popping
      duration: 0.8,
      stagger: 0.1, // 0.1s delay between each hat
      ease: "back.out(1.7)", // The "Elastic Pop" effect
    }, "-=0.5"); // Overlap slightly with hands animation for smoothness

    // 3. Offer Badge reveals in center
    tl.from(".offer-badge", {
      scale: 0,
      opacity: 0,
      duration: 1,
      ease: "elastic.out(1, 0.5)", // Bouncy elastic finish
    }, "-=0.3");

    // --- CONTINUOUS ANIMATION (After Intro) ---
    // Make the hats float gently forever so the graphic isn't dead static
    tl.to(".floating-hat", {
      y: -20, // Very slight Up movement (6px)
      rotation: "random(-25, 25)",
      duration: 2,
      stagger: {
        each: 0.4,
        repeat: -1, // Infinite loop
        yoyo: true, // Go back down smoothly
      },
      ease: "sine.inOut", // Smooth sine wave (breathing)
    }, "-=1.5");

    tlRef.current = tl;

  }, { scope: containerRef });

  useEffect(() => {
    if (isActive && tlRef.current) {
      tlRef.current.restart(); 
    }
  }, [isActive]);

  return (
    <div ref={containerRef} className="relative h-full w-full flex-1 overflow-hidden">
      
      {/* 1. CENTRAL OFFER BADGE */}
      {/* Added class 'offer-badge' for animation */}
      <div className="offer-badge absolute w-68 object-contain left-1/2 top-[40%] z-10 -translate-x-1/2 -translate-y-1/2">
        <Image
          src={offerBadge}
          alt="Student Offer 50%"
          className="drop-shadow-2xl"
          priority
        />
      </div>

      {/* 2. FLOATING HATS */}
      {hats.map((hat, i) => (
        <div key={i} className={`floating-hat absolute z-0 ${hat.className}`}>
          <Image
            src={hat.src}
            alt="Graduation Hat"
            className="h-auto w-full drop-shadow-lg"
          />
        </div>
      ))}

      {/* 3. BOTTOM HANDS ILLUSTRATION */}
      {/* Added class 'hands-illustration' for animation */}
      <div className="hands-illustration absolute bottom-20 left-18 right-0 z-20 flex max-w-120 items-center justify-center">
        <Image
          src={handsBottom}
          alt="Hands reaching up"
          className="w-full object-contain"
        />
      </div>

    </div>
  );
};

export default StudentOfferGraphic;