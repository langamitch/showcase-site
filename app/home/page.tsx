"use client";
import React, { useState, useRef } from "react";
import { gsap } from "gsap";
import Scrollbar from "../components/scrollbar";
import CardGrid from "../components/CardGrid";
import Overlay from "../components/Overlay";

const Page = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleCardClick = (index: number) => {
    setActiveCard(index);
  };

  const handleCloseOverlay = () => {
    gsap.to(overlayRef.current, {
      clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
      duration: 0.9,
      ease: "power2.in",
      onComplete: () => setActiveCard(null),
    });
  };

  return (
    <>
      
      <CardGrid onCardClick={handleCardClick} />
      <Overlay
        activeCard={activeCard}
        onClose={handleCloseOverlay}
        overlayRef={overlayRef}
        contentRef={contentRef}
      />
    </>
  );
};

export default Page;
