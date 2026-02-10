"use client";

import { useState } from "react";
import Image from "next/image";
import contactBg from "@/shared/assets/images/contact-bg.png";

export function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <section className="relative h-[782px] overflow-hidden max-sm:h-[520px] sm:h-[560px] md:h-[600px] lg:h-[700px] xl:h-[782px]">
      <Image src={contactBg} alt="" fill className="object-cover" />
      <div className="relative z-10 flex items-center gap-[155px] px-[100px] py-[88px] max-md:flex-col max-md:gap-6 max-md:items-start max-sm:px-4 max-sm:py-10 sm:px-8 sm:gap-8 md:px-12 md:gap-12 lg:px-16 lg:gap-20 xl:px-[100px] xl:gap-[155px]">
        <h2 className="font-sans text-[150px] font-bold uppercase leading-[0.9] tracking-tight text-green-secondary max-sm:text-[48px] sm:text-[64px] md:text-[80px] lg:text-[120px] xl:text-[150px]">
          Залишити заявку
        </h2>
        <form
          className="flex w-[490px] shrink-0 flex-col gap-6 max-md:w-full md:w-[400px] lg:w-[490px]"
          onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Ваше Імʼя"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-lg bg-white px-6 py-[17px] font-sans text-base text-green-dark outline-none placeholder:text-green-dark/50"
          />
          <input
            type="tel"
            placeholder="Ваш телефон"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="rounded-lg bg-white px-6 py-[17px] font-sans text-base text-green-dark outline-none placeholder:text-green-dark/50"
          />
          <button
            type="submit"
            className="rounded-lg bg-yellow-accent px-6 py-4 text-center font-sans text-2xl font-medium uppercase tracking-tight text-green-dark max-sm:text-[16px]">
            [надіслати]
          </button>
        </form>
      </div>
    </section>
  );
}
