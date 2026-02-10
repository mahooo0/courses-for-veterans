"use client";

import { useTranslation } from "@/shared/i18n";

interface LanguageSwitcherProps {
  variant?: "light" | "dark";
}

export function LanguageSwitcher({ variant = "light" }: LanguageSwitcherProps) {
  const { locale, setLocale } = useTranslation();

  const activeClass =
    variant === "dark"
      ? "border-green-dark font-medium text-green-dark"
      : "border-yellow-accent font-medium text-yellow-accent";

  const inactiveClass =
    variant === "dark"
      ? "border-green-secondary font-light text-green-secondary"
      : "border-lilac font-light text-lilac";

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => setLocale("uk")}
        className={`flex h-[49px] w-[49px] items-center justify-center rounded-full border font-secondary text-xl ${
          locale === "uk" ? activeClass : inactiveClass
        }`}
      >
        UA
      </button>
      <button
        onClick={() => setLocale("en")}
        className={`flex h-[49px] w-[49px] items-center justify-center rounded-full border font-secondary text-xl ${
          locale === "en" ? activeClass : inactiveClass
        }`}
      >
        EN
      </button>
    </div>
  );
}
