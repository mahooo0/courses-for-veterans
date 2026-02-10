import type { Metadata } from "next";
import { Onest, Geologica } from "next/font/google";
import { Providers } from "@/shared/ui";
import "./globals.css";

const onest = Onest({
  variable: "--font-onest",
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500", "700"],
});

const geologica = Geologica({
  variable: "--font-geologica",
  subsets: ["cyrillic", "latin"],
  weight: ["300", "500"],
});

export const metadata: Metadata = {
  title: "Курси підтримки для ветеранів",
  description: "Курси підтримки та навчання для ветеранів",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body
        className={`${onest.variable} ${geologica.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
