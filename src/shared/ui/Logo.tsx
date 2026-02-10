import Image from "next/image";
import logoSrc from "@/shared/assets/images/logo.svg";

export function Logo() {
  return (
    <Image
      src={logoSrc}
      alt="Курси для ветеранів"
      width={217}
      height={69}
      priority
      className="max-sm:h-[35px] max-sm:w-[110px] sm:w-[140px] sm:h-[45px] md:w-[170px] md:h-[55px] lg:w-[217px] lg:h-[69px]"
    />
  );
}
