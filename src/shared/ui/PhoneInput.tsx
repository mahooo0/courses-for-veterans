"use client";

import { PhoneInput as RIPPhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

interface PhoneInputProps {
  value: string;
  onChange: (phone: string) => void;
  placeholder?: string;
  error?: boolean;
}

export function PhoneInput({
  value,
  onChange,
  placeholder,
  error,
}: PhoneInputProps) {
  return (
    <RIPPhoneInput
      defaultCountry="ua"
      preferredCountries={["ua"]}
      value={value}
      onChange={(phone) => onChange(phone)}
      placeholder={placeholder}
      inputClassName="!rounded-lg !border-none !bg-transparent !px-3 !py-0 !font-sans !text-[16px] !text-green-dark !outline-none placeholder:!text-green-dark/50 !h-auto"
      countrySelectorStyleProps={{
        buttonClassName:
          "!rounded-l-lg !border-none !bg-transparent !px-3 !h-auto",
        dropdownStyleProps: {
          className: "!rounded-lg !shadow-lg !border-green-dark/10",
          listItemClassName: "!font-sans !text-green-dark",
        },
      }}
      className={`!h-auto !rounded-lg !bg-white !py-[17px] !font-sans !text-[16px] !text-green-dark ${
        error ? "!ring-2 !ring-red-500" : "!border-none"
      }`}
    />
  );
}

/**
 * Validates a phone number by checking it has enough digits.
 * The phone value should be in E.164 format (e.g., "+380501234567").
 */
export function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 7;
}
