"use client";

import { useState } from "react";
import Image from "next/image";
import { LanguageSwitcher } from "@/shared/ui";
import { useTranslation } from "@/shared/i18n";
import socialMediaIcon from "@/shared/assets/icons/social-media.svg";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const navLinks = [
    { href: "#for-whom", label: t.nav.forWhom, weight: "font-semibold" },
    { href: "#how-it-works", label: t.nav.howItWorks, weight: "font-normal" },
    { href: "#courses", label: t.nav.courses, weight: "font-normal" },
  ];

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
        <div className="fixed inset-0 z-50 flex flex-col bg-yellow-accent px-4 pt-[85px]">
          {/* Close button */}
          <div className="absolute top-4 right-4">
            <button
              onClick={() => setIsOpen(false)}
              className="flex h-10 w-10 cursor-pointer items-center justify-center"
              aria-label="Close menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 6L6 18M6 6l12 12"
                  stroke="#203236"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex flex-col gap-9">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`font-sans text-[24px] uppercase tracking-tight text-green-dark ${link.weight}`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Bottom section: language switcher + social media */}
          <div className="mt-[72px] flex items-center gap-6">
            <LanguageSwitcher variant="dark" />
            <Image
              src={socialMediaIcon}
              alt="Social media"
              width={24}
              height={24}
            />
          </div>
        </div>
      )}
    </div>
  );
}
