"use client";
import React from "react";
import Image from "next/image";

const user = [
  { name: "Fabian Tjoeaon" },
  { name: "Ethan Chiu" },
  { name: "Nando Correa" },
  { name: "Daisy Zhang" },
];

const socials = [
  { name: "Instagram", href: "https://instagram.com" },
  { name: "Dribbble", href: "https://dribbble.com" },
  { name: "X", href: "https://x.com" },
];

const OverlayContent: React.FC = () => {
  return (
    <>
      <h1 className="max-w-xs uppercase text-3xl font-semibold leading-10 tracking-tight dark:text-zinc-50">
        iso’design.
      </h1>
      <p className="maz-w-xs text-xl font-medium tracking-tighter muted dark:text-zinc-500">
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
          {["Web & Interactive", "3D", "ScrollSmoother", "ScrollTrigger"].map(
            (tool, index) => (
              <span
                key={index}
                className="px-3 [clamp(16px,1.4vw,24px)] py-1 font-medium muted border border-[#EDECEA] rounded-2xl"
              >
                {tool}
              </span>
            )
          )}
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-5">
        <h1 className="max-w-xs text-2xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
          Description about the site.
        </h1>
        <p className="max-w-md text-lg leading-6 tracking-tight muted text-semibold dark:text-zinc-400">
          A performance-first developer portfolio blending precision and
          storytelling. Minimal, fast, and fluid--where motion serves meaning
          and design meets engineering clarity.
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
        <h1 className="max-w-xs text-2xl font-semibold leading tracking-tight text-black dark:text-zinc-50">
          Connect with <span>{user.map((u) => u.name).join(", ")}</span>.
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
    </>
  );
};

export default OverlayContent;
