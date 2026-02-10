"use client";

import { Logo, LanguageSwitcher } from "@/shared/ui";
import { useTranslation } from "@/shared/i18n";
import { MobileNav } from "./MobileNav";

export function Header() {
  const { t } = useTranslation();

  return (
    <header className="absolute top-0 left-0 z-10 flex w-full items-center justify-between px-[92px] pt-[13px] max-sm:px-4 max-sm:pt-3 sm:px-8 md:px-12 lg:px-16 xl:px-[92px]">
      <Logo />
      <div className="flex items-center gap-[34px] max-md:hidden">
        <nav className="flex items-center gap-9">
          <a
            href="#for-whom"
            className="font-sans text-base tracking-tight text-yellow-accent"
          >
            {t.nav.forWhom}
          </a>
          <a
            href="#how-it-works"
            className="font-sans text-base tracking-tight text-yellow-accent"
          >
            {t.nav.howItWorks}
          </a>
          <a
            href="#courses"
            className="font-sans text-base tracking-tight text-yellow-accent"
          >
            {t.nav.courses}
          </a>
        </nav>
        <LanguageSwitcher />
      </div>
      <MobileNav />
    </header>
  );
}
