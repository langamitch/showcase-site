// app/components/Navbar.tsx
"use client";

import React from "react";

export default function Navbar() {
  return (
    <nav className="w-full bg-transparent  fixed top-0 left-0 z-50 ">
      <div className="mx-auto px-4 sm:px-8 lg:px-8 h-16 py-3 flex items-center">
        {/* Logo */}
        <div className="flex-shrink-0 text-gray-900 dark:text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="40px"
            viewBox="0 -960 960 960"
            width="40px"
            fill="currentColor"
          >
            <path d="M340-237.64v-487.69l383.07 243.84L340-237.64Zm50.26-243.85Zm0 152 239.59-152-239.59-152v304Z" />
          </svg>
        </div>
      </div>
    </nav>
  );
}
