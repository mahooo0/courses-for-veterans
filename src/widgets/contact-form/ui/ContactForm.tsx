"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { useTranslation } from "@/shared/i18n";
import { PhoneInput, isValidPhone } from "@/shared/ui/PhoneInput";
import contactBg from "@/shared/assets/images/contact-bg.png";

export function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const { t } = useTranslation();

  const validate = (): boolean => {
    const newErrors: { name?: string; phone?: string } = {};
    if (!name.trim()) {
      newErrors.name = t.validation.nameRequired;
    }
    if (!isValidPhone(phone)) {
      newErrors.phone = t.validation.phoneInvalid;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone }),
      });
      if (!res.ok) throw new Error("Request failed");
      toast.success(t.validation.submitSuccess);
      setName("");
      setPhone("");
    } catch {
      toast.error(t.validation.submitError);
    } finally {
      setSubmitting(false);
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
          <div>
            <input
              type="text"
              placeholder={t.contactForm.namePlaceholder}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
              }}
              className={`w-full rounded-lg bg-white px-6 py-[17px] font-sans text-base text-green-dark outline-none placeholder:text-green-dark/50 ${
                errors.name ? "ring-2 ring-red-500" : ""
              }`}
            />
            {errors.name && (
              <p className="mt-1 font-sans text-sm text-red-500">{errors.name}</p>
            )}
          </div>
          <div>
            <PhoneInput
              value={phone}
              onChange={(val) => {
                setPhone(val);
                if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
              }}
              placeholder={t.contactForm.phonePlaceholder}
              error={!!errors.phone}
            />
            {errors.phone && (
              <p className="mt-1 font-sans text-sm text-red-500">{errors.phone}</p>
            )}
          </div>
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
