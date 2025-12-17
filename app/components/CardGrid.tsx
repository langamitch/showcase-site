"use client";
import React from "react";
import Card from "./Card";

interface CardGridProps {
  onCardClick: (index: number) => void;
}

const CardGrid: React.FC<CardGridProps> = ({ onCardClick }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 bg-gray-50 dark:bg-[#000000]">
      {Array.from({ length: 6 }).map((_, index) => (
        <Card
          key={index}
          index={index}
          onClick={() => onCardClick(index)}
          title="The Monolith Project"
        />
      ))}
    </div>
  );
};

export default CardGrid;
