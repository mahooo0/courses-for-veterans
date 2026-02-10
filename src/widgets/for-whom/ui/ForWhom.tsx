"use client";

import Image from "next/image";
import { useTranslation } from "@/shared/i18n";
import cardShape1 from "@/shared/assets/images/card-shape-1.png";
import cardShape2 from "@/shared/assets/images/card-shape-2.png";
import cardShape3 from "@/shared/assets/images/card-shape-3.png";

const cardStyles = [
  {
    image: cardShape1,
    width: 378,
    height: 232,
    style: "left-0 top-[130px] w-[449px]",
    gap: "gap-9",
    mobileImg: "max-sm:w-[74px] max-sm:h-[74px]",
    mobileGap: "max-sm:gap-[54px]",
  },
  {
    image: cardShape2,
    width: 548,
    height: 232,
    style: "left-[513px] top-[202px] w-[548px]",
    gap: "gap-[109px]",
    textWidth: "w-[449px]",
    mobileImg: "max-sm:w-[105px] max-sm:h-[44px]",
    mobileGap: "max-sm:gap-[22px]",
  },
  {
    image: cardShape3,
    width: 237,
    height: 232,
    style: "left-[1033px] top-[125px] w-[495px] items-center",
    gap: "gap-[34px]",
    textWidth: "w-[441px]",
    mobileImg: "max-sm:w-[48px] max-sm:h-[76px]",
    mobileGap: "max-sm:gap-[79px]",
  },
];

export function ForWhom() {
  const { t } = useTranslation();

  return (
    <section className="bg-green-dark px-[100px] py-[80px] max-sm:px-4 sm:px-8 md:px-12 lg:px-16 xl:px-[100px]">
      <div className="relative mx-auto w-full max-w-[1528px]">
        {/* Title row */}
        <div className="flex items-start justify-between max-sm:flex-col max-sm:gap-6">
          <h2 className="w-[578px] font-sans text-[48px] font-normal uppercase leading-[1.1] tracking-tight text-yellow-accent max-sm:w-full max-sm:text-[24px] sm:text-[32px] md:text-[40px] lg:text-[48px]">
            {t.forWhom.title}
          </h2>
          <p className="w-[495px] font-sans text-[20px] font-medium leading-[1.2] tracking-tight text-yellow-accent max-sm:w-full max-sm:text-[14px] max-lg:w-full lg:w-[495px]">
            {t.forWhom.subtitle}
          </p>
        </div>

        {/* Cards container - desktop: absolute positioned, below: column */}
        <div className="relative mt-8 flex max-xl:flex-col max-xl:items-center flex-row gap-6 desktop:h-[520px] desktop:block ">
          {/* Decorative blur ellipse */}
          <div className="absolute left-[31px] top-[38px] h-[392px] w-[392px] rounded-full bg-lilac/40 blur-[500px] max-desktop:hidden" />

          {cardStyles.map((card, i) => {
            const text = t.forWhom.cards[i];
            return (
              <div
                key={card.width}
                className={`flex flex-col ${card.gap} ${card.mobileGap} ${card.style} desktop:absolute max-desktop:w-full max-desktop:gap-4 max-sm:flex-row max-sm:items-start max-sm:w-full justify-between`}>
                <Image
                  src={card.image}
                  alt={text.title}
                  width={card.width}
                  height={card.height}
                  className={`${card.mobileImg} max-sm:shrink-0 max-sm:object-contain max-h-[377px]`}
                />
                <div
                  className={`flex flex-col gap-2 ${card.textWidth ?? ""} h-fi max-desktop:w-full max-sm:flex-1`}>
                  <h3 className="font-sans text-[24px] font-medium leading-[1.1] text-yellow-accent max-sm:text-[20px]">
                    {text.title}
                  </h3>
                  <p className="font-sans text-[16px] font-normal leading-[1.5] tracking-tight text-yellow-accent max-sm:text-[14px]">
                    {text.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
