"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Assets
import pinIcon from "@/assets/login/slide3/pin2.png";
import entertainmentImg from "@/assets/login/slide3/Entertainment.png";
import staysImg from "@/assets/login/slide3/Stays.png";
import educationImg from "@/assets/login/slide3/Education.png";
import fashionImg from "@/assets/login/slide3/Fashion.png";
import careerImg from "@/assets/login/slide3/Career.png";
import foodImg from "@/assets/login/slide3/Food.png";

interface ProductsGraphicProps {
  isActive: boolean;
}

const ProductsGraphic = ({ isActive }: ProductsGraphicProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(() => {
    // 1. Create Timeline (Paused initially)
    const tl = gsap.timeline({ paused: true });

    // --- STEP 1: DART STRIKE ANIMATION (Pins) ---
    tl.from(".pin-icon", {
      scale: 4,          // Start huge 
      opacity: 0,        // Start invisible
      duration: 0.8,     // Very fast strike
      stagger: 0.3,      // One after another
      ease: "power4.in", // Hard impact ease
    });

    // --- STEP 2: PRODUCT POP (Content Groups) ---
    tl.from(".product-group", {
      scale: 0,
      opacity: 0,
      y: 15,             
      duration: 1,
      stagger: 0.3,      
      ease: "back.out(1.7)", 
    }, "-=0.3"); 

    tlRef.current = tl;
  }, { scope: containerRef });

  useEffect(() => {
    if (isActive && tlRef.current) {
      tlRef.current.restart();
    }
  }, [isActive]);

  return (
    <div ref={containerRef} className="relative h-full w-full flex-1">

      {/* --- ENTERTAINMENT --- */}
      <Image src={pinIcon} alt="pin" className="pin-icon absolute bottom-[38%] left-[5%] w-8 h-8 object-contain xl:left-[1%] xl:bottom-[35%] laptop:left-0 laptop:bottom-[34.5%] laptop-lg:left-[1%] laptop-lg:bottom-[33%] 2xl:left-[2%] 2xl:bottom-[35.6%]" />
      <div className="product-group absolute -left-[4%] bottom-[14%] z-20 flex flex-col items-center xl:-left-[9%] xl:bottom-[14.5%] laptop:-left-[8%] laptop:bottom-[13%] laptop-lg:-left-[7%] laptop-lg:bottom-[11.5%] 2xl:-left-[6%] 2xl:bottom-[13%]">
        <div className="flex flex-col items-center">
          <p className="laptop:text-[18px] 2xl:text-[20px] font-semibold text-white drop-shadow-md">Entertainment</p>
          <Image src={entertainmentImg} alt="Entertainment" className="xl:h-23 2xl:h-full object-contain drop-shadow-xl" />
        </div>
      </div>

      {/* --- STAYS --- */}
      <Image src={pinIcon} alt="pin" className="pin-icon absolute top-[34%] left-[22%] w-8 h-8 object-contain xl:top-[35%] xl:left-[18%] laptop:left-[18%] laptop:top-[33.5%] laptop-lg:left-[18%] laptop-lg:top-[33.7%] 2xl:left-[20%] 2xl:top-[34%]" />
      <div className="product-group absolute left-[12%] top-[7%] z-20 flex flex-col items-center xl:left-[7%] xl:top-[10.2%] laptop:left-[8%] laptop:top-[8.5%] 2xl:left-[11%] 2xl:top-[7.5%]">
        <div className="flex flex-col items-center">
          <Image src={staysImg} alt="Stays" className="xl:h-28 2xl:h-full object-contain drop-shadow-xl" />
          <p className="laptop:text-[18px] 2xl:text-[20px] font-semibold text-white drop-shadow-md">Stays</p>
        </div>
      </div>

      {/* --- EDUCATION --- */}
      <Image src={pinIcon} alt="pin" className="pin-icon absolute bottom-[43%] left-[40%] w-8 h-8 object-contain xl:left-[37%] xl:bottom-[40.5%] laptop:left-[36%] laptop:bottom-[40.3%] laptop-lg:left-[36.5%] laptop-lg:bottom-[39%] 2xl:left-[38%] 2xl:bottom-[41.3%]" />
      <div className="product-group absolute left-[34%] bottom-[18%] z-20 flex flex-col items-center xl:bottom-[17.5%] xl:left-[30%] laptop:bottom-[16%] laptop:left-[29%] laptop-lg:bottom-[15%] laptop-lg:left-[30%] 2xl:bottom-[17%] 2xl:left-[32%]">
        <div className="flex flex-col items-center">
          <p className="laptop:text-[18px] 2xl:text-[20px] font-semibold text-white drop-shadow-md">Education</p>
          <Image src={educationImg} alt="Education" className="xl:h-27 2xl:h-32 object-contain drop-shadow-xl" />
        </div>
      </div>
      
      {/* --- FASHION --- */}
      <Image src={pinIcon} alt="pin" className="pin-icon absolute top-[25%] right-[44%] w-8 h-8 object-contain xl:right-[45.5%] xl:top-[25.7%] laptop:right-[47%] laptop:top-[23.5%] laptop-lg:top-[23.3%] laptop-lg:right-[46.5%] 2xl:right-[46%] 2xl:top-[24.5%]" />
      <div className="product-group absolute left-[42%] top-[1%] z-20 flex flex-col items-center xl:top-[2%] xl:left-[40%] laptop:top-0 laptop:left-[40%] laptop-lg:left-[41%] laptop-lg:top-0 2xl:top-[1%] 2xl:left-[42%]">
        <div className="flex flex-col items-center">
          <Image src={fashionImg} alt="Fashion" className="xl:h-27 2xl:h-30 object-contain drop-shadow-xl" />
          <p className="laptop:text-[18px] 2xl:text-[20px] font-semibold text-white drop-shadow-md">Fashion</p>
        </div>
      </div>

      {/* --- CAREER --- */}
      <Image src={pinIcon} alt="pin" className="pin-icon absolute bottom-[54.5%] right-[25%] w-8 h-8 object-contain xl:bottom-[52.8%] xl:right-[25.5%] laptop:bottom-[53.5%] laptop:right-[27%] laptop-lg:right-[26.5%] laptop-lg:bottom-[53%] 2xl:right-[27%] 2xl:bottom-[54%]" />
      <div className="product-group absolute right-[18%] bottom-[26%] xl:bottom-[24.5%] xl:right-[17%] laptop:bottom-[24.5%] laptop:right-[19%] laptop-lg:bottom-[24%] laptop-lg:right-[19%] 2xl:right-[20%] 2xl:bottom-[25.5%] z-20 flex flex-col items-center">
        <div className="flex flex-col items-center">
          <p className="laptop:text-[18px] 2xl:text-[20px] font-semibold text-white drop-shadow-md">Career</p>
          <Image src={careerImg} alt="Career" className="xl:h-34 2xl:h-38 object-contain drop-shadow-xl" />
        </div>
      </div>

      {/* --- FOOD --- */}
      <Image src={pinIcon} alt="pin" className="pin-icon absolute top-[18%] right-[9%] w-8 h-8 object-contain xl:top-[18.7%] xl:right-[8%] laptop:top-[16.3%] laptop:right-[10%] laptop-lg:right-[10%] laptop-lg:top-[15.5%] 2xl:right-[10%] 2xl:top-[17.5%]" />
      <div className="product-group absolute right-[0.5%] -top-[2%] xl:top-0 xl:-right-[2%] laptop:right-0 laptop:-top-[2.2%] laptop-lg:right-[1%] laptop-lg:-top-[3%] 2xl:right-[2%] 2xl:-top-[2%] z-20 flex flex-col items-center">
        <div className="flex flex-col items-center">
          <Image src={foodImg} alt="Food" className="xl:h-20 2xl:h-24 object-contain drop-shadow-xl" />
          <p className="laptop:text-[18px] 2xl:text-[20px] font-semibold text-white drop-shadow-md">Food</p>
        </div>
      </div>

    </div>
  );
};

export default ProductsGraphic;