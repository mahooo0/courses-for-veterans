"use client";

import { useState } from "react";

const navLinks = [
  { href: "#for-whom", label: "Для кого" },
  { href: "#how-it-works", label: "Як це працює" },
  { href: "#courses", label: "Курси" },
];

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      {/* Hamburger button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex h-10 w-10 cursor-pointer flex-col items-center justify-center gap-[6px]"
        aria-label="Open menu"
      >
        <span className="h-[2px] w-6 bg-yellow-accent" />
        <span className="h-[2px] w-6 bg-yellow-accent" />
        <span className="h-[2px] w-6 bg-yellow-accent" />
      </button>

      {/* Full-screen overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-green-dark">
          {/* Close button */}
          <div className="flex justify-end px-4 pt-4">
            <button
              onClick={() => setIsOpen(false)}
              className="flex h-10 w-10 cursor-pointer items-center justify-center"
              aria-label="Close menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="#D9FAA0" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex flex-1 flex-col items-center justify-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="font-sans text-2xl uppercase tracking-tight text-yellow-accent"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
