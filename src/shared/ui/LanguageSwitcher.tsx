"use client";

import { useState } from "react";

type Language = "UA" | "EN";

export function LanguageSwitcher() {
  const [active, setActive] = useState<Language>("UA");

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => setActive("UA")}
        className={`flex h-[49px] w-[49px] items-center justify-center rounded-full border font-secondary text-xl ${
          active === "UA"
            ? "border-yellow-accent font-medium text-yellow-accent"
            : "border-lilac font-light text-lilac"
        }`}
      >
        UA
      </button>
      <button
        onClick={() => setActive("EN")}
        className={`flex h-[49px] w-[49px] items-center justify-center rounded-full border font-secondary text-xl ${
          active === "EN"
            ? "border-yellow-accent font-medium text-yellow-accent"
            : "border-lilac font-light text-lilac"
        }`}
      >
        EN
      </button>
    </div>
  );
}
