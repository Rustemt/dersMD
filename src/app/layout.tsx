import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { SiteNav } from "@/components/site-nav";
import "./globals.css";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
});

const sans = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DersMD — Açık kaynak eğitim araç seti",
  description:
    "Ders player, tekrar motoru, soru bankası, pomodoro, dikte, sınıf quiz, ödev, rubrik, konu haritası, markdown defter ve ders paketi doğrulayıcı.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="tr"
      className={`${display.variable} ${sans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SiteNav />
        {children}
      </body>
    </html>
  );
}
