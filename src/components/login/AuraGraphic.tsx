"use client";

import Image from 'next/image';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// Images
import buildingImg from '@/assets/login/slide1/minibuilding.png';
import capmanImg from '@/assets/login/slide1/minicapman.png';
import bagImg from '@/assets/login/slide1/minibag.png';
import donutImg from '@/assets/login/slide1/minidonut.png';
import pianoImg from '@/assets/login/slide1/minipiano.png';
import headsetImg from '@/assets/login/slide1/miniheadset.png';
import gradCapImg from '@/assets/login/slide1/minigraduationcap.png';
import booksImg from '@/assets/login/slide1/minibooks.png';
import friesImg from '@/assets/login/slide1/minifries.png';
import manWithAura from '@/assets/login/manWithAuraCircles.png';

// Types
import { StaticImageData } from 'next/image';

interface IconPosition {
  src: StaticImageData; 
  alt: string;
  className: string;
  axis: 'x' | 'y'; // New property to control animation direction
}

const icons: IconPosition[] = [
  // --- X-AXIS GROUP (Top/Bottom) ---
  {
    src: buildingImg,
    alt: 'Building',
    className: 'w-[68px] 2xl:w-[72px] h-auto top-[4%] left-[12%]',
    axis: 'x' 
  },
  {
    src: friesImg,
    alt: 'Fries',
    className: 'w-[68px] 2xl:w-[72px] h-auto top-[1%] right-[18%]',
    axis: 'x'
  },
  {
    src: donutImg,
    alt: 'Donut',
    className: 'w-[68px] 2xl:w-[72px] h-auto bottom-[6%] left-[9%]',
    axis: 'x'
  },
  {
    src: pianoImg,
    alt: 'Piano',
    className: 'w-[68px] 2xl:w-[72px] h-auto -bottom-[1%] right-[22%]',
    axis: 'x'
  },

  // --- Y-AXIS GROUP (Sides) ---
  {
    src: capmanImg,
    alt: 'Delivery Man',
    className: 'w-[68px] 2xl:w-[72px] h-auto top-[32%] -left-[8%]',
    axis: 'y'
  },
  {
    src: bagImg,
    alt: 'Bag',
    className: 'top-[55%] left-[6%]',
    axis: 'y'
  },
  {
    src: headsetImg,
    alt: 'Headset',
    className: 'bottom-[28%] right-[10%]',
    axis: 'y'
  },
  {
    src: gradCapImg,
    alt: 'Graduation Cap',
    className: 'w-[68px] 2xl:w-[72px] h-auto top-[40%] -right-[6.5%]',
    axis: 'y'
  },
  {
    src: booksImg,
    alt: 'Books',
    className: 'top-[25%] right-[11%]',
    axis: 'y'
  },
];

const AuraGraphic = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Animate Icons floating Horizontally (X-Axis)
    gsap.to('.float-x', {
      x: 10 , // Move 12px right
      duration: "random(1, 2)", // Random speed per icon
      delay: "random(0, 2)", // Random start time
      repeat: -1, // Infinite
      yoyo: true, // Go back and forth
      ease: "sine.inOut", // Smooth wave easing
    });

    // 2. Animate Icons floating Vertically (Y-Axis)
    gsap.to('.float-y', {
      y: -15, // Move 15px up
      duration: "random(1, 2)",
      delay: "random(0, 2)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative flex w-full max-w-115 2xl:max-w-120 flex-col items-center justify-center select-none">
      
      {/* Main Image */}
      <div className="relative z-10 w-full">
        <Image
          src={manWithAura}
          alt="Man with aura circles"
          width={600}
          height={600}
          priority
          className="h-auto w-full object-contain"
        />
      </div>

      {/* Floating Icons Layer */}
      {icons.map((icon, index) => (
        <div
          key={index}
          className={`absolute z-20 object-contain will-change-transform ${icon.axis === 'x' ? 'float-x' : 'float-y'} ${icon.className}`}
        >
          <Image
            src={icon.src}
            alt={icon.alt}
            className="rounded-full backdrop-blur-[2px] shadow-[inset_1px_1px_0px_0px_rgba(255,255,255,0.6),inset_4px_4px_6px_6px_rgba(255,255,255,0)]"
          />
        </div>
      ))}
      
    </div>
  );
};

export default AuraGraphic;