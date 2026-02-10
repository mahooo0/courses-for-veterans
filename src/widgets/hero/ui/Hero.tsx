import Image from "next/image";
import heroBg from "@/shared/assets/images/hero-bg.png";
import vidmovlennyaImg from "@/shared/assets/images/vidmovlennya.png";

export function Hero() {
  return (
    <section className="relative h-[750px] overflow-hidden bg-green-dark max-sm:h-[600px] sm:h-[650px] md:h-[700px] lg:h-[750px]">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image src={heroBg} alt="" fill className="object-cover" priority />
      </div>

      {/* Content */}
      <div className="relative z-[5] flex h-full flex-col px-[100px] pt-[184px] max-sm:px-4 max-sm:pt-[82px] sm:px-8 md:px-12 lg:px-16 xl:px-[100px]">
        {/* Title + CTA row */}
        <div className="flex items-center justify-between max-md:flex-col max-md:items-start max-md:gap-[44px]">
          {/* Title block */}
          <div className="w-[731px] max-sm:w-full sm:w-full md:w-[500px] lg:w-[600px] xl:w-[731px]">
            <p className="font-sans text-[40px] uppercase leading-[1.275] tracking-tight text-yellow-accent max-sm:text-[24px] sm:text-[28px] md:text-[32px] lg:text-[40px]">
              Курси підтримки
            </p>
            <p className="font-sans text-[40px] uppercase leading-[1.275] tracking-tight text-yellow-accent max-sm:text-[24px] sm:text-[28px] md:text-[32px] lg:text-[40px]">
              для ветеранів
            </p>
          </div>

          {/* CTA buttons */}
          <div className="flex w-[281px] flex-col gap-3 max-sm:w-full sm:w-full md:w-[281px]">
            <button className="flex items-center justify-center rounded-lg bg-yellow-accent px-6 py-4 font-sans text-2xl font-medium uppercase tracking-tight text-green-dark max-sm:text-[16px]">
              [почати сьогодні]
            </button>
            <button className="flex items-center justify-center rounded-lg border border-yellow-accent px-6 py-4 font-sans text-2xl font-medium uppercase tracking-tight text-yellow-accent max-sm:text-[16px]">
              дивитись курси +
            </button>
          </div>
        </div>

        {/* Large decorative text */}
        <div className="mt-[69px] flex flex-col gap-[19px] max-sm:mt-auto max-sm:mb-8">
          <h1 className="font-sans text-[150px] font-bold uppercase leading-[0.9] tracking-tight text-yellow-accent max-sm:text-[48px] sm:text-[64px] md:text-[80px] lg:text-[120px] xl:text-[150px]">
            на шляху
          </h1>
          <Image
            src={vidmovlennyaImg}
            alt="відновлення"
            width={1126}
            height={140}
            className="max-sm:w-full sm:w-[400px] sm:h-auto md:w-[600px] lg:w-[800px] xl:w-[1126px]"
          />
        </div>
      </div>
    </section>
  );
}
