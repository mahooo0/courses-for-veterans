"use client";

import { useState } from "react";
import Image from "next/image";
import { Modal } from "@/shared/ui";
import { useTranslation } from "@/shared/i18n";
import closeIcon from "@/shared/assets/icons/close.svg";
import successDecorationImg from "@/shared/assets/images/success-decoration.png";

interface ContactFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactFormDialog({ isOpen, onClose }: ContactFormDialogProps) {
  const [step, setStep] = useState<"form" | "success">("form");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { t } = useTranslation();

  const handleClose = () => {
    setStep("form");
    setName("");
    setPhone("");
    onClose();
  };

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
      setStep("success");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} variant="dialog">
      <div className="w-[743px] rounded-[20px] bg-lilac p-9 pb-14 max-sm:w-[calc(100vw-32px)] max-sm:max-h-[90vh] max-sm:overflow-y-auto max-sm:p-6">
        {step === "form" ?
          <>
            {/* Header row */}
            <div className="mb-6 flex items-start justify-between">
              <h2 className="font-sans text-[48px] font-bold uppercase leading-[1.1] tracking-tight text-green-secondary max-sm:text-[32px]">
                {t.contactDialog.title}
              </h2>
              <button
                onClick={handleClose}
                className="flex h-[24px] w-[24px] shrink-0 cursor-pointer items-center justify-center">
                <Image src={closeIcon} alt="Close" width={24} height={24} />
              </button>
            </div>

            {/* Description */}
            <p className="mb-8 w-[495px] font-sans text-[20px] font-medium leading-[1.2] tracking-tight text-green-secondary max-sm:w-full max-sm:text-[16px]">
              {t.contactDialog.subtitle}
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <input
                type="text"
                placeholder={t.contactDialog.namePlaceholder}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-lg bg-white px-6 py-[17px] font-sans text-[16px] text-green-dark outline-none placeholder:text-green-dark/50"
              />
              <input
                type="tel"
                placeholder={t.contactDialog.phonePlaceholder}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="rounded-lg bg-white px-6 py-[17px] font-sans text-[16px] text-green-dark outline-none placeholder:text-green-dark/50"
              />
              <button
                type="submit"
                disabled={submitting}
                className="w-full cursor-pointer rounded-lg bg-yellow-accent py-4 text-center font-sans text-[24px] font-medium uppercase tracking-tight text-green-dark transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60">
                {submitting ? t.contactDialog.submitting : t.contactDialog.submit}
              </button>
            </form>
          </>
        : <>
            {/* Success header row */}
            <div className="mb-6 flex items-start justify-between">
              <h2 className="w-[482px] font-sans text-[48px] font-bold uppercase leading-[1.1] tracking-tight text-green-secondary max-sm:w-full max-sm:text-[32px]">
                {t.contactDialog.successTitle}
              </h2>
              <button
                onClick={handleClose}
                className="flex h-[24px] w-[24px] shrink-0 cursor-pointer items-center justify-center">
                <Image src={closeIcon} alt="Close" width={24} height={24} />
              </button>
            </div>

            {/* Subtitle */}
            <p className="mb-8 w-[495px] font-sans text-[20px] font-medium leading-[1.2] tracking-tight text-green-secondary max-sm:w-full max-sm:text-[16px]">
              {t.contactDialog.successSubtitle}
            </p>

            {/* Decorative image */}
            <div className="overflow-hidden rounded-lg">
              <Image
                src={successDecorationImg}
                alt=""
                width={1342}
                height={464}
                className="h-[232px] w-full "
              />
            </div>
          </>
        }
      </div>
    </Modal>
  );
}
