"use client";
import React, { useState } from 'react';

const scrollbar = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    { name: "All" },
    { name: "Design Agencies" },
    { name: "E-commerce" },
    { name: "Mobile & App" },
    { name: "Interactive Design" },
    { name: "Illustration" },
    { name: "Fashion" },
    { name: "Artificial Intelligence" },
    { name: "Portfolio" },
  ];

  return (
    <div className="sticky top-0 w-full bg-white dark:bg-black border-2 border-b border-gray-200 dark:border-gray-800">
      <div className="flex flex-row pt-1 w-full overflow-x-auto gap-2">
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => setActiveCategory(cat.name)}
            className={`px-4 py-2 uppercase flex-shrink-0 text-[#787878] text-sm font-semibold transition-colors ${
              activeCategory === cat.name
                ? "border-b border-gray-500 dark:border-gray-800"
                : "bg-transparent text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default scrollbar;
