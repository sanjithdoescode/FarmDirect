import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "./context/LanguageContext";
import { PageTransitionProvider } from "./context/PageTransitionContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
});

export const metadata: Metadata = {
  title: "FarmDirect - Farm to Table Marketplace",
  description: "Connect farmers directly with consumers for fresher produce and fair prices",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${robotoMono.variable} antialiased`}
      >
        <LanguageProvider>
          <PageTransitionProvider>
            {children}
          </PageTransitionProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
