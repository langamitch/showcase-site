"use client";
import React from "react";
import Image from "next/image";

interface CardProps {
  index: number;
  onClick: () => void;
  title: string;
}

const Card: React.FC<CardProps> = ({ onClick, title }) => {
  return (
    <div className="flex flex-col">
      <div className="aspect-video">
        <a
          href="#"
          className="block w-full h-full bg-neutral-300/50 backdrop-blur-sm hover:backdrop-blur-md transition-all duration-500"
        >
          <Image
            src="/img.png"
            alt="Card Image"
            width={800}
            height={450}
            className="w-full h-auto rounded-sm"
          />
        </a>
      </div>
      <p
        onClick={onClick}
        className="mt-2 tracking-tighter muted text-[clamp(16px,1.4vw,24px)] font-medium uppercase dark:text-gray-300 cursor-pointer"
      >
        {title}
      </p>
    </div>
  );
};

export default Card;
