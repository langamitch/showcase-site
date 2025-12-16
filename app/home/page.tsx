"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";

const Page = () => {

  const data = [
    
  ]
  const socials = [
    { name: "Instagram", href: "https://instagram.com" },
    { name: "Dribbble", href: "https://dribbble.com" },
    { name: "X", href: "https://x.com" },
  ];

  const user = [
    { name: "Fabian Tjoeaon" },
    { name: "Ethan Chiu" },
    { name: "Nando Correa" },
    { name: "Daisy Zhang" },
  ];

  const [activeCard, setActiveCard] = useState<number | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleCardClick = (index: number) => {
    setActiveCard(index);
  };

  const handleCloseOverlay = () => {
    gsap.to(overlayRef.current, {
      clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)", // Collapse to a point
      duration: 0.9,
      ease: "power2.in",
      onComplete: () => setActiveCard(null),
    });
  };

  useEffect(() => {
    if (activeCard !== null && overlayRef.current && contentRef.current) {
      // Animate from a small square to full viewport
      gsap.fromTo(
        overlayRef.current,
        {
          clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)", // Start as a point
        },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", // Expand to full square
          duration: 0.5,
          ease: "power2.out",
        }
      );
    }
  }, [activeCard]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 bg-gray-50 dark:bg-[#000000]">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="flex flex-col">
          {/* Fixed height wrapper for consistent spacing */}
          <div className="aspect-video">
            <a
              href="#"
              className="block w-full h-full bg-neutral-300/50 backdrop-blur-sm hover:backdrop-blur-md transition-all duration-500"
            >
              <div>
                <Image
                  src="/img.png"
                  alt="Card Image"
                  width={800}
                  height={450}
                  className="w-full h-auto rounded-sm"
                />
              </div>
            </a>
          </div>

          {/* Clickable paragraph */}
          <p
            onClick={() => handleCardClick(index)}
            className="mt-2 tracking-tighter muted text-[clamp(16px,1.4vw,24px)] font-medium uppercase dark:text-gray-300 cursor-pointer"
          >
            The Monolith Project
          </p>
        </div>
      ))}

      {/* Overlay */}
      {activeCard !== null && (
        <div
          ref={overlayRef}
          className="fixed inset-0   bg-white dark:bg-black z-50 overflow-y-auto p-3"
          style={{
            clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)", // Start as a point
          }}
        >
          {/* Fixed close button */}
          <button
            className="fixed top-4 left-4 mix-blend-difference bg-[#EDECEA] p-1 rounded-lg text-black dark:text-gray-300 font-bold text-xl z-50"
            onClick={handleCloseOverlay}
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

          {/* Scrollable content */}
          <div
            ref={contentRef}
            className="max-w-3xl mx-auto mt-12 mb-20 rounded-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h1 className="max-w-xs uppercase text-3xl font-semibold leading-10 tracking-tight  dark:text-zinc-50">
              iso’design.
            </h1>
            <p className="maz-w-xs text-xl font-medium  tracking-tighter muted dark:text-zinc-500">
              By <span>{user.map((u) => u.name).join(", ")}</span>
            </p>
            <div className="w-full max-w-[800px] mt-6">
              <Image
                src="/img.png"
                alt="Card Image"
                width={800}
                height={500}
                className="w-full h-auto rounded-sm"
              />
            </div>
            <div className="w-full max-w-[800px] mt-6">
              <Image
                src="/img.png"
                alt="Card Image"
                width={800}
                height={500}
                className="w-full h-auto rounded-sm"
              />
            </div>

            <div className="mt-10">
              <h1 className="max-w-xs text-2xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
                Technology & tools.
              </h1>

              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  "Web & Interactive",
                  "3D",
                  "ScrollSmoother",
                  "ScrollTrigger",
                ].map((tool, index) => (
                  <span
                    key={index}
                    className="px-3 [clamp(16px,1.4vw,24px)] py-1 font-medium muted border border-[#EDECEA] rounded-2xl"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-5">
              <h1 className="max-w-xs text-2xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
                Description about the site.
              </h1>
              <p className="max-w-md text-lg leading-6 tracking-tight muted text-semibold dark:text-zinc-400">
                A performance-first developer portfolio blending precision and
                storytelling. Minimal, fast, and fluid--where motion serves
                meaning and design meets engineering clarity.
              </p>
            </div>
            <div className="mt-10 flex flex-col gap-5">
              <h1 className="max-w-xs text-2xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
                Discover the details behind this website.
              </h1>

              <div className="w-full max-w-[800px] mt-6">
                <Image
                  src="/img.png"
                  alt="Card Image"
                  width={800}
                  height={450}
                  className="w-full h-auto rounded-sm"
                />
              </div>
            </div>
            <div className="mt-10 flex flex-col gap-5">
              <h1 className="max-w-xs text-2xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
                Connect with {""}{" "}
                <span>{user.map((u) => u.name).join(", ")}</span>.
              </h1>
              <div className="flex flex-row gap-6">
                {socials.map(({ name, href }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="max-w-xs text-2xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50 hover:underline"
                  >
                    {name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
