"use client";

import type { ReactNode } from "react";
import { LanguageProvider } from "@/shared/i18n";
import { Toaster } from "@/shared/ui/sonner";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      {children}
      <Toaster position="bottom-right" />
    </LanguageProvider>
  );
}
