"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import OverlayContent from "./OverlayContent";

interface OverlayProps {
  activeCard: number | null;
  onClose: () => void;
  overlayRef: React.RefObject<HTMLDivElement>;
  contentRef: React.RefObject<HTMLDivElement>;
}

const Overlay: React.FC<OverlayProps> = ({
  activeCard,
  onClose,
  overlayRef,
  contentRef,
}) => {
  useEffect(() => {
    if (activeCard !== null && overlayRef.current && contentRef.current) {
      gsap.fromTo(
        overlayRef.current,
        {
          clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
        },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 0.5,
          ease: "power2.out",
        }
      );
    }
  }, [activeCard]);

  if (activeCard === null) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-white dark:bg-black z-50 overflow-y-auto p-3"
      style={{ clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)" }}
    >
      <button
        className="fixed top-4 left-4 mix-blend-difference bg-[#EDECEA] p-1 rounded-lg text-black dark:text-gray-300 font-bold text-xl z-50"
        onClick={onClose}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="30px"
          viewBox="0 -960 960 960"
          width="30px"
          fill="currentColor"
        >
          <path d="M560.41-253.85 333.85-480.41l226.56-226.82 35.79 35.79-190.77 191.03L596.2-289.64l-35.79 35.79Z" />
        </svg>
      </button>

      <div
        ref={contentRef}
        className="max-w-3xl mx-auto mt-12 mb-20 rounded-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <OverlayContent />
      </div>
    </div>
  );
};

export default Overlay;
