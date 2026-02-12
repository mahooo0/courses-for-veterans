"use client";

import { CircleCheckIcon, OctagonXIcon } from "lucide-react";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-6 text-yellow-accent" />,
        error: <OctagonXIcon className="size-6 text-red-400" />,
      }}
      toastOptions={{
        classNames: {
          toast:
            "!bg-green-dark !text-white !border-none !rounded-lg !font-sans !shadow-lg !px-6 !py-5 !min-w-[360px]",
          title: "!text-white !font-medium !text-base",
          description: "!text-white/80 !text-sm",
          icon: "!mr-3",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
