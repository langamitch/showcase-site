// pages/index.tsx
"use client";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import Scrollbar from "./components/scrollbar";
import CardGrid from "./components/CardGrid";
import Overlay from "./components/Overlay";
import { supabase } from "../lib/supabaseClient";
import { Site } from "../types/supabase";

export default function Home() {
  const [sites, setSites] = useState<Site[]>([]);
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

  useEffect(() => {
    const fetchSites = async () => {
      const { data, error } = await supabase
        .from("sites")
        .select("*")
        .eq("status", "approved"); // Only fetch approved sites

      if (error) {
        console.error("Error fetching sites:", error);
      } else {
        setSites(data || []);
      }
    };

    fetchSites();
  }, []);

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
}
