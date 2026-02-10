"use client";

import { useTranslation } from "@/shared/i18n";

const stepNumbers = ["01", "02", "03", "04"];

interface HowItWorksProps {
  onTryNow: () => void;
}

export function HowItWorks({ onTryNow }: HowItWorksProps) {
  const { t } = useTranslation();

  return (
    <section className="px-[100px] py-[80px] max-sm:px-0 sm:px-8 md:px-12 lg:px-16 xl:px-[100px]">
      <div className="mx-auto flex w-full max-w-[1528px] flex-col gap-12">
        {/* Title */}
        <h2 className="font-sans text-[48px] max-sm:pl-4 font-normal uppercase leading-[1.1] tracking-tight text-lilac max-sm:text-[24px] sm:text-[32px] md:text-[40px] lg:text-[48px]">
          {t.howItWorks.title}
        </h2>

        {/* Steps + CTA */}
        <div className="flex flex-col items-end gap-9 overflow-hidden max-w-screen">
          {/* Step cards row - mobile: horizontal scroll, tablet: 2-col grid, desktop: 4-col flex */}
          <div className="flex w-full gap-6 max-sm:overflow-x-auto max-sm:snap-x max-sm:snap-mandatory max-sm:px-0 max-sm:scrollbar-hide md:grid md:grid-cols-2 xl:grid-cols-4 desktop:flex">
            {stepNumbers.map((number, i) => {
              const step = t.howItWorks.steps[i];
              return (
                <div
                  key={number}
                  className="flex h-[392px] w-[364px] flex-col justify-between rounded-tr-2xl border-[10px] border-r-[10px] border-lilac bg-green-dark p-9 max-sm:min-w-[280px] max-sm:snap-center max-sm:shrink-0 max-sm:h-auto max-sm:w-[235px] max-sm:gap-6 md:h-[340px] md:w-full lg:h-[380px] desktop:w-[364px] desktop:h-[392px]">
                  <span className="font-sans text-[64px] font-extrabold uppercase leading-[1.1] tracking-tight text-lilac max-sm:text-[36px]">
                    {number}
                  </span>
                  <div className="flex w-[299px] flex-col gap-2 max-sm:w-full md:w-full xl:w-[299px]">
                    <h3 className="font-sans text-[24px] font-medium leading-[1.1] text-lilac max-sm:text-[20px]">
                      {step.title}
                    </h3>
                    <p className="font-sans text-[16px] font-normal leading-[1.5] tracking-tight text-lilac max-sm:text-[14px]">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA button */}
          <button
            onClick={onTryNow}
            className="cursor-pointer font-sans text-[24px] font-medium uppercase leading-[0.9] tracking-tight text-lilac max-sm:text-[16px] max-sm:mr-4"
          >
            {t.howItWorks.tryNow}
          </button>
        </div>
      </div>
    </section>
  );
}
