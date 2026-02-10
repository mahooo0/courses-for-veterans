"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslation } from "@/shared/i18n";
import contactBg from "@/shared/assets/images/contact-bg.png";

export function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone }),
      });
    } catch {
      // Don't block UX on network errors
    } finally {
      setSubmitting(false);
      setName("");
      setPhone("");
    }
  };

  return (
    <section className="relative h-[782px] overflow-hidden max-sm:h-[520px] sm:h-[560px] md:h-[600px] lg:h-[700px] xl:h-[782px]">
      <Image src={contactBg} alt="" fill className="object-cover" />
      <div className="relative z-10 flex items-center gap-[155px] px-[100px] py-[88px] max-md:flex-col max-md:gap-6 max-md:items-start max-sm:px-4 max-sm:py-10 sm:px-8 sm:gap-8 md:px-12 md:gap-12 lg:px-16 lg:gap-20 xl:px-[100px] xl:gap-[155px]">
        <h2 className="font-sans text-[150px] font-bold uppercase leading-[0.9] tracking-tight text-green-secondary max-sm:text-[48px] sm:text-[64px] md:text-[80px] lg:text-[80px] xl:text-[120px]">
          {t.contactForm.title}
        </h2>
        <form
          className="flex w-[490px] shrink-0 flex-col gap-6 max-md:w-full md:w-[400px] lg:w-[490px]"
          onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder={t.contactForm.namePlaceholder}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-lg bg-white px-6 py-[17px] font-sans text-base text-green-dark outline-none placeholder:text-green-dark/50"
          />
          <input
            type="tel"
            placeholder={t.contactForm.phonePlaceholder}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="rounded-lg bg-white px-6 py-[17px] font-sans text-base text-green-dark outline-none placeholder:text-green-dark/50"
          />
          <button
            type="submit"
            disabled={submitting}
            className="rounded-lg bg-yellow-accent px-6 py-4 text-center font-sans text-2xl font-medium uppercase tracking-tight text-green-dark max-sm:text-[16px] disabled:cursor-not-allowed disabled:opacity-60">
            {submitting ? t.contactForm.submitting : t.contactForm.submit}
          </button>
        </form>
      </div>
    </section>
  );
}
