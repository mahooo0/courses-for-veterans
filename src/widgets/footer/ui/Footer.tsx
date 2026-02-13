"use client";

import Image from "next/image";
import { Logo, LanguageSwitcher } from "@/shared/ui";
import { useTranslation } from "@/shared/i18n";
import envelopeSrc from "@/shared/assets/icons/envelope.svg";
import mapMarkerSrc from "@/shared/assets/icons/map-marker.svg";
import instagramSrc from "@/shared/assets/icons/instagram.svg";
import telegramSrc from "@/shared/assets/icons/telegram.svg";
import facebookSrc from "@/shared/assets/icons/facebook.svg";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-green-dark px-[104px] py-[80px] max-sm:px-4 max-sm:py-10 sm:px-8 md:px-12 lg:px-16 xl:px-[104px]">
      <div className="flex gap-[228px] max-xl:flex-col max-md:items-start max-md:gap-8 md:gap-12 lg:gap-24 xl:gap-[228px]">
        {/* Logo */}
        <Logo />

        {/* Contact info */}
        <div className="flex w-[362px] flex-col gap-5 max-sm:w-full max-sm:items-start max-md:items-start">
          <div className="flex items-center gap-2">
            <Image src={envelopeSrc} alt="" width={24} height={24} />
            <span className="font-sans text-base tracking-tight text-lilac">
              bf.nadia25619098@gmail.com
            </span>
          </div>
          <div className="flex gap-2 max-sm:text-center max-md:text-center">
            <Image
              src={mapMarkerSrc}
              alt=""
              width={24}
              height={24}
              className="shrink-0"
            />
            <span className="font-sans text-base tracking-tight text-lilac">
              {t.footer.address}
            </span>
          </div>
        </div>

        {/* Language switcher + Social media */}
        <div className="flex w-[380px] items-center gap-[54px] max-sm:w-full max-sm:flex-col max-sm:items-start max-sm:gap-6 max-md:flex-col max-md:gap-6">
          <LanguageSwitcher />
          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/nadia_fund"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-75">
              <Image src={instagramSrc} alt="Instagram" width={32} height={32} />
            </a>
            <a
              href="https://t.me/foundation_nadia"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-75">
              <Image src={telegramSrc} alt="Telegram" width={36} height={32} />
            </a>
            <a
              href="https://www.facebook.com/nadia.fund"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-75">
              <Image src={facebookSrc} alt="Facebook" width={36} height={36} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
