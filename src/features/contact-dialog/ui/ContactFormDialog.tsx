"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/shared/ui/dialog";
import { PhoneInput, isValidPhone } from "@/shared/ui/PhoneInput";
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
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const { t } = useTranslation();

  const handleClose = () => {
    setStep("form");
    setName("");
    setPhone("");
    setErrors({});
    onClose();
  };

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
      setStep("success");
    } catch {
      toast.error(t.validation.submitError);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) handleClose();
      }}>
      <DialogContent
        showCloseButton={false}
        className="!min-w-[743px] max-md:!min-w-screen rounded-[20px] border-none bg-lilac p-9 pb-14 max-sm:!w-[calc(100vw-2rem)] max-sm:p-6">
        {step === "form" ?
          <>
            {/* Header row */}
            <div className="flex items-start justify-between">
              <DialogTitle className="font-sans text-[48px] font-bold uppercase leading-[1.1] tracking-tight text-green-secondary max-sm:text-[32px]">
                {t.contactDialog.title}
              </DialogTitle>
              <button
                onClick={handleClose}
                className="flex h-[24px] w-[24px] shrink-0 cursor-pointer items-center justify-center">
                <Image src={closeIcon} alt="Close" width={24} height={24} />
              </button>
            </div>

            {/* Description */}
            <DialogDescription className="w-[495px] font-sans text-[20px] font-medium leading-[1.2] tracking-tight text-green-secondary max-sm:w-full max-sm:text-[16px]">
              {t.contactDialog.subtitle}
            </DialogDescription>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div>
                <input
                  type="text"
                  placeholder={t.contactDialog.namePlaceholder}
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                  }}
                  className={`w-full rounded-lg bg-white px-6 py-[17px] font-sans text-[16px] text-green-dark outline-none placeholder:text-green-dark/50 ${
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
                  placeholder={t.contactDialog.phonePlaceholder}
                  error={!!errors.phone}
                />
                {errors.phone && (
                  <p className="mt-1 font-sans text-sm text-red-500">{errors.phone}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full cursor-pointer rounded-lg bg-yellow-accent py-4 text-center font-sans text-[24px] font-medium uppercase tracking-tight text-green-dark transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60">
                {submitting ?
                  t.contactDialog.submitting
                : t.contactDialog.submit}
              </button>
            </form>
          </>
        : <>
            {/* Success header row */}
            <div className="flex items-start justify-between">
              <DialogTitle className="w-[482px] font-sans text-[48px] font-bold uppercase leading-[1.1] tracking-tight text-green-secondary max-sm:w-full max-sm:text-[32px]">
                {t.contactDialog.successTitle}
              </DialogTitle>
              <button
                onClick={handleClose}
                className="flex h-[24px] w-[24px] shrink-0 cursor-pointer items-center justify-center">
                <Image src={closeIcon} alt="Close" width={24} height={24} />
              </button>
            </div>

            {/* Subtitle */}
            <DialogDescription className="w-[495px] font-sans text-[20px] font-medium leading-[1.2] tracking-tight text-green-secondary max-sm:w-full max-sm:text-[16px]">
              {t.contactDialog.successSubtitle}
            </DialogDescription>

            {/* Decorative image */}
            <div className="overflow-hidden rounded-lg">
              <Image
                src={successDecorationImg}
                alt=""
                width={1342}
                height={464}
                className="h-[232px] w-full"
              />
            </div>
          </>
        }
      </DialogContent>
    </Dialog>
  );
}
